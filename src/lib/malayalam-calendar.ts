import 'server-only'
import type { Panchang, PanchangResult } from 'malayalam-panchangam'
import type { Locale } from '@/lib/i18n'

const KERALA_TIME_ZONE = 'Asia/Kolkata'
const KERALA_UTC_OFFSET = '+05:30'
const KERALA_LOCATION = {
  lat: 10.8505,
  lon: 76.2711,
} as const

const malayalamMonthTransliterations: Record<string, string> = {
  'ചിങ്ങം': 'Chingam',
  'കന്നി': 'Kanni',
  'തുലാം': 'Thulam',
  'വൃശ്ചികം': 'Vrischikam',
  'ധനു': 'Dhanu',
  'മകരം': 'Makaram',
  'കുംഭം': 'Kumbham',
  'മീനം': 'Meenam',
  'മേടം': 'Medam',
  'ഇടവം': 'Edavam',
  'മിഥുനം': 'Mithunam',
  'കർക്കിടകം': 'Karkidakam',
}

const nakshatraTransliterations: Record<string, string> = {
  'അശ്വതി': 'Ashwathi',
  'ഭരണി': 'Bharani',
  'കാർത്തിക': 'Karthika',
  'രോഹിണി': 'Rohini',
  'മകയിരം': 'Makayiram',
  'തിരുവാതിര': 'Thiruvathira',
  'പുണർതം': 'Punartham',
  'പൂയം': 'Pooyam',
  'ആയില്യം': 'Ayilyam',
  'മകം': 'Makam',
  'പൂരം': 'Pooram',
  'ഉത്രം': 'Uthram',
  'അത്തം': 'Atham',
  'ചിത്തിര': 'Chithira',
  'ചോതി': 'Chothi',
  'വിശാഖം': 'Vishakham',
  'അനിഴം': 'Anizham',
  'തൃക്കേട്ട': 'Thrikketta',
  'മൂലം': 'Moolam',
  'പൂരാടം': 'Pooradam',
  'ഉത്രാടം': 'Uthradam',
  'തിരുവോണം': 'Thiruvonam',
  'അവിട്ടം': 'Avittam',
  'ചതയം': 'Chathayam',
  'പൂരുരുട്ടാതി': 'Pooruruttathi',
  'ഉത്രട്ടാതി': 'Uthrattathi',
  'രേവതി': 'Revathi',
}

function loadPanchangModule(): { Panchang: new () => Panchang } {
  const runtimeRequire = eval('require') as NodeJS.Require
  return runtimeRequire('malayalam-panchangam') as { Panchang: new () => Panchang }
}

function createPanchangInstance(): Panchang | null {
  try {
    const { Panchang: PanchangRuntime } = loadPanchangModule()
    return new PanchangRuntime()
  } catch {
    return null
  }
}

const panchang = createPanchangInstance()

export interface MalayalamCalendarDay {
  gregorianDate: Date
  monthMalayalam: string
  monthEnglish: string
  day: number
  year: number
  nakshatraMalayalam: string
  nakshatraEnglish: string
}

function getNowInKerala(): Date {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: KERALA_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const parts = Object.fromEntries(
    formatter
      .formatToParts(new Date())
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value])
  ) as Record<'year' | 'month' | 'day' | 'hour' | 'minute' | 'second', string>

  return new Date(`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}${KERALA_UTC_OFFSET}`)
}

function transliterateMalayalamMonth(monthMalayalam: string): string {
  return malayalamMonthTransliterations[monthMalayalam] ?? monthMalayalam
}

function transliterateNakshatra(nameMalayalam: string): string {
  return nakshatraTransliterations[nameMalayalam] ?? nameMalayalam
}

function normalizeDay(result: PanchangResult, gregorianDate: Date): MalayalamCalendarDay {
  return {
    gregorianDate,
    monthMalayalam: result.Malayalam.month,
    monthEnglish: transliterateMalayalamMonth(result.Malayalam.month),
    day: result.Malayalam.date,
    year: result.Malayalam.year,
    nakshatraMalayalam: result.Nakshatra.name,
    nakshatraEnglish: transliterateNakshatra(result.Nakshatra.name),
  }
}

export function getTodayMalayalamCalendar(referenceDate = getNowInKerala()): MalayalamCalendarDay | null {
  if (!panchang) {
    return null
  }

  return normalizeDay(panchang.calculate(referenceDate, KERALA_LOCATION), referenceDate)
}

export function formatMalayalamCalendarDate(
  day: MalayalamCalendarDay,
  locale: Locale,
  options?: { includeYear?: boolean }
): string {
  const includeYear = options?.includeYear ?? true

  if (locale === 'ml') {
    return includeYear
      ? `${day.monthMalayalam} ${day.day}, ${day.year}`
      : `${day.monthMalayalam} ${day.day}`
  }

  return includeYear
    ? `${day.day} ${day.monthEnglish} ${day.year}`
    : `${day.day} ${day.monthEnglish}`
}

export function getLocalizedNakshatra(day: MalayalamCalendarDay, locale: Locale): string {
  return locale === 'ml' ? day.nakshatraMalayalam : day.nakshatraEnglish
}


