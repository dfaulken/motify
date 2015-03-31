//number of pixels that counts as 1 foot
FEET = 3
//CSS margin around the paper
LEFT_MARGIN = 50
MARGIN = 25
//width of the canvas, from CSS
CANVAS_WIDTH = 900
//height of the canvas, from CSS
CANVAS_HEIGHT = 400
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
  //fifth element: line color, 'white' or 'yellow'
  var lineData = [
    [  0,  58, 'horizontal', 140, 'white'],
    [  0,  58,   'vertical',  42, 'white'],
    [  0,  70, 'horizontal',  60, 'white'],
    [  0, 100, 'horizontal', 220, 'white'],
    [140,27.5,   'vertical',30.5, 'white'],
    [152,27.5,   'vertical',  21, 'white'],
    [180,  70, 'horizontal',  40, 'white'],
    [210,  58, 'horizontal',  10, 'white'],
    [220,  70,   'vertical',  30, 'white']
  ]
  drawLines(lineData)

  //first element: horizontal feet from left side of course
  //second element: vertical feet from top of course
  //third element: width in feet
  //fourth element: height in feet
  //fifth element: box color, as 'red', 'green', or 'yellow'.
  var boxData = [
    [  0,  58, 1.5,  12, 'red'   ],
    [ 60,  58, 1.5,  12, 'yellow'],
    [140,27.5,  12, 1.5, 'red'   ],
    [140,  58, 1.5,  12, 'yellow'],
    [220,  46, 1.5,  12, 'green' ],
    [220,  58, 1.5,  12, 'red'   ]
  ]
  drawBoxes(boxData)

  //first element: horizontal feet from left side of course
  //second element: vertical feet from top of course
  //cones will be centered around the point specified here.
  var coneData = [
    [  0,  58],
    [  0,  64],
    [  0,  70],
    [  0, 100],
    [ 20,  58],
    [ 20,  70],
    [ 20, 100],
    [ 40,  58],
    [ 40,  70],
    [ 40, 100],
    [ 60,  58],
    [ 60,  70],
    [ 60, 100],
    [ 80,  58],
    [ 80,  70],
    [ 80, 100],
    [100,  58],
    [100,  70],
    [100, 100],
    [120,  58],
    [120,  70],
    [120, 100],
    [140,27.5],
    [140,37.5],
    [140,48.5],
  //[139,  58],   //is changed from 140 (2 below) to 139 for alley dock
  //[139,  70],   //is changed from 140 (2 below) to 139 for alley dock
    [140,  58],
    [140,  70],
    [140, 100],
    [146,27.5],
    [146, 100],
    [152,27.5],
    [152,37.5],
    [152,48.5],
    [160, 100],
    [161,  58],
    //[164,  68],  //is changed from 70 (below) to 68 for alley dock
    [164,  70],
    [180,  70],
    [180, 100],
    [200, 100],
    [220,  46],
    [210,  58],
    [220,  58],
    [220,  70],
    [220, 100]
  ]
  drawCones(coneData)

  function drawLines(lineLocs){
    for(var a = 0; a < lineLocs.length; a++){
      var x = LEFT_MARGIN + MARGIN + lineLocs[a][0] * FEET - 1
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
      line.attr('fill', LINE_COLORS[lineLocs[a][4]])
    }
  }

  function drawBoxes(boxLocs){
    for(var a = 0; a < boxLocs.length; a++){
      var x = LEFT_MARGIN + MARGIN + boxLocs[a][0] * FEET - 2
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
      var x = LEFT_MARGIN + MARGIN - CONE_ATTRS['size'] / 2 + coneLocs[a][0] * FEET
      var y = MARGIN - CONE_ATTRS['size'] / 2 + coneLocs[a][1] * FEET
      //initialize a square at the calculated coordinates
      //(square since height and width are both the cone's size)
      var cone = paper.rect(x, y,
        CONE_ATTRS['size'], CONE_ATTRS['size'],
        CONE_ATTRS['radius'])
      cone.attr('fill', CONE_ATTRS['color'])
    }
  }
})
