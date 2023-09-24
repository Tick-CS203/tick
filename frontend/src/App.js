import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer";
import { Home } from "./pages/Home";
import { Ticket } from "./pages/Ticket";
import { SeatSelection } from "./pages/SeatSelection";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { ConfirmSignUp } from "./pages/ConfirmSignUp";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { EventDetails } from "./pages/EventDetails";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="bg-black px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confirmsignup" element={<ConfirmSignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
          <Route path="/seatmap" element={<SeatSelection />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
