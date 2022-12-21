type Service = {
    name: string,
    value: number
}

export type LineCharts = {
    name: string,
    total: number,
    charts: {
        month: string,
        value: 0
    }[]
}

type GenderCharts = {
    name: string,
    total: number,
    charts: {
        total: number,
        genre: string,
        percent: number
    }[]
}

type BreedCharts = {
    name: string,
    total: number,
    charts: {
        total: number,
        percent: number,
        breed:string 
    }
}

type AnnualOccurrences = {
    year: string,
    total: number,
    monthly_rate: number
}

type AnnualCharts = {
    month: string,
    value: number,
    services: Service[]
}

export interface IDashboardOccureecen {
    total: number,
    last_seven_days: number,
	new_today: number,
	approved_today: number,
	disapproved_today: number,
    line_charts: LineCharts[],
    gender_charts: GenderCharts[],
    breed_charts: BreedCharts[],
    annuel_charts: AnnualCharts[],
    annual_occurrences: AnnualOccurrences
}