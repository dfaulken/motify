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
  size: 10,
  //haven't figured out what Raphael does with this value yet
  radius: 3
}
BOX_COLORS = {
  red: '#f24d4d',
  yellow: '#f7ea5d',
  green: ''
}

$(function(){
  var paper = Raphael(MARGIN, MARGIN, CANVAS_WIDTH, CANVAS_HEIGHT)

  //where each cone goes, as an array of arrays.
  //first element: horizontal feet from left side of course
  //second element: vertical feet from top of course
  //cones will be centered around the point specified here.
  var coneLocs = [
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
    [ 70,   0],
    [ 80,   0],
    [ 80,  20],
    [ 80,  40],
    [ 80,  60],
    [ 80,  80],
    [ 80, 100],
    [ 80, 120],
    [ 80, 140],
    [ 80, 200]
  ]

  //first element: horizontal feet from left side of course
  //second element: vertical feet from top of course
  //third element: width in feet
  //fourth element: height in feet
  //and the final element is the box color,
  //as 'red', 'green', or 'yellow'.
  var boxLocs = [
    [60,   2,  20,   2, 'red'],
    [60,  59,  20,   2, 'yellow'],
    [60, 139,  20,   2, 'yellow'] 
  ]

  //draw the boxes
  for(var a = 0; a < boxLocs.length; a++){
    var x = MARGIN + boxLocs[a][0] * FEET
    var y = MARGIN + boxLocs[a][1] * FEET
    var width = boxLocs[a][2] * FEET
    var height = boxLocs[a][3] * FEET
    var color = BOX_COLORS[boxLocs[a][4]]
    var box = paper.rect(x, y, width, height)
    box.attr('fill', color)
  }

  //draw the cones
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
})
