import React from "react";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Form, Spin, Input, Button, notification, Col, Row } from "antd";
import { SmileOutlined } from "@ant-design/icons";

/** App constants */
import { AUTH_USER_TOKEN_KEY } from "../Utils/constants";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;

        this.setState({ loading: true });

        Auth.signIn(username, password)
          .then((user) => {
            const { history } = this.props;
            const from = { pathname: "/dashboard" };

            localStorage.setItem(
              AUTH_USER_TOKEN_KEY,
              user.signInUserSession.accessToken.jwtToken
            );

            notification.success({
              message: "Successfully logged in!",
              description: "Logged in successfully, Redirecting you in a few!",
              placement: "topRight",
              duration: 1.5,
            });

            history.push(from);
          })
          .catch((err) => {
            notification.error({
              message: "Error",
              description: err.message,
              placement: "topRight",
            });

            console.log(err);

            this.setState({ loading: false });
          });
      }
    });
  };

  render() {
    const { loading } = this.state;

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item name="username">
            <Input prefix={<SmileOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password">
            <Input
              prefix={<SmileOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className="text-center">
            <Row type="flex" gutter={16}>
              <Col lg={24}>
                <Link
                  style={{ float: "right" }}
                  className="login-form-forgot"
                  to="/forgot-password"
                >
                  Forgot password
                </Link>
              </Col>
              <Col lg={24}>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  disabled={loading}
                  htmlType="submit"
                  className="login-form-button"
                >
                  {loading ? <Spin indicator={<SmileOutlined />} /> : "Log in"}
                </Button>
              </Col>
              <Col lg={24}>
                Or <Link to="/signup">register now!</Link>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}

export default LoginContainer;

/* import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { Auth } from 'aws-amplify';

import { AUTH_USER_TOKEN_KEY } from '../Utils/constants';

export const LoginContainer = () => {
  const onFinish = (values) => {
    console.log(values);
    const user = Auth.signIn(values.username, values.password);
    localStorage.setItem(AUTH_USER_TOKEN_KEY, user.signInUserSession.accessToken.jwtToken)
    console.log(user);
  };

  return (
    <Form onFinish={onFinish}>
      <h1>LOGIN</h1>
      <Form.Item label="Username" name="username" required>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" required>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Next
      </Button>
      <Link to="/">I forgot my password</Link>
      <Link to="/">I want to sign up</Link>
    </Form>
  );
}; */
