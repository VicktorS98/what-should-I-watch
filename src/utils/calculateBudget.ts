export default function calculateBudget(budget: number) {
  // Nine Zeroes for Billions
  return Math.abs(Number(budget)) >= 1.0e+9

  ? (Math.abs(Number(budget)) / 1.0e+9).toFixed(1) + "B"
  // Six Zeroes for Millions 
  : Math.abs(Number(budget)) >= 1.0e+6

  ? (Math.abs(Number(budget)) / 1.0e+6).toFixed(1) + "M"
  // Three Zeroes for Thousands
  : Math.abs(Number(budget)) >= 1.0e+3

  ? (Math.abs(Number(budget)) / 1.0e+3).toFixed(0) + "K"

  : Math.abs(Number(budget));
}