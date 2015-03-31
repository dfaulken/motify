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
  size: 20,
  //haven't figured out what Raphael does with this value yet
  radius: 3
}

$(function(){
  var paper = Raphael(MARGIN, MARGIN, CANVAS_WIDTH, CANVAS_HEIGHT)

  //where each cone goes, as an array of arrays.
  //first element: horizontal feet from left side of course
  //second element: vertical feet from top of course
  //cones will be centered around the point specified here.
  var coneLocs = [
    [  0,   0],
    [ 80,   0],
    [  0, 220],
    [ 80, 220]
  ]

  //draw the cones
  for(var a = 0; a < coneLocs.length; a++){
    //half the size is effectively the radius,
    //and then multiply the coordinates by the foot-pixels multiplier
    var x = CONE_ATTRS['size'] / 2 + coneLocs[a][0] * FEET
    var y = CONE_ATTRS['size'] / 2 + coneLocs[a][1] * FEET
    //initialize a square at the calculated coordinates
    //(square since height and width are both the cone's size)
    var cone = paper.rect(x, y,
      CONE_ATTRS['size'], CONE_ATTRS['size'],
      CONE_ATTRS['radius'])
    cone.attr('fill', CONE_ATTRS['color'])
  }
})
