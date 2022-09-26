// import { Types } from 'mongoose';
// import Database from '@/resources/database';
// import Movie from '@/interfaces/Movie';
// import { Model as MovieModel} from '@/resources/database/models/MovieArray';
// import { MovieArray } from '@/interfaces/MovieArray';

// export async function createMovieArray(userId: Types.ObjectId | string) {
//     await Database.setUpClient(process.env.MONGODB_URI);
//     const movie: Movie[] = [];
//     const movieArray = new MovieModel (
//         {
//             userId,
//             movie
//         }
//     );

//     await movieArray.save();

//     return {
//         code: 200,
//         message: 'Movie array has been created succesfully'
//     }
// }