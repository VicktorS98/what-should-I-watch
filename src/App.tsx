import { useState, useEffect } from 'react'
import "./styles/globals.scss"
import styles from "./styles/App.module.scss"
import SearchBar from "./components/SearchBar"
import PagesAdmin from "./pages/PagesAdmin"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import GoHome from "./components/GoHomeBtn/GoHomeBtn"

function App() {

  /* import.meta.env.VITE_API_KEY */
  /* https://image.tmdb.org/t/p/original/[poster_path] */
  /* https://api.themoviedb.org/3/search/movie?api_key=a062aa4753fa5adf7dfabcabdc159b5f&query=fight+club */

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <div className={styles.appContainer}>
      <QueryClientProvider client={queryClient}>
        <SearchBar />
        <GoHome />
        <PagesAdmin />
      </QueryClientProvider>
    </div>
  )
}

export default App
