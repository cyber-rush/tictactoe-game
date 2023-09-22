const StatusMessage = ({ winner, gamingBoard }) => {
    const { squares, isXNext } = gamingBoard //Object destructuring of gamingBoard
    const noMovesLeft = squares.every(squareValue => squareValue !== null) //Return true value if each ele of the array follows the condition
    const nextPlayer = isXNext ? 'X' : 'O'

    const renderStatusMessage = () => {//Space between two words is indicated by {''}
        if (winner) {
            return (<>
                Winner is{' '}
                <span className={winner === 'X' ? "text-green" : "text-orange"}>
                    {winner}
                </span>
            </>)
        }
        if (!winner && noMovesLeft) {
            return (<>
                <span className="text-orange">
                    O{' '}
                </span>
                and{' '}
                <span className="text-green">
                    X{' '}
                </span>
                are tied
            </>)
        }
        if (!winner && !noMovesLeft) {
            return (<>
                Next Player is{' '}
                <span className={isXNext ? "text-green" : "text-orange"}>
                    {nextPlayer}
                </span>
            </>)
        }
        return null
    }
    return <h2 className="status-message">{renderStatusMessage()}</h2>
}

export default StatusMessage