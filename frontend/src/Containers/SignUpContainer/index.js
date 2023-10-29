// Function based component
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Form, Input, Icon, Button, notification, Popover, Spin, Row, Col } from 'antd';
import FormWrapper from '../../Components/Styled/FormWrapper';
import { colors } from '../../Themes/Colors';
import passwordValidator from 'password-validator';

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

const SignUpContainer = ({ form }) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const { getFieldDecorator } = form;

  const handleOpenNotification = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
      placement: 'topRight',
      duration: 1.5,
      onClose: () => setRedirect(true),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { fname, lname, password, email, phoneNumber } = values;
        setLoading(true);

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
            handleOpenNotification('success', 'Successfully signed up user!', 'Account created successfully, Redirecting you in a few!');
            setEmail(email);
          })
          .catch((err) => {
            handleOpenNotification('error', 'Error', 'Error signing up user');
            setLoading(false);
          });
      }
    });
  };

  const handleConfirmBlur = (e) => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const title = 'Password Policy';
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
        <Form.Item>
          {getFieldDecorator('fname', {
            rules: [{ required: true, message: 'Please input your first name!' }],
          })(<Input prefix={<Icon type="user" style={{ color: colors.transparentBlack }} />} placeholder="First Name" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('lname', {
            rules: [{ required: true, message: 'Please input your last name!' }],
          })(<Input prefix={<Icon type="user" style={{ color: colors.transparentBlack }} />} placeholder="Last Name" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(<Input prefix={<Icon type="mail" style={{ color: colors.transparentBlack }} />} placeholder="Email" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('phoneNumber', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input prefix={<Icon type="phone" style={{ color: colors.transparentBlack }} />} placeholder="Phone Number" />)}
        </Form.Item>
        <Form.Item>
          <Popover placement="right" title={title} content={passwordPolicyContent} trigger="focus">
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
                { validator: validateToNextPassword },
              ],
            })(<Input prefix={<Icon type="lock" style={{ color: colors.transparentBlack }} />} type="password" placeholder="Password" />)}
          </Popover>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, message: 'Please confirm your password!' },
              { validator: compareToFirstPassword },
            ],
          })(<Input prefix={<Icon type="lock" style={{ color: colors.transparentBlack }} />} type="password" placeholder="Confirm Password" onBlur={handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item className="text-center">
          <Row>
            <Col lg={24}>
              <Button style={{ width: '100%' }} type="primary" disabled={loading} htmlType="submit">
                {loading ? <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} /> : 'Register'}
              </Button>
            </Col>
            <Col lg={24}>
              Or <Link to="/login">login to your account!</Link>
            </Col>
          </Row>
        </Form.Item>
      </FormWrapper>
      {redirect && <Redirect to={{ pathname: '/verify-code', search: `?email=${email}` }} />}
    </React.Fragment>
  );
};

export default Form.create()(SignUpContainer);

// import * as React from "react"
// import { Link, Redirect } from "react-router-dom"
// import { Auth } from "aws-amplify"
// import {
//   Form,
//   Input,
//   Icon,
//   Button,
//   notification,
//   Popover,
//   Spin,
//   Col,
//   Row
// } from "antd"

// /** Presentational */
// import FormWrapper from "../../Components/Styled/FormWrapper"

// /** App theme */
// import { colors } from "../../Themes/Colors"

// const passwordValidator = require("password-validator")

// // create a password schema
// const schema = new passwordValidator()

// schema
//   .is()
//   .min(8)
//   .has()
//   .uppercase()
//   .has()
//   .lowercase()
//   .has()
//   .digits()
//   .has()
//   .symbols()

// class SignUpContainer extends React.Component {
//   state = {
//     confirmDirty: false,
//     redirect: false,
//     loading: false,
//     email: ""
//   }

//   /**
//    * @param  {string} - type
//    * @param  {string} - title
//    * @param  {string} - message
//    *
//    * @returns {void} - no value returned
//    */
//   handleOpenNotification = (type, title, message) => {
//     switch (type) {
//       case "success":
//         notification["success"]({
//           message: title,
//           description: message,
//           placement: "topRight",
//           duration: 1.5,
//           onClose: () => {
//             this.setState({ redirect: true })
//           }
//         })
//         break

//       case "error":
//         notification["error"]({
//           message: title,
//           description: message,
//           placement: "topRight",
//           duration: 1.5
//         })
//         break
//     }
//   }

//   handleSubmit = event => {
//     event.preventDefault()

//     this.props.form.validateFieldsAndScroll((err, values) => {
//       if (!err) {
//         let { fname, lname, password, email, phoneNumber } = values

//         // show loader
//         this.setState({ loading: true })

//         Auth.signUp({
//           username: email,
//           password,
//           attributes: {
//             email,
//             name: `${fname} ${lname}`,
//             phone_number: phoneNumber
//           }
//         })
//           .then(() => {
//             notification.success({
//               message: "Succesfully signed up user!",
//               description:
//                 "Account created successfully, Redirecting you in a few!",
//               placement: "topRight",
//               duration: 1.5,
//               onClose: () => {
//                 this.setState({ redirect: true })
//               }
//             })

//             this.setState({ email })
//           })
//           .catch(err => {
//             notification.error({
//               message: "Error",
//               description: "Error signing up user",
//               placement: "topRight",
//               duration: 1.5
//             })

//             this.setState({
//               loading: false
//             })
//           })
//       }
//     })
//   }

//   handleConfirmBlur = event => {
//     const { value } = event.currentTarget

//     this.setState({ confirmDirty: this.state.confirmDirty || !!value })
//   }

//   compareToFirstPassword = (rule, value, callback) => {
//     const { form } = this.props

//     if (value && value !== form.getFieldValue("password")) {
//       callback("Two passwords that you enter is inconsistent!")
//     } else {
//       callback()
//     }
//   }

//   validateToNextPassword = (rule, value, callback) => {
//     const form = this.props.form
//     const validationRulesErrors = schema.validate(value, { list: true })

//     if (value && this.state.confirmDirty) {
//       form.validateFields(["confirm"], { force: true })
//     }
//     if (validationRulesErrors.length > 0) {
//       callback(this.formatPasswordValidateError(validationRulesErrors))
//     }
//     callback()
//   }

//   formatPasswordValidateError = errors => {
//     for (let i = 0; i < errors.length; i++) {
//       if (errors[i] === "min") {
//         return "password length should be a at least 8 characters"
//       } else if (errors[i] === "lowercase") {
//         return "password should contain lowercase letters"
//       } else if (errors[i] === "uppercase") {
//         return "password should contain uppercase letters"
//       } else if (errors[i] === "digits") {
//         return "password should contain digits"
//       } else if (errors[i] === "symbols") {
//         return "password should contain symbols"
//       }
//     }
//   }

//   render() {
//     const { getFieldDecorator } = this.props.form
//     const { redirect, loading } = this.state

//     const title = "Password Policy"
//     const passwordPolicyContent = (
//       <React.Fragment>
//         <h4>Your password should contain: </h4>
//         <ul>
//           <li>Minimum length of 8 characters</li>
//           <li>Numerical characters (0-9)</li>
//           <li>Special characters</li>
//           <li>Uppercase letter</li>
//           <li>Lowercase letter</li>
//         </ul>
//       </React.Fragment>
//     )

//     return (
//       <React.Fragment>
//         <FormWrapper onSubmit={this.handleSubmit}>
        //   <Form.Item>
        //     {getFieldDecorator("fname", {
        //       rules: [
        //         {
        //           required: true,
        //           message: "Please input your first name!"
        //         }
        //       ]
        //     })(
        //       <Input
        //         prefix={
        //           <Icon
        //             type="user"
        //             style={{ color: colors.transparentBlack }}
        //           />
        //         }
        //         placeholder="First Name"
        //       />
        //     )}
        //   </Form.Item>
        //   <Form.Item>
        //     {getFieldDecorator("lname", {
        //       rules: [
        //         {
        //           required: true,
        //           message: "Please input your last name!"
        //         }
        //       ]
        //     })(
        //       <Input
        //         prefix={
        //           <Icon
        //             type="user"
        //             style={{ color: colors.transparentBlack }}
        //           />
        //         }
        //         placeholder="Last Name"
        //       />
        //     )}
        //   </Form.Item>
        //   <Form.Item>
        //     {getFieldDecorator("email", {
        //       rules: [{ required: true, message: "Please input your email!" }]
        //     })(
        //       <Input
        //         prefix={
        //           <Icon
        //             type="user"
        //             style={{ color: colors.transparentBlack }}
        //           />
        //         }
        //         placeholder="Email"
        //       />
        //     )}
        //   </Form.Item>
        //   <Form.Item>
        //     {getFieldDecorator("phoneNumber", {
        //       rules: [
        //         {
        //           required: true,
        //           message: "Please input your phone number!"
        //         }
        //       ]
        //     })(
        //       <Input
        //         prefix={
        //           <Icon
        //             type="phone"
        //             style={{ color: colors.transparentBlack }}
        //           />
        //         }
        //         placeholder="Phone Number"
        //       />
        //     )}
        //   </Form.Item>
        //   <Form.Item>
        //     <Popover
        //       placement="right"
        //       title={title}
        //       content={passwordPolicyContent}
        //       trigger="focus"
        //     >
        //       {getFieldDecorator("password", {
        //         rules: [
        //           { required: true, message: "Please input your Password!" },
        //           {
        //             validator: this.validateToNextPassword
        //           }
        //         ]
        //       })(
        //         <Input
        //           prefix={
        //             <Icon
        //               type="lock"
        //               style={{ color: colors.transparentBlack }}
        //             />
        //           }
        //           type="password"
        //           placeholder="Password"
        //         />
        //       )}
        //     </Popover>
        //   </Form.Item>
        //   <Form.Item>
        //     {getFieldDecorator("confirm", {
        //       rules: [
        //         {
        //           required: true,
        //           message: "Please confirm your password!"
        //         },
        //         {
        //           validator: this.compareToFirstPassword
        //         }
        //       ]
        //     })(
        //       <Input
        //         prefix={
        //           <Icon
        //             type="lock"
        //             style={{ color: colors.transparentBlack }}
        //           />
        //         }
        //         type="password"
        //         placeholder="Confirm Password"
        //         onBlur={this.handleConfirmBlur}
        //       />
        //     )}
        //   </Form.Item>

        //   <Form.Item className="text-center">
        //     <Row>
        //       <Col lg={24}>
        //         <Button
        //           style={{ width: "100%" }}
        //           type="primary"
        //           disabled={loading}
        //           htmlType="submit"
        //         >
        //           {loading ? (
        //             <Spin
        //               indicator={
        //                 <Icon type="loading" style={{ fontSize: 24 }} spin />
        //               }
        //             />
        //           ) : (
        //             "Register"
        //           )}
        //         </Button>
        //       </Col>
        //       <Col lg={24}>
        //         Or <Link to="/login">login to your account!</Link>
        //       </Col>
        //     </Row>
        //   </Form.Item>
//         </FormWrapper>
//         {redirect && (
//           <Redirect
//             to={{
//               pathname: "/verify-code",
//               search: `?email=${this.state.email}`
//             }}
//           />
//         )}
//       </React.Fragment>
//     )
//   }
// }

// export default Form.create()(SignUpContainer)
