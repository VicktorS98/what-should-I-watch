import { movieEP } from "../config/endpoints";
import { IMovieInfo } from "../interfaces/IMovieInfo";

export default async function SearchIndivMovie(id: undefined | number | string): Promise<IMovieInfo> {

  const responseMovie = await fetch(`${movieEP}/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
  if (responseMovie.status === 404) {
    throw new Error
  }
  const data = await responseMovie.json()
  const movieData: IMovieInfo = {
    title: data.title,
    poster_path: data.poster_path,
    overview: data.overview,
    genres: data.genres,
    budget: data.budget,
    release_date: data.release_date,
    runtime: data.runtime,
    vote_average: data.vote_average
  }
  await new Promise(resolve => setTimeout(resolve, 1000))
  return movieData
}