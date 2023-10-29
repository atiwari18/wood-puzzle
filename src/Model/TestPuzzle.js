const puzzleInformation =    // Mock object with easy to win game!
{
  "name": "TestPuzzle 4x5",
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
    }
  ]
};

export { puzzleInformation };
