import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<p>HELLO</p>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
