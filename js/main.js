
var board        = $('#board')
var rows         = $('#row-button').val()
var columns      = $('#column-button').val()
var level        = false
var minesCounter = 0
var allMarked    = false
var game         = true

/// Setup Panel
// Select number of rows and columns
$('.button').on('click', function () {
  var button     = $(this)
  var oldValue   = button.parent().find('input').val()
  // Add 1 everytime the button is clicked
  if(button.text()=="+"){
    var newValue = parseFloat(oldValue)+1
  }
  else if (button.text()=="-"){
    // Subtracs one everytime the button is clicked
    var newValue=parseFloat(oldValue)-1
  }
  button.parent().find('input').val(newValue)
})
// Creates the board and goes to game screen
$('#submit').on('click', function() {
  rows    = $('#row-button').val()
  columns = $('#column-button').val()
  level   = $('#level-button').val()
  boardGenerator(rows,columns)
  $('#game-console').show()
  $('#setup-panel').hide()
  $(this).unbind()
})
/// Board Generation
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
    numberOfMines  = tenPercent
  }
  if (level == 'medium'){
    var twentyFivePercent = Math.round(((rows*columns)*25)/100)
    numberOfMines         = twentyFivePercent
  }
  if (level == 'hard'){
    var fiftyPercent = Math.round(((rows*columns)*50)/100)
    numberOfMines    = fiftyPercent
  }
  var i = 0
  while (i <numberOfMines){
    var randomRow    = Math.floor(Math.random()*rows)
    var randomColumn = Math.floor(Math.random()*columns)
    var mine         = $('#row'+randomRow).find('.col'+randomColumn)
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
    var rowNumber       = parseInt(row.match(/\d+/)[0],10)
    var column          = $(this).attr('class')
    var colNumber       = parseInt(column.match(/\d+/)[0],10)
    var rightTile       = $('#row'+rowNumber).find('.col'+(colNumber+1))
    var leftTile        = $('#row'+rowNumber).find('.col'+(colNumber-1))
    var aboveTile       = $('#row'+(rowNumber-1)).find('.col'+colNumber)
    var aboveLeftTile   = $('#row'+(rowNumber-1)).find('.col'+(colNumber-1))
    var aboveRightTile  = $('#row'+(rowNumber-1)).find('.col'+(colNumber+1))
    var belowTile       = $('#row'+(rowNumber+1)).find('.col'+colNumber)
    var belowLeftTile   = $('#row'+(rowNumber+1)).find('.col'+(colNumber-1))
    var belowRightTile  = $('#row'+(rowNumber+1)).find('.col'+(colNumber+1))
    var neighbors       = [rightTile, leftTile, aboveTile, aboveLeftTile, aboveRightTile, belowTile, belowLeftTile, belowRightTile]
    var n               = 0
    neighbors.forEach(function(index,el){
      if ($(index).hasClass('mine')==true){
        n++
      }
    })
    $(this).attr('value',''+n+'')
  })
  play()
  minesCounter = $('.mine').length
  $('#mines-counter').html(minesCounter)
  $('#restart').click(function() {
    location.reload()
  })
};


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
          $('span').hide()
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
          var neighbors=[rightTile,leftTile,aboveTile,aboveLeftTile,aboveRightTile,belowTile,belowLeftTile,belowRightTile]
          neighbors.forEach(function(index,el){
            if($(index).not('.marked').not('.mine').not('.adjacent').not('.cleared').length > 0) {
              safeTiles.push($(index).not('.marked').not('.mine').not('.adjacent').not('.cleared'))
            }
          })
          //3. revealing all unrevealed neighbors
          neighbors.forEach(function(index,el){
            if ($(index).hasClass('mine')==false){
              $(index).addClass('cleared')
            }
          })
          //4. revealing the number in adjacent tiles
          neighbors.forEach(function(index,el){
            if ($(index).hasClass('adjacent')){
              value=$(index).attr('value')
              $(index).text(''+value+'')
            }
          })
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
///if player marks all the mine tiles, wins. disable the game and show winning massages.!!!
function winLogic(){
  allMarked=true
  console.log($('.mine'))
  $('.mine').each(function(index,el){
    if (!$(el).hasClass('marked')){
      allMarked=false
    }
  })
  if (allMarked==true){
    $('#game-console').hide()
    $('span').hide()
    $('#winner').show()
    game=false
  }
}





