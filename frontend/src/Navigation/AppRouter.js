import { Routes, Route } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
import LoginContainer from '../Containers/LoginContainer';
import SignUpContainer from '../Containers/SignUpContainer';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SmileOutlined />} />
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/signup" element={<SignUpContainer />} />
    </Routes>
  )
}

/* class AppRouter extends Component {
  render() {
    return (
      <Routes>
          <PrivateRoute exact={true} path="/dashboard" element={DashBoardContainer} />
          <Route exact={true} path="/" element={LoginContainer} />
          <Route exact={true} path="/login" element={LoginContainer} />
          <Route exact={true} path="/signup" element={SignUpContainer} />
          <Route exact={true} path="/verify-code" element={ConfirmEmailContainer} />
          <Route exact={true} path="/reset-password" element={PasswordResetContainer} />
          <Route exact={true} path="/forgot-password" element={ForgotPasswordContainer} />
      </Routes>
    );
  }
} */
