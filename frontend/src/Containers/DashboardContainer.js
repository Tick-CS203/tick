import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Layout, Menu, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

/** App Theme */
import { colors } from '../Themes/Colors';

/** App Constants */
import { AUTH_USER_TOKEN_KEY } from '../Utils/constants';

const DashBoardContainer = props => {
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async event => {
    const { history } = props;
    try {
      await Auth.signOut({ global: true }).then(() => {
        localStorage.removeItem(AUTH_USER_TOKEN_KEY);
        history.push('/login');
      });
    } catch (err) {
      notification.error({ message: err.message });
    }
  };

  return (
    <Layout className="cover" id="app-header">
      <Layout.Sider className="cover" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <SmileOutlined type="home" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2">
            <SmileOutlined type="setting" />
            <span>Settings</span>
          </Menu.Item>
          <Menu.Item key="3" onClick={event => handleLogout(event)}>
            <SmileOutlined type="logout" />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ background: colors.white, padding: 0 }}>
          <SmileOutlined
            className="trigger"
            onClick={() => setCollapsed(!collapsed)}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
          />
        </Layout.Header>
        <Layout.Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colors.white,
            minHeight: 280
          }}
        >
          <div className="text-center">
            <h1>Hello world</h1>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default DashBoardContainer;
