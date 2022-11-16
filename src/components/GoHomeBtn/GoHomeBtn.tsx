import { useLocation, useNavigate } from "react-router-dom"
import styles from "./GoHomeBtn.module.scss"

export default function GoHome() {

  const navigate = useNavigate()
  let location = useLocation()

  function goHome() {
    navigate("/")
  }

  return (
    <>
      {location.pathname !== "/" && <button className={styles.goHomeBtn} onClick={goHome}>
        <i className="fa fa-home"></i>
      </button>}
    </>
  )
};