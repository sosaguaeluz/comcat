type Charts = {
    month: string,
    value: number
}

type Regions = {
    region: string,
    value: number
}

type LineCharts = {
    name: string,
    total: number,
    charts: Charts[]
}

type AnualLineCharts = {
    month: string,
    value: number,
    regions: Regions[]
}

type AnualUsers = {
    total: number,
    monthly: number
}

export interface IDashboardUser {
    total: number,
    new_today: number,
    active_today: number,
    inactive_today: number,
    line_charts: LineCharts[],
    annual_line_charts: AnualLineCharts[],
    annual_users: AnualUsers
}