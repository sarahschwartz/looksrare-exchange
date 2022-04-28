import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Collection, Sale, Account } from "../generated/schema";
import { integer } from '@protofire/subgraph-toolkit'

export function getOrCreateCollection(address: Address): Collection {
    const collectionAddress = address.toHex()
    let collection = Collection.load(collectionAddress)
    if(collection == null){
        collection = new Collection(collectionAddress)
        collection.totalTransactions = integer.ONE
        collection.save()
    } else{
        collection.totalTransactions = integer.increment(collection.totalTransactions)
        collection.save()
    }
    return collection
}

export function getOrCreateAccount(address: Address): Account {
    const accountAddress = address.toHex()
    let account = Account.load(accountAddress)
    if(account == null){
        account = new Account(accountAddress)
        account.save()
    }
    return account
}

export function createSale(
    saleID: string, 
    buyer: Account, 
    seller: Account, 
    takerBid: boolean, 
    currency: Address, 
    collection: Collection, 
    tokenID: BigInt, 
    amount: BigInt,
    price: BigInt, 
    timestamp: BigInt
): void {
    let sale = new Sale(saleID)
    sale.buyer = buyer.id
    sale.seller = seller.id
    sale.takerBid = takerBid
    sale.currency = currency
    sale.collection = collection.id
    sale.tokenID = tokenID
    sale.amount = amount
    sale.price = price
    sale.timestamp = timestamp
    sale.save()
}
