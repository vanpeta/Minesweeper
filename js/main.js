
var board = $('#board')
var rows=$('#row-button').val()
var columns=$('#column-button').val()
var level = false
$('.button').on('click', function () {
  var button = $(this)
  var oldValue = button.parent().find('input').val()
  if (button.text()=="+") {
    var newValue=parseFloat(oldValue)+1
  }
  else if (button.text()=="-"){
    var newValue=parseFloat(oldValue)-1
  }
  button.parent().find('input').val(newValue)
})
$('#submit').on('click', function() {
  rows=$('#row-button').val()
  columns=$('#column-button').val()
  level = $('#level-button').val()
  boardGenerator(rows,columns)
})
function boardGenerator(rows,columns){
  for(i=0; i<rows; i++){
    board.append('<div id="row'+i+'"></div>')
    for(j=0; j<columns; j++){
      $('#row'+i).append('<div class="col'+j+' tile"></div>')
    }
  }
  if (level == "easy"){
    var tenPercent = Math.round(((rows*columns)*10)/100)
    console.log (tenPercent)
    var i = 0
    while (i <=tenPercent){
      $('#row'+Math.floor(Math.random()*rows)).find('.col'+Math.floor(Math.random()*columns)).addClass('mine')
      i++
    }
  }
  else if (level == "medium"){
    var twentyFivePercent = Math.round(((rows*columns)*25)/100)
    console.log (twentyFivePercent)
    var i = 0
    while (i <=twentyFivePercent){
      $('#row'+Math.floor(Math.random()*rows)).find('.col'+Math.floor(Math.random()*columns)).addClass('mine')
      i++
    }
  }
  else if (level=="hard"){
    var fiftyPercent = Math.round(((rows*columns)*50)/100)
    console.log (fiftyPercent)
    var i = 0
    while (i <=fiftyPercent){
      $('#row'+Math.floor(Math.random()*rows)).find('.col'+Math.floor(Math.random()*columns)).addClass('mine')
      i++
    }
  }
}

$('.mine')
