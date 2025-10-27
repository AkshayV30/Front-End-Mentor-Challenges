// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import iconArrow from "./assets/icon-arrow.svg";
import iconLocation from "./assets/icon-location.svg";
import patternBgDesktop from "./assets/pattern-bg-desktop.png";
import patternBgMobile from "./assets/pattern-bg-mobile.png";

import "./App.css";
import "./App_0.css";

function App() {
  return (
    <>
      <main>
        <picture>
          <img src={patternBgDesktop} alt="pattern desktop background" />
        </picture>

        <div class="container">
          <h1 id="title">IP Address Tracker</h1>
          <div class="search-bar">
            <input
              type="text"
              class="search-input"
              placeholder="Search for any IP address or domain"
            />
            <button type="button" class="search-submit">
              <img src={iconArrow} alt="icon-arrow" />
            </button>
          </div>

          <ol>
            <li>
              <h4>IP Address</h4>
              <p id="ip-address-info">-/-/-/-/-</p>
            </li>
            <li>
              <h4>Location</h4>
              <p id="location-info">-/-/-/-/-</p>
            </li>
            <li>
              <h4>Timezone</h4>
              <p id="timezone-info">-/-/-/-/-</p>
            </li>
            <li>
              <h4>ISP</h4>
              <p id="isp-info">-/-/-/-/-</p>
            </li>
          </ol>
        </div>

        <div id="map"></div>
      </main>

      <footer>
        <div class="attribution">
          Challenge by
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by <a href="#">AkshayV30</a>.
        </div>
      </footer>
      {/* <!-- Leaflet JavaScript --> */}
      <script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""
      ></script>
    </>
  );
}

export default App;
