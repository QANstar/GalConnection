import { CloseCircleOutlined, SaveOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React, { useState } from 'react'
import { IOptions } from '../../types/type'
import style from './style.module.scss'

interface IOptionsEditItemProps {
  option: IOptions
  onSaveClick: (data: IOptions) => void
  onDelClick: (id: number) => void
}

function OptionsEditItem (props: IOptionsEditItemProps) {
  const [value, setValue] = useState(props.option.optionContent)
  return (
    <div className={style.item}>
      <div className={style.optionInput}>
        <Input
          addonBefore={`id:${props.option.id}`}
          addonAfter={
            <SaveOutlined
              onClick={() => {
                const newOptions = { ...props.option }
                newOptions.optionContent = value
                props.onSaveClick(newOptions)
              }}
            />
          }
          value={value}
          onChange={(val) => {
            setValue(val.target.value)
          }}
        />
        <CloseCircleOutlined
          onClick={() => props.onDelClick(props.option.id!)}
          className={style.optionInputDelIcon}
        />
      </div>
    </div>
  )
}

export default OptionsEditItem
