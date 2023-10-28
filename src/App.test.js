import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Model from './Model/Model.js'

//Puzzle to use. 
import {puzzleInformation} from './Model/Puzzle.js';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
var actualPuzzle = JSON.parse(JSON.stringify(puzzleInformation));
var model = new Model(actualPuzzle);

test('No moves when created', () => {
  expect(model.numMoves).toBe(0)
});


//Some tests like this one will require some hacking (adding code for testing purposes.)
test('Properly Renders 0 moves', () => {
  const {getByText} = render(<App></App>);
  const movesElement = getByText(/number moves:/i);
  expect(movesElement).toB=toBeInTheDocument();
});

