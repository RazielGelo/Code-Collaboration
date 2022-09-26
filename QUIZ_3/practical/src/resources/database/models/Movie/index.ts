import Movie from "@/interfaces/Movie";
import mongoose, { model, models, Schema, Types } from "mongoose";

const movieSchema = new Schema(
    {
        movieName: String,
        description: String,
        casts: String,
        rating: Number,
        category: String,
        filePath: {
            type: String,
            required: false
        }
    }
)
export const Model = mongoose.models.Movie as mongoose.Model<Movie> || model<Movie>('Movie', movieSchema);