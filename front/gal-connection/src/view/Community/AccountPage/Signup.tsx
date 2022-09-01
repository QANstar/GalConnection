import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useUser from '../../../Hooks/useUser'
import { IRegister } from '../../../types/type'
import style from './style.module.scss'

interface ISignupData extends IRegister {
  repassword: string
}

function Signup () {
  const { signup, error, loading } = useUser()
  const onFinish = (values: ISignupData) => {
    if (values.password !== values.repassword) {
      message.error('两次输入密码不相同')
    } else {
      signup(values)
    }
  }

  useEffect(() => {
    if (error !== '') {
      message.error(error)
    }
  }, [error])

  return (
    <div className={style.card}>
      <div className={style.title}>注册</div>
      <div className={style.tip}>
        已经拥有账号？<Link to="/login">登录</Link>
      </div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="用户名"
          name="nickname"
          rules={[{ required: true, message: '请输入你的用户名!' }]}
        >
          <Input />
        </Form.Item>
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
        <Form.Item
          label="确认密码"
          name="repassword"
          rules={[{ required: true, message: '请再次输入你的密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <div className={style.btn_wapper}>
            <Button
              loading={loading}
              shape="round"
              type="primary"
              htmlType="submit"
            >
              注册
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Signup
