import styles from "./Movie.module.scss"
import { IMovieInfo } from "../../interfaces/IMovieInfo"
import calculateBudget from "../../utils/calculateBudget"
import calcVoteAverage from "../../utils/calcVoteAverage"
import voteColor from "../../utils/voteColor"

interface IMovie {
  movie: IMovieInfo
}

export default function Movie({ movie }: IMovie) {

  const vote = calcVoteAverage(movie.vote_average);

  return (
    <>
      <div className={styles.posterAndInfo}>
        <div className={styles.imgDiv}>
          <img className={styles.posterImg} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
          <p className={styles.voteAverage} style={{ borderColor: voteColor(vote) }}>
            {vote}%
          </p>
        </div>
        <div className={styles.movieInfoContainer}>
          <p>
            <span>Title: </span>
            {movie.title}
          </p>
          
          <div className={styles.genres}>
            <span>Genres: </span>
            <ul>
              {movie.genres.map((genre, i) => <li key={i}>{genre.name}</li>)}
            </ul>
          </div>

          {movie.budget === 0 ?
            <p><span>Budget: </span>unknown</p> :
            <p><span>Budget: </span>{calculateBudget(movie.budget)}</p>
          }

          <p>
            <span>Release Date: </span>
            {movie.release_date}
          </p>

          {movie.runtime === 0 ?
            <p><span>Runtime: </span>unknown</p> :
            <p><span>Runtime: </span>{movie.runtime}min</p>
          }
        </div>
      </div>
      <p className={styles.plot}>
        {/* <span>Plot: </span> */}
        {movie.overview}
      </p>
    </>
  )
};