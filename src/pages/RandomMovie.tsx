import React, { useState } from "react"
import styles from "../styles/RandomMovie.module.scss"
import useMovie from "../services/ReactQuery/useMovie"
import Movie from "../components/Movie/Movie"

export default function RandomMovie() {

  const [randomNumber, setRandomNumber] = useState(Math.ceil(Math.random() * 200000))

  const movie = useMovie(randomNumber, {
    retry: 0,
    onError: () => {
      setRandomNumber(Math.ceil(Math.random() * 200000))
    }
  })

  if (movie.isLoading) {
    return <p>Loading</p>
  }

  if (movie.isError) {
    return null
  }

  /* console.log(movie.data) */

  return (
    <div className={styles.randomMovieContainer}>
      <button className={styles.randomizeBtn} onClick={() => setRandomNumber(Math.ceil(Math.random() * 200000))}>
        Refresh
        <i className="fa fa-refresh"></i>
      </button>
      <Movie movie={movie.data} />
    </div>
  )
};