import React, { useEffect } from "react";

export default function Phasor(props) {
  useEffect(() => {
    window.requestAnimationFrame(draw);
    // spirograph();
  });
  function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color) {
    //variables to be used when creating the arrow
    var headlen = 10;
    var angle = Math.atan2(toy - fromy, tox - fromx);

    ctx.save();
    ctx.strokeStyle = color;

    //starting path of the arrow from the start square to the end square
    //and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = arrowWidth;
    ctx.stroke();

    //starting a new path from the head of the arrow to one of the sides of
    //the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(
      tox - headlen * Math.cos(angle - Math.PI / 7),
      toy - headlen * Math.sin(angle - Math.PI / 7)
    );

    //path from the side point of the arrow, to the other side point
    ctx.lineTo(
      tox - headlen * Math.cos(angle + Math.PI / 7),
      toy - headlen * Math.sin(angle + Math.PI / 7)
    );

    //path from the side point back to the tip of the arrow, and then
    //again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(
      tox - headlen * Math.cos(angle - Math.PI / 7),
      toy - headlen * Math.sin(angle - Math.PI / 7)
    );

    //draws the paths created above
    ctx.stroke();
    ctx.restore();
  }
  function showAxes(ctx, x, y, color) {
    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    // var x=-100; var y=100;
    var x1 = width / 2;
    var y1 = height / 2 + 7;
    var x2 = x + x1;
    var y2 = y1 - y;

    ctx.beginPath();
    ctx.strokeStyle = color;
    if (!(x1 == x2 && y1 == y2)) drawArrow(ctx, x1, y1, x2, y2, 5, color);
    // X-Axis
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 5;
    ctx.stroke();
  }

  function draw() {
    var canvas = document.getElementById("canvas1");
    var context = canvas.getContext("2d");
    var width = context.canvas.width;
    var height = context.canvas.height;
    var vr = props.vr;
    var vl = props.vl;
    var vc = props.vc;
    context.clearRect(0, 0, width, height);
    showAxes(context, vr, 0, "purple");
    showAxes(context, 0, -1 * vc, "green");
    showAxes(context, 0, vl, "red");
    showAxes(context, vr, vl - vc, "orange");
    context.save();

    // plotSine(context, step, 0.5);
    context.restore();
  }

  return (
    <div>
      <div
        style={{
          marginRight: "0px",
          marginLeft: "170px",
          marginBottom: "30px"
        }}
      >
        {/* <h3> {props.frequency}</h3> */}
        {/* <h3> {props.amplitude}</h3> */}

        {/* <h6 style={{ color: "darkgreen" }}> Input_Voltage </h6>
        <h6 style={{ color: "rgb(666,44,5)" }}>
          {" "}
          Output_current(Multiplication_factor=10){" "}
        </h6> */}
      </div>
      <div>
        <canvas id="canvas1" width="720" height="720"></canvas>
      </div>

      {/* <h3>Input voltage & Output current Wave</h3> */}
    </div>
  );
}
