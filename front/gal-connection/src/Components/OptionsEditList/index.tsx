import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { IOptions } from '../../types/type'
import OptionsEditItem from './item'
import style from './style.module.scss'

interface IOptionsEditListProps {
  options: IOptions[]
  onAddClick: () => void
  onItemSave: (data: IOptions) => void
  onItemDelClick: (id: number) => void
}

function OptionsEditList (props: IOptionsEditListProps) {
  return (
    <div className={style.list}>
      {props.options.map((item) => (
        <OptionsEditItem
          onDelClick={props.onItemDelClick}
          key={item.id}
          option={item}
          onSaveClick={props.onItemSave}
        />
      ))}
      <div>
        <Button
          onClick={props.onAddClick}
          block
          icon={<PlusOutlined />}
          type="dashed"
        />
      </div>
    </div>
  )
}

export default OptionsEditList
