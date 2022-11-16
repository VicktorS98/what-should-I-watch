import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import styles from "../styles/Quiz.module.scss";
import { discoverMovieEP } from "../config/endpoints";
import quizSearch from "../services/quizSearch";
import genreID from "../utils/genreID";
import IQuizData from "../interfaces/IQuizData";

export default function Quiz() {
  const [genreNumber, setGenreNumber] = useState<undefined | number>(undefined);
  const [sortBy, setSortBy] = useState<undefined | string>(undefined);
  
  // rating starts as an empty string because it might not be selected and if passed to the fetch as "undefined" it might break it
  const [rating, setRating] = useState<string>("")
  const [quizData, setQuizData] = useState<undefined | IQuizData>(undefined);

  function pickGenre(e: React.MouseEvent<HTMLButtonElement>) {
    setGenreNumber(genreID(e.currentTarget.innerHTML));
  }
  function pickRevenue(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget.innerHTML === "Popularity") {
      setSortBy("popularity.desc");
    } else if (e.currentTarget.innerHTML === "Vote Average") {
      setSortBy("vote_average.desc");
    } else {
      setSortBy("revenue.desc");
    }
  }
  function pickRating(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget.innerHTML === "Yes") {
      setRating("&vote_count.gte=10")
    } else {
      setRating("")
    }
  }

  function submitQuiz() {
    if (genreNumber !== undefined && sortBy !== undefined) {
      setQuizData({
        genreNumber: genreNumber,
        sortBy: sortBy,
        rating: rating
      })
    }
  }

  const genres = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"];
  const sortCategories = ["Popularity", "Revenue", "Vote Average"];

  // function to fetch data once all of it is entered
  const movie = useQuery(["movieQuery", quizData], () => quizSearch(quizData), {
    enabled: !!quizData
  });

  if (movie.isLoading) {
    console.log("loading");
  }
  if (movie.isError) {
    console.log("error");
  }

  console.log(quizData)

  return (
    <div className={styles.quizContainer}>
      <div className={styles.chooseGenre}>
        <p>Choose a genre:</p>
        {genres.map((genre) =>
          <button key={genre} onClick={pickGenre}>{genre}</button>
        )}
      </div>
      <div className={styles.sortBy}>
        <p>Sort movies by:</p>
        {sortCategories.map((category) => <button key={category} onClick={pickRevenue}>{category}</button>)}
      </div>
      {sortBy === "vote_average.desc" && <div className={styles.onlyBest}>
        <p>Search for top rated movies?</p>
        <button onClick={pickRating}>Yes</button>
        <button onClick={pickRating}>No</button>
      </div>}
      <button onClick={submitQuiz}>Submit</button>
    </div>
  );
};