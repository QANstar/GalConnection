import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.scss'

function Login () {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={style.card}>
      <div className={style.title}>登录</div>
      <div className={style.tip}>
        未拥有账号？<Link to="/signin">注册</Link>
      </div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, message: '请输入你的邮箱!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入你的密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <div className={style.btn_wapper}>
            <Button shape="round" type="primary" htmlType="submit">
              登录
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
