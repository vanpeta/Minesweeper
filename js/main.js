
var board=$('#board')
var rows=$('#row-button').val()
var columns=$('#column-button').val()
var level=false
var minesCounter=0
var allMarked=false
var game=true
/// Setup Panel
$('.button').on('click', function () {
  var button = $(this)
  var oldValue = button.parent().find('input').val()
  if(button.text()=="+"){
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
  $('#game-console').show()
  $('#setup-panel').hide()
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
  $(this).attr('value',''+n+'')
  })
  play()

  minesCounter=$('.mine').length
  $('#mines-counter').html(minesCounter)
  $('#restart').click(function() {
    location.reload();
});
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
    if (game==true){
      var value = $(this).attr('value')
      if ($(this).hasClass('mine')==true&&(!$(this).hasClass('marked'))){
        $(this).append('<img src="http://rs651.pbsrc.com/albums/uu236/416o/explosion.gif~c200" width="50px" style="position:relative; top:-28px; left:-16px;">')
        game=false
        setTimeout (function (){
          $('#game-console').hide()
          $('#gameover').show()
        },3000);
      }
      else if ($(this).hasClass('adjacent')==true&&(!$(this).hasClass('marked'))){
        $(this).text(''+value+'')
        $(this).addClass('cleared')
      }
      else if (!$(this).hasClass('marked')){
        $(this).addClass('cleared')
        var safeTiles=[$(this)]
        while (safeTiles.length>0){
        //1. remove $(this)
          var safeTile = safeTiles.pop()
        //2. add all unrevealed neighbors to safeTiles
          var row = safeTile.parent().attr('id')
          var rowNumber = parseInt(row.match(/\d+/)[0],10)
          var column = safeTile.attr('class')
          var colNumber = parseInt(column.match(/\d+/)[0],10)
          var rightTile =$('#row'+rowNumber).find('.col'+(colNumber+1))
          var leftTile =$('#row'+rowNumber).find('.col'+(colNumber-1))
          var aboveTile=$('#row'+(rowNumber-1)).find('.col'+colNumber)
          var aboveLeftTile=$('#row'+(rowNumber-1)).find('.col'+(colNumber-1))
          var aboveRightTile=$('#row'+(rowNumber-1)).find('.col'+(colNumber+1))
          var belowTile=$('#row'+(rowNumber+1)).find('.col'+colNumber)
          var belowLeftTile=$('#row'+(rowNumber+1)).find('.col'+(colNumber-1))
          var belowRightTile=$('#row'+(rowNumber+1)).find('.col'+(colNumber+1))
          if (rightTile.not('.marked').not('.mine').not('.adjacent').not('.cleared').length > 0) {
            safeTiles.push(rightTile.not('.marked').not('.mine').not('.adjacent').not('.cleared'))
          }
          if (leftTile.not('.marked').not('.mine').not('.adjacent').not('.cleared').length > 0) {
            safeTiles.push(leftTile.not('.marked').not('.mine').not('.adjacent').not('.cleared'))
          }
          if (aboveTile.not('.marked').not('.mine').not('.adjacent').not('.cleared').length > 0) {
            safeTiles.push(aboveTile.not('.marked').not('.mine').not('.adjacent').not('.cleared'))
          }
          if (aboveLeftTile.not('.marked').not('.mine').not('.adjacent').not('.cleared').length > 0) {
            safeTiles.push(aboveLeftTile.not('.marked').not('.mine').not('.adjacent').not('.cleared'))
          }
          if (aboveRightTile.not('.marked').not('.mine').not('.adjacent').not('.cleared').length > 0) {
            safeTiles.push(aboveRightTile.not('.marked').not('.mine').not('.adjacent').not('.cleared'))
          }
          if (belowTile.not('.mine').not('.marked').not('.adjacent').not('.cleared').length > 0) {
            safeTiles.push(belowTile.not('.marked').not('.marked').not('.mine').not('.adjacent').not('.cleared'))
          }
          if (belowLeftTile.not('.mine').not('.adjacent').not('.cleared').length > 0) {
            safeTiles.push(belowLeftTile.not('.marked').not('.mine').not('.adjacent').not('.cleared'))
          }
          if (belowRightTile.not('.mine').not('.marked').not('.adjacent').not('.cleared').length > 0) {
            safeTiles.push(belowRightTile.not('.marked').not('.mine').not('.adjacent').not('.cleared'))
          }
          //3. revealing all unrevealed neighbors
          if (rightTile.hasClass('mine')==false){
           rightTile.addClass('cleared')
          }
          if (leftTile.hasClass('mine')==false){
            leftTile.addClass('cleared')
          }
          if (aboveTile.hasClass('mine')==false){
            aboveTile.addClass('cleared')
          }
          if (aboveLeftTile.hasClass('mine')==false){
            aboveLeftTile.addClass('cleared')
          }
          if (aboveRightTile.hasClass('mine')==false){
            aboveRightTile.addClass('cleared')
          }
          if (belowTile.hasClass('mine')==false){
            belowTile.addClass('cleared')
          }
          if (belowLeftTile.hasClass('mine')==false){
            belowLeftTile.addClass('cleared')
          }
          if (belowRightTile.hasClass('mine')==false){
            belowRightTile.addClass('cleared')
          }
          //4. revealing the number in adjacent tiles
          if (rightTile.hasClass('adjacent')==true){
            value = rightTile.attr('value')
            rightTile.text(''+value+'')
          }
          if (leftTile.hasClass('adjacent')==true){
            value = leftTile.attr('value')
            leftTile.text(''+value+'')
          }
          if (aboveTile.hasClass('adjacent')==true){
            value = aboveTile.attr('value')
            aboveTile.text(''+value+'')
          }
          if (aboveLeftTile.hasClass('adjacent')==true){
            value = aboveLeftTile.attr('value')
            aboveLeftTile.text(''+value+'')
          }
          if (aboveRightTile.hasClass('adjacent')==true){
            value = aboveRightTile.attr('value')
            aboveRightTile.text(''+value+'')
          }
          if (belowTile.hasClass('adjacent')==true){
            value = belowTile.attr('value')
            belowTile.text(''+value+'')
          }
          if (belowLeftTile.hasClass('adjacent')==true){
            value = belowLeftTile.attr('value')
            belowLeftTile.text(''+value+'')
          }
          if (belowRightTile.hasClass('adjacent')==true){
            value = belowRightTile.attr('value')
            belowRightTile.text(''+value+'')
          }
        }
      }
    }
  })
  $(this).unbind()
  markingMines()
}

function markingMines(){
/// activating the tile the mouse is on
  $('.tile').hover(function(){
    if (game==true){
      if ($(this).hasClass('cleared')==false){
        $(this).addClass('active')
      }
    }} ,function () {
      $(this).removeClass('active')
  })
///marking tile as a mine when pressing space bar and hover on an ('.active') tile
  $(document).keyup(function(e){
    // check keycode
    if (e.keyCode===32){
      $('.tile').each(function(index, el){
        if ($(el).hasClass('active') && $(el).hasClass('marked')){
          $('.active').removeClass('marked')
          $('.active').empty()
        }
        else if($(el).hasClass('active')){
          $('.active').addClass('marked')
          $('.active').append('<img src="http://www.clipartbest.com/cliparts/MiL/a8q/MiLa8qyia.png" width="25" style="position:relative; top:-10px;left:1px">')
        }
      })
    }
    mineCounter()
    winLogic()
  })
}
/// adding a counter that features how many mines are hidden at anytime.
function mineCounter(){
  minesCounter=(($('.mine').length)-($('.marked').length))
  $('#mines-counter').text(minesCounter)
}
//// win logic
///if player marks all the mine tiles, wins!!!
function winLogic(){
  allMarked=true
  $('.mine').each(function(index,el){
    if (!$(el).hasClass('marked')){
      allMarked=false
    }
  })
  if (allMarked==true){
    $('#game-console').hide()
    $('#winner').show()
    game=false
  }
}





