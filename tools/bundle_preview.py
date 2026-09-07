#!/usr/bin/env python3
"""Bundle the built site (dist/) into one self-contained, shareable HTML file.

Usage: python3 tools/bundle_preview.py [output.html]
Run `npm run build` first. The output opens from disk in any browser: all 26
pages, hash-based navigation, images and fonts inlined, language switching and
a contact-form demo (validation plus the mailto fallback) included.
"""
import base64
import glob
import html as htmllib
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, "dist")
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "Meridium-Website-Preview.html")

MIME = {
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
}

PIXEL = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="

assets = {}


def data_uri(path):
    ext = os.path.splitext(path)[1].lower()
    with open(os.path.join(DIST, path.lstrip("/")), "rb") as f:
        payload = base64.b64encode(f.read()).decode()
    return f"data:{MIME[ext]};base64,{payload}"


def register_asset(path):
    key = os.path.basename(path)
    if key not in assets:
        assets[key] = data_uri(path)
    return key


def best_candidate(srcset, target=1100):
    cands = []
    for part in srcset.split(","):
        bits = part.strip().split()
        if len(bits) == 2 and bits[1].endswith("w"):
            cands.append((bits[0], int(bits[1][:-1])))
    return min(cands, key=lambda c: abs(c[1] - target))[0] if cands else None


def fix_img(match):
    tag = match.group(0)
    m = re.search(r'srcset="([^"]+)"', tag)
    chosen = best_candidate(m.group(1)) if m else None
    if not chosen:
        m2 = re.search(r'src="(/_astro/[^"]+)"', tag)
        chosen = m2.group(1) if m2 else None
    if chosen:
        key = register_asset(chosen)
        tag = re.sub(r'\s(?:srcset|sizes)="[^"]*"', "", tag)
        tag = re.sub(r'src="[^"]*"', f'src="{PIXEL}" data-asset="{key}"', tag, count=1)
    return tag


css_hrefs = []
head_styles = []
pages = {}

for page_path in sorted(glob.glob(os.path.join(DIST, "**/index.html"), recursive=True)):
    rel = os.path.relpath(os.path.dirname(page_path), DIST)
    route = "/" if rel == "." else f"/{rel}/"
    doc = open(page_path, encoding="utf-8").read()

    head = re.search(r"<head[^>]*>(.*)</head>", doc, re.S).group(1)
    for href in re.findall(r'<link rel="stylesheet" href="(/_astro/[^"]+\.css)"', head):
        if href not in css_hrefs:
            css_hrefs.append(href)
    for style in re.findall(r"<style>.*?</style>", head, re.S):
        if style not in head_styles:
            head_styles.append(style)

    title = re.search(r"<title>(.*?)</title>", doc, re.S).group(1)
    body = re.search(r"<body[^>]*>(.*)</body>", doc, re.S).group(1)
    body = re.sub(r"<script\b.*?</script>", "", body, flags=re.S)
    body = re.sub(r"<img\b[^>]*>", fix_img, body)
    pages[route] = {"title": title.strip(), "body": body}

css = ""
for href in css_hrefs:
    chunk = open(os.path.join(DIST, href.lstrip("/")), encoding="utf-8").read()
    chunk = re.sub(
        r"url\(\s*['\"]?(/_astro/[^)'\"]+)['\"]?\s*\)",
        lambda m: f"url({data_uri(m.group(1))})",
        chunk,
    )
    css += chunk

templates = ""
for route, page in pages.items():
    templates += (
        f'<template data-route="{route}" data-title="{htmllib.escape(page["title"], quote=True)}">'
        f"{page['body']}</template>\n"
    )

runtime = """
<script>
const ASSETS = __ASSETS__;
const app = document.getElementById('app');
let pendingAnchor = null;

function currentRoute() {
  const h = location.hash.slice(1);
  return h === '' ? '/' : h;
}

function bindHeader() {
  const button = app.querySelector('[data-menu-button]');
  const panel = app.querySelector('[data-menu-panel]');
  const iconOpen = app.querySelector('[data-icon-open]');
  const iconClose = app.querySelector('[data-icon-close]');
  const setMenu = (isOpen) => {
    panel && panel.classList.toggle('hidden', !isOpen);
    button && button.setAttribute('aria-expanded', String(isOpen));
    iconOpen && iconOpen.classList.toggle('hidden', isOpen);
    iconClose && iconClose.classList.toggle('hidden', !isOpen);
  };
  button && button.addEventListener('click', () => {
    setMenu(panel.classList.contains('hidden'));
  });
  const sBtn = app.querySelector('[data-services-button]');
  const sWrap = app.querySelector('[data-services-wrap]');
  if (sBtn && sWrap) {
    const setServices = (open) => {
      sWrap.classList.toggle('open', open);
      sBtn.setAttribute('aria-expanded', String(open));
    };
    sBtn.addEventListener('click', () => setServices(!sWrap.classList.contains('open')));
    sWrap.addEventListener('mouseleave', () => setServices(false));
    sWrap.addEventListener('focusin', () => setServices(true));
    sWrap.addEventListener('focusout', (e) => {
      if (!sWrap.contains(e.relatedTarget)) setServices(false);
    });
  }
}

function bindContactForm() {
  const form = app.querySelector('[data-contact-form]');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let firstInvalid = null;
    for (const field of fields) {
      let valid = field.type === 'checkbox' ? field.checked : field.value.trim().length > 0;
      if (valid && field.type === 'email') valid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(field.value.trim());
      field.setAttribute('aria-invalid', String(!valid));
      const errorId = field.getAttribute('data-error-id');
      const msg = errorId && document.getElementById(errorId);
      msg && msg.classList.toggle('hidden', valid);
      if (!valid && !firstInvalid) firstInvalid = field;
    }
    if (firstInvalid) { firstInvalid.focus(); return; }
    // The shared preview cannot deliver mail; show the error state with the
    // mailto fallback.
    const error = form.querySelector('[data-form-error]');
    error && error.classList.remove('hidden');
  });
}

function render(route, anchor) {
  const t = document.querySelector('template[data-route="' + route + '"]')
    || document.querySelector('template[data-route="/"]');
  app.innerHTML = '';
  app.appendChild(t.content.cloneNode(true));
  document.title = t.dataset.title;
  for (const img of app.querySelectorAll('img[data-asset]')) {
    img.src = ASSETS[img.getAttribute('data-asset')];
  }
  bindHeader();
  bindContactForm();
  if (anchor) {
    const el = document.getElementById(anchor);
    el && el.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
}

function go(route, anchor) {
  if (currentRoute() === route) render(route, anchor);
  else { pendingAnchor = anchor || null; location.hash = route; }
}

window.addEventListener('hashchange', () => {
  render(currentRoute(), pendingAnchor);
  pendingAnchor = null;
});

document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;
  const href = a.getAttribute('href') || '';
  if (href.startsWith('/')) {
    e.preventDefault();
    const [path, anchor] = href.split('#');
    go(path === '' ? '/' : path, anchor);
  } else if (href.startsWith('#')) {
    e.preventDefault();
    const el = document.getElementById(href.slice(1));
    el && el.scrollIntoView({ behavior: 'smooth' });
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const sWrap = app.querySelector('[data-services-wrap]');
  const sBtn = app.querySelector('[data-services-button]');
  if (sWrap && sWrap.classList.contains('open')) {
    sWrap.classList.remove('open');
    sBtn.setAttribute('aria-expanded', 'false');
    sBtn.focus();
  }
  const panel = app.querySelector('[data-menu-panel]');
  const button = app.querySelector('[data-menu-button]');
  if (panel && !panel.classList.contains('hidden')) {
    panel.classList.add('hidden');
    button.setAttribute('aria-expanded', 'false');
    button.focus();
  }
});

document.addEventListener('pointerdown', (e) => {
  const sWrap = app.querySelector('[data-services-wrap]');
  if (sWrap && !sWrap.contains(e.target)) {
    sWrap.classList.remove('open');
    const sBtn = app.querySelector('[data-services-button]');
    sBtn && sBtn.setAttribute('aria-expanded', 'false');
  }
});

render(currentRoute());
</script>
"""

note = (
    '<div style="background:#0b1a46;color:rgba(255,255,255,.85);font-size:13px;'
    'text-align:center;padding:8px 16px;line-height:1.5">Shareable preview of the '
    "Meridium website. All pages and navigation work; email buttons open your mail "
    "program.</div>"
)

out = (
    "<!doctype html>\n"
    '<meta charset="utf-8">\n'
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
    "<title>Meridium Website (Preview)</title>\n"
    "<style>body{background:#ffffff;margin:0}</style>\n"
    f"<style>{css}</style>\n"
    + "".join(head_styles)
    + note
    + '<div id="app"></div>\n'
    + templates
    + runtime.replace("__ASSETS__", json.dumps(assets))
)

for script in re.findall(r"<script[^>]*>(.*?)</script>", out, re.S):
    assert script.isascii(), "non-ASCII inside a script block"
out = out.encode("ascii", errors="xmlcharrefreplace").decode("ascii")

with open(OUT, "w", encoding="utf-8") as f:
    f.write(out)
print("routes:", len(pages))
print("written", OUT, f"{os.path.getsize(OUT) / 1024:.0f} KB")
