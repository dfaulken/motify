//temp variable for debugging
BUS = null
//number of pixels that counts as 1 foot
FEET = 3
//CSS margin around the paper
LEFT_MARGIN = 100
MARGIN = 25
//width of the canvas, from CSS
CANVAS_WIDTH = 900
//height of the canvas, from CSS
CANVAS_HEIGHT = 400
CONE_ATTRS = {
  color: '#f76f1b',
  //diameter in pixels
  size: 5,
  //haven't figured out what Raphael does with this value yet
  radius: 3
}
BOX_COLORS = {
  red: '#f24d4d',
  yellow: '#f7ea5d',
  green: '#76ce1e'
}
LINE_COLORS = {
  yellow: '#f7ea5d',
  white: '#fff'
}

$(function(){
  var paper_div = $('.paper')
  var paper = Raphael(paper_div.position().left, paper_div.position().top, CANVAS_WIDTH, CANVAS_HEIGHT)

  //first element: starting point in horizontal feet from left side of course
  //second element: starting point in vertical feet from top of course
  //third element: line orientation, 'horizontal' or 'vertical'
  //fourth element: line length in feet
  //fifth element: line color, 'white' or 'yellow'
  var lineData = [
    [  0,  58, 'horizontal', 140, 'solid' ,  'white'],
    [  0,  58, 'vertical'  ,  42, 'solid' ,  'white'],
    [  0,  70, 'horizontal',  60, 'solid' ,  'white'],
    [  0,  85, 'horizontal', 220, 'dashed', 'yellow'],
    [  0, 100, 'horizontal', 220, 'solid' ,  'white'],
    [ 60,  70, 'horizontal',  80, 'dashed',  'white'],
    [140,27.5, 'vertical'  ,30.5, 'solid' ,  'white'],
    [152,27.5, 'vertical'  ,  21, 'solid' ,  'white'],
    [180,  70, 'horizontal',  40, 'solid' ,  'white'],
    [210,  58, 'horizontal',  10, 'solid' ,  'white'],
    [220,  70, 'vertical'  ,  30, 'solid' ,  'white']
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
    [220,  58, 1.5,  12, 'red'   ],
    //alley dock boxes
    [160.5,57.5,2.5,2.5, 'green' ],
    [163.7,68,   2,   3, 'green' ],
    [179.7,68,   2,   3, 'green' ]
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
  //[164,  68],   //is changed from 70 (below) to 68 for alley dock
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
  var cones = drawCones(coneData)

  BUS = drawBus()

  var path = paper.path('M880,181L755,181C705,181,655,217,605,217L215,217').attr('stroke', 'orange')

  $('.buttons').on('click', 'button', function(){
    alert('These buttons are not yet functional. Please check back later.')
  })

  function feetXToPixels(num){
    return LEFT_MARGIN + MARGIN + (num * FEET)
  }

  function feetYToPixels(num){
    return MARGIN + (num * FEET)
  }

  function drawLines(lineLocs){
    for(var a = 0; a < lineLocs.length; a++){
      var x = feetXToPixels(lineLocs[a][0])
      var y = feetYToPixels(lineLocs[a][1])
      //the x and y values to move to
      var to_x, to_y
      if(lineLocs[a][2] == 'horizontal'){
        to_y = y
        to_x = x + lineLocs[a][3] * FEET
      }
      else{
        to_x = x
        to_y = y + lineLocs[a][3] * FEET
      }
      var line = paper.path("M" + x + "," + y + "L" + to_x + "," + to_y)
      if(lineLocs[a][4] == 'dashed'){
        line.attr('stroke-dasharray', '- ')
      }
      line.attr('stroke', LINE_COLORS[lineLocs[a][5]])
    }
  }

  function drawBoxes(boxLocs){
    for(var a = 0; a < boxLocs.length; a++){
      var x = feetXToPixels(boxLocs[a][0]) - 2
      var y = feetYToPixels(boxLocs[a][1]) - 2
      var width = boxLocs[a][2] * FEET
      var height = boxLocs[a][3] * FEET
      var color = BOX_COLORS[boxLocs[a][4]]
      var box = paper.rect(x, y, width, height)
      box.attr('fill', color)
    }
  }

  function drawCones(coneLocs){
    var cones = []
    for(var a = 0; a < coneLocs.length; a++){
      //half the size is effectively the radius,
      //and then multiply the coordinates by the foot-pixels multiplier
      var x = feetXToPixels(coneLocs[a][0]) - (CONE_ATTRS['size'] / 2)
      var y = feetYToPixels(coneLocs[a][1]) - (CONE_ATTRS['size'] / 2)
      //initialize a square at the calculated coordinates
      //(square since height and width are both the cone's size)
      var cone = paper.rect(x, y,
        CONE_ATTRS['size'], CONE_ATTRS['size'],
        CONE_ATTRS['radius'])
      cone.attr('fill', CONE_ATTRS['color'])
      cones[a] = cone
    }
    return cones
  }

  function coneAt(feet_x, feet_y, cones){
    for(var a = 0; a < cones.length; a++){
      //not sure why these are needed, but it works
      var x = LEFT_MARGIN + MARGIN + feet_x * FEET - 2.5
      var y = MARGIN + feet_y * FEET - 2.5
      var attrs = cones[a].getBBox()
      if(x == attrs['x'] && y == attrs['y']){
        return cones[a]
      }
    }
  }

  function drawBus(){
    var bus_x = feetXToPixels(225)
    var bus_y = feetYToPixels(47)
    var bus = paper.rect(bus_x, bus_y, 40 * FEET, 10 * FEET, 4)
    bus.attr('fill', '#fff')
    bus.attr('text', 'BUS')
    return bus
  }
})
