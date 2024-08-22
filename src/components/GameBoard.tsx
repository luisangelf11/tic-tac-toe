import { useEffect, useState } from "react";
import Square from "./Square";
import ButtonReload from "./ButtonReload";
import { useLoader } from "../hook/useLoader";
import Loader from "./Loader";

export default function GameBoard() {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));
  const [isPlayer, setIsPlayer] = useState<boolean>(true);
  const [msj, setMsj] = useState<string>("Start game, playing X");
  const [win, setWin] = useState<boolean>(false);
  const [turns, setTurns] = useState<number>(0);

  //custom hooks
  const loader = useLoader();

  const handleClick = (index: number) => {
    //copy state array
    const newSquares = squares.slice();
    //validate the position in the array
    if (validatePositions(squares) || squares[index]) return;
    //define value to the position
    newSquares[index] = isPlayer ? "X" : "O";
    //update states
    setSquares(newSquares);
    setIsPlayer(!isPlayer);
    setMsj(`Playing ${!isPlayer ? "X" : "O"}`);
    setTurns((turns) => turns + 1);
  };

  const validatePositions = (squaresValidate: string[]) => {
    const matchLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const value of matchLines) {
      const [a, b, c] = value;
      if (
        squaresValidate[a] &&
        squaresValidate[a] === squaresValidate[b] &&
        squaresValidate[a] === squaresValidate[c]
      ) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (validatePositions(squares)) {
      setWin(true);
    }
  }, [squares, win]);

  const renderSquare = (index: number) => (
    <Square value={squares[index]} clickFunction={() => handleClick(index)} />
  );

  return (
    <section className="w-full bg-gray-950 text-white h-screen flex flex-col justify-center items-center">
     {loader ? <Loader /> : <div className="flex flex-col gap-2 justify-center items-center">
        {win ? (
          <h1 className="text-2xl p-2 uppercase font-semibold">
            Finished {!isPlayer ? "X" : "O"} is the winner!
          </h1>
        ) : (
          <h2 className="text-xl font-semibold p-2 uppercase">
            {turns !== 9 ? msj : "tied game"}
          </h2>
        )}
        <article>
          <div className="flex gap-2">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="flex gap-2 mt-2">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="flex gap-2 mt-2">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </article>
        {turns === 9 || win ? <ButtonReload /> : ""}
      </div>}
    </section>

  );
}
