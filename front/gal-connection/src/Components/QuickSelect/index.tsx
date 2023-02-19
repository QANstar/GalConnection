import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Select } from 'antd'
import React from 'react'
import style from './style.module.scss'

interface IQuickSelectProps {
  list: { value: string; label: string }[]
  value: string
  onSelect: (data: string) => void
  onLeftClick: () => void
  onRightClick: () => void
}

function QuickSelect (props: IQuickSelectProps) {
  return (
    <div className={style.materialQuick}>
      <Button onClick={props.onLeftClick} icon={<LeftOutlined />} />
      <Select
        onSelect={(data) => props.onSelect(data)}
        style={{ flex: 1, overflow: 'hidden' }}
        value={props.value}
        options={props.list}
      />
      <Button onClick={props.onRightClick} icon={<RightOutlined />} />
    </div>
  )
}

export default QuickSelect
