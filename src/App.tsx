import { Link, Route, Routes } from "react-router";
import Tutorial1 from "./pages/Tutorial1";
import "./App.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

function App() {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/tutorial1">Tutorial1</Link>
          </li>
        </ul>
      </div>

      <br />

      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/tutorial1" element={<Tutorial1 />} />
      </Routes>
    </>
  );
}

export default App;
