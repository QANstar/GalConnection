import style from './style.module.scss'
import React, { useEffect, useState } from 'react'
import { IBinding } from '../../../../types/type'
import { Button, Form, Input, Modal } from 'antd'
import CloudeFileSelect from '../../../../Components/CloudeFileSelect'
import ImgSelectShow from '../../../../Components/ImgSelectShow'
import { PlusOutlined } from '@ant-design/icons'
import FolderTree from '../../../../Components/FolderTree'
import { getFileInfoById } from '../../../../service/file'

interface IBindingFormProps {
  onFinish: (data: IBinding) => void
}

function BindingForm (props: IBindingFormProps) {
  const [folderId, setFolderId] = useState(0)
  const [folderTreeModalVisable, setFolderTreeModalVisable] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [cover, setCover] = useState('')
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    console.log('Success:', values)
    props.onFinish(values)
  }

  const getFileInfo = async () => {
    if (folderId !== 0) {
      try {
        const { data, status } = await getFileInfoById({ fileId: folderId })
        if (status === 200) {
          form.setFieldValue('folder', data.name)
          setFolderName(data.name)
        }
      } catch (error) {}
    }
  }

  useEffect(() => {
    getFileInfo()
  }, [folderId])

  return (
    <div className={style.main}>
      <Modal
        title="选择文件夹"
        open={folderTreeModalVisable}
        onOk={() => {
          setFolderTreeModalVisable(false)
        }}
        onCancel={() => {
          setFolderId(0)
          setFolderTreeModalVisable(false)
        }}
        okText="确认"
        cancelText="取消"
      >
        <FolderTree
          onItemClick={(data) => {
            setFolderId(data.id)
          }}
        />
      </Modal>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入绑定后的资源集名称!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="绑定文件夹"
          name="folder"
          rules={[{ required: true, message: '请选择绑定的文件夹!' }]}
        >
          <Input value={folderName} style={{ width: 300 }} disabled />
          <Button onClick={() => setFolderTreeModalVisable(true)}>选择</Button>
        </Form.Item>

        <Form.Item label="封面">
          {cover === ''
            ? (
            <CloudeFileSelect
              onFileSure={(url: string) => {
                if (url !== '') {
                  setCover(url)
                }
              }}
              type="picture"
            >
              <Button
                size="large"
                icon={<PlusOutlined />}
                className={style.choImgBtn}
                type="dashed"
              ></Button>
            </CloudeFileSelect>
              )
            : (
            <ImgSelectShow
              onDelClick={() => {
                setCover('')
              }}
              url={cover}
            />
              )}
        </Form.Item>

        <Form.Item>
          <Button block shape="round" type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default BindingForm
