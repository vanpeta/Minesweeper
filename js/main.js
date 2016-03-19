console.log ('test')
var board = $('#board')
function boardGenerator(row,column){
  for(i=0; i<row; i++){
board.append('<div id="row' +i+ '"></div>')
  for(j=0; j<column; j++){
    $('#row'+i.toString()).append('<button class="tile"></button>')
  }
}
}
boardGenerator(10,20)
