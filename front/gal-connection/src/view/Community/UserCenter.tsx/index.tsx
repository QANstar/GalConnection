import {
  Avatar,
  Button,
  Form,
  FormInstance,
  Input,
  message,
  Modal,
  Tag
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { Observer } from 'mobx-react'
import React, { useEffect, useRef, useState } from 'react'
import { Cropper } from 'react-cropper'
import { useNavigate, useParams } from 'react-router-dom'
import useUser from '../../../Hooks/useUser'
import { IUser } from '../../../types/type'
import style from './style.module.scss'

function UserCenter () {
  const editFormRef = useRef<FormInstance>(null)
  const { id } = useParams()
  const [userInfo, setUserInfo] = useState<IUser>()
  const {
    getUserInfo,
    editUserInfo,
    avatarUpload,
    bannerUpload,
    user,
    error,
    loading
  } = useUser()
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  const [isAvatarModalOpen, setIsAvatarModal] = useState<boolean>(false)
  const [avatarImage, setAvatarImage] = useState(user.avatar)
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const [avatarCropper, setAvatarCropper] = useState<any>()
  const [isBannerModalOpen, setIsBannerModal] = useState<boolean>(false)
  const [bannerImage, setBannerImage] = useState(user.banner)
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const [bannerCropper, setBannerCropper] = useState<any>()
  const navigate = useNavigate()

  const getUser = async () => {
    if (id) {
      const res = await getUserInfo(parseInt(id))
      if (res) {
        setUserInfo(res)
      } else {
        navigate('/userNotFound')
      }
    }
  }

  const onFinish = async (values: any) => {
    const isSuccess = await editUserInfo(values)
    if (isSuccess) {
      setEditModalOpen(false)
      getUser()
    }
  }

  useEffect(() => {
    getUser()
  }, [id])

  const onAvatarChange = (e: any) => {
    e.preventDefault()
    setIsAvatarModal(true)
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      setAvatarImage(reader.result as any)
    }
    reader.readAsDataURL(files[0])
  }

  const avatarUploadClick = () => {
    if (typeof avatarCropper !== 'undefined') {
      avatarCropper.getCroppedCanvas().toBlob(async (blob: Blob) => {
        // 创造提交表单数据对象
        const formData = new FormData()
        // 添加要上传的文件
        formData.append('file', blob, 'avatar')
        // 上传图片
        const res = await avatarUpload(formData)
        if (res === true) {
          setIsAvatarModal(false)
          getUser()
          if (avatarInputRef.current) {
            avatarInputRef.current.value = ''
          }
        }
      })
    }
  }

  const onBannerChange = (e: any) => {
    e.preventDefault()
    setIsBannerModal(true)
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      setBannerImage(reader.result as any)
    }
    reader.readAsDataURL(files[0])
  }

  const bannerUploadClick = () => {
    if (typeof bannerCropper !== 'undefined') {
      bannerCropper.getCroppedCanvas().toBlob(async (blob: Blob) => {
        // 创造提交表单数据对象
        const formData = new FormData()
        // 添加要上传的文件
        formData.append('file', blob, 'banner')
        // 上传图片
        const res = await bannerUpload(formData)
        if (res === true) {
          setIsBannerModal(false)
          getUser()
          if (bannerInputRef.current) {
            bannerInputRef.current.value = ''
          }
        }
      })
    }
  }

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  return (
    <Observer>
      {() => (
        <div className={style.main}>
          <Modal
            visible={editModalOpen}
            title="编辑用户资料"
            onOk={() => setEditModalOpen(true)}
            onCancel={() => setEditModalOpen(false)}
            footer={null}
          >
            <Form
              ref={editFormRef}
              layout="vertical"
              initialValues={user}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="用户名"
                name="nickname"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="介绍" name="introduce">
                <TextArea rows={8} showCount maxLength={300} />
              </Form.Item>
              <div className={style.btnWapper}>
                <Form.Item>
                  <Button loading={loading} type="primary" htmlType="submit">
                    确认
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="button"
                    onClick={() => {
                      editFormRef.current!.resetFields()
                      setEditModalOpen(false)
                    }}
                  >
                    取消
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Modal>
          <Modal
            visible={isAvatarModalOpen}
            title="头像"
            onOk={() => setIsAvatarModal(true)}
            onCancel={() => {
              setIsAvatarModal(false)
              if (avatarInputRef.current) {
                avatarInputRef.current.value = ''
              }
            }}
            footer={null}
          >
            <Cropper
              style={{ height: 400, width: '100%' }}
              zoomTo={0.5}
              aspectRatio={1 / 1}
              preview=".img-preview"
              src={avatarImage}
              viewMode={1}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => {
                setAvatarCropper(instance)
              }}
              guides={true}
            />
            <div className={style.btnWapper}>
              <Button
                loading={loading}
                type="primary"
                onClick={avatarUploadClick}
              >
                确认
              </Button>
              <Button
                onClick={() => {
                  if (avatarInputRef.current) {
                    avatarInputRef.current.value = ''
                  }
                  setIsAvatarModal(false)
                }}
              >
                取消
              </Button>
            </div>
          </Modal>
          <Modal
            visible={isBannerModalOpen}
            title="头图"
            onOk={() => setIsBannerModal(true)}
            onCancel={() => {
              setIsBannerModal(false)
              if (bannerInputRef.current) {
                bannerInputRef.current.value = ''
              }
            }}
            width="80%"
            footer={null}
          >
            <Cropper
              style={{ height: 200, width: '100%' }}
              zoomTo={0.5}
              aspectRatio={10 / 1}
              preview=".img-preview"
              src={bannerImage}
              viewMode={1}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => {
                setBannerCropper(instance)
              }}
              guides={true}
            />
            <div className={style.btnWapper}>
              <Button
                loading={loading}
                type="primary"
                onClick={bannerUploadClick}
              >
                确认
              </Button>
              <Button
                onClick={() => {
                  if (bannerInputRef.current) {
                    bannerInputRef.current.value = ''
                  }
                  setIsBannerModal(false)
                }}
              >
                取消
              </Button>
            </div>
          </Modal>
          <div className={style.bannerMain}>
            <div
              className={style.banner}
              style={{
                backgroundImage: `url(${userInfo ? userInfo.banner : ''})`
              }}
            />
            {user.id === parseInt(id!) && (
              <>
                <div className={style.mask}>更换头图</div>
                <input
                  ref={bannerInputRef}
                  onChange={onBannerChange}
                  type="file"
                  className={style.uploadInput}
                />
              </>
            )}
          </div>
          <div className={style.content}>
            <div className={style.top_info}>
              <div className={style.user_info_cover}>
                <div className={style.avatarCover}>
                  <Avatar
                    className={style.avatar}
                    src={userInfo ? userInfo.avatar : ''}
                    size={130}
                  />
                  {user.id === parseInt(id!) && (
                    <>
                      <div className={style.mask}>更换头像</div>
                      <input
                        ref={avatarInputRef}
                        onChange={onAvatarChange}
                        type="file"
                        className={style.uploadInput}
                      />
                    </>
                  )}
                </div>
                <div className={style.user_info}>
                  <div className={style.infoTop}>
                    <div className={style.nickname}>
                      {userInfo ? userInfo.nickname : ''}
                    </div>
                    <Tag color="#87d068">id: {userInfo?.id}</Tag>
                  </div>
                  <div className={style.introuduce}>
                    {userInfo ? userInfo.introduce : ''}
                  </div>
                </div>
              </div>
              <div className={style.top_info_action}>
                {user.id === parseInt(id!)
                  ? (
                  <Button onClick={() => setEditModalOpen(true)}>编辑</Button>
                    )
                  : (
                  <Button type="primary">关注</Button>
                    )}
              </div>
            </div>
            <div className={style.mygame}>
              <div className={style.title}>作品</div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  )
}

export default UserCenter
