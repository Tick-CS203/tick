// FUNCTION BASED COMPONENT
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Form, Icon, Spin, Input, Button, notification, Col, Row } from 'antd';

/** Presentational */
import FormWrapper from '../../Components/Styled/FormWrapper';

/** App theme */
import { colors } from '../../Themes/Colors';

/** App constants */
import { AUTH_USER_TOKEN_KEY } from '../../Utils/constants';

const LoginContainer = ({ form }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values;

        setLoading(true);

        Auth.signIn(username, password)
          .then((user) => {
            const { from } = { from: { pathname: '/dashboard' } };

            localStorage.setItem(
              AUTH_USER_TOKEN_KEY,
              user.signInUserSession.accessToken.jwtToken
            );

            notification.success({
              message: 'Successfully logged in!',
              description: 'Logged in successfully, Redirecting you in a few!',
              placement: 'topRight',
              duration: 1.5,
            });

            history.push(from);
          })
          .catch((err) => {
            notification.error({
              message: 'Error',
              description: err.message,
              placement: 'topRight',
            });

            console.log(err);

            setLoading(false);
          });
      }
    });
  };

  const { getFieldDecorator } = form;

  return (
    <React.Fragment>
      <FormWrapper onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: colors.transparentBlack }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: colors.transparentBlack }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item className="text-center">
          <Row type="flex" gutter={16}>
            <Col lg={24}>
              <Link
                style={{ float: 'right' }}
                className="login-form-forgot"
                to="/forgot-password"
              >
                Forgot password
              </Link>
            </Col>
            <Col lg={24}>
              <Button
                style={{ width: '100%' }}
                type="primary"
                disabled={loading}
                htmlType="submit"
                className="login-form-button"
              >
                {loading ? (
                  <Spin
                    indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}
                  />
                ) : (
                  'Log in'
                )}
              </Button>
            </Col>
            <Col lg={24}>
              Or <Link to="/signup">register now!</Link>
            </Col>
          </Row>
        </Form.Item>
      </FormWrapper>
    </React.Fragment>
  );
};

export default Form.create()(LoginContainer);

// CLASS BASED COMPONENT
// import * as React from "react"
// import { Link } from "react-router-dom"
// import { Auth } from "aws-amplify"
// import { Form, Icon, Spin, Input, Button, notification, Col, Row } from "antd"

// /** Presentational */
// import FormWrapper from "../../Components/Styled/FormWrapper"

// /** App theme */
// import { colors } from "../../Themes/Colors"

// /** App constants */
// import { AUTH_USER_TOKEN_KEY } from "../../Utils/constants"

// class LoginContainer extends React.Component {
//   state = {
//     loading: false
//   }

//   handleSubmit = event => {
//     event.preventDefault()

//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         let { username, password } = values

//         this.setState({ loading: true })

//         Auth.signIn(username, password)
//           .then(user => {
//             const { history } = this.props
//             const { from } = {
//               from: {
//                 pathname: "/dashboard"
//               }
//             }

//             localStorage.setItem(
//               AUTH_USER_TOKEN_KEY,
//               user.signInUserSession.accessToken.jwtToken
//             )

//             notification.success({
//               message: "Succesfully logged in!",
//               description: "Logged in successfully, Redirecting you in a few!",
//               placement: "topRight",
//               duration: 1.5
//             })

//             history.push(from)
//           })
//           .catch(err => {
//             notification.error({
//               message: "Error",
//               description: err.message,
//               placement: "topRight"
//             })

//             console.log(err)

//             this.setState({ loading: false })
//           })
//       }
//     })
//   }

//   render() {
//     const { getFieldDecorator } = this.props.form
//     const { loading } = this.state

//     return (
//       <React.Fragment>
//         <FormWrapper onSubmit={this.handleSubmit} className="login-form">
//           <Form.Item>
//             {getFieldDecorator("username", {
//               rules: [
//                 {
//                   required: true,
//                   message: "Please input your username!"
//                 }
//               ]
//             })(
//               <Input
//                 prefix={
//                   <Icon
//                     type="user"
//                     style={{ color: colors.transparentBlack }}
//                   />
//                 }
//                 placeholder="Username"
//               />
//             )}
//           </Form.Item>
//           <Form.Item>
//             {getFieldDecorator("password", {
//               rules: [
//                 {
//                   required: true,
//                   message: "Please input your password!"
//                 }
//               ]
//             })(
//               <Input
//                 prefix={
//                   <Icon
//                     type="lock"
//                     style={{ color: colors.transparentBlack }}
//                   />
//                 }
//                 type="password"
//                 placeholder="Password"
//               />
//             )}
//           </Form.Item>
//           <Form.Item className="text-center">
//             <Row type="flex" gutter={16}>
//               <Col lg={24}>
//                 <Link
//                   style={{ float: "right" }}
//                   className="login-form-forgot"
//                   to="/forgot-password"
//                 >
//                   Forgot password
//                 </Link>
//               </Col>
//               <Col lg={24}>
//                 <Button
//                   style={{ width: "100%" }}
//                   type="primary"
//                   disabled={loading}
//                   htmlType="submit"
//                   className="login-form-button"
//                 >
//                   {loading ? (
//                     <Spin
//                       indicator={
//                         <Icon type="loading" style={{ fontSize: 24 }} spin />
//                       }
//                     />
//                   ) : (
//                     "Log in"
//                   )}
//                 </Button>
//               </Col>
//               <Col lg={24}>
//                 Or <Link to="/signup">register now!</Link>
//               </Col>
//             </Row>
//           </Form.Item>
//         </FormWrapper>
//       </React.Fragment>
//     )
//   }
// }

// export default Form.create()(LoginContainer)