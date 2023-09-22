import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer";
import { Home } from "./pages/Home";
import { EventDetails } from "./pages/EventDetails";

import React from "react";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="bg-black px-8">
        <Routes>
          <Route path="/event/:id" element={<EventDetails/>}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
