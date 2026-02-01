import { useState } from "react";

export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue)

  // Tăng
  const increment = () => {
    setCount(val => val + 1)
  }
  // giảm không âm
  const decremnt = () => {
    setCount(val => Math.max(val - 1, 0))
  }
  // Reset
  const reset = () => {
    setCount(initialValue)
  }

  return {
    count,
    increment,
    decremnt,
    reset
  }

}