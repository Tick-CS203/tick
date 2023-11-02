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
import { Auth } from "./component/signup/Auth";
import { Navigate } from "react-router-dom";
import { Queue } from "./pages/Queue";
import { Events } from "./pages/Events";
import { ConfigProvider, theme } from "antd";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="bg-black px-8 pb-8 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/event" element={<Events />} />
          <Route
            path="/ticket"
            element={
              <Auth>
                <Ticket />
              </Auth>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confirmsignup" element={<ConfirmSignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />}></Route>
          <Route
            path="/seatmap/:id"
            element={
              <Auth>
                <ConfigProvider
                  theme={{
                    token: {
                      // Seed Token
                      colorPrimary: "#F6E902",
                    },
                    algorithm: theme.darkAlgorithm,
                  }}
                >
                  <SeatSelection />
                </ConfigProvider>
              </Auth>
            }
          />
          <Route path="/queue/:id" element={<Queue />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
