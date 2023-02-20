import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { Movie, IMovie } from "../models/IMovie";

export class MoviesRepository {
    private static _instance: MoviesRepository;

    private constructor() {
        mongoose.set('strictQuery', true);
        dotenv.config();
        const connectionString = process.env.DATABASE_URL || ".";
        mongoose.connect(connectionString);
        const database = mongoose.connection;
        database.once('connected', () => {
            console.log('Database Connected');
        })
    }

    public static Create = () => {
        return this._instance || (this._instance = new MoviesRepository());
    };

    GetMovie = async (id: string) => {
        return await Movie.findById(id).select('-__v');
    }

    GetMovies = async () => {
        const movies = await Movie.find().select('-__v');
        return movies;
    }

    CreateMovie = async (movie: IMovie) => {
        const document = new Movie(movie);
        document.save();
        return document.id as string;
    }

    UpdateMovie = async (id: string, updatedMovie: IMovie) => {
        await Movie.findByIdAndUpdate(
            id, updatedMovie
        );
    }

    DeleteMovie = async (id: string) => {
        await Movie.findByIdAndDelete(id);
    }
}
