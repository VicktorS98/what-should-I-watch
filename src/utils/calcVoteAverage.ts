export default function calcVoteAverage(num: number) {
  const roundToOne = Math.round(num * 10) / 10;
  const removedDot = parseInt(roundToOne.toString().replace(".", ""))
  return removedDot
}