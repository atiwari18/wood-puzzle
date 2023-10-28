import { computeRectangle } from "../Boundary/Boundary.js";

export function selectPiece(model, canvas, event) {
    const canvasRect = canvas.getBoundingClientRect();

    //Find piece on which mouse was clicked.
    let idx = model.puzzle.pieces.findIndex(piece => {
        let rect = computeRectangle(piece);

        //See if the event is contained within the rectangle.
        return rect.contains(event.clientX - canvasRect.left, event.clientY - canvasRect.top);

    });

    let selected = null;
    if (idx >= 0) {
        selected = model.puzzle.pieces[idx];
    } 

    //Select the piece and construct a new model to represent this situation
    model.puzzle.select(selected);

    //return model.copy(); //This is what triggers the refresh.
}

export function movePiece(model, direction) {
    let selected = model.puzzle.selected;
    if (!selected) { return; }

    selected.move(direction);
    model.updateMoveCount(+1);

    //return model.copy();
}