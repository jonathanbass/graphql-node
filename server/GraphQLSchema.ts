import { MoviesRepository } from "./clients/MoviesRepository";
import { IMovie } from "./models/IMovie";

interface IId {
    id: string;
}

interface IMovieInput {
    movie: IMovie
}

export const typeDefs = `#graphql
type Movie {
    id: String!
    title: String!
    year: Int!
    runtime: Int!
    genre: [String]
    cast: [String]
}
input MovieInput {
    id: String
    title: String!
    year: Int!
    runtime: Int!
    genre: [String]
    cast: [String]
}
type Query {
    getMovies: [Movie]
    getMovie(id: String!): Movie
}
type Mutation {
    updateMovie(movie: MovieInput!): Movie
    createMovie(movie: MovieInput!): String
    deleteMovie(id: String!): String
}`;

const moviesRepository = MoviesRepository.Create();

export const resolvers = {
    Query: {
        getMovies: async () => {
            return await moviesRepository.GetMovies();
        },
        getMovie: async (_: IMovie, args: IId) => {
            return await moviesRepository.GetMovie(args.id);
        }
    },

    Mutation: {
        updateMovie: async (_: IMovie, args: IMovieInput) => {
            await moviesRepository.UpdateMovie(args.movie.id, args.movie)
            return await await moviesRepository.GetMovie(args.movie.id);;
        },
        createMovie: async (_: IMovie, args: IMovieInput) => {
            return await moviesRepository.CreateMovie(args.movie);
        },
        deleteMovie: async (_: IMovie, args: IId) => {
            await moviesRepository.DeleteMovie(args.id);
            return `Movie with Id '${args.id}' successfully deleted.`;
        }
    }
};
