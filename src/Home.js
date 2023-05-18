import "./styles.css";
import React from "react";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="Home-div">
      <h1 className="home-heading"> LIST OF EXPERIMENTS </h1>
      <h1 className="home-heading-1 sub-heading">
        <button class="dropbtn">
          {" "}
          1.<Link to="/HomeOhm">OHM'S LAW</Link>
        </button>
      </h1>
      {/* <h1 className="home-heading-1 sub-heading">
        2.<Link to="/HomeExample">R-L-C Circuit</Link>
      </h1> */}

      {/* <h1 className="home-heading-1 sub-heading">
        4.<Link to="/HomeRL">Thevenin Theorem</Link>
      </h1> */}
      {/* <h1 className="home-heading-1 sub-heading">
        5.<Link to="/HomeRC">Thevenin Theorem</Link>
      </h1> */}

      <div className="home-heading-1 subheading">
        {" "}
        <div class="dropdown">
          <button class="dropbtn">2. Series R-L-C Circuit</button>
          <div class="dropdown-content">
            <Link to="/HomeExample">1. R-L-C Circuit </Link>
            <Link to="/HomeRL">2. R-L Circuit</Link>
            <Link to="/HomeRC">3. R-C Circuit </Link>
            <Link to="/HomeLC">4. L-C Circuit </Link>
          </div>
        </div>
        <h1 className="home-heading-1 sub-heading">
          <button class="dropbtn">
            3.<Link to="/Thevenin">Thevenin Theorem</Link>
          </button>
        </h1>
      </div>
    </div>
  );
}
