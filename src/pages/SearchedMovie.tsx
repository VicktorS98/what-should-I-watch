import { useQuery } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Movie from "../components/Movie/Movie"
import SearchMovie from "../services/SearchMovie"

export default function SearchedMovie() {

  let params = useParams()

  const movie = useQuery(["indivMovie", params.id], () => SearchMovie(params.id))


  if (movie.isLoading) {
    return <p>Loading</p>
  }

  if (movie.isError) {
    return <p>Error</p>
  }

  return (
    <div>
      <Movie movie={movie.data} />
    </div>
  )
};