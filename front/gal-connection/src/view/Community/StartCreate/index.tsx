import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import CloudeFileSelect from '../../../Components/CloudeFileSelect'
import ImgSelectShow from '../../../Components/ImgSelectShow'
import { createGame } from '../../../service/game'
import { ICreateGame } from '../../../types/type'
import style from './style.module.scss'

function StartCreate () {
  const [cover, setCover] = useState('')
  const [homeBg, setHomeBg] = useState('')
  const [preCG, setPreCG] = useState<string[]>([])

  const onCreateFinish = async (data: {
    gameName: string
    introduce: string
  }) => {
    const createGameData: ICreateGame = {
      tag: [],
      cover,
      homeBg,
      preCg: preCG,
      langeuage: [],
      introduce: data.introduce,
      gameName: data.gameName
    }
    try {
      const { status } = await createGame(createGameData)
      if (status === 200) {
        message.success('成功')
      }
    } catch (error) {}
  }

  return (
    <div>
      <div className={style.gameFrom}>
        <Form layout="vertical" onFinish={onCreateFinish}>
          <Form.Item
            label="游戏名称"
            name="gameName"
            rules={[{ required: true, message: '请输入游戏名称' }]}
          >
            <Input placeholder="游戏名称" />
          </Form.Item>
          <Form.Item
            label="介绍"
            name="introduce"
            rules={[{ required: true, message: '请输入游戏介绍' }]}
          >
            <TextArea placeholder="游戏介绍" rows={4} />
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
          <Form.Item label="首页背景">
            {homeBg === ''
              ? (
              <CloudeFileSelect
                onFileSure={(url: string) => {
                  if (url !== '') {
                    setHomeBg(url)
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
                  setHomeBg('')
                }}
                url={homeBg}
              />
                )}
          </Form.Item>
          <Form.Item label="预览CG">
            <div className={style.imgList}>
              {preCG.map((item) => (
                <ImgSelectShow
                  key={item}
                  onDelClick={() => {
                    setPreCG(preCG.filter((x) => x !== item))
                  }}
                  url={item}
                />
              ))}
              <CloudeFileSelect
                onFileSure={(url: string) => {
                  if (url !== '') {
                    preCG.push(url)
                    setPreCG([...preCG])
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
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              style={{ margin: 20 }}
              size="large"
              type="primary"
              shape="round"
              block
              htmlType="submit"
            >
              创建新游戏
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default StartCreate
