
export interface IMovieInfo {
  title: string
  poster_path: string
  overview: string
  genres: Array<{
    id: number,
    name: string
  }>
  budget: number
  release_date: string
  runtime: number
  vote_average: number
}