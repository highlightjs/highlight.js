// This was mis-detected as HSP and Perl because parsing of
// keywords in those languages allowed adjacent dots

window.requestAnimationFrame(function render() {
  var pos = state.pos;

  canvasEl.width = 500;
  canvasEl.height = 300;

  if (dpad.right) {
    pos.x += 3;
  } else if (dpad.left) {
    pos.x -= 3;
  }

  ctx.fillStyle = '#AF8452';
  ctx.fillRect(pos.x + 5, pos.y - 10, 10, 10);

  window.requestAnimationFrame(render);
});
