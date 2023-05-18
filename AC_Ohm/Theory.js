import React, { useState } from "react";
import img1 from "./1_1.jpg";
import img2 from "./1_equiv.png";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";

export default function Theory() {
  const navigate = useNavigate();
  function back() {
    navigate("/HomeThevenin", {
      replace: true
    });
  }
  function backToMain() {
    navigate("/Thevenin", {
      replace: true
    });
  }
  return (
    <div>
      <div style={{ marginBottom: "10px", marginTop: "10px" }}>
        <button
          className="button-85"
          role="button"
          onClick={() => {
            backToMain();
          }}
        >
          {" "}
          BACK TO MAIN PAGE{" "}
        </button>
      </div>
      <div style={{ marginLeft: "15px" }}>
        <h3>
          <u> Procedure:</u>{" "}
        </h3>
        <p>
          Keep all the Impedances{" "}
          <b>
            (Z<sub>a</sub>, Z<sub>b</sub>, Z<sub>c</sub>, R<sub>L</sub>)
          </b>{" "}
          close to their respective maximum values. Choose any arbitrary value
          of <b>V</b>.{" "}
        </p>
        <h3> Experiment Theory: </h3>
        <b>Step 1:</b>
        <p>
          Disconnect R<sub>L</sub> and find the equivalent R<sub>th</sub> and V
          <sub>th</sub>.
        </p>
        <p>
          <b>Step 2:</b>
        </p>
        <b></b>
        <p>
          the equivalent Z<sub>th</sub> will be found by short circuiting all
          independent voltage sources and open circuiting all current sources.
        </p>
        <p>
          <b>Step 3</b>
          <p>
            Divide V<sub>th</sub> by sum of R<sub>4</sub> and Z<sub>th</sub> to
            obtain I<sub>th</sub>. This is the required current through the
            circuit.
          </p>
        </p>
        <p>
          <b>Step 4</b>
          <p>
            Compare I<sub>th</sub> with I<sub>l</sub> , if both are equal this
            verifies Thevenin's theorem
          </p>
        </p>
        N.B.:- All the Impedances are in ohms.<p> </p>
      </div>
    </div>
  );
}
