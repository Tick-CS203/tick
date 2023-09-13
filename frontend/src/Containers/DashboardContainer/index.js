// Import necessary modules and hooks
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router';
import { Layout, Menu, Icon, notification } from 'antd';

// Import theme and constants
import { colors } from '../../Themes/Colors';
import { AUTH_USER_TOKEN_KEY } from '../../Utils/constants';

// Define the functional component
const DashBoardContainer = ({ history }) => {
  // Use the useState hook to manage the 'collapsed' state
  const [collapsed, setCollapsed] = useState(false);

  // Define the handleLogout function
  const handleLogout = async event => {
    try {
      await Auth.signOut({ global: true }).then(() => {
        localStorage.removeItem(AUTH_USER_TOKEN_KEY);
        history.push('/login');
      });
    } catch (err) {
      notification.error({ message: err.message });
    }
  };

  // Return the JSX layout
  return (
    <Layout className="cover" id="app-header">
      <Layout.Sider
        className="cover"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Icon type="home" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="setting" />
            <span>Settings</span>
          </Menu.Item>
          <Menu.Item key="3" onClick={event => handleLogout(event)}>
            <Icon type="logout" />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ background: colors.white, padding: 0 }}>
          <Icon
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

// Export the functional component
export default withRouter(DashBoardContainer);

// CLASS BASED COMPONENT
// import * as React from "react"
// import { Auth } from "aws-amplify"
// import { withRouter } from "react-router"
// import { Layout, Menu, Icon, notification } from "antd"

// /** App Theme */
// import { colors } from "../../Themes/Colors"

// /** App Constatns */
// import { AUTH_USER_TOKEN_KEY } from "../../Utils/constants"

// const DashBoardContainer = props => {
//   const [collapsed, setCollapsed] = React.useState(false)
//   const handleLogout = async event => {
//     const { history } = props
//     try {
//       await Auth.signOut({ global: true }).then(() => {
//         localStorage.removeItem(AUTH_USER_TOKEN_KEY)
//         history.push("/login")
//       })
//     } catch (err) {
//       notification.error({ message: err.message })
//     }
//   }

//   return (
//     <Layout className="cover" id="app-header">
//       <Layout.Sider
//         className="cover"
//         trigger={null}
//         collapsible
//         collapsed={collapsed}
//       >
//         <div className="logo" />
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
//           <Menu.Item key="1">
//             <Icon type="home" />
//             <span>Home</span>
//           </Menu.Item>
//           <Menu.Item key="2">
//             <Icon type="setting" />
//             <span>Settings</span>
//           </Menu.Item>
//           <Menu.Item key="3" onClick={event => handleLogout(event)}>
//             <Icon type="logout" />
//             <span>Logout</span>
//           </Menu.Item>
//         </Menu>
//       </Layout.Sider>
//       <Layout>
//         <Layout.Header style={{ background: colors.white, padding: 0 }}>
//           <Icon
//             className="trigger"
//             onClick={() => setCollapsed(!collapsed)}
//             type={collapsed ? "menu-unfold" : "menu-fold"}
//           />
//         </Layout.Header>
//         <Layout.Content
//           style={{
//             margin: "24px 16px",
//             padding: 24,
//             background: colors.white,
//             minHeight: 280
//           }}
//         >
//           <div className="text-center">
//             <h1>Hello world</h1>
//           </div>
//         </Layout.Content>
//       </Layout>
//     </Layout>
//   )
// }

// export default withRouter(DashBoardContainer)

