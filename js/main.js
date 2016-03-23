
var board = $('#board')
var rows=$('#row-button').val()
var columns=$('#column-button').val()
var level = false
/// Setup Panel
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
  $(this).unbind()
})
/// Board Creation
function boardGenerator(rows,columns){
  for(i=0; i<rows; i++){
    board.append('<div id="row'+i+'"></div>')
    for(j=0; j<columns; j++){
      $('#row'+i).append('<div class="col'+j+' tile"></div>')
    }
  }
/// Mines Insertion
  var numberOfMines = false
  if (level == 'easy'){
    var tenPercent = Math.round(((rows*columns)*10)/100)
    numberOfMines = tenPercent
  }
  if (level == 'medium'){
    var twentyFivePercent = Math.round(((rows*columns)*25)/100)
    numberOfMines = twentyFivePercent
  }
  if (level == 'hard'){
    var fiftyPercent = Math.round(((rows*columns)*50)/100)
    numberOfMines = fiftyPercent
  }
  console.log (numberOfMines)
  var i = 0
  while (i <numberOfMines){
    var randomRow=Math.floor(Math.random()*rows)
    var randomColumn=Math.floor(Math.random()*columns)
    var mine = $('#row'+randomRow).find('.col'+randomColumn)
     if (mine.hasClass('adjacent')){
      mine.removeClass('adjacent')
      mine.addClass('mine')
    }
    else {
    mine.addClass('mine')
    }
    if ($('#row'+randomRow).find('.col'+(randomColumn-1)).hasClass('mine')==false) {
      $('#row'+randomRow).find('.col'+(randomColumn-1)).addClass('adjacent')
    }
    if ($('#row'+randomRow).find('.col'+(randomColumn+1)).hasClass('mine')==false) {
      $('#row'+randomRow).find('.col'+(randomColumn+1)).addClass('adjacent')
    }
    if ($('#row'+(randomRow+1)).find('.col'+randomColumn).hasClass('mine')==false) {
      $('#row'+(randomRow+1)).find('.col'+randomColumn).addClass('adjacent')
    }
    if ($('#row'+(randomRow+1)).find('.col'+(randomColumn+1)).hasClass('mine')==false) {
      $('#row'+(randomRow+1)).find('.col'+(randomColumn+1)).addClass('adjacent')
    }
    if ($('#row'+(randomRow+1)).find('.col'+(randomColumn-1)).hasClass('mine')==false) {
      $('#row'+(randomRow+1)).find('.col'+(randomColumn-1)).addClass('adjacent')
    }
    if ($('#row'+(randomRow-1)).find('.col'+randomColumn).hasClass('mine')==false) {
      $('#row'+(randomRow-1)).find('.col'+randomColumn).addClass('adjacent')
    }
    if ($('#row'+(randomRow-1)).find('.col'+(randomColumn+1)).hasClass('mine')==false) {
      $('#row'+(randomRow-1)).find('.col'+(randomColumn+1)).addClass('adjacent')
    }
    if ($('#row'+(randomRow-1)).find('.col'+(randomColumn-1)).hasClass('mine')==false) {
      $('#row'+(randomRow-1)).find('.col'+(randomColumn-1)).addClass('adjacent')
    }
    i++
  }
  $('.adjacent').each(function(){
    var row = $(this).parent().attr('id')
    var rowNumber = parseInt(row.match(/\d+/)[0],10)
    var column = $(this).attr('class')
    var colNumber = parseInt(column.match(/\d+/)[0],10)
    var n = 0
    if ($('#row'+rowNumber).find('.col'+(colNumber+1)).hasClass('mine')==true){
      n++
    }
    if ($('#row'+rowNumber).find('.col'+(colNumber-1)).hasClass('mine')==true){
      n++
    }
    if ($('#row'+(rowNumber-1)).find('.col'+colNumber).hasClass('mine')==true){
      n++
    }
    if ($('#row'+(rowNumber-1)).find('.col'+(colNumber-1)).hasClass('mine')==true){
      n++
    }
    if ($('#row'+(rowNumber-1)).find('.col'+(colNumber+1)).hasClass('mine')==true){
      n++
    }
    if ($('#row'+(rowNumber+1)).find('.col'+colNumber).hasClass('mine')==true){
      n++
    }
    if ($('#row'+(rowNumber+1)).find('.col'+(colNumber-1)).hasClass('mine')==true){
      n++
    }
    if ($('#row'+(rowNumber+1)).find('.col'+(colNumber+1)).hasClass('mine')==true){
      n++
    }
  $(this).html(n)
  })
  play()
  markMine()
}
//click on tiles
var tiles = $('.tile');
tiles.each(function(){
  this.on('click',function(){
    alert("test")
  })
})

function play (){
$('.tile').on('click', function(){
  if ($(this).hasClass('mine')==true){
    alert ("you lost")
  }
  else if ($(this).hasClass('adjacent')==true){
    $(this).addClass('cleared')
  }
  else {
    var safeTiles=[$(this)]
    while (safeTiles.length>0){
      //1. remove $(this)
      var safeTile = safeTiles.pop()
      //2. add all white unrevealed neighbors to safeTiles
        var row = safeTile.parent().attr('id')
        var rowNumber = parseInt(row.match(/\d+/)[0],10)
        var column = safeTile.attr('class')
        var colNumber = parseInt(column.match(/\d+/)[0],10)

        if ($('#row'+rowNumber).find('.col'+(colNumber+1)).not('.mine').not('.adjacent').not('.cleared').length > 0) {
          safeTiles.push($('#row'+rowNumber).find('.col'+(colNumber+1)).not('.mine').not('.adjacent').not('.cleared'))
        }
        if ($('#row'+rowNumber).find('.col'+(colNumber-1)).not('.mine').not('.adjacent').not('.cleared').length > 0) {
          safeTiles.push($('#row'+rowNumber).find('.col'+(colNumber-1)).not('.mine').not('.adjacent').not('.cleared'))
        }
        if ($('#row'+(rowNumber-1)).find('.col'+colNumber).not('.mine').not('.adjacent').not('.cleared').length > 0) {
          safeTiles.push($('#row'+(rowNumber-1)).find('.col'+colNumber).not('.mine').not('.adjacent').not('.cleared'))
        }
        if ($('#row'+(rowNumber-1)).find('.col'+(colNumber-1)).not('.mine').not('.adjacent').not('.cleared').length > 0) {
          safeTiles.push($('#row'+(rowNumber-1)).find('.col'+(colNumber-1)).not('.mine').not('.adjacent').not('.cleared'))
        }
        if ($('#row'+(rowNumber-1)).find('.col'+(colNumber+1)).not('.mine').not('.adjacent').not('.cleared').length > 0) {
          safeTiles.push($('#row'+(rowNumber-1)).find('.col'+(colNumber+1)).not('.mine').not('.adjacent').not('.cleared'))
        }
        if ($('#row'+(rowNumber+1)).find('.col'+colNumber).not('.mine').not('.adjacent').not('.cleared').length > 0) {
          safeTiles.push($('#row'+(rowNumber+1)).find('.col'+colNumber).not('.mine').not('.adjacent').not('.cleared'))
        }
        if ($('#row'+(rowNumber+1)).find('.col'+(colNumber-1)).not('.mine').not('.adjacent').not('.cleared').length > 0) {
          safeTiles.push($('#row'+(rowNumber+1)).find('.col'+(colNumber-1)).not('.mine').not('.adjacent').not('.cleared'))
        }
        if ($('#row'+(rowNumber+1)).find('.col'+(colNumber+1)).not('.mine').not('.adjacent').not('.cleared').length > 0) {
          safeTiles.push($('#row'+(rowNumber+1)).find('.col'+(colNumber+1)).not('.mine').not('.adjacent').not('.cleared'))
        }
      //3. reveal all unrevealed neighbors

        if ($('#row'+rowNumber).find('.col'+(colNumber+1)).hasClass('mine')==false){
          $('#row'+rowNumber).find('.col'+(colNumber+1)).addClass('cleared')
        }
        if ($('#row'+rowNumber).find('.col'+(colNumber-1)).hasClass('mine')==false){
          $($('#row'+rowNumber).find('.col'+(colNumber-1))).addClass('cleared')
        }
        if ($('#row'+(rowNumber-1)).find('.col'+colNumber).hasClass('mine')==false){
          $('#row'+(rowNumber-1)).find('.col'+colNumber).addClass('cleared')
        }
        if ($('#row'+(rowNumber-1)).find('.col'+(colNumber-1)).hasClass('mine')==false){
          $('#row'+(rowNumber-1)).find('.col'+(colNumber-1)).addClass('cleared')
        }
        if ($('#row'+(rowNumber-1)).find('.col'+(colNumber+1)).hasClass('mine')==false){
          $('#row'+(rowNumber-1)).find('.col'+(colNumber+1)).addClass('cleared')
        }
        if ($('#row'+(rowNumber+1)).find('.col'+colNumber).hasClass('mine')==false){
          $('#row'+(rowNumber+1)).find('.col'+colNumber).addClass('cleared')
        }
        if ($('#row'+(rowNumber+1)).find('.col'+(colNumber-1)).hasClass('mine')==false){
          $('#row'+(rowNumber+1)).find('.col'+(colNumber-1)).addClass('cleared')
        }
        if ($('#row'+(rowNumber+1)).find('.col'+(colNumber+1)).hasClass('mine')==false){
          $('#row'+(rowNumber+1)).find('.col'+(colNumber+1)).addClass('cleared')
        }
    }
  }
})
}
function markMine (){
  $('.tile').hover(function(){
  $(this).addClass('active')
  console.log ("active")
},function () {
  $(this).removeClass('active')
  console.log ('remove')
})
  $('.active').keypress(function (e){
    if (e.which===32){
      console.log('space pressed')
      $('.active').addClass('marked')
      $('.active').html('M')
    }
  })
}

