(function () {

  var masthead = document.querySelector('.Canvas');
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var width = masthead.clientWidth;
  var height = masthead.clientHeight * 3;
  var i = 0;
  var active = false;
  var COUNT = width;

  function onResize() {
    width = masthead.clientWidth;
    height = masthead.clientHeight *3;
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = '#FFF';

    var wasActive = active;
    active = width > 200;

    if (!wasActive && active)
      requestAnimFrame(update);
    }

  var Snowflake = function () {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
    this.r = 0;

    this.reset();
  }

  Snowflake.prototype.reset = function() {
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.vy = 1 + Math.random() * 3;
    this.vx = 0.5 - Math.random();
    this.r = 1 + Math.random() * 2;
    this.o = 0.5 + Math.random() * 0.5;
  };

  var snowflakes = [], snowflake;
  for (i = 0; i < COUNT; i++) {
    snowflake = new Snowflake();
    snowflakes.push(snowflake);
  }

  function update() {

    ctx.clearRect(0, 0, width, height);

    if (!active)
      return;

    for (i = 0; i < COUNT; i++) {
      p = snowflakes[i];
      p.y += p.vy;
      p.x += p.vx;
      var pr = p.r*4;
      ctx.globalAlpha = p.o;
      ctx.beginPath();
      //ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
        ctx.moveTo(p.x + 3, p.y + 0);//00 00 top-left
        ctx.lineTo(p.x + 0,p.y+pr -6);//00 10 bot-left
        ctx.lineTo(p.x+pr -6, p.y+pr);//10 10 bot-rite
        ctx.lineTo(p.x + pr, p.y + 3);//10 00 top-rite
      ctx.closePath();
      ctx.fill();

      if (p.y > height) {
        p.reset();
      }
    }

    requestAnimFrame(update);
  }

  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  onResize();
  window.addEventListener('resize', onResize, false);

  masthead.appendChild(canvas);
})();