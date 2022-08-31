import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import Signin from './Signin'
import style from './style.module.scss'

interface IAccountPageProps {
  type: 'login' | 'signin'
}

function AccountPage (props: IAccountPageProps) {
  const [isLogin, setIsLogin] = useState(props.type === 'login')
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '100%', display: 'none' }
  }

  useEffect(() => {
    setIsLogin(props.type === 'login')
  }, [props.type])

  return (
    <div className={style.main}>
      <div className={style.left}>
        <div className={style.logo}>
          <Link to="/">GalConnection</Link>
        </div>
        <div className={style.info}>登录或创建你的账号</div>
      </div>
      <div className={style.wapper}>
        <motion.div
          className={style.anim_wapper}
          animate={isLogin ? 'open' : 'closed'}
          variants={variants}
        >
          <Login />
        </motion.div>
        <motion.div
          className={style.anim_wapper}
          animate={isLogin ? 'closed' : 'open'}
          variants={variants}
        >
          <Signin />
        </motion.div>
      </div>
    </div>
  )
}

export default AccountPage
