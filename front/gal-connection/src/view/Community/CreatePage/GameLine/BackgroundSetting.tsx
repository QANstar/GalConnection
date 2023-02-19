import { Switch } from 'antd'
import React from 'react'
import { IBinding, ILinesBackground } from '../../../../types/type'
import MaterialQuickAction from './Components/MaterialQuickAction'
import StyleSlider from './Components/StyleSlider'
import style from './style.module.scss'

interface IBackgroundSettingProps {
  data: IBinding[]
  groupId: number
  background: ILinesBackground
  onChange: (value: ILinesBackground) => void
}

function BackgroundSetting (props: IBackgroundSettingProps) {
  return (
    <div className={style.background}>
      <div className={style.isCG}>
        <span>是否为CG</span>
        <Switch
          checkedChildren="CG"
          unCheckedChildren="背景"
          onChange={(value) => {
            const newBackground = { ...props.background }
            newBackground.isCG = value
            props.onChange(newBackground)
          }}
          checked={props.background.isCG}
        />
      </div>
      <MaterialQuickAction
        onBindingSelect={(value) => {
          const newBackground = { ...props.background }
          newBackground.bindingId = value
          props.onChange(newBackground)
        }}
        onMaterialSelect={(value) => {
          const newBackground = { ...props.background }
          newBackground.materialId = value.fileId
          newBackground.background = value.url
          props.onChange(newBackground)
        }}
        bindingId={props.background.bindingId}
        materialId={props.background.materialId}
        type="picture"
        groupId={props.groupId}
        bindingList={props.data}
      />
      <StyleSlider
        style={props.background.style}
        onChange={(value) => {
          const newBackground = { ...props.background }
          newBackground.style = `top:${value.top}%;left:${value.left}%;width:${value.width}%`
          props.onChange(newBackground)
        }}
      />
    </div>
  )
}

export default BackgroundSetting
