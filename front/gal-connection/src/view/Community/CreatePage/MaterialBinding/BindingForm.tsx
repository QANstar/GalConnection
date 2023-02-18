import style from './style.module.scss'
import React, { useEffect, useState } from 'react'
import { IBindingForm } from '../../../../types/type'
import { Button, Form, Input, Modal } from 'antd'
import CloudeFileSelect from '../../../../Components/CloudeFileSelect'
import ImgSelectShow from '../../../../Components/ImgSelectShow'
import { PlusOutlined } from '@ant-design/icons'
import FolderTree from '../../../../Components/FolderTree'
import { getFileInfoById } from '../../../../service/file'

interface IBindingFormProps {
  onFinish: (data: IBindingForm) => void
  initData?: IBindingForm
}

function BindingForm (props: IBindingFormProps) {
  const [folderId, setFolderId] = useState(
    props.initData ? props.initData.folderId : 0
  )
  const [folderSelectId, setFolderSelectId] = useState(0)
  const [folderTreeModalVisable, setFolderTreeModalVisable] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [cover, setCover] = useState(props.initData ? props.initData.cover : '')
  const [form] = Form.useForm()
  const onFinish = (values: { name: string }) => {
    const result: IBindingForm = {
      name: values.name,
      cover,
      folderId
    }
    props.onFinish(result)
    form.resetFields()
    setFolderId(0)
    setCover('')
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
    } else {
      setFolderName('')
    }
  }

  useEffect(() => {
    if (props.initData) {
      form.setFieldValue('name', props.initData.name)
      setFolderId(props.initData.folderId)
      setCover(props.initData.cover)
    }
  }, [props.initData])

  useEffect(() => {
    getFileInfo()
  }, [folderId])

  return (
    <div className={style.main}>
      <Modal
        title="选择文件夹"
        open={folderTreeModalVisable}
        onOk={() => {
          setFolderId(folderSelectId)
          setFolderTreeModalVisable(false)
        }}
        onCancel={() => {
          setFolderTreeModalVisable(false)
        }}
        okText="确认"
        cancelText="取消"
      >
        <FolderTree
          onItemClick={(data) => {
            setFolderSelectId(data.id)
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
