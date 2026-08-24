declare module 'malayalam-panchangam' {
  export interface PanchangOptions {
    lat?: number
    lon?: number
  }

  export interface MalayalamDateDetails {
    month: string
    date: number
    year: number
  }

  export interface NakshatraDetails {
    name: string
    start?: string
    end?: string
    prev?: string
    next?: string
    pada?: number
    progress?: number
  }

  export interface PanchangResult {
    Malayalam: MalayalamDateDetails
    Nakshatra: NakshatraDetails
    Vishesham?: string[]
  }

  export interface PanchangUpcomingEvent {
    date: string
    name: string
    details: PanchangResult
  }

  export class Panchang {
    calculate(date: Date, options?: PanchangOptions): PanchangResult
    findUpcomingEvents(startDate?: Date, limit?: number): PanchangUpcomingEvent[]
  }
}

