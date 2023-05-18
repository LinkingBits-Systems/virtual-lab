import React, { useState } from "react";
import img1 from "./basiccircuit.png";
import image from "./axis.jpeg";
import img from "./AC_CIRCUIT.jpeg";
import Result from "./Results";
// import "./styles3.css";
import Phasor from "../Phasor/phasor";

import { useNavigate, useLocation } from "react-router-dom";
// import "./styles3.css";
// import {  } from 'react-router-dom'
import { Link } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  var vl = 100;
  // var vl=100;
  var vc = 200,
    vr = 100;
  function backToMain() {
    navigate("/HomeExample", {
      replace: true
    });
  }
  return (
    // <h1>hello wolrd</h1>
    <div>
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
      <div style={{ textAlign: "center" }}>
        {/* <h1> INVALID DATA </h1>
    <div
      className="fas fa-exclamation-triangle"
      style={{ fontsize: "48px", color: "red" }}
    ></div>
    <h1 style={{ color: "red", fontsize: "100px" }}>
      {" "}
      PLEASE UPDATE THE VALUE OF RESISTANCE (RESISTANCE CANNOT BE EQUAL TO
      ZERO){" "}
    </h1> */}
        <div className="phasor box2">
          <div
            style={{
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: 750,
              backgroundPositionX: 40
              //  marginLeft: 10
              // background-size: 75% 50%
            }}
            // className="phasor box2"
          >
            {/* <div> */}
            <Phasor
              vr={vr}
              vc={vc}
              vl={vl}
              // amplitude={currentState.voltage}
              //frequency={currentState.frequency}
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
