import { useEffect, useState } from "react";
import Square from "./Square";
import "./board.css";

function calculateWinner(squares) {
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

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const [status, setStatus] = useState("Start your game");

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    // resets the squares to null
    setSquares(Array(9).fill(null));
    // set to X
    setXIsNext(true);
  };

  useEffect(() => {
    console.log('useEffect triggered!')
    const winner = calculateWinner(squares);
    //   let status;
    if (winner) {
      setStatus(winner + " " + "won");
    } else {
      setStatus("Next player is" + " " + (xIsNext ? "X" : "O"));
    }
  }, [squares, xIsNext]);

  return (
    <>
      <div className="container">
        <div className="status">{status}</div>
        <div className="board">
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
          </div>
        </div>
        <div className="reset-board">
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default Board;
