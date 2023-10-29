export class MoveType {
    constructor(deltaR, deltaC) {
        this.deltaR = deltaR;
        this.deltaC = deltaC;
    }

    static parse(string) {
        if ((string === "down") || (string === "Down")) { return Down; }
        if ((string === "up") || (string === "Up")) { return Up; }
        if ((string === "right") || (string === "Right")) { return Right; }
        if ((string === "left") || (string === "Left")) { return Left; }
    }
}

export const Down = new MoveType(1, 0, "Down");
export const Up = new MoveType(-1, 0, "Up");
export const Right = new MoveType(0, 1, "Right");
export const Left = new MoveType(0, -1, "Left");
export const NoMove = new MoveType(0, 0, "*");


export class Coordinate {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}

export class Piece {
    constructor(width, height, isWinner, label) {
        this.width = width;
        this.height = height;
        this.isWinner = isWinner;
        this.row = 0;
        this.column = 0;
        this.label = label;
    }

    place(row, column) {
        this.row = row;
        this.column = column;
    }

    location() {
        return new Coordinate(this.row, this.column);
    }

    //Move the piece
    move(direction) {
        this.row += direction.deltaR;
        this.column += direction.deltaC;
    }

    //Return all coordinates for this piece one by one
    *coordinates() {
        for (let r = 0; r < this.height; r++) {
          for (let c = 0; c < this.width; c++) {
            yield new Coordinate(this.row + r, this.column + c);
          } 
        }
    }

    contains(coord) {
        let cs = [...this.coordinates()]; //Yield all the coordinates and turn them into a list.
        for (let c of cs) {
            if(c.row === coord.row && c.column === coord.column) {
                return true;
            }
        }

        return false;
    }

    // used for solving
    copy() {
        let p = new Piece(this.width, this.height, this.isWinner, this.label);
        p.place(this.row, this.column);
        return p;
    }

}

export class Puzzle {
    constructor(numRows, numColumns, destination, finalMove) {
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.destination = destination;
        this.finalMove = finalMove;
        this.selected = null;
    }

    initialize(pieces) {
        //Create a copy of each piece.
        this.pieces = pieces.map(p => p.copy());
    }

    select(piece) {
        this.selected = piece;
    }

    isSelected(piece) {
        return piece === this.selected;
    }

    //Determines whether the piece has won.
    hasWon() {
        let idx = this.pieces.findIndex(piece => piece.isWinner);
        return this.destination.row === this.pieces[idx].row && this.destination.column === this.pieces[idx].column;
    }

    //Determines if any piece in the puzzle covers given coordinate
    isCovered(coordinate) {
        let idx = this.pieces.findIndex(piece => piece.contains(coordinate));

        //If we find that a piece covers a coordinate, return true; othersise false.
        return idx >= 0;
    }

    availableMoves() {
        let piece = this.selected;

        if (piece === null) { return []; }

        let moves = [];
        let coord = this.selected.location();

        //Can the piece move left?
        let available = false;
        if (coord.column > 0) {
            available = true;

            for (let r = 0; r < piece.height; r++) {
                if(this.isCovered(new Coordinate(coord.row + r, coord.column - 1))) {
                    available = false;
                    break;
                }
            }
        }

        if (available) {
            moves.push(Left);
        }

        //Can the piece move Right?
        available = false;
        if (coord.column + piece.width < this.numColumns) {
            available = true;
            for (let r = 0; r < piece.height; r++) {
                if (this.isCovered(new Coordinate(coord.row + r, coord.column + piece.width))) {
                    available = false;
                    break;
                }
            }

            if (available) {
                moves.push(Right);
            }
        }

        available = false;
        //Can the piece move down?
        if (coord.row + piece.height < this.numRows) {
            available = true;
            for (let c = 0; c < piece.width; c++) {
                if (this.isCovered(new Coordinate(coord.row + piece.height, coord.column + c))) {
                    available = false;
                    break;
                }
            }
            if (available) { 
                moves.push(Down); 
            }
        }
        
        available = false;
        //Can the piece move Up?
        if (coord.row > 0) {
            available = true;
            for (let c = 0; c < piece.width; c++) {
                if (this.isCovered(new Coordinate(coord.row - 1, coord.column + c))) {
                    available = false;
                    break;
                }
            }
            if (available) { 
                moves.push(Up); 
            }
        }


        return moves;
    }
 }

export default class Model {
    //INFO is going to be JSON encoded puzzle.
    constructor(info) {
        this.initialize(info);
        this.info = info;
    }

    initialize(info) {
        let numRows = parseInt(info.board.rows);
        let numColumns = parseInt(info.board.columns);
        let destination = new Coordinate(parseInt(info.board.destination.row), parseInt(info.board.destination.column));
        let finalMove = MoveType.parse(info.board.finalMove);

        //Create the pieces for the puzzle
        var pieces = [];
        for (let p of info.pieces){
            pieces.push(new Piece(parseInt(p.width), parseInt(p.height), (p.isWinner === 'true'), p.label));
        }

        //Identify which pieces are which and where they belong on the board, and placing the pieces. 
        for (let loc of info.locations) {
            let coordinate = new Coordinate(parseInt(loc.location.row), parseInt(loc.location.column));

            let index = pieces.findIndex(piece => (piece.label === loc.piece));
            pieces[index].place(coordinate.row, coordinate.column);
        }

        this.puzzle = new Puzzle(numRows, numColumns, destination, finalMove);
        this.puzzle.initialize(pieces);
        this.numMoves = 0;
        this.victory = false;

        this.showLabels = false;
    }

    updateMoveCount(delta ) {
        this.numMoves += delta;
    }

    numberMoves() {
        return this.numMoves;
    }

    victorious() {
        this.victory = true;
    }

    isVictorious() {
        return this.victory;
    }

    available(direction) {
        //If no piece is selected. Then none are available.
        if (!this.puzzle.selected) { return false; }
        if (direction === NoMove ) { return false; }

        // HANDLE WINNING CONDITION. MUST BE AVAILABLE!
        if (this.puzzle.selected.isWinner && 
            this.puzzle.selected.row === this.puzzle.destination.row && 
            this.puzzle.selected.column === this.puzzle.destination.column && 
            this.puzzle.finalMove === direction) {
            return true;
        }

        let allMoves = this.puzzle.availableMoves();
        return allMoves.includes(direction);
    }
}

