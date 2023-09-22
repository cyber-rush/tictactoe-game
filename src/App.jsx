import { useState } from "react"
import Board from './components/Board'
import { calculateWinner } from "./winner"
import StatusMessage from "./components/StatusMessage"


function App() {
  const [squares, setSquares] = useState(Array(9).fill(null))  // Square is an empty array with initial null values
  const [isXNext, setIsXNext] = useState(false) //As there are only 2 players -->if false --> 'O' else 'X'

  const winner = calculateWinner(squares)

  const handleSquareClick = (clickedPosition) => {

    if (squares[clickedPosition] || winner) { //If the square is already ticked then don't do anything OR the winner is achieved
      return
    }

    setSquares(currentSquare => {
      return currentSquare.map((squareValue, position) => {
        if (clickedPosition === position) {
          return isXNext ? 'X' : 'O';
        }
        return squareValue
      })
    })

    setIsXNext(currentIsXNext => !currentIsXNext)
  }
  return (<div className='app'>
    <StatusMessage winner={winner} isXNext={isXNext} squares={squares} />
    <Board squares={squares} handleSquareClick={handleSquareClick} />
  </div>
  )


}

export default App
