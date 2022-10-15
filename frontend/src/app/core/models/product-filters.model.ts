export interface ProductFilters {
    category?: string | null,
    condition?: string[],
    order?:string[],
    limit: number,
    offset: number
}