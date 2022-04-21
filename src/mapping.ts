import {
  TakerAsk,
  TakerBid
} from "../generated/LooksRareExchange/LooksRareExchange"
import { getOrCreateCollection, createSale } from "./helpers"

export function handleTakerAsk(event: TakerAsk): void {
  const collection = getOrCreateCollection(event.params.collection)
  const saleID = event.params.orderHash.toHex()
  createSale(saleID, event.params.taker, event.params.maker, false, event.params.currency, collection, event.params.tokenId, event.params.amount, event.params.price, event.block.timestamp)
}

export function handleTakerBid(event: TakerBid): void {
  const collection = getOrCreateCollection(event.params.collection)
  const saleID = event.params.orderHash.toHex()
  createSale(saleID, event.params.maker, event.params.taker, true, event.params.currency, collection, event.params.tokenId, event.params.amount, event.params.price, event.block.timestamp)
}