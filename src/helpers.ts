import { baseUrl } from "./redux/reducer"

export function formatPrice(price: number) {
    const internationalNumberFormat = new Intl.NumberFormat("en-US")
    return internationalNumberFormat.format(price)
}

export function ratingsArray(rating: number) {
    let ratingArray = []
    for (let i = 0; i < rating; i++) {
        ratingArray.push(i)
    }
    return ratingArray
}
