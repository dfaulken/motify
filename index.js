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
  yellow: '',
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
    [ 60,   0],
    [ 80,   0],
    [  0, 200],
    [ 80, 200]
  ]

  //first element: horizontal feet from left side of course
  //second element: vertical feet from top of course
  //third element: width in feet
  //fourth element: height in feet
  //and the final element is the box color,
  //as 'red', 'green', or 'yellow'.
  var boxLocs = [
    [65, 0, 10, 2, 'red'],
  ]

  //draw the cones
  for(var a = 0; a < coneLocs.length; a++){
    //half the size is effectively the radius,
    //and then multiply the coordinates by the foot-pixels multiplier
    var x = MARGIN + coneLocs[a][0] * FEET
    var y = MARGIN + coneLocs[a][1] * FEET
    //initialize a square at the calculated coordinates
    //(square since height and width are both the cone's size)
    var cone = paper.rect(x, y,
      CONE_ATTRS['size'], CONE_ATTRS['size'],
      CONE_ATTRS['radius'])
    cone.attr('fill', CONE_ATTRS['color'])
  }

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
})
