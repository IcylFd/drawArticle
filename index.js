window.onload=function(){
  var position = { x: 0, y: window.innerHeight / 2 };
  var counter = 0;
  var letters = 'abcsd, denke, lirjgflsbngl. ';
 
  var canvas;
  var context;
  var mouse = { x: 0, y: 0, down: false }

  // 到结尾标志变量
  // var isEnd = false
 
  function init() {
    // 获取画布
    canvas = document.getElementById('canvas');

    // 获取canvas上下文环境
    context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 绑定canvas事件
    canvas.addEventListener('mousemove', mouseMove, false);
    canvas.addEventListener('mousedown', mouseDown, false);
    canvas.addEventListener('mouseup', mouseUp, false);
    canvas.addEventListener('mouseout', mouseUp, false);
    
    window.onresize = function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }
 
  function mouseMove(ev) {
    var oEvent = event || ev;
    mouse.x = oEvent.pageX;
    mouse.y = oEvent.pageY;
    // !isEnd && draw();
    draw();
  }
 
  function draw() {
    if (mouse.down) {
      var d = distance(position, mouse);
      var fontSize = 14;
      var letter = letters[counter];
      var stepSize = textWidth(letter, 20);
 
      if (d > stepSize) {
        // 鼠标旋转弧度值
        var angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);
 
        context.font = fontSize + 'px Georgia';
 
        context.save();
        context.translate(position.x + 1, position.y);
        context.rotate(angle);
        context.fillText(letter, 0, 0);
        context.restore();
 
        counter++;

        // 到结尾从头开始
        if (counter > letters.length - 1) {
          counter = 0;
        }

        // 到结尾不从头开始，直接结束，用下面这个
        // if (counter > letters.length - 1) {
        //   isEnd = true
        // }
 
        position.x = position.x + Math.cos(angle) * stepSize + 2;
        position.y = position.y + Math.sin(angle) * stepSize;
      }
    }
  }
 
  function distance(pt, pt2) {
    var xs = 0;
    var ys = 0;
 
    xs = pt2.x - pt.x;
    xs = xs * xs;
 
    ys = pt2.y - pt.y;
    ys = ys * ys;
 
    return Math.sqrt(xs + ys);
  }

  function mouseDown(ev) {
    var oEvent = ev || event
    mouse.down = true;
    position.x = oEvent.pageX;
    position.y = oEvent.pageY;
  }
 
  function mouseUp() {
    mouse.down = false;
  }
  
  
  // 设置文字大小
  function textWidth(string, size) {
    context.font = size + 'px Georgia';
    if (context.fillText) {
      return context.measureText(string).width;
    } else if (context.mozDrawText) {
      return context.mozMeasureText(string);
    }
  }

  init();
}