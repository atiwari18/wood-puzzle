//import './App.css';
import {layout} from './Layout.js';
import React from "react";
import Model from './Model/Model.js'
import { redrawCanvas } from './Boundary/Boundary.js';
import {puzzleInformation} from './Model/Puzzle.js';
import { selectPiece, movePiece } from './Controller/Controller.js';
import { Up, Down, Left, Right } from './Model/Model.js';
var actualPuzzle = JSON.parse(JSON.stringify(puzzleInformation));


function App() {
  //Initial Instantiation of the Model
  //Defining the state and anytime we want to change we will call setModel
  const [model, setModel] = React.useState(new Model(actualPuzzle))
  const [redraw, forceRedraw] = React.useState(0);    // change values to force redraw

  const AppRef = React.useRef(null); //Later in the implementation we need to be able to refer to App.
  const canvasRef = React.useRef(null);

  //Ensures that initial rendering is performed, and whenever model is changed, it is rerendered.
  React.useEffect(() => {
    //Happens Once
    redrawCanvas(model, canvasRef.current, AppRef.current);
  }, [model, redraw]) //This argument declares when to refresh (whenever model is updated)

  const handleClick = (e) => {
    selectPiece(model, canvasRef.current, e);
    //setModel(newModel); //react to changes if model has changed.
    forceRedraw(redraw+1)   // react to changes, if model has changed 
  }

  const movePieceHandler = (direction) => {
    movePiece(model, direction);
    //setModel(newModel);
    forceRedraw(redraw+1);
  }

  return (
    <main style = {layout.AppMain} ref = {AppRef}>
      <canvas tabIndex= "1" className = "App-Canvas" ref = {canvasRef} width = {layout.canvas.width} height = {layout.canvas.height}
              onClick= {handleClick}>
      </canvas>
        <label style={layout.text}> {"Number of Moves:" + model.numMoves} </label>
        <div style={layout.buttons}>
          <button style={layout.upButton} onClick = { (e) => movePieceHandler(Up)} disabled = {!model.available(Up)}> &#8593; </button>
          <button style={layout.downButton} onClick = { (e) => movePieceHandler(Down)} disabled = {!model.available(Down)}> &#8595; </button>
          <button style={layout.rightButton} onClick = { (e) => movePieceHandler(Right)} disabled = {!model.available(Right)}> &#8594; </button>
          <button style={layout.leftButton} onClick = { (e) => movePieceHandler(Left)} disabled = {!model.available(Left)}> &#8592; </button>
        </div>
    </main>
  );
}

export default App;
