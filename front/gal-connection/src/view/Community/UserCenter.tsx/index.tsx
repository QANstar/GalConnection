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
import { useNavigate, useParams } from 'react-router-dom'
import ImgCropper from '../../../Components/ImgCropper'
import useUser from '../../../Hooks/useUser'
import { IUser, OssFileType } from '../../../types/type'
import style from './style.module.scss'

function UserCenter () {
  const editFormRef = useRef<FormInstance>(null)
  const { id } = useParams()
  const [userInfo, setUserInfo] = useState<IUser>()
  const {
    getUserInfo,
    editUserInfo,
    bannerUpdate,
    avatarUpdate,
    user,
    error,
    loading
  } = useUser()
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
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
                <ImgCropper
                  ossFileType={OssFileType.Banner}
                  type="hidden"
                  title="头图"
                  width="100%"
                  height={200}
                  aspectRatio={10 / 1}
                  onFinished={async (url: string) => {
                    await bannerUpdate({ url })
                    getUser()
                  }}
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
                      <ImgCropper
                        ossFileType={OssFileType.Avatar}
                        type="hidden"
                        title="头像"
                        width="100%"
                        height={400}
                        aspectRatio={1 / 1}
                        onFinished={async (url: string) => {
                          await avatarUpdate({ url })
                          getUser()
                        }}
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
