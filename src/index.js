import { React } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

/* ------------------------------
Square
------------------------------ */
const Square = ({ value, onClick }) => {
    return (
        <button className="square" onClick={() => onClick()}>
            {value}
        </button>
    );
};

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

/* ------------------------------
Board
------------------------------ */
const Board = ({ squares, onClick }) => {
    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() => onClick(i)}
        />;
    };
    return (
        <div>
            <div className="status">{status}</div>
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
    );
};

/* ------------------------------
Game
------------------------------ */
const Game = () => {
    //state
    const [history, setHistory] = useState([{
        squares:
            Array(9).fill(null)
    }]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);
    const handleClick = (i) => {
        const _history = history.slice(0, stepNumber + 1);
        const current = _history[_history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? "X" : "O";

        setHistory(_history.concat([{ squares: squares }]));
        setStepNumber(_history.length);
        setXIsNext(!xIsNext);
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }
    //render
    const _history = history;
    const current = _history[stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    const moves = history.map((step, move) => {
        // step: squaresの状態
        // move: 手番
        // desc: description
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={(i) =>
                    handleClick(i)} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));