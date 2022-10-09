import Card from '@/interfaces/Cards'
import mongoose, {Schema, model} from 'mongoose'

const cardSchema = new Schema<Card>(
    {
        userEmail: String,
        cardName: String,
        cardType: String,
        SerialNumber: String,
        cardImage: String
    }
)
export const Model = mongoose.models.Card as mongoose.Model<Card> || model<Card>('Snake', cardSchema);