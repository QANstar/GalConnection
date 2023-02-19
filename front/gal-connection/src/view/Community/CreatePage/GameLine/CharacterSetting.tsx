import { Button, Divider } from 'antd'
import React from 'react'
import { IBinding, ILinesChara } from '../../../../types/type'
import MaterialQuickAction from './Components/MaterialQuickAction'
import StyleSlider from './Components/StyleSlider'
import style from './style.module.scss'

interface ICharacterSettingProps {
  data: IBinding[]
  groupId: number
  chara: ILinesChara[]
  onChange: (value: ILinesChara[]) => void
}

function CharacterSetting (props: ICharacterSettingProps) {
  return (
    <div className={style.character}>
      <div>
        <Button
          block
          onClick={() => {
            const newChara = [...props.chara]
            newChara.push({
              charaPics: '',
              charaStyle: '',
              bindingId: 0,
              materialId: 0
            })
            props.onChange(newChara)
          }}
        >
          添加角色
        </Button>
      </div>
      <div>
        {props.chara.map((item, index) => (
          <div key={index}>
            <Divider plain>角色{index + 1}</Divider>
            <MaterialQuickAction
              onBindingSelect={(value) => {
                const newChara = [...props.chara]
                const thisChara = newChara[index]
                if (thisChara) thisChara.bindingId = value
                props.onChange(newChara)
              }}
              onMaterialSelect={(value) => {
                const newChara = [...props.chara]
                const thisChara = newChara[index]
                if (thisChara) {
                  thisChara.materialId = value.fileId
                  thisChara.charaPics = value.url
                }
                props.onChange(newChara)
              }}
              bindingId={item.bindingId}
              materialId={item.materialId}
              type="picture"
              groupId={props.groupId}
              bindingList={props.data}
            />
            <StyleSlider
              style={item.charaStyle}
              onChange={(value) => {
                const newChara = [...props.chara]
                const thisChara = newChara[index]
                if (thisChara) {
                  thisChara.charaStyle = `top:${value.top}%;left:${value.left}%;width:${value.width}%`
                }
                props.onChange(newChara)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CharacterSetting
