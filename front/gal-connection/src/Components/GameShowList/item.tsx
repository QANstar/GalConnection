import { UserOutlined } from '@ant-design/icons'
import { Avatar, Tag } from 'antd'
import { motion } from 'framer-motion'
import React, { useMemo } from 'react'
import { IGame } from '../../types/type'
import { getRelativeTime } from '../../Utils/TimeUtils'
import style from './style.module.scss'

interface IGameShowItemProps {
  game: IGame
  onClick: () => void
  showIndex?: boolean
  index: number
}

function GameShowItem (props: IGameShowItemProps) {
  const tagColor = useMemo(() => {
    if (props.index === 0) {
      return '#ffc53d'
    } else if (props.index === 1) {
      return '#ff85c0'
    } else if (props.index === 2) {
      return '#ffd666'
    } else {
      return '#d9d9d9'
    }
  }, [props.index])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.2 }}
      className={style.main}
    >
      <div onClick={() => props.onClick()} className={style.image}>
        {props.showIndex && (
          <Tag className={style.tag} color={tagColor}>
            {props.index + 1}
          </Tag>
        )}
        <div
          className={style.gameCover}
          style={{ backgroundImage: `url(${props.game.cover})` }}
        ></div>
      </div>
      <div className={style.content}>
        <div onClick={() => props.onClick()} className={style.gameName}>
          {props.game.gameName}
        </div>
        <div className={style.info}>
          <a
            target="_blank"
            href={`/userCenter/${props.game.user?.id}`}
            className={style.user}
            rel="noreferrer"
          >
            <Avatar src={props.game.user?.avatar} icon={<UserOutlined />} />
            <span className={style.nickname}>{props.game.user?.nickname}</span>
          </a>
          <div className={style.time}>
            {getRelativeTime(props.game.createdAt)}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default GameShowItem
