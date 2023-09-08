import React from 'react';
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Form, Input, Icon, Button, notification, Popover, Spin, Row, Col } from 'antd';

// App theme
import { colors } from '../../Themes/Colors';
import FormWrapper from '../../Components/Styled/FormWrapper';

class PasswordResetContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      redirect: false,
      loading: false,
    };
  }

  handleBlur = (event) => {
    const value = event.currentTarget.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;

    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter are inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { password, code } = values;
        const username = this.props.location.search.split('=')[1];

        Auth.forgotPasswordSubmit(username.trim(), code.trim(), password.trim())
          .then(() => {
            notification.success({
              message: 'Success!',
              description: 'Password reset successful, Redirecting you in a few!',
              placement: 'topRight',
              duration: 1.5,
              onClose: () => {
                this.setState({ redirect: true });
              }
            });
          })
          .catch(err => {
            notification.error({
              message: 'Error resetting password',
              description: err.message,
              placement: 'topRight',
              duration: 1.5,
            });
            this.setState({ loading: false });
          });

        // Show loader
        this.setState({ loading: true });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { redirect, loading } = this.state;

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
        {/* ... (rest of your render method remains unchanged) */}
      </React.Fragment>
    );
  }
}

export default Form.create()(PasswordResetContainer);
