import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Model from './Model/Model.js'

//Puzzle to use. 
import {puzzleInformation} from './Model/Puzzle.js';
import { puzzleInforamation as testInformation } from './Model/TestPuzzle.js';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import { Up, Down, Left, Right } from './Model/Model.js';
import { movePiece } from './Controller/Controller.js';

var actualPuzzle = JSON.parse(JSON.stringify(puzzleInformation));
var model = new Model(actualPuzzle);

test('No moves when created', () => {
  var model = new Model(actualPuzzle);

  expect(model.numMoves).toBe(0)
});


//Some tests like this one will require some hacking (adding code for testing purposes.)
/*
test('Properly Renders 0 moves', () => {
  //var model = new Model(actualPuzzle);
  const {getByText} = render(<App></App>);
  const movesElement = getByText(/number moves:/i);
  expect(movesElement).toB=toBeInTheDocument();
});
*/


//We cam simulate situtations by playing with the state. 
//We run npm test -- --coverage t see how many of the statements have been exectured and the goal is to bring it to 80%
test('First valid moves', () => {
  var model = new Model(actualPuzzle);
  var pieceJ = model.puzzle.pieces.find(p => p.label === 'J')
  model.puzzle.select(pieceJ)
  expect(model.puzzle.selected).toBe(pieceJ)

  //Now what moves are available? Only Left and Right.
  expect(model.available(Left)).toBe(true)
  expect(model.available(Right)).toBe(true)
  expect(model.available(Down)).toBe(false)
  expect(model.available(Up)).toBe(false)

  movePiece(model, Left);
  expect(pieceJ.column).toBe(0)     // moved piece J off to the edge.


  var pieceA = model.puzzle.pieces.find(p => p.label === 'A')
  model.puzzle.select(pieceA)
  expect(model.puzzle.selected).toBe(pieceA)
  expect(model.available(Left)).toBe(false)
  expect(model.available(Right)).toBe(false)
  expect(model.available(Down)).toBe(false)
  expect(model.available(Up)).toBe(false)
})