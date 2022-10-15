export interface ProductFilters {
    category?: string,
    condition?: string[],
    order?: string[],
    limit: number,
    offset: number
}