import User from '@/interfaces/User';
import mongoose, { Schema, model, models } from 'mongoose';
import Movie from '@/interfaces/Movie';

const userSchema = new Schema(
    {
        username: String,
        password: String,
    }
)

export const Model = mongoose.models.User as mongoose.Model<User> || model<User>('User', userSchema);