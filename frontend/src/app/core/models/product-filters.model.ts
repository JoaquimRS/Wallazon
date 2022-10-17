export interface ProductFilters {
    category?: string | null,
    search?:string,
    condition?: string[],
    order?:string[],
    limit: number,
    offset: number
}