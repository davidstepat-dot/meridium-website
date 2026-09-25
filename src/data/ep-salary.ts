// Employment Pass salary data for the EP salary calculator
// (src/components/EpSalaryCalculator.astro). All figures are MOM's.
// Verified 25 Sep 2026. Re-verify each August, when MOM publishes the next
// C1 benchmark table, and whenever MOM announces a new qualifying salary.
//
// Qualifying salary (Stage 1):
//   https://www.mom.gov.sg/passes-and-permits/employment-pass/eligibility
//   Current schedule: new applications from 1 Jan 2025, renewals from 1 Jan 2026.
//   2027 schedule: new applications from 1 Jan 2027, renewals of passes
//   expiring from 1 Jan 2028.
// COMPASS C1 salary benchmarks by sector (Stage 2):
//   https://www.mom.gov.sg/-/media/mom/documents/work-passes-and-permits/compass/c1-salary-benchmarks.pdf (released Aug 2025)
//   https://www.mom.gov.sg/-/media/mom/documents/work-passes-and-permits/compass/c1-salary-benchmarks-upcoming.pdf (released Aug 2026)
//   Aug 2025 table: new applications until 31 Dec 2026, renewals of passes expiring before 1 Jul 2027.
//   Aug 2026 table: new applications from 1 Jan 2027, renewals of passes expiring from 1 Jul 2027.
//
// Both measures rise in a straight line from age 23 (and below) to age 45
// (and above), so only the two end points are stored; the calculator
// interpolates the ages in between. Spot checks against every age row of the
// published tables match to within S$1.

// [≤23, ≥45] for all sectors except financial services, then financial services.
export const QUALIFYING_SALARY = {
  current: { general: [5600, 10700], fs: [6200, 11800] },
  from2027: { general: [6000, 11500], fs: [6600, 12700] },
} as const;

// Fixed monthly salary at or above which a candidate is exempt from COMPASS.
export const COMPASS_EXEMPTION = 22500;

// Rule change dates (ISO strings, compared as text).
export const DATES = {
  newApplicationsSwitch: '2027-01-01', // qualifying salary and C1 table for new applications
  renewalQualifyingSwitch: '2028-01-01', // qualifying salary for renewals, by pass expiry
  renewalC1Switch: '2027-07-01', // C1 table for renewals, by pass expiry
  newApplicationsReviewAfter: '2028-01-01', // later C1 tables likely to apply
  renewalsReviewAfter: '2028-07-01',
} as const;

// Sector names as MOM prints them. `fs` marks the sectors that use the
// financial services qualifying salary. Benchmarks are
// [65th ≤23, 90th ≤23, 65th ≥45, 90th ≥45].
export type Sector = {
  name: string;
  fs: boolean;
  aug2025: [number, number, number, number];
  aug2026: [number, number, number, number];
};

export const SECTORS: Sector[] = [
  { name: 'Accommodation', fs: false, aug2025: [4341, 5578, 6611, 12695], aug2026: [4528, 5674, 7423, 12546] },
  { name: 'Administrative & Support Services', fs: false, aug2025: [5654, 9389, 9379, 17643], aug2026: [5559, 8511, 9784, 17429] },
  { name: 'Air & Sea Transport', fs: false, aug2025: [5837, 9335, 11582, 21044], aug2026: [6216, 9503, 12390, 22963] },
  { name: 'Arts, Entertainment & Recreation', fs: false, aug2025: [4534, 6545, 9296, 15550], aug2026: [4719, 6773, 10468, 16865] },
  { name: 'Banking & Other Financial Services', fs: true, aug2025: [7510, 11151, 19266, 30793], aug2026: [7680, 10957, 19683, 31437] },
  { name: 'Construction', fs: false, aug2025: [5262, 7317, 8125, 13413], aug2026: [5197, 6851, 8344, 12736] },
  { name: 'Education', fs: false, aug2025: [5122, 6714, 10434, 14267], aug2026: [5296, 6862, 10700, 14780] },
  { name: 'Food & Beverage Services', fs: false, aug2025: [4241, 5788, 6089, 11243], aug2026: [4368, 5799, 6463, 11094] },
  { name: 'Fund Management Activities', fs: true, aug2025: [8917, 12474, 21845, 40530], aug2026: [8992, 13029, 21639, 41699] },
  { name: 'Health & Social Services', fs: false, aug2025: [5352, 7106, 9430, 17937], aug2026: [5636, 7624, 9881, 17041] },
  { name: 'Info-communications Technology', fs: false, aug2025: [6939, 9778, 13326, 22917], aug2026: [7033, 9968, 13926, 23283] },
  { name: 'Insurance, Reinsurance, Provident & Pension Funding', fs: true, aug2025: [6481, 9394, 12060, 22253], aug2026: [6289, 8980, 12494, 26909] },
  { name: 'Land Transport & Logistics', fs: false, aug2025: [4721, 6621, 7776, 16857], aug2026: [4794, 6933, 7987, 14996] },
  { name: 'Manufacturing', fs: false, aug2025: [5609, 7785, 10462, 17442], aug2026: [5794, 7817, 10721, 17556] },
  { name: 'Media', fs: false, aug2025: [5323, 8243, 9699, 17891], aug2026: [5104, 7445, 9924, 18680] },
  { name: 'Other Community, Social & Personal Services', fs: false, aug2025: [4492, 6350, 7118, 13396], aug2026: [4765, 7320, 8184, 15024] },
  { name: 'Professional Services', fs: false, aug2025: [6175, 9589, 11941, 22737], aug2026: [6500, 9693, 12102, 24223] },
  { name: 'Public Administration & Defence', fs: false, aug2025: [6648, 8940, 12895, 19408], aug2026: [6983, 9174, 13117, 19940] },
  { name: 'Real Estate Services', fs: false, aug2025: [5746, 9217, 8730, 18387], aug2026: [5902, 10055, 8730, 19341] },
  { name: 'Retail Trade', fs: false, aug2025: [5247, 7426, 7113, 12077], aug2026: [5131, 6830, 7488, 11860] },
  { name: 'Utilities & Other Goods Producing Industries', fs: false, aug2025: [5909, 8855, 11322, 18370], aug2026: [6088, 9049, 11671, 18933] },
  { name: 'Wholesale Trade', fs: false, aug2025: [5749, 8511, 10697, 20094], aug2026: [5904, 8530, 11340, 21244] },
];

export const DEFAULT_SECTOR = 'Professional Services';
