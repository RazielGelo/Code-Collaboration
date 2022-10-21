import Minion from "@/interfaces/Minion"
import mongoose, {Schema, model} from "mongoose";

const minionSchema = new Schema<Minion>(
    {
        // Name of the minion
        name: String,
        // Skills of the minion
        skills: String,
        // Personality of the minion
        personality: String,
        // Email of the minion
        email: String,
        // Phone of the minion
        phone: String,
        // Description of the minion
        description: String,
        // Image of the minion
        image: String
    }
)

export const Model = mongoose.models.User as mongoose.Model<Minion> || model<Minion>('minion', minionSchema);