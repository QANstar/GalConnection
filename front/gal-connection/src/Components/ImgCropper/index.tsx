import { Button, Modal, Upload } from 'antd'
import React, { useMemo, useState } from 'react'
import style from './style.module.scss'
import { Cropper } from 'react-cropper'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { OssFileType } from '../../types/type'
import { uploadFile } from '../../service/oss'

interface IImgCropper {
  ossFileType: OssFileType
  title: string
  onFinished: (url: string) => void
  type?: 'hidden' | 'card'
  height?: number | string
  width?: number | string
  aspectRatio?: number
}

function ImgCropper (props: IImgCropper) {
  const [cropper, setCropper] = useState<any>()
  const [visible, setVisable] = useState<boolean>(false)
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const handleChange = (e: any) => {
    setVisable(true)
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result as any)
    }
    reader.readAsDataURL(e.file.originFileObj)
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const inputType = useMemo(() => {
    if (props.type && props.type === 'hidden') {
      return style.hiddenType
    }
    return ''
  }, [props.type])

  return (
    <div className={style.main}>
      <Modal
        visible={visible}
        title={props.title}
        onCancel={() => setVisable(false)}
        width="80%"
        footer={null}
      >
        <Cropper
          style={{
            height: props.height || '100%',
            width: props.width || '100%'
          }}
          zoomTo={0.5}
          aspectRatio={props.aspectRatio || 1 / 1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance)
          }}
          guides={true}
        />
        <div className={style.btnWapper}>
          <Button
            loading={loading}
            type="primary"
            onClick={() => {
              if (typeof cropper !== 'undefined') {
                cropper.getCroppedCanvas().toBlob(async (blob: Blob) => {
                  // 创造提交表单数据对象
                  const formData = new FormData()
                  // 添加要上传的文件
                  formData.append('file', blob, 'avatar')
                  setLoading(true)
                  const res = await uploadFile({
                    body: formData,
                    query: props.ossFileType
                  })
                  setLoading(false)
                  if (res.status === 200) {
                    setVisable(false)
                    setImageUrl(res.data)
                    props.onFinished(res.data)
                  }
                })
              }
            }}
          >
            确认
          </Button>
          <Button
            onClick={() => {
              setVisable(false)
            }}
          >
            取消
          </Button>
        </div>
      </Modal>
      <Upload
        accept="image/*"
        name="upload"
        listType="picture-card"
        className={inputType}
        showUploadList={false}
        onChange={handleChange}
      >
        {imageUrl
          ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            )
          : (
              uploadButton
            )}
      </Upload>
    </div>
  )
}

export default ImgCropper
