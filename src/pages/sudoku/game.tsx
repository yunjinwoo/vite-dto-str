import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";


const initialBoard = [
  [5, 3, null, null, 7, null, null, null, null],
  [6, null, null, 1, 9, 5, null, null, null],
  [null, 9, 8, null, null, null, null, 6, null],
  [8, null, null, null, 6, null, null, null, 3],
  [4, null, null, 8, null, 3, null, null, 1],
  [7, null, null, null, 2, null, null, null, 6],
  [null, 6, null, null, null, null, 2, 8, null],
  [null, null, null, 4, 1, 9, null, null, 5],
  [null, null, null, null, 8, null, null, 7, 9],
];

const SudokuGame = () => {
  const [board, setBoard] = useState(initialBoard);

  const handleChange = (row: number, col: number, value: number) => {
    if (value >= 1 && value <= 9 && initialBoard[row][col] === null) {
      const newBoard = board.map((r, rIdx) =>
        r.map((c, cIdx) => (rIdx === row && cIdx === col ? Number(value) : c))
      );
      setBoard(newBoard);
    }
  };

  const checkSolution = () => {
    // 간단한 검증 로직 (행과 열 중복만 확인)
    const isValid = (arr: number[]) =>
      arr.length === 9 && new Set(arr).size === arr.length;

    for (let i = 0; i < 9; i++) {
      const row = board[i].filter((num) => num !== null);
      if (!isValid(row)) {
        alert("잘못된 스도쿠입니다! (행 오류)");
        return;
      }
      const col = board.map((row) => row[i]).filter((num) => num !== null);
      if (!isValid(col)) {
        alert("잘못된 스도쿠입니다! (열 오류)");
        return;
      }
    }
    alert("올바른 스도쿠입니다!");
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-xl font-bold mb-2">스도쿠 게임</h1>
      <div className="grid grid-cols-9 gap-0 border border-black w-max">
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <input
              key={`${rIdx}-${cIdx}`}
              className={`w-10 h-10 text-center border m-0 p-0 box-border 
                ${
                  cIdx % 3 === 2
                    ? "border-r-2 border-black"
                    : "border-r border-gray-500"
                }
                ${
                  rIdx % 3 === 2
                    ? "border-b-2 border-black"
                    : "border-b border-gray-500"
                }`}
              type="number"
              min="1"
              max="9"
              value={cell || ""}
              onChange={(e) => handleChange(rIdx, cIdx, Number(e.target.value))}
              disabled={initialBoard[rIdx][cIdx] !== null}
            />
          ))
        )}
      </div>
      <Button className="mt-2" onClick={checkSolution}>
        정답 확인
      </Button>
    </div>
  );
};

export default SudokuGame;
