import {
  TakerAsk,
  TakerBid
} from "../generated/LooksRareExchange/LooksRareExchange"
import { getOrCreateCollection, createSale, getOrCreateAccount } from "./helpers"

export function handleTakerAsk(event: TakerAsk): void {
  const collection = getOrCreateCollection(event.params.collection)
  const saleID = event.params.orderHash.toHex()
  const seller = getOrCreateAccount(event.params.maker)
  const buyer = getOrCreateAccount(event.params.taker)
  createSale(saleID, buyer, seller, false, event.params.currency, collection, event.params.tokenId, event.params.amount, event.params.price, event.block.timestamp)
}

export function handleTakerBid(event: TakerBid): void {
  const collection = getOrCreateCollection(event.params.collection)
  const saleID = event.params.orderHash.toHex()
  const buyer = getOrCreateAccount(event.params.maker)
  const seller = getOrCreateAccount(event.params.taker)
  createSale(saleID, buyer, seller, true, event.params.currency, collection, event.params.tokenId, event.params.amount, event.params.price, event.block.timestamp)
}