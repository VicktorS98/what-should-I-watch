import styles from "../styles/SearchBar.module.scss"
import { Combobox, ComboboxPopover, useComboboxState, ComboboxItem, ComboboxOptions } from "ariakit/combobox";
import React, { useState } from "react"
import { Link } from "react-router-dom";
import useSearchedMovies from "../services/ReactQuery/useSearchedMovies";

export default function SearchBar() {

  const [input, setInput] = useState<string>("");
  const combobox = useComboboxState({ sameWidth: true, gutter: 8, animated: true });

  /** Pongo "NO" porque si input es undefined, igual tiene que ir algún string
   * por Typescript. Nunca se va a mandar "NO" al buscador igual porque el enabled
   * se encarga de eso, pero como no hay comunicación con el enabled para saberlo,
   * necesito decírselo a TS
   */
  const movies = useSearchedMovies(input ?? 'NO', {
    retry: 0,
    onError: () => {
      console.log("Hubo un error buscando la película")
    },
    keepPreviousData: true,
    enabled: !!input
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
  }

  if (movies.isError){
    return <p>Something failed...</p>
  }

  const comboboxIsFocused = document.activeElement === document.getElementById("combobox")

  return (
    <>
      <Combobox
        id="combobox"
        state={combobox}
        placeholder="e.g.: Shrek"
        onChange={handleChange}
        className={styles.combobox}
        autoFocus
      />
      {input.length > 0 && <ComboboxPopover className={comboboxIsFocused ? styles.popover : `${styles.popover} ${styles.opacityZero}`} state={combobox}>
        {movies.data && movies.data.length > 0 ? movies.data.map(movie => {
          return (
            <ComboboxItem key={movie.id} className={styles.comboboxItem} value={movie.title}>
              <Link to={`/SearchedMovie/${movie.id}`} className={styles.link}>
                {movie.title}
              </Link>
            </ComboboxItem>
          )
        }) : <p>Movie not found</p>
        }
      </ComboboxPopover>}
    </>
  )
};   