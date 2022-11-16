import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { IMovieInfo } from "../../interfaces/IMovieInfo";
import SearchMovie from "../SearchMovie"

type QueryOption = Omit<UseQueryOptions<IMovieInfo, unknown, IMovieInfo, (string | number)[]>, "initialData" | "queryFn" | "queryKey"> & { initialData?: (() => undefined) | undefined; }

/**
 * 
 * @param id código de película
 * @param queryOption Opciones de React-Query
 * @returns Los datos de una película usando la API The-Movie-Database @url (api.themoviedb.org)
 */
function useMovie(id: number, queryOption? :QueryOption){
  return useQuery(
    ["movie", id],
    () => SearchMovie(id),
    queryOption)
}

export default useMovie