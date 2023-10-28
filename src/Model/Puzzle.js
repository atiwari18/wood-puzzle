const puzzleInformation = 
{
  "name": "WoodPuzzle 4x5",
  "board" : {
     "rows" : "5",
     "columns" : "4",
     "target" : "B",
     "destination" : {
       "row" : "3",
       "column" : "1"
     },
     "exit" : {
       "start"    : "1",
       "end"      : "2"
     },
     "finalMove" : "Down"
  },
  "pieces" : [
    { "label" : "A",
      "isWinner" : "false",
      "width" : "1",
      "height" : "2"
    },
    { "label" : "B",
      "isWinner" : "true",
      "width" : "2",
      "height" : "2"
    },
    { "label" : "C",
      "isWinner" : "false",
      "width" : "1",
      "height" : "2"
    },
    { "label" : "D",
      "isWinner" : "false",
      "width" : "1",
      "height" : "2"
    },
    { "label" : "E",
      "isWinner" : "false",
      "width" : "1",
      "height" : "1"
    },
    { "label" : "F",
      "isWinner" : "false",
      "width" : "1",
      "height" : "1"
    },
    { "label" : "G",
      "isWinner" : "false",
      "width" : "1",
      "height" : "2"
    },
    { "label" : "H",
      "isWinner" : "false",
      "width" : "1",
      "height" : "1"
    },
    { "label" : "I",
      "isWinner" : "false",
      "width" : "1",
      "height" : "1"
    },
    { "label" : "J",
      "isWinner" : "false",
      "width" : "2",
      "height" : "1"
    }
  ],
  "locations" : [
    { "piece" : "A",
      "location" : {
         "row"    : "0", 
         "column" : "0" 
      }
    },
    { "piece" : "B",
      "location" : {
         "row"    : "0", 
         "column" : "1" 
      }
    },
    { "piece" : "C",
      "location" : {
         "row"    : "0", 
         "column" : "3" 
      }
    },
    { "piece" : "D",
      "location" : {
         "row"    : "2", 
         "column" : "0" 
      }
    },
    { "piece" : "E",
      "location" : {
         "row"    : "2", 
         "column" : "1" 
      }
    },
    { "piece" : "F",
      "location" : {
         "row"    : "2", 
         "column" : "2" 
      }
    },
    { "piece" : "G",
      "location" : {
         "row"    : "2", 
         "column" : "3" 
      }
    },
    { "piece" : "H",
      "location" : {
         "row"    : "3", 
         "column" : "1" 
      }
    },
    { "piece" : "I",
      "location" : {
         "row"    : "3", 
         "column" : "2" 
      }
    },
    { "piece" : "J",
      "location" : {
         "row"    : "4", 
         "column" : "1" 
      }
    }
  ]
};

const puzzleInformationExtra = 
{
  "name": "WoodPuzzle 6x6",
  "board" : {
     "rows" : "6",
     "columns" : "6",
     "target" : "A",
     "destination" : {
       "row" : "2",
       "column" : "4"
     },
     "exit" : {
       "start"    : "2",
       "end"      : "2"
     },
     "finalMove" : "Right"
  },
  "pieces" : [
    { "label" : "A",
      "isWinner" : "true",
      "width" : "2",
      "height" : "1"
    },
    { "label" : "B",
      "isWinner" : "false",
      "width" : "2",
      "height" : "1"
    },
    { "label" : "C",
      "isWinner" : "false",
      "width" : "3",
      "height" : "1"
    },
    { "label" : "D",
      "isWinner" : "false",
      "width" : "1",
      "height" : "2"
    },
    { "label" : "E",
      "isWinner" : "false",
      "width" : "1",
      "height" : "3"
    },
    { "label" : "F",
      "isWinner" : "false",
      "width" : "2",
      "height" : "1"
    },
    { "label" : "G",
      "isWinner" : "false",
      "width" : "2",
      "height" : "1"
    }
  ],
  "locations" : [
    { "piece" : "A",
      "location" : {
         "row"    : "2", 
         "column" : "0" 
      }
    },
    { "piece" : "B",
      "location" : {
         "row"    : "0", 
         "column" : "2" 
      }
    },
    { "piece" : "C",
      "location" : {
         "row"    : "1", 
         "column" : "1" 
      }
    },
    { "piece" : "D",
      "location" : {
         "row"    : "2", 
         "column" : "3" 
      }
    },
    { "piece" : "E",
      "location" : {
         "row"    : "3", 
         "column" : "1" 
      }
    },
    { "piece" : "F",
      "location" : {
         "row"    : "4", 
         "column" : "2" 
      }
    },
    { "piece" : "G",
      "location" : {
         "row"    : "4", 
         "column" : "4" 
      }
    }
  ]
};

export {puzzleInformation, puzzleInformationExtra};