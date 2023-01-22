import { CustomerServiceOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'
import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import style from './style.module.scss'

interface IMusicPlayerProps {
  url: string
  visable: boolean
  onHidden: () => void
  onShow: () => void
}
function MusicPlayer (props: IMusicPlayerProps) {
  return (
    <>
      <div className={props.visable ? style.player : style.playerHidden}>
        <AudioPlayer src={props.url} />
      </div>
      <FloatButton
        onClick={() => {
          if (props.visable) {
            props.onHidden()
          } else {
            props.onShow()
          }
        }}
        shape="circle"
        style={{ right: 60, bottom: 100 }}
        type={props.visable ? 'primary' : 'default'}
        icon={<CustomerServiceOutlined />}
      />
    </>
  )
}

export default MusicPlayer
