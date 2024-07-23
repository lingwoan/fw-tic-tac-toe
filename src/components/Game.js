import React, { useState, useEffect } from "react";
import Board from "./Board";

function Game() {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const squares = history[history.length - 1];

  //Declaring a Winner
  useEffect(() => {
    console.log(history)
    setWinner(calculateWinner(squares));
  }, [history]);

  //function to check if a player has won.
  //If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  //Input: squares: given an array of 9 squares:'X', 'O', or null.
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; //dừng lại khi có ng thắng 
      }
    }
    return null; //trả về null khi chạy hết all đường thắng và ko tìm thấy ai thắng 
  };

  //Handle player
    const handleClick = (i) => {
      const newSquare = [...squares];
      if (winner || squares[i]) { 
        return;                                     //1. winnẻ dễ hiểu hơn , 2.đã có sẵn winner, nên ko cần gọi caculatewwinner, nếu lấy caculatewwinner thì nó sẽ tự tính lại 
      }
      newSquare[i] = xIsNext ? 'X' : 'O';
      setHistory([...history, newSquare]);
      setXIsNext(!xIsNext);
    };

  //Restart game
  const handlRestart = () => {
    setHistory([Array(9).fill(null)]); 
    setXIsNext(true);
  };

  //history
  const handleMove = (move) => {
    let newHistory= history.slice(0, move + 1);
    setHistory(newHistory);
  }

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <Board squares={squares} handleClick={handleClick} />
      </div>
      <button onClick={handlRestart} className="restart-btn">
        Restart
      </button>
      {history.map((squares, move) => {  
      return <div key={move} onClick={() => {handleMove(move)}} className="move">{`go to move #${move}`}</div>
      })}
    </div>
  );
}

export default Game;
