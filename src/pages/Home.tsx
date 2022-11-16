import React from "react"
import { useNavigate } from "react-router-dom"

export default function Home() {

  const navigate = useNavigate()

  function goToRandomMovie() {
    navigate("/RandomMovie")
  }

  function goToQuestionnaire() {
    navigate("/Quiz")
  }

  return (
    <div>
      <button style={{marginTop: "10rem"}} onClick={goToRandomMovie}>RandomMovie</button>
      <button onClick={goToQuestionnaire}>Take a quiz!</button>
    </div>
  )
};