import React, { useState } from "react";
import "./styleth.css";
// import img1 from "./1_1.jpg";
import img1 from "./Main_circuit.png";
import img2 from "./1_equiv.png";
import img3 from "./rth.png";
import img4 from "./vth.png";
import img5 from "./circuit(6).png";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
import Slider1 from "./Slider1";
import BasicTable from "./Table";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Complex from "complex.js";
import TheoryThevenin from "./Theory.js";

import SineWaves from "../sinewave/SineWaves";
import OutputCurrent from "../sinewave/OutputCurrent.js";

export default function Home() {
  //console.log((3 * 4) / (3 + 4));

  const navigate = useNavigate();

  var [currentState, setState] = useState({
    infinite: "INFINITE",
    div: 0,
    // Resistance: 0,
    frequency: 0,
    // inductance: 0,
    // capacitance: 0,
    // impedance: 0,
    za: 0,
    zb: 0,
    zc: 0,
    ia: 0,
    ib: 0,
    ic: 0,
    rLoad: 0,
    current_mag: 0,
    temp_cur: 0,
    phase: "NOT DEFINED",
    rth: 0,
    voltage: 0,
    voltageL: 0,
    voltage_th: 0,
    equivalent_r: 0,
    loadcurrent: 0,
    loadcurrent_th: 0,
    data1: [],
    data2: [],
    columns1: [
      {
        Header: "Vin",
        accessor: "voltage" // accessor is the "key" in the data
      },

      {
        Header: "Zeq",
        accessor: "equivalent_r"
      },

      // {
      //   Header: "voltage(Load)",
      //   accessor: "voltageL"
      // },
      {
        Header: "R(Load)",
        accessor: "rLoad"
      },
      {
        Header: "I(Load)",
        accessor: "loadcurrent" // accessor is the "key" in the data
      }
    ],
    columns2: [
      {
        Header: "Vth",
        accessor: "voltage_th"
      },
      {
        Header: "Zth",
        accessor: "rth"
      },
      {
        Header: "R(Load)",
        accessor: "rLoad"
      },
      {
        Header: "Ith(Load)",
        accessor: "loadcurrent_th"
      }
    ]
  });

  function theory() {
    navigate("/TheoryThevenin", {
      replace: true
    });
  }
  // function calculateEquivalentImpedance(
  //   resistance,
  //   capacitance,
  //   inductance,
  //   frequency
  // ) {
  //   if (frequency == 0) return resistance;
  //   const angularFrequency = 2 * Math.PI * frequency;
  //   const impC = 1 / (angularFrequency * capacitance);
  //   const parallelImpedance = (resistance * impc) / (impc + resistance);
  //   const seriesImpedance = angularFrequency * inductance;
  //   const equivalentImpedance = Math.sqrt(
  //     Math.pow(seriesImpedance, 2) + Math.pow(parallelImpedance, 2)
  //   );
  //   return equivalentImpedance;
  // }

  function fnr1(event) {
    return Number(event);
  }

  function fnr2(event) {
    return Number(event);
  }

  function fnr3(event) {
    return Number(event);
  }

  function fnr4(event) {
    return Number(event);
  }

  function fnvoltage(event) {
    return Number(event);
  }

  function fnparallel(r1, r2) {
    return (r1 * r2) / (r1 + r2);
  }
  // function impedanceC(c, f) {
  //   return (r1 * r2) / (r1 + r2);
  // }

  function fnrth(parallel, r3) {
    return (isNaN(parallel) ? 0 : parallel) + r3;
  }

  function fnvth(voltage, r2, r1) {
    return isNaN((voltage * r2) / (r1 + r2))
      ? voltage
      : (voltage * r2) / (r1 + r2);
  }

  function fnloadcurrent_th(vth, rth, r4) {
    return isNaN(vth / (rth + r4))
      ? vth === 0
        ? "Not defined"
        : "infinite"
      : vth / (rth + r4);
  }

  function fnequivalent_r(r1, r2, r3, r4) {
    return (
      r1 +
      (isNaN((r2 * (r3 + r4)) / (r2 + r3 + r4))
        ? 0
        : (r2 * (r3 + r4)) / (r2 + r3 + r4))
    );
  }

  function fnloadcurrent(voltage, r2, equivalent_r, r3, r4) {
    return isNaN((voltage * r2) / (equivalent_r * (r2 + r3 + r4)))
      ? voltage === 0
        ? "Not defined"
        : "Infinite"
      : (voltage * r2) / (equivalent_r * (r2 + r3 + r4));
  }

  function handleUpdateVoltage(event) {
    var voltage = fnvoltage(event);
    currentState.voltage = event;
    calculate();
    calculate2();
    setState((prevState) => {
      return {
        ...prevState,
        voltage: event
        //  current: event / (currentState.rth + currentState.r4)
      };
    });
  }

  function handleUpdatefrequency(event) {
    var frequency = Number(event);
    currentState.frequency = event;
    calculate();
    calculate2();
    setState((prevState) => {
      return {
        ...prevState,
        frequency: event
      };
    });
  }
  function handleUpdate1(event) {
    var za = Number(event);
    currentState.za = event;
    calculate();
    calculate2();
    setState((prevState) => {
      return {
        ...prevState,
        za: event
      };
    });
  }
  function handleUpdate2(event) {
    var zb = Number(event);
    currentState.zb = event;
    calculate();
    calculate2();
    setState((prevState) => {
      return {
        ...prevState,
        zb: event
      };
    });
  }
  function handleUpdate3(event) {
    var zc = Number(event);
    currentState.zc = event;
    calculate();
    calculate2();
    setState((prevState) => {
      return {
        ...prevState,
        zc: event
      };
    });
  }
  function handleUpdatei1(event) {
    var ia = Number(event);
    currentState.ia = event;
    calculate();
    calculate2();
    setState((prevState) => {
      return {
        ...prevState,
        ia: event
      };
    });
  }
  function handleUpdatei2(event) {
    var ib = Number(event);
    currentState.ib = event;
    calculate();
    calculate2();
    setState((prevState) => {
      return {
        ...prevState,
        ib: event
      };
    });
  }
  function handleUpdatei3(event) {
    var ic = Number(event);
    currentState.ic = event;
    calculate();
    calculate2();
    setState((prevState) => {
      return {
        ...prevState,
        ic: event
      };
    });
  }
  function handleUpdateLoad(event) {
    var Rl = Number(event);
    // const Ia = Complex(currentState.za, currentState.ia);
    // const Ib = Complex(currentState.zb, currentState.ib);
    // const result = Ia.add(Ib).re;

    currentState.rLoad = event;

    setState((prevState) => {
      return {
        ...prevState,
        rLoad: event
      };
    });
    calculate();
    calculate2();
  }
  // function handleUpdater1(event) {
  //   var r1 = Number(event);
  //   var r2 = Number(currentState.r2);
  //   var r3 = Number(currentState.r3);
  //   var r4 = Number(currentState.r4);
  //   var voltage = Number(currentState.voltage);
  //   var parallel = fnparallel(r1, r2);
  //   var rth = fnrth(parallel, r3);
  //   var vth = fnvth(voltage, r2, r1);
  //   var loadcurrent_th = fnloadcurrent_th(vth, rth, r4);
  //   var equivalent_r = fnequivalent_r(r1, r2, r3, r4);
  //   var loadcurrent = fnloadcurrent(voltage, r2, equivalent_r, r3, r4);
  //   console.log(rth + "rth");
  //   console.log(parallel + "parallel");
  //   console.log(event + "r1");
  //   console.log(currentState.r2 + "r2");
  //   console.log(currentState.r3 + "r3");

  //   setState((prevState) => {
  //     return {
  //       ...prevState,
  //       r1: event,
  //       rth: rth,
  //       voltage: voltage,
  //       voltage_th: vth,
  //       loadcurrent: loadcurrent,
  //       loadcurrent_th: loadcurrent_th,

  //       equivalent_r: equivalent_r
  //     };
  //   });
  // }

  // function handleUpdater2(event) {
  //   var r1 = Number(currentState.r1);
  //   var r2 = Number(event);
  //   var r3 = Number(currentState.r3);
  //   var r4 = Number(currentState.r4);
  //   var voltage = Number(currentState.voltage);
  //   var parallel = fnparallel(r1, r2);
  //   var rth = fnrth(parallel, r3);
  //   var vth = fnvth(voltage, r2, r1);
  //   var loadcurrent_th = fnloadcurrent_th(vth, rth, r4);
  //   var equivalent_r = fnequivalent_r(r1, r2, r3, r4);
  //   var loadcurrent = fnloadcurrent(voltage, r2, equivalent_r, r3, r4);
  //   console.log(rth + "rth");
  //   console.log(parallel + "parallel");
  //   console.log(currentState.r1 + "r1");
  //   console.log(event + "r2");
  //   console.log(currentState.r3 + "r3");
  //   setState((prevState) => {
  //     return {
  //       ...prevState,
  //       r2: event,
  //       rth: rth,
  //       voltage: voltage,
  //       voltage_th: vth,
  //       loadcurrent: loadcurrent,
  //       loadcurrent_th: loadcurrent_th,
  //       equivalent_r: equivalent_r
  //       // current: currentState.voltage / (rth + currentState.r4)
  //     };
  //   });
  // }

  // function handleUpdater3(event) {
  //   var r1 = Number(currentState.r1);
  //   var r2 = Number(currentState.r2);
  //   var r3 = Number(event);
  //   var r4 = Number(currentState.r4);
  //   var voltage = Number(currentState.voltage);
  //   var parallel = fnparallel(r1, r2);
  //   var rth = fnrth(parallel, r3);
  //   var vth = fnvth(voltage, r2, r1);
  //   var loadcurrent_th = fnloadcurrent_th(vth, rth, r4);
  //   var equivalent_r = fnequivalent_r(r1, r2, r3, r4);
  //   var loadcurrent = fnloadcurrent(voltage, r2, equivalent_r, r3, r4);
  //   console.log(rth + "rth");
  //   console.log(parallel + "parallel");
  //   console.log(currentState.r1 + "r1");
  //   console.log(currentState.r2 + "r2");
  //   console.log(event + "r3");
  //   setState((prevState) => {
  //     return {
  //       ...prevState,
  //       r3: event,
  //       rth: rth,
  //       voltage: voltage,
  //       voltage_th: vth,
  //       loadcurrent: loadcurrent,
  //       loadcurrent_th: loadcurrent_th,
  //       equivalent_r: equivalent_r

  //       // current: currentState.voltage / (rth + currentState.r4)
  //     };
  //   });
  // }

  // function handleUpdater4(event) {
  //   var r1 = Number(currentState.r1);
  //   var r2 = Number(currentState.r2);
  //   var r3 = Number(currentState.r3);
  //   var r4 = Number(event);
  //   var voltage = Number(currentState.voltage);
  //   var parallel = fnparallel(r1, r2);
  //   var rth = fnrth(parallel, r3);
  //   var vth = fnvth(voltage, r2, r1);
  //   var loadcurrent_th = fnloadcurrent_th(vth, rth, r4);
  //   var equivalent_r = fnequivalent_r(r1, r2, r3, r4);
  //   var loadcurrent = fnloadcurrent(voltage, r2, equivalent_r, r3, r4);
  //   setState((prevState) => {
  //     return {
  //       ...prevState,
  //       r4: event,
  //       rth: rth,
  //       voltage: voltage,
  //       voltage_th: vth,
  //       loadcurrent: loadcurrent,
  //       loadcurrent_th: loadcurrent_th,
  //       equivalent_r: equivalent_r

  //       // current: currentState.voltage / (rth + event)
  //     };
  //   });
  // }

  function backToMain() {
    navigate("/Home", {
      replace: true
    });
  }

  function addData() {
    var data1 = [
      ...currentState.data1,
      {
        loadcurrent: currentState.loadcurrent.toString(),

        voltageL: currentState.voltageL.toString(),

        equivalent_r: currentState.equivalent_r.toString(),
        rLoad: currentState.rLoad,
        voltage: currentState.voltage,
        r1: currentState.r1,
        r2: currentState.r2,
        r3: currentState.r3,
        r4: currentState.r4
      }
    ];

    // var data2 = [
    //   ...currentState.data2,
    //   {
    //     loadcurrent_th: currentState.loadcurrent_th.toString(),
    //     voltage_th: currentState.voltage_th.toString(),
    //     rth: currentState.rth.toString()
    //   }
    // ];
    setState((prevState) => {
      return {
        ...prevState,
        data1: [...data1]
        // data2: [...data2]
      };
    });
  }
  function addData2() {
    // var data1 = [
    //   ...currentState.data1,
    //   {
    //     loadcurrent: currentState.loadcurrent.toString(),

    //     voltageL: currentState.voltageL.toString(),

    //     equivalent_r: currentState.equivalent_r.toString(),
    //     rLoad: currentState.rLoad,
    //     r1: currentState.r1,
    //     r2: currentState.r2,
    //     r3: currentState.r3,
    //     r4: currentState.r4
    //   }
    // ];

    var data2 = [
      ...currentState.data2,
      {
        rLoad: currentState.rLoad,
        loadcurrent_th: currentState.loadcurrent_th.toString(),
        voltage_th: currentState.voltage_th.toString(),
        rth: currentState.rth.toString()
      }
    ];
    setState((prevState) => {
      return {
        ...prevState,
        // data1: [...data1],
        data2: [...data2]
      };
    });
  }

  function changeDiv(event) {
    var temp = 0;
    for (var i = 0; i <= options.length; i++) {
      if (options[i] == event.value) temp = i;
    }
    setState((prevState) => {
      return {
        ...prevState,
        div: temp
      };
    });
  }
  function setPrecision(complex) {
    var precision = 2;
    // const { re, im } = complex;
    const roundedRe = complex.re;
    const roundedIm = complex.im;
    return Complex(
      Number(roundedRe).toFixed(precision),
      Number(roundedIm).toFixed(precision)
    );
  }
  // function calculate() {
  //   const Ia = Complex(Number(currentState.za), Number(currentState.ia));
  //   const Ib = Complex(Number(currentState.zb), Number(currentState.ib));
  //   const Ic = Complex(Number(currentState.zc), Number(currentState.ic));
  //   const voltage = currentState.voltage;
  //   const vol = Complex(Number(voltage), 0);
  //   const numerator = Ia.mul(Ib).add(Ib.mul(Ic)).add(Ia.mul(Ic));
  //   const denominator = Ia.add(Ic);

  //   const result = numerator.div(denominator);

  //   currentState.rth = setPrecision(result);
  //   const numeratorvth = new Complex(voltage, 0).mul(Ic);
  //   const denominatorvth = Ia.add(Ic);
  //   const rthCurr = vol.div(result);
  //   currentState.voltage_th = setPrecision(numeratorvth.div(denominatorvth));

  //   const voltage_th = currentState.voltage_th;
  //   const rth = currentState.rth;
  //   const rLoad = currentState.rLoad;

  //   const denominatorI = rth.add(rLoad);
  //   const resultI = voltage_th.div(denominatorI);
  //   const magnitude = Number(resultI.abs());
  //   console.log("nikita 1 value of result"+resultI.re+resultI.im);
  //   const angle = resultI.arg();
  //   setState((prevState) => ({
  //     ...prevState,
  //     loadcurrent_th: setPrecision(resultI),
  //     current_mag: magnitude,
  //     phase: setPrecision(angle),
  //     temp_cur: setPrecision(rthCurr)
  //   }));
  //   return result;
  // }
  function calculate() {
    const Ia = Complex(Number(currentState.za), Number(currentState.ia));
    const Ib = Complex(Number(currentState.zb), Number(currentState.ib));
    const Ic = Complex(Number(currentState.zc), Number(currentState.ic));
    const voltage = currentState.voltage;
    const vol = Complex(Number(voltage), 0);
    const numerator = Ia.mul(Ib).add(Ib.mul(Ic)).add(Ia.mul(Ic));
    const denominator = Ia.add(Ic);

    const result = numerator.div(denominator);
    const rthCurr = vol.div(result);
    currentState.rth = result;
    const numeratorvth = new Complex(voltage, 0).mul(Ic);
    const denominatorvth = Ia.add(Ic);

    currentState.voltage_th = numeratorvth.div(denominatorvth);

    const voltage_th = currentState.voltage_th;
    const rth = currentState.rth;
    const rLoad = currentState.rLoad;

    const denominatorI = rth.add(rLoad);
    const resultI = voltage_th.div(denominatorI);
    const magnitude = resultI.abs();
    const angle = resultI.arg();
    currentState.rth = setPrecision(result);
    currentState.voltage_th = setPrecision(currentState.voltage_th);
    // console.log("nikita current"+ resultI.;
    setState((prevState) => ({
      ...prevState,
      loadcurrent_th: setPrecision(resultI),
      current_mag: magnitude,
      temp_cur: setPrecision(rthCurr),
      phase: setPrecision(angle)
    }));
    return result;
  }
  function calculate2() {
    const Ia = Complex(Number(currentState.za), Number(currentState.ia));
    const Ib = Complex(Number(currentState.zb), Number(currentState.ib));
    const Ic = Complex(Number(currentState.zc), Number(currentState.ic));
    const rLoad = Complex(Number(currentState.rLoad), 0);
    const vlotage = Complex(Number(currentState.voltage), 0);
    const seriesComponent = rLoad.add(Ib);
    const parallelComponent = seriesComponent
      .mul(Ic)
      .div(seriesComponent.add(Ic));
    const result = parallelComponent.add(Ia);
    const loadI = vlotage
      .div(result)
      .mul(Ic)
      .div(Ib.add(rLoad.add(Ic)));
    const magLoadI = loadI.abs();
    const loadV = loadI.mul(rLoad);
    // console.log(currentState.rLoad + "nikita2" + seriesComponent.re);
    setState((prevState) => ({
      ...prevState,
      equivalent_r: setPrecision(result),
      loadcurrent: setPrecision(loadI),

      voltageL: setPrecision(loadV),
      rLoad: currentState.rLoad
    }));
    return result;
  }
  const options = [
    "Main Circuit",
    "Zth Circuit",
    "Vth Circuit",
    "Equivalent Circuit"
  ];
  // var temp_cur = Complex(Number(currentState.voltage), 0).div(Complex(Number(currentState.rth), 0));

  return (
    <div>
      <button
        className="button button-85 "
        role="button"
        onClick={() => {
          backToMain();
        }}
      >
        {" "}
        BACK TO MAIN PAGE
      </button>
      <div
        style={{
          marginLeft: "750px",
          padding: "1px",
          width: "300px",
          backgroundColor: "#ff7426",
          color: "Black",
          fontSize: "16px",
          justifyContent: "center"
        }}
      >
        <label>Select a Circuit:</label>
        <Dropdown
          options={options}
          onChange={changeDiv}
          value={currentState.div}
          style={{}}
          placeholder="Select a Circuit"
        />
      </div>
      <button
        className="button button-85 "
        role="button"
        onClick={() => {
          theory();
        }}
      >
        {" "}
        THEORY{" "}
      </button>
      {/* <div className="main-container ">
            {/* <h1>  {Math.atan(1)} </h1> */}
      {/* <h1> R-L-C Series Circuit </h1>  */}

      <div>
        <div
          style={{
            marginLeft: "750px",
            padding: "1px",
            width: "300px",
            color: "Black",
            fontSize: "16px",
            justifyContent: "center"
          }}
        >
          {" "}
          <h1> {options[currentState.div]}</h1>
        </div>
        {currentState.div === 0 ? (
          <div>
            <div className="main-container ">
              {" "}
              <img
                // style={{ textAlign: "center", marginLeft: "400px" }}
                style={{ width: 500, height: 300 }}
                src={img1}
              />
            </div>

            <div className="wavecontainer box2">
              <div>
                <div className="sinewavenik">
                  <SineWaves
                    amplitude={currentState.voltage}
                    frequency={currentState.frequency}
                    phasorplot={currentState.phasorplot}
                    mulfac="100"
                  />
                </div>
                <div className="outputwave">
                  <OutputCurrent
                    amplitude={currentState.current_mag}
                    frequency={currentState.frequency}
                    phase_angle={currentState.phase}
                  />
                </div>

                <div
                  style={{
                    marginTop: "100px",
                    marginLeft: "30px",
                    padding: "10px"
                  }}
                >
                  <h4 style={{ fontWeight: "bold", color: "darkblack" }}>
                    {" "}
                    VOLTAGE(V(t))=VmSin(wt)(volts) :: Vm = peak voltage{" "}
                  </h4>
                  <Slider
                    presentVal={currentState.voltage}
                    handleUpdate={handleUpdateVoltage}
                  />
                </div>
                <div style={{ marginLeft: "30px", padding: "10px" }}>
                  <h4 className="slide"> Frequency(hertz) </h4>
                  <Slider
                    presentVal={currentState.frequency}
                    handleUpdate={handleUpdatefrequency}
                  />
                </div>
              </div>
            </div>
            <>
              <div
                style={{
                  marginLeft: "1100px",
                  // marginRight: "100px",
                  marginTop: "-280px"
                  // marginBottom: "-100px"
                }}
              >
                <h2
                  style={{
                    backgroundColor: "initial",
                    backgroundImage:
                      "linear-gradient(-180deg, #ff7e31, #e62c03)",

                    boxShadow: "rgba(0, 0, 0, 0.1) 0 2px 4px",
                    color: "#ffffff",
                    textAlign: "center"
                  }}
                >
                  {" "}
                  {/* Input Parameters */}
                </h2>
                <div className="inputs box2" style={{ width: "500px" }}>
                  {/* ...other code */}
                  <div className="inline-container">
                    <h3 className="slide" style={{ marginRight: "10px" }}></h3>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ padding: "11px" }}>
                        <h1> Real </h1>
                      </div>
                      <span
                        className="plus-symbol"
                        style={{ marginLeft: "100px" }}
                      >
                        {" "}
                        {"          "}+
                      </span>
                      <div style={{ marginLeft: "25px", padding: "11px" }}>
                        <h1> imaginary</h1>
                      </div>
                    </div>
                  </div>

                  <div className="inline-container">
                    <h3 className="slide" style={{ marginRight: "10px" }}>
                      ZA=
                    </h3>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ padding: "11px" }}>
                        <Slider
                          presentVal={currentState.za}
                          handleUpdate={handleUpdate1}
                        />
                      </div>
                      {/* <span className="plus-symbol">+</span> */}
                      <div style={{ padding: "11px" }}>
                        <Slider1
                          presentVal={currentState.ia}
                          handleUpdate={handleUpdatei1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="inline-container">
                    <h3 className="slide" style={{ marginRight: "10px" }}>
                      ZB={" "}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ padding: "11px" }}>
                        <Slider
                          presentVal={currentState.z2}
                          handleUpdate={handleUpdate2}
                        />
                      </div>
                      {/* <span className="plus-symbol">+</span> */}
                      <div style={{ padding: "11px" }}>
                        <Slider1
                          presentVal={currentState.i2}
                          handleUpdate={handleUpdatei2}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="inline-container">
                    <h3 className="slide" style={{ marginRight: "10px" }}>
                      ZC=
                    </h3>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ padding: "11px" }}>
                        <Slider
                          presentVal={currentState.z3}
                          handleUpdate={handleUpdate3}
                        />
                      </div>
                      {/* <span className="plus-symbol">+</span> */}
                      <div style={{ padding: "11px" }}>
                        <Slider1
                          presentVal={currentState.i3}
                          handleUpdate={handleUpdatei3}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "11px", marginLeft: "200px" }}>
                    <h3 className="slide"> R4(LOAD) </h3>
                    <Slider
                      presentVal={currentState.r4}
                      handleUpdate={handleUpdateLoad}
                    />
                  </div>
                  {/* ...other code */}
                </div>
              </div>
            </>
            {/* </div> */}
          </div>
        ) : // </div>
        currentState.div === 3 ? (
          <div className="main-container ">
            <img style={{ width: 500, height: 300 }} src={img2} />
            <h3>Zth = {currentState.rth.toString()} ohm</h3>
            <h3> </h3>
            <h3>Rload = {currentState.rLoad.toString()} ohm</h3>
            <h3>Vth = {currentState.voltage_th.toString()} V</h3>
            <h3>Ith = {currentState.loadcurrent_th.toString()}A</h3>

            <div style={{ marginLeft: "20px" }}>
              {" "}
              <p>
                {" "}
                {/* <div style={{ marginLeft: "20px" }}>
                  <p>
                    {" "}
                    <h2> TABLE 1 </h2>
                    <h3> THEORTICAL VALUES </h3>
                    <br />
                  </p>
                  <BasicTable
                    columns={currentState.columns1}
                    data={currentState.data1}
                  />
                </div> */}
                <br />
                <br />
                <br />
                <br />
                <h2>TABLE 2 </h2>
                <h3> THEVENIN'S EQUIVALENT VALUE'S </h3>
                <br />
              </p>
              <br />
              <BasicTable
                columns={currentState.columns2}
                data={currentState.data2}
              />
            </div>

            <div style={{ marginBottom: "10px", marginTop: "20px" }}>
              <button
                className="button button-85 "
                role="button"
                onClick={() => {
                  addData2();
                }}
              >
                {" "}
                ADD TO TABLE
              </button>
            </div>
          </div>
        ) : currentState.div === 1 ? (
          <div className="main-container ">
            <img style={{ width: 500, height: 300 }} src={img3} />
            <h3>V=Voltage applied ={currentState.voltage}</h3>
            <h3>
              I=Current passign through Zb= {currentState.temp_cur.toString()} i{" "}
            </h3>
            <h3> Zth = V/I = {currentState.rth.toString()} </h3>
          </div>
        ) : currentState.div === 2 ? (
          <div className="main-container ">
            <img style={{ width: 500, height: 300 }} src={img4} />

            <h3> Vth = Voltage across R2 </h3>
            <h3> Vth={currentState.voltage_th.toString()} V</h3>
          </div>
        ) : (
          <div>
            <img src={img5} />
            <h3> LOAD CURRENT={currentState.loadcurrent.toString()} A</h3>
          </div>
        )}
      </div>

      <br />
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "100px",
          marginTop: "-180px"
        }}
      >
        <div>
          {" "}
          <h2> Reference Ciruits </h2>{" "}
        </div>
        <button
          className="button button-42 "
          role="button"
          onClick={() => {
            changeDiv(1);
          }}
        >
          {" "}
          MAIN CIRCUIT{" "}
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          className="button button-42 "
          role="button"
          onClick={() => {
            changeDiv(2);
          }}
        >
          {" "}
          EQUIVALENT CIRCUIT{" "}
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          className="button button-42 "
          role="button"
          onClick={() => {
            changeDiv(3);
          }}
        >
          {" "}
          RTH CIRCUIT{" "}
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          className="button button-42 "
          role="button"
          onClick={() => {
            changeDiv(4);
          }}
        >
          {" "}
          VTH CIRCUIT
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          className="button button-42 "
          role="button"
          onClick={() => {
            changeDiv(5);
          }}
        >
          {" "}
          LOAD CURRENT
        </button>
      </div>
      &nbsp;&nbsp;&nbsp; */}
      {/* <button
        className="button button-85 "
        role="button"
        onClick={() => {
          addData();
        }}
      >
        {" "}
        ADD TO TABLE
      </button> */}
      <br />
      <br />
      <div
        style={{
          marginLeft: "60px",
          marginTop: "430px"
          // marginBottom: "100px"
        }}
      >
        <div style={{ marginLeft: "20px" }}>
          <p>
            {" "}
            <h2> TABLE 1 </h2>
            <h3> THEORTICAL VALUES </h3>
            <br />
          </p>
          <BasicTable
            columns={currentState.columns1}
            data={currentState.data1}
          />
        </div>
        <br />
        <br />
        {/* <div style={{ marginLeft: "20px" }}> */}
        {/* <p>
            {" "}
            <h2>TABLE 2 </h2>
            <h3> THEVENIN'S EQUIVALENT VALUE'S </h3>
            <br />
          </p> */}
        {/* <BasicTable
            columns={currentState.columns2}
            data={currentState.data2}
          /> */}
        {/* </div> */}
        <div style={{ marginBottom: "10px", marginTop: "20px" }}>
          <button
            className="button button-85 "
            role="button"
            onClick={() => {
              addData();
            }}
          >
            {" "}
            ADD TO TABLE
          </button>
        </div>
      </div>
    </div>
  );
}
