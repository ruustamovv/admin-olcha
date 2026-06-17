import React from "react"
import { Button, Form, Input } from "antd"
import { BaseUrl } from "../api"
import { urls } from "../utils/urls"
import { useNavigate } from "react-router"

function LoginPage({ setUser, user }) {
  const navigate = useNavigate()

  const onFinish = (values) => {
    BaseUrl.post(urls.login, values).then((res) => {
      localStorage.setItem("token", res.data.token)
      setUser(true)
      navigate("/")
    })
  }

  return (
    <>
      <div className="login flex items-center justify-center">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default LoginPage
