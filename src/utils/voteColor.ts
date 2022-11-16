export default function voteColor(vote: number) {
  if (vote === 0) {
    return "white"
  }
  else if (vote <= 40) {
    return "red"
  } 
  else if (vote > 40 && vote < 70) {
    return "yellow"
  } 
  else if (vote >= 70 && vote <= 85) {
    return "#2ab53c"
  }
  else if (vote > 85) {
    return "#0d6619"
  }
}