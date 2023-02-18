import style from './style.module.scss'
import React, { useState } from 'react'
import useBinding from '../../../../Hooks/useBinding'
import { useNavigate, useParams } from 'react-router-dom'
import BindingList, { IBindingType } from './BindingList'
import { BindingType } from '../../../../types/enums'
import { Button, Modal, Popconfirm } from 'antd'
import BindingForm from './BindingForm'
import { IBinding } from '../../../../types/type'
import useGameInfo from '../../../../Hooks/useGameInfo'

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
  const navigate = useNavigate()
  const { gameInfo } = useGameInfo(parseInt(gameId || '0'))
  const { bindingInfo, binding, editBinding, delBinding } = useBinding(
    parseInt(gameId || '0')
  )
  const [addModalVisable, setAddModalVisable] = useState(false)
  const [editModalVisable, setEditModalVisable] = useState(false)
  const [choType, setChoType] = useState(BindingType.BACKGROUND)
  const [choItem, setChonItem] = useState<IBinding>()

  return (
    <div className={style.bindingMain}>
      <Modal
        title="添加绑定"
        open={addModalVisable}
        onOk={() => setAddModalVisable(false)}
        onCancel={() => setAddModalVisable(false)}
        footer={null}
      >
        <BindingForm
          onFinish={(data) => {
            binding({
              gameId: parseInt(gameId || '0'),
              name: data.name,
              type: choType,
              folderId: data.folderId,
              cover: data.cover
            })
            setAddModalVisable(false)
          }}
        />
      </Modal>
      <Modal
        title="编辑绑定"
        open={editModalVisable}
        onOk={() => {
          setEditModalVisable(false)
        }}
        onCancel={() => {
          setEditModalVisable(false)
        }}
        footer={null}
      >
        <BindingForm
          initData={choItem}
          onFinish={(data) => {
            console.log(data)
            if (choItem) {
              editBinding({
                id: choItem.id,
                gameId: choItem.gameId,
                name: data.name,
                type: choItem.type,
                folderId: data.folderId,
                cover: data.cover
              })
            }
            setEditModalVisable(false)
          }}
        />
        <Popconfirm
          title="删除绑定"
          description="是否删除此绑定信息?"
          onConfirm={() => {
            if (choItem && choItem.id) delBinding(choItem.id)
            setEditModalVisable(false)
          }}
          okText="确定"
          cancelText="取消"
        >
          <Button type="primary" block danger shape="round">
            删除
          </Button>
        </Popconfirm>

        <Button
          onClick={() => {
            navigate(`/myMaterial/${gameInfo?.groupId}/${choItem?.folderId}`)
          }}
          style={{ marginTop: 25 }}
          type="default"
          block
          shape="round"
        >
          跳转文件夹
        </Button>
      </Modal>
      {bindingType.map((item) => (
        <BindingList
          onItemClick={(data) => {
            setEditModalVisable(true)
            setChonItem(data)
          }}
          onAddClick={(data) => {
            setChoType(data.type)
            setAddModalVisable(true)
          }}
          key={item.type}
          data={bindingInfo.filter((x) => x.type === item.type)}
          type={item}
        />
      ))}
    </div>
  )
}

export default MaterialBinding
