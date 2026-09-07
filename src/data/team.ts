// Team members shown on the About page. The section renders only when this
// array has entries; it is intentionally empty for launch (decision of
// September 2026). Portrait files live locally in src/assets/team/, which is
// gitignored so no personal photos sit in the public repository; import one
// here and add an entry to bring the section back.
import type { ImageMetadata } from 'astro';

export interface TeamMember {
  name: string;
  role: string;
  roleDe: string;
  photo: ImageMetadata | null;
  bio: string | null;
  bioDe: string | null;
}

export const team: TeamMember[] = [];
