//number of pixels that counts as 1 foot
FEET = 3
//CSS margin around the paper
MARGIN = 25
//width of the canvas, from CSS
CANVAS_WIDTH = 500
//height of the canvas, from CSS
CANVAS_HEIGHT = 700
CONE_ATTRS = {
  color: '#f76f1b',
  //diameter in pixels
  size: 8,
  //haven't figured out what Raphael does with this value yet
  radius: 3
}
BOX_COLORS = {
  red: '#f24d4d',
  yellow: '#f7ea5d',
  green: '#76ce1e'
}
LINE_COLORS = {
  white: '#fff'
}

$(function(){
  var paper = Raphael(MARGIN, MARGIN, CANVAS_WIDTH, CANVAS_HEIGHT)

  //first element: starting point in horizontal feet from left side of course
  //second element: starting point in vertical feet from top of course
  //third element: line orientation, 'horizontal' or 'vertical'
  //fourth element: line length in feet
  var lineData = [
    [  0,   0, 'horizontal',  80],
    [  0,   0, 'vertical'  , 200],
    [  0, 200, 'horizontal',  80],
    [ 60,   0, 'vertical'  , 140],
    [ 80,   0, 'vertical'  , 140],
    [ 80, 140, 'horizontal',  50],
    [ 80, 190, 'vertical'  ,  10],
    [110, 160, 'horizontal',  20]
  ]
  drawLines(lineData)

  //first element: horizontal feet from left side of course
  //second element: vertical feet from top of course
  //third element: width in feet
  //fourth element: height in feet
  //and the final element is the box color,
  //as 'red', 'green', or 'yellow'.
  var boxData = [
    [ 60,   0,  20,   2, 'red'],
    [ 60,  60,  20,   2, 'yellow'],
    [ 60, 140,  20,   2, 'yellow'],
    [ 60, 200,  20,   2, 'red'],
    [ 80, 200,  20,   2, 'green'],
    [130, 140,   2,  20, 'red']
  ]
  drawBoxes(boxData)

  //first element: horizontal feet from left side of course
  //second element: vertical feet from top of course
  //cones will be centered around the point specified here.
  var coneData = [
    [  0,   0],
    [  0,  20],
    [  0,  40],
    [  0,  60],
    [  0,  80],
    [  0, 100],
    [  0, 120],
    [  0, 140],
    [  0, 200],
    [ 60,   0],
    [ 60,  20],
    [ 60,  40],
    [ 60,  60],
    [ 60,  80],
    [ 60, 100],
    [ 60, 120],
    [ 60, 140],
    [ 60, 200],
    [ 70,   0],
    [ 70, 200],
    [ 80,   0],
    [ 80,  20],
    [ 80,  40],
    [ 80,  60],
    [ 80,  80],
    [ 80, 100],
    [ 80, 120],
    [ 80, 140],
    [ 80, 190],
    [ 80, 200],
    [100, 200],
    [110, 140],
    [110, 160],
    [130, 140],
    [130, 150],
    [130, 160]
  ]
  drawCones(coneData)

  function drawBoxes(boxLocs){
    for(var a = 0; a < boxLocs.length; a++){
      var x = MARGIN + boxLocs[a][0] * FEET - 2
      var y = MARGIN + boxLocs[a][1] * FEET - 2
      var width = boxLocs[a][2] * FEET
      var height = boxLocs[a][3] * FEET
      var color = BOX_COLORS[boxLocs[a][4]]
      var box = paper.rect(x, y, width, height)
      box.attr('fill', color)
    }
  }

  function drawCones(coneLocs){
    for(var a = 0; a < coneLocs.length; a++){
      //half the size is effectively the radius,
      //and then multiply the coordinates by the foot-pixels multiplier
      var x = MARGIN - CONE_ATTRS['size'] / 2 + coneLocs[a][0] * FEET
      var y = MARGIN - CONE_ATTRS['size'] / 2 + coneLocs[a][1] * FEET
      //initialize a square at the calculated coordinates
      //(square since height and width are both the cone's size)
      var cone = paper.rect(x, y,
        CONE_ATTRS['size'], CONE_ATTRS['size'],
        CONE_ATTRS['radius'])
      cone.attr('fill', CONE_ATTRS['color'])
    }
  }

  function drawLines(lineLocs){
    for(var a = 0; a < lineLocs.length; a++){
      var x = MARGIN + lineLocs[a][0] * FEET - 1
      var y = MARGIN + lineLocs[a][1] * FEET - 1
      var width, height;
      if(lineLocs[a][2] == 'horizontal'){
        width = lineLocs[a][3] * FEET
        height = 2
      }
      else{
        width = 2
        height = lineLocs[a][3] * FEET
      }
      var line = paper.rect(x, y, width, height)
      line.attr('fill', '#fff')
    }
  }
})
