// Function based component
import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Form, Input, Icon, Button, notification, Popover, Spin, Row, Col } from "antd";
import { colors } from "../../Themes/Colors";
import FormWrapper from "../../Components/Styled/FormWrapper";

const PasswordResetContainer = ({ form }) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleBlur = (event) => {
    const value = event.currentTarget.value;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { password, code } = values;
        const username = location.search.split("=")[1];
        setLoading(true);

        Auth.forgotPasswordSubmit(username.trim(), code.trim(), password.trim())
          .then(() => {
            notification.success({
              message: "Success!",
              description: "Password reset successful, Redirecting you in a few!",
              placement: "topRight",
              duration: 1.5,
              onClose: () => {
                setRedirect(true);
              },
            });
          })
          .catch((err) => {
            notification.error({
              message: "Error resetting password",
              description: err.message,
              placement: "topRight",
              duration: 1.5,
            });
            setLoading(false);
          });
      }
    });
  };

  const { getFieldDecorator } = form;

  const title = "Password Policy";
  const passwordPolicyContent = (
    <React.Fragment>
      <h4>Your password should contain:</h4>
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
      <FormWrapper onSubmit={handleSubmit}>
        <div className="text-center">
          <p>Check your email for the confirmation code</p>
        </div>
        <Form.Item>
          <Row>
            <Col lg={24}>
              {getFieldDecorator("code", {
                rules: [{ required: true, message: "Please input your confirmation code!" }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: colors.transparentBlack }} />}
                  placeholder="Enter your verification code"
                />
              )}
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Popover placement="right" title={title} content={passwordPolicyContent} trigger="focus">
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" },
                { validator: validateToNextPassword },
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: colors.transparentBlack }} />}
                type="password"
                placeholder="New Password"
              />
            )}
          </Popover>
        </Form.Item>
        <Form.Item>
          <Row>
            <Col lg={24}>
              {getFieldDecorator("confirm", {
                rules: [
                  { required: true, message: "Please confirm your password!" },
                  { validator: compareToFirstPassword },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: colors.transparentBlack }} />}
                  type="password"
                  placeholder="Confirm Password"
                  onBlur={handleBlur}
                />
              )}
            </Col>
          </Row>
        </Form.Item>
        <Form.Item className="text-center">
          <Row>
            <Col lg={24}>
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {loading ? (
                  <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
                ) : (
                  "Confirm username"
                )}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </FormWrapper>
      {redirect && <Redirect to={{ pathname: "/login" }} />}
    </React.Fragment>
  );
};

export default Form.create()(PasswordResetContainer);

// CLASS BASED COMPONENT
// import * as React from "react"
// import { Redirect } from "react-router-dom"
// import { Auth } from "aws-amplify"
// import {
//   Form,
//   Input,
//   Icon,
//   Button,
//   notification,
//   Popover,
//   Spin,
//   Row,
//   Col
// } from "antd"
// /** App theme */
// import { colors } from "../../Themes/Colors"
// import FormWrapper from "../../Components/Styled/FormWrapper"
// class PasswordResetContainer extends React.Component {
//   constructor() {
//     super(...arguments)
//     this.state = {
//       confirmDirty: false,
//       redirect: false,
//       loading: false
//     }
//     this.handleBlur = event => {
//       const value = event.currentTarget.value
//       this.setState({ confirmDirty: this.state.confirmDirty || !!value })
//     }
//     this.compareToFirstPassword = (rule, value, callback) => {
//       const form = this.props.form
//       if (value && value !== form.getFieldValue("password")) {
//         callback("Two passwords that you enter is inconsistent!")
//       } else {
//         callback()
//       }
//     }
//     this.validateToNextPassword = (rule, value, callback) => {
//       const form = this.props.form
//       if (value && this.state.confirmDirty) {
//         form.validateFields(["confirm"], { force: true })
//       }
//       callback()
//     }
//     this.handleSubmit = event => {
//       event.preventDefault()
//       this.props.form.validateFieldsAndScroll((err, values) => {
//         if (!err) {
//           let { password, code } = values
//           let username = this.props.location.search.split("=")[1]
//           Auth.forgotPasswordSubmit(
//             username.trim(),
//             code.trim(),
//             password.trim()
//           )
//             .then(() => {
//               notification.success({
//                 message: "Success!",
//                 description:
//                   "Password reset successful, Redirecting you in a few!",
//                 placement: "topRight",
//                 duration: 1.5,
//                 onClose: () => {
//                   this.setState({ redirect: true })
//                 }
//               })
//             })
//             .catch(err => {
//               notification["error"]({
//                 message: "Error reseting password",
//                 description: err.message,
//                 placement: "topRight",
//                 duration: 1.5
//               })
//               this.setState({ loading: false })
//             })
//           // show loader
//           this.setState({ loading: true })
//         }
//       })
//     }
//   }
//   render() {
//     const { getFieldDecorator } = this.props.form
//     const { redirect, loading } = this.state
//     const title = "Password Policy"
//     const passwordPolicyContent = React.createElement(
//       React.Fragment,
//       null,
//       React.createElement("h4", null, "Your password should contain: "),
//       React.createElement(
//         "ul",
//         null,
//         React.createElement("li", null, "Minimum length of 8 characters"),
//         React.createElement("li", null, "Numerical characters (0-9)"),
//         React.createElement("li", null, "Special characters"),
//         React.createElement("li", null, "Uppercase letter"),
//         React.createElement("li", null, "Lowercase letter")
//       )
//     )
//     return React.createElement(
//       React.Fragment,
//       null,
//       React.createElement(
//         FormWrapper,
//         { onSubmit: this.handleSubmit },
//         React.createElement(
//           "div",
//           { className: "text-center" },
//           React.createElement(
//             "p",
//             null,
//             "Check your email for the confirmation code"
//           )
//         ),
//         React.createElement(
//           Form.Item,
//           null,
//           React.createElement(
//             Row,
//             null,
//             React.createElement(
//               Col,
//               { lg: 24 },
//               getFieldDecorator("code", {
//                 rules: [
//                   {
//                     required: true,
//                     message: "Please input your confirmation code!"
//                   }
//                 ]
//               })(
//                 React.createElement(Input, {
//                   prefix: React.createElement(Icon, {
//                     type: "lock",
//                     style: { color: colors.transparentBlack }
//                   }),
//                   placeholder: "Enter your verification code"
//                 })
//               )
//             )
//           )
//         ),
//         React.createElement(
//           Form.Item,
//           null,
//           React.createElement(
//             Popover,
//             {
//               placement: "right",
//               title: title,
//               content: passwordPolicyContent,
//               trigger: "focus"
//             },
//             getFieldDecorator("password", {
//               rules: [
//                 { required: true, message: "Please input your Password!" },
//                 {
//                   validator: this.validateToNextPassword
//                 }
//               ]
//             })(
//               React.createElement(Input, {
//                 prefix: React.createElement(Icon, {
//                   type: "lock",
//                   style: { color: colors.transparentBlack }
//                 }),
//                 type: "password",
//                 placeholder: "New Password"
//               })
//             )
//           )
//         ),
//         React.createElement(
//           Form.Item,
//           null,
//           React.createElement(
//             Row,
//             null,
//             React.createElement(
//               Col,
//               { lg: 24 },
//               getFieldDecorator("confirm", {
//                 rules: [
//                   {
//                     required: true,
//                     message: "Please confirm your password!"
//                   },
//                   {
//                     validator: this.compareToFirstPassword
//                   }
//                 ]
//               })(
//                 React.createElement(Input, {
//                   prefix: React.createElement(Icon, {
//                     type: "lock",
//                     style: { color: colors.transparentBlack }
//                   }),
//                   type: "password",
//                   placeholder: "Confirm Password",
//                   onBlur: this.handleBlur
//                 })
//               )
//             )
//           )
//         ),
//         React.createElement(
//           Form.Item,
//           { className: "text-center" },
//           React.createElement(
//             Row,
//             null,
//             React.createElement(
//               Col,
//               { lg: 24 },
//               React.createElement(
//                 Button,
//                 {
//                   style: { width: "100%" },
//                   type: "primary",
//                   htmlType: "submit",
//                   className: "login-form-button"
//                 },
//                 loading
//                   ? React.createElement(Spin, {
//                       indicator: React.createElement(Icon, {
//                         type: "loading",
//                         style: { fontSize: 24 },
//                         spin: true
//                       })
//                     })
//                   : "Confirm username"
//               )
//             )
//           )
//         )
//       ),
//       redirect && React.createElement(Redirect, { to: { pathname: "/login" } })
//     )
//   }
// }
// export default Form.create()(PasswordResetContainer)
