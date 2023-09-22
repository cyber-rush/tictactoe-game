import { useState } from "react"
import Board from './components/Board'
import { calculateWinner } from "./winner"
import StatusMessage from "./components/StatusMessage"
import History from "./components/History"

const NEW_GAME = [{ squares: Array(9).fill(null), isXNext: false }] //global variable
function App() {
  const [history, setHistory] = useState(NEW_GAME)
  const [currentMove, setCurrentMove] = useState(0)

  //Derived State
  const gamingBoard = history[currentMove]

  const { winner, winningSquares } = calculateWinner(gamingBoard.squares)
  console.log({ historyLength: history.length, currentMove })
  const handleSquareClick = (clickedPosition) => {

    if (gamingBoard.squares[clickedPosition] || winner) { //If the square is already ticked then don't do anything OR the winner is achieved
      return
    }

    setHistory(currentHistory => {
      const isTraversing = currentMove + 1 !== currentHistory.length  //Checks whether the user is travelling through the history or not
      const lastGamingstate = isTraversing ? currentHistory[currentMove] : currentHistory[currentHistory.length - 1]

      const nextSquaresState = lastGamingstate.squares.map((squareValue, position) => {
        if (clickedPosition === position) {
          return lastGamingstate.isXNext ? 'X' : 'O'
        }
        return squareValue
      })

      //slice(0, exlusive) that is why we have added 1
      const base = isTraversing ? currentHistory.slice(0, currentHistory.indexOf(lastGamingstate) + 1) : currentHistory  //If we went back in history and changed something then from that point onwards all the remaining next histories will be deleted
      return base.concat({ squares: nextSquaresState, isXNext: !lastGamingstate.isXNext })

    })


    setCurrentMove(move => move + 1)
  }

  const moveTo = move => {
    setCurrentMove(move)
  }

  const handleResetClick = () => {
    setCurrentMove(0)
    setHistory(NEW_GAME)
  }

  return (<div className='app'>
    <h1>TIC <span className="text-green">TAC</span> TOE</h1>
    <StatusMessage winner={winner} gamingBoard={gamingBoard} />
    <Board squares={gamingBoard.squares} handleSquareClick={handleSquareClick} winningSquares={winningSquares} />
    <button type="button" className={`btn-reset ${winner ? `active` : ``}`} onClick={handleResetClick}>Start New Game</button>
    <h2 style={{
      fontWeight: `normal`
    }}>
      Current Game History
    </h2>
    <History history={history} moveTo={moveTo} currentMove={currentMove} />
    <div className="bg-balls"></div>
  </div>
  )


}

export default App
