import { Divider } from 'antd'
import React from 'react'
import { IBinding, ILinesBgm, ILinesVoice } from '../../../../types/type'
import MaterialQuickAction from './Components/MaterialQuickAction'
import style from './style.module.scss'
import AudioPlayer from 'react-h5-audio-player'

interface IBackgroundSettingProps {
  bgmData: IBinding[]
  voiceData: IBinding[]
  groupId: number
  bgm: ILinesBgm
  voice: ILinesVoice
  onBgmChange: (value: ILinesBgm) => void
  onVoiceChange: (value: ILinesVoice) => void
}

function AudioSetting (props: IBackgroundSettingProps) {
  return (
    <div className={style.bgm}>
      <Divider>BGM</Divider>
      <MaterialQuickAction
        onBindingSelect={(value) => {
          const newBgm = { ...props.bgm }
          newBgm.bindingId = value
          props.onBgmChange(newBgm)
        }}
        onMaterialSelect={(value) => {
          const newBgm = { ...props.bgm }
          newBgm.materialId = value.fileId
          newBgm.bgm = value.url
          props.onBgmChange(newBgm)
        }}
        bindingId={props.bgm.bindingId}
        materialId={props.bgm.materialId}
        type="sound"
        groupId={props.groupId}
        bindingList={props.bgmData}
      />
      <div className={style.player}>
        <AudioPlayer
          autoPlay={false}
          autoPlayAfterSrcChange={false}
          src={props.bgm.bgm}
        />
      </div>
      <Divider>角色语音</Divider>
      <MaterialQuickAction
        onBindingSelect={(value) => {
          const newVoice = { ...props.voice }
          newVoice.bingdingId = value
          props.onVoiceChange(newVoice)
        }}
        onMaterialSelect={(value) => {
          const newVoice = { ...props.voice }
          newVoice.materialId = value.fileId
          newVoice.voice = value.url
          props.onVoiceChange(newVoice)
        }}
        bindingId={props.voice.bingdingId}
        materialId={props.voice.materialId}
        type="sound"
        groupId={props.groupId}
        bindingList={props.voiceData}
      />
      <div className={style.player}>
        <AudioPlayer
          autoPlay={false}
          autoPlayAfterSrcChange={false}
          src={props.voice.voice}
        />
      </div>
    </div>
  )
}

export default AudioSetting
