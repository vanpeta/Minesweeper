console.log ('test')
var board = $('#board')


function boardGenerator(row,column){
  for(i=0; i<row; i++){
board.append('<div id="row'+i+'"></div>')
  for(j=0; j<column; j++){
    $('#row'+i).append('<div class="column'+j+' tile"></div>')
  }
}
}
boardGenerator(3,10)


