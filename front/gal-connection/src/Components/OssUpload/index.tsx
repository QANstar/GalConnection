import { message, Upload, UploadProps } from 'antd'
import React, { useMemo } from 'react'
import store from '../../store'
import { OssFileType } from '../../types/type'

interface IOssUploadProps {
  children: React.ReactNode
  type: OssFileType
  onFinish: (data: { url: string; type: OssFileType; name: string }) => void
}

function OssUpload (props: IOssUploadProps) {
  const acceptType = useMemo(() => {
    if (props.type === OssFileType.Picture) {
      return 'image/*'
    } else if (props.type === OssFileType.Video) {
      return 'video/*'
    } else if (props.type === OssFileType.Sound) {
      return 'audio/*'
    } else {
      return '*'
    }
  }, [props.type])

  const uploadProps: UploadProps = {
    action: `${process.env.REACT_APP_SERVER_URL}/api/Oss/Upload?ossFileType=${props.type}`,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    },
    showUploadList: false,
    onChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        const uploadRes: { url: string; type: OssFileType; name: string } = {
          url: info.file.response,
          type: props.type,
          name: info.file.name
        }
        props.onFinish(uploadRes)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
  return (
    <Upload accept={acceptType} {...uploadProps}>
      {props.children}
    </Upload>
  )
}

export default OssUpload
