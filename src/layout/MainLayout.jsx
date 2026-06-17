import React, { useState } from "react"
import { Route, Routes, useNavigate } from "react-router"
import { SidebarMenu } from "../utils/sidebarMenu"
import { routes } from "../utils/routes"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Avatar, Button, Layout, Menu, Popconfirm } from "antd"
const { Header, Sider, Content } = Layout

function MainLayout({ setUser }) {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const onConfirm = () => {
    setUser(false)
    localStorage.clear()
    navigate("/login")
  }

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={SidebarMenu}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Popconfirm
            placement="topLeft"
            title={"Logout"}
            description={"Are you sure to logout?"}
            onConfirm={onConfirm}
            okText="yes"
            cancelText="no"
          >
            <Avatar
              className="cursor-pointer"
              style={{ marginRight: "16px" }}
              size={36}
              icon={<UserOutlined />}
            />
          </Popconfirm>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          <Routes>
            {routes.map((item) => (
              <Route path={item.path} element={item.element} />
            ))}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
