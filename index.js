//number of pixels that counts as 1 foot
FEET = 3
MARGIN = 25
CANVAS_WIDTH = 500
CANVAS_HEIGHT = 700
CONE_ATTRS = {
  color: '#f76f1b',
  size: 20,
  radius: 3
}

$(function(){
  var paper = Raphael(MARGIN, MARGIN, CANVAS_WIDTH, CANVAS_HEIGHT)
  //where each cone goes, as an array of arrays.
  //first element: horizontal feet from left side of course
  //second element: vertical feet from top of course
  //cones will be centered around the point specified here.
  var coneLocs = [
    [0  , 0  ],
    [100, 0  ],
    [0  , 220],
    [100, 220]
  ]

  for(var a = 0; a < coneLocs.length; a++){
    var x = CONE_ATTRS['size'] / 2 + coneLocs[a][0] * FEET
    var y = CONE_ATTRS['size'] / 2 + coneLocs[a][1] * FEET
    var cone = paper.rect(x, y,
      CONE_ATTRS['size'], CONE_ATTRS['size'],
      CONE_ATTRS['radius'])
    cone.attr('fill', CONE_ATTRS['color'])
  }
})
