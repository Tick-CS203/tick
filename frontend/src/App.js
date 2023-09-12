import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer";

import { NationalStadium } from "./pages/Seatmap/NationalStadium";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<p>HELLO</p>} />
        <Route path="/seatmap" element={<NationalStadium />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
