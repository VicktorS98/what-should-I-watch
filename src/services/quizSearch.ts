import { discoverMovieEP } from "../config/endpoints";
import IQuizData from "../interfaces/IQuizData";

export default async function quizSearch(quizData: undefined | IQuizData): Promise<string> {
  const fetchURL = `${discoverMovieEP}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=${quizData?.sortBy}&include_adult=false&with_genres=${quizData?.genreNumber}${quizData?.rating}`;
  console.log(fetchURL);
  const response = await fetch(fetchURL);
  const data = await response.json();
  console.log(data);
  return fetchURL;
}