import React from 'react'
import { IBinding, ILinesBgm } from '../../../../types/type'
import MaterialQuickAction from './Components/MaterialQuickAction'
import style from './style.module.scss'

interface IBackgroundSettingProps {
  data: IBinding[]
  groupId: number
  bgm: ILinesBgm
  onBgmChange: (value: ILinesBgm) => void
}

function AudioSetting (props: IBackgroundSettingProps) {
  return (
    <div className={style.bgm}>
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
        bindingList={props.data}
      />
    </div>
  )
}

export default AudioSetting
