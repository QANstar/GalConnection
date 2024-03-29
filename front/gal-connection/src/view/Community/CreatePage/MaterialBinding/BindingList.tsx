import style from './style.module.scss'
import React from 'react'
import { BindingType } from '../../../../types/enums'
import { IBinding } from '../../../../types/type'
import BindingItem from './BindingItem'
import { Button, Empty } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

export interface IBindingType {
  type: BindingType
  label: string
}

interface IBindingListProps {
  type: IBindingType
  data: IBinding[]
  onAddClick: (data: IBindingType) => void
  onItemClick: (data: IBinding) => void
}

function BindingList (props: IBindingListProps) {
  return (
    <div className={style.listMain}>
      <div className={style.header}>
        <div className={style.title}>{props.type.label}</div>
        <Button
          onClick={() => {
            props.onAddClick(props.type)
          }}
          type="dashed"
          icon={<PlusOutlined />}
          size="small"
        />
      </div>

      <div>
        {props.data.length <= 0
          ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )
          : (
          <div className={style.list}>
            {props.data.map((x) => (
              <BindingItem
                onClick={() => {
                  props.onItemClick(x)
                }}
                data={x}
                key={x.id}
              />
            ))}
          </div>
            )}
      </div>
    </div>
  )
}

export default BindingList
