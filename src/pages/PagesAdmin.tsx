import React from "react"
import { Route, Routes } from "react-router-dom"
import Quiz from "./Quiz"
import RandomMovie from "./RandomMovie"
import Home from "./Home"
import SearchedMovie from "./SearchedMovie"

export default function PagesAdmin() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/RandomMovie" element={<RandomMovie />} />
      <Route path="/Quiz" element={<Quiz />} />
      <Route path="/SearchedMovie/:id" element={<SearchedMovie />} />
    </Routes>
  )
};