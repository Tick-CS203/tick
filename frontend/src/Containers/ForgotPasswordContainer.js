import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Form, Spin, Input, Button, notification, Row, Col } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

/** Presentational */
import FormWrapper from '../Components/FormWrapper';

/** App theme */
import { colors } from '../Themes/Colors';

class ForgotPasswordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      redirect: false,
      loading: false
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username } = values;

        this.setState({
          loading: true,
          username
        });

        Auth.forgotPassword(username)
          .then(data => {
            notification.success({
              message: 'Redirecting you in a few!',
              description: 'Account confirmed successfully!',
              placement: 'topRight',
              duration: 1.5,
              onClose: () => {
                this.setState({ redirect: true });
              }
            });
          })
          .catch(err => {
            notification.error({
              message: 'User confirmation failed',
              description: err.message,
              placement: 'topRight',
              duration: 1.5
            });
            this.setState({ loading: false });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, redirect, username } = this.state;

    return (
      <React.Fragment>
        <FormWrapper onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Please input your username!'
                }
              ]
            })(
              <Input prefix={<SmileOutlined type="user" style={{ color: colors.transparentBlack }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item className="text-center">
            <Row>
              <Col lg={24}>
                <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
                  {loading ? (
                    <Spin indicator={<SmileOutlined type="loading" style={{ fontSize: 24 }} spin />} />
                  ) : (
                    'Confirm username'
                  )}
                </Button>
              </Col>
              <Col lg={24}>
                <Link to="/login">Ooh! Wait! I've remembered!</Link>
              </Col>
            </Row>
          </Form.Item>
        </FormWrapper>
        {redirect && (
          <Navigate
            to={{
              pathname: '/reset-password',
              search: `?username=${username}`
            }}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Form.create()(ForgotPasswordContainer);
