import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Form, notification, Input, Row, Col, Button, Spin, Popover } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import passwordValidator from "password-validator";

// Create a password schema
const schema = new passwordValidator();

schema
  .is()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols();

class SignUpContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      redirect: false,
      loading: false,
      email: "",
    };
  }

  handleOpenNotification(type, title, message) {
    // eslint-disable-next-line default-case
    switch (type) {
      case "success":
        notification["success"]({
          message: title,
          description: message,
          placement: "topRight",
          duration: 1.5,
          onClose: () => {
            this.setState({ redirect: true });
          },
        });
        break;

      case "error":
        notification["error"]({
          message: title,
          description: message,
          placement: "topRight",
          duration: 1.5,
        });
        break;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let { fname, lname, password, email, phoneNumber } = values;

        // Show loader
        this.setState({ loading: true });

        Auth.signUp({
          username: email,
          password,
          attributes: {
            email,
            name: `${fname} ${lname}`,
            phone_number: phoneNumber,
          },
        })
          .then(() => {
            notification.success({
              message: "Succesfully signed up user!",
              description:
                "Account created successfully, Redirecting you in a few!",
              placement: "topRight",
              duration: 1.5,
              onClose: () => {
                this.setState({ redirect: true });
              },
            });

            this.setState({ email });
          })
          .catch((err) => {
            notification.error({
              message: "Error",
              description: "Error signing up user",
              placement: "topRight",
              duration: 1.5,
            });

            this.setState({
              loading: false,
            });
          });
      }
    });
  };

  handleConfirmBlur = (event) => {
    const { value } = event.currentTarget;

    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;

    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    const validationRulesErrors = schema.validate(value, { list: true });

    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    if (validationRulesErrors.length > 0) {
      callback(this.formatPasswordValidateError(validationRulesErrors));
    }
    callback();
  };

  formatPasswordValidateError(errors) {
    for (let i = 0; i < errors.length; i++) {
      if (errors[i] === "min") {
        return "password length should be at least 8 characters";
      } else if (errors[i] === "lowercase") {
        return "password should contain lowercase letters";
      } else if (errors[i] === "uppercase") {
        return "password should contain uppercase letters";
      } else if (errors[i] === "digits") {
        return "password should contain digits";
      } else if (errors[i] === "symbols") {
        return "password should contain symbols";
      }
    }
  }

  render() {
    const { redirect, loading } = this.state;

    const title = "Password Policy";
    const passwordPolicyContent = (
      <React.Fragment>
        <h4>Your password should contain: </h4>
        <ul>
          <li>Minimum length of 8 characters</li>
          <li>Numerical characters (0-9)</li>
          <li>Special characters</li>
          <li>Uppercase letter</li>
          <li>Lowercase letter</li>
        </ul>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input
              prefix={
                <SmileOutlined />
              }
              placeholder="First Name"
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={
                <SmileOutlined />
              }
              placeholder="Last Name"
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={
                <SmileOutlined />
              }
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={
                <SmileOutlined />
              }
              placeholder="Phone Number"
            />
          </Form.Item>
          <Form.Item>
            <Popover
              placement="right"
              title={title}
              content={passwordPolicyContent}
              trigger="focus"
            >
             
                <Input
                  prefix={
                    <SmileOutlined />
                  }
                  type="password"
                  placeholder="Password"
                />
            </Popover>
          </Form.Item>
          <Form.Item>
          
              <Input
                prefix={
                  <SmileOutlined />
                }
                type="password"
                placeholder="Confirm Password"
                onBlur={this.handleConfirmBlur}
              />
          </Form.Item>

          <Form.Item className="text-center">
            <Row>
              <Col lg={24}>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  disabled={loading}
                  htmlType="submit"
                >
                  {loading ? (
                    <Spin
                      indicator={
                        <SmileOutlined />
                      }
                    />
                  ) : (
                    "Register"
                  )}
                </Button>
              </Col>
              <Col lg={24}>
                Or <Link to="/login">login to your account!</Link>
              </Col>
            </Row>
          </Form.Item>
        </Form>
        {redirect && (
          <Navigate
            to={{
              pathname: "/verify-code",
              search: `?email=${this.state.email}`,
            }}
          />
        )}
      </React.Fragment>
    );
  }
}

export default SignUpContainer;
