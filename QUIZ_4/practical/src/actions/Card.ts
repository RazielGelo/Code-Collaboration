import Database from '@/resources/database'
import User from '@/interfaces/User'
import Card from '@/interfaces/Cards'
import {Model as CardModel} from '@/resources/database/models/Card'


export async function getCards() {
    await Database.setup(process.env.MONGODB_URI)

    const cards = await CardModel.find({})

    return cards
}

export async function createCard(card: Card, user: User) {


    const {id, cardName, cardType, serialNumber, cardImage} = card;

    await Database.setup(process.env.MONGODB_URI)

    const cardDoc = new CardModel<Card>(card)

    return cardDoc.save();
}