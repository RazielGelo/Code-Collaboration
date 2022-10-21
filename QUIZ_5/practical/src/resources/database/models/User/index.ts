import User from "@/interfaces/User";
import mongoose, {Schema, model} from "mongoose";

const userSchema = new Schema<User>(
    {    
        // Email of the user
        email: {
            type: String,
            required: true,
            unique: true
        },
        // Password of the user
        password: {
            type: String,
            required: true,
        },
        // Minions string array added by the user
        minions: [String]
    }
)

export const Model = mongoose.models.userboss as mongoose.Model<User> || model<User>('userboss', userSchema);