// ─── Committee Data ──────────────────────────────────────────────────────────
// To update: edit the name/role fields below and commit the file.
// No other changes needed — the page rebuilds automatically on Vercel.

export interface CommitteeMember {
  name: string
  role: string
  type: 'executive' | 'member' | 'deputy'
}

// Executive board — shown prominently at the top
export const executiveMembers: CommitteeMember[] = [
  { name: 'Suku Thomas', role: 'Styreleder', type: 'executive' },
  { name: 'Jeena KB', role: 'Nesteleder', type: 'executive' }
]

// General committee members
export const generalMembers: CommitteeMember[] = [
  { name: 'Maju P. Jose', role: 'Committee Member', type: 'member' },
  { name: 'Dipin Nirappil', role: 'Committee Member', type: 'member' },
  { name: 'Jestin Jose', role: 'Committee Member', type: 'member' },
  { name: 'Sandhya Rex', role: 'Committee Member', type: 'member' },
  { name: 'Jithisha Nair', role: 'Committee Member', type: 'member' },
  { name: 'Priya John', role: 'Committee Member', type: 'member' },
]

// Committee terms are displayed as a year range and roll over automatically.
// The default rollover is July to keep the current 2025/2026 label through the first half of 2026.
const COMMITTEE_TERM_ROLLOVER_MONTH = 6 // July (0-based month index)

export function getCommitteeTermLabel(date = new Date()): string {
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth()
  const startYear = month >= COMMITTEE_TERM_ROLLOVER_MONTH ? year : year - 1

  return `${startYear}/${startYear + 1}`
}

// // Deputy / substitute members (optional — remove array entries if not needed)
// export const deputyMembers: CommitteeMember[] = [
//   { name: 'Placeholder Name', role: 'Deputy Member', type: 'deputy' },
//   { name: 'Placeholder Name', role: 'Deputy Member', type: 'deputy' },
// ]

// Helper: get initials from full name (e.g. "Arjun Nair" → "AN")
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('')
}
