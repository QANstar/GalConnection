import style from './style.module.scss'
import React, { useState } from 'react'
import useBinding from '../../../../Hooks/useBinding'
import { useParams } from 'react-router-dom'
import BindingList, { IBindingType } from './BindingList'
import { BindingType } from '../../../../types/enums'
import { Modal } from 'antd'
import BindingForm from './BindingForm'

const bindingType: IBindingType[] = [
  {
    type: BindingType.CHARACTER,
    label: '角色'
  },
  {
    type: BindingType.BACKGROUND,
    label: '背景'
  },
  {
    type: BindingType.CG,
    label: 'CG'
  },
  {
    type: BindingType.BGM,
    label: 'BGM'
  },
  {
    type: BindingType.VOICE,
    label: '配音'
  }
]

function MaterialBinding () {
  const { gameId } = useParams()
  const { bindingInfo } = useBinding(parseInt(gameId || '0'))
  const [addModalVisable, setAddModalVisable] = useState(false)

  const onAddModalCancel = () => {
    setAddModalVisable(false)
  }

  const onAddModalOk = () => {
    setAddModalVisable(false)
  }

  return (
    <div className={style.main}>
      <Modal
        title="添加绑定"
        open={addModalVisable}
        onOk={onAddModalOk}
        onCancel={onAddModalCancel}
        footer={null}
      >
        <BindingForm onFinish={() => {}} />
      </Modal>
      {bindingType.map((item) => (
        <BindingList
          onAddClick={() => {
            setAddModalVisable(true)
          }}
          key={item.type}
          data={bindingInfo}
          type={item}
        />
      ))}
    </div>
  )
}

export default MaterialBinding
