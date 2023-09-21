import { useState } from "react"
import Square from "./Square"
import '../styles.scss'
const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null))  // Square is an empty array with initial null values
    const [isXNext, setIsXNext] = useState(false) //As there a re only 2 players -->if false --> 'O' else 'X'

    const handleSquareClick = (clickedPosition) => {

        if (squares[clickedPosition]) { //If the square is already ticked then don't do anything
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
    const renderSquare = position => {
        return <Square value={squares[position]} onClick={() => handleSquareClick(position)} />
    }
    return (
        <div className="board">
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    )
}

export default Board