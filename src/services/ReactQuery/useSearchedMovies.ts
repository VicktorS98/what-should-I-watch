import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { searchMovieEP } from "../../config/endpoints"
import ISearchBarMovies from "../../interfaces/ISearchBarMovies"

export interface MovieResult {
  poster_path?: string
  adult?: boolean
  overview?: string
  release_date?: string
  genre_ids?: Array<number>
  id?: number
  media_type: 'movie'
  original_title?: string
  original_language?: string
  title?: string
  backdrop_path?: string
  popularity: number
  vote_count: number
  video?: boolean
  vote_average: number
}

export interface PaginatedResponse {
  page?: number
  total_results?: number
  total_pages?: number
  results: MovieResult[]
}


async function fetchSearchedMovies(name: string): Promise<ISearchBarMovies[]> {
  const response = await fetch(`${searchMovieEP}?api_key=a062aa4753fa5adf7dfabcabdc159b5f&query=${name}`)
  const movies : PaginatedResponse = await response.json() 
  if (response.status === 422) {
    throw new Error
  }
  const moviesByPopularity = movies.results.sort((a,b) => {
    if (b.vote_count > 100 && a.vote_count > 100){
      return b.vote_average - a.vote_average
    } else {
      return b.vote_count - a.vote_count
    }
  })
  const firstFive =  moviesByPopularity.slice(0, 5)
  const mostRelevant: ISearchBarMovies[] = firstFive.map(movie => {
    return {
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      id: movie.id
    }
  })

  return mostRelevant
}


type QueryOption = Omit<UseQueryOptions<ISearchBarMovies[], unknown, ISearchBarMovies[], string[]>, "initialData" | "queryFn" | "queryKey"> & { initialData?: (() => undefined) | undefined; }

export default function useSearchedMovies(name: string, queryOption?: QueryOption) {
  return useQuery(
    ["movie", name],
    () => fetchSearchedMovies(name),
    queryOption)
}