import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Collection, Sale } from "../generated/schema";

export function getOrCreateCollection(address: Address): Collection {
    const collectionAddress = address.toHex()
    let collection = Collection.load(collectionAddress)
    if(!collection){
        collection = new Collection(collectionAddress)
        collection.save
    }
    return collection
}

export function createSale(
    saleID: string, 
    buyer: Address, 
    seller: Address, 
    takerBid: boolean, 
    currency: Address, 
    collection: Collection, 
    tokenID: BigInt, 
    amount: BigInt,
    price: BigInt, 
    timestamp: BigInt
): void {
    let sale = new Sale(saleID)
    sale.buyer = buyer.toHex()
    sale.seller = seller.toHex()
    sale.takerBid = takerBid
    sale.currency = currency
    sale.collection = collection.id
    sale.tokenID = tokenID
    sale.amount = amount
    sale.price = price
    sale.timestamp = timestamp
    sale.save()
}