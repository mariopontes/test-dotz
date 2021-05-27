export interface Order {
    userId: string,
    product: string,
    address: string,
    status: string,
    priceProduct: number,
    createdAt?: string,
}