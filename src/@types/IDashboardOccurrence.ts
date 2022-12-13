type Services = {
    id: string,
    createdAt: string,
    updatedAt: string,
    name: string,
    image: string,
    background_color: string,
    active: boolean,
    other_option: boolean
}

type Service = {
    month: string,
    service: Services[]
}

type Monthly = {
    month: string,
    total: number,
    services: Service[]
}

type AnnualOccurrences = {
    year: string,
    total: number,
    monthly_rate: number,
    monthly: Monthly
}

type BreedChart = {
    yellow: number,
    white: number,
    indigenous: number,
    brown: number,
    black: number
}

type GenreChart = {
	male: number,
    female: number,
    nonbinary: number,
    others: number
}

type LineCharts = {
    service: Services,
    value: number,
    breed_chart: BreedChart,
    genre_chart: GenreChart
}

type GenreSummary = {
    total: number,
    name: string,
    percent: number
}

type BreedSummary = {
    total: number,
    name: string,
    percent: number
}

export interface IDashboardOccureecen {
    total: number,
	new_today: number,
	approved_today: number,
	disapproved_today: number,
    breed_summary: BreedSummary[],
    genre_summary: GenreSummary[],
    line_charts: LineCharts[],
    annual_occurrences: AnnualOccurrences
}