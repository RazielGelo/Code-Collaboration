import User from '@/interfaces/User'
import Card from '@/interfaces/Cards'
import mongoose, {Schema, model} from 'mongoose'

const userSchema = new Schema<User>(
    {
        email: String,
        password: String,
        cards: Array<Card>
    }
)
export const Model = mongoose.models.User as mongoose.Model<User> || model<User>('User', userSchema);