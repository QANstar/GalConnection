import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React from 'react'
import { IGame } from '../../types/type'
import { getRelativeTime } from '../../Utils/TimeUtils'
import style from './style.module.scss'

interface IGameShowItemProps {
  game: IGame
  onClick: () => void
}

function GameShowItem (props: IGameShowItemProps) {
  return (
    <div className={style.main}>
      <div onClick={() => props.onClick()} className={style.image}>
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
    </div>
  )
}

export default GameShowItem
