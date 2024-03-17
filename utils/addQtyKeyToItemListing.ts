export function addQtyKeyToItemListing(items: any) {
    return items.map((itemEle: any) => (
        {
            ...itemEle,
            qty: 0,
        }
    ))
}