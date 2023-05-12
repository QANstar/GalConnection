import { DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Form, Input, Popconfirm, Select } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OptionsEditList from '../../../../Components/OptionsEditList'
import useOption from '../../../../Hooks/useOption'
import { EventEndType } from '../../../../types/enums'
import { IEditEvent, IEvent } from '../../../../types/type'
import style from './style.module.scss'
import CloudeFileSelect from '../../../../Components/CloudeFileSelect'
import ImgSelectShow from '../../../../Components/ImgSelectShow'

interface IEventSettingProps {
  event?: IEvent
  events: IEvent[]
  gameId: number
  onDelClick: (eventId: number) => void
  onSaveClick: (event: IEditEvent) => void
  onChange: (event: IEditEvent) => void
}

const endTypeOptions = [
  { value: EventEndType.NEXT, label: '下一个事件' },
  { value: EventEndType.OPTION, label: '选项' },
  { value: EventEndType.END, label: '游戏结束' },
  { value: EventEndType.VIDEO, label: '视频' }
]

function EventSetting (props: IEventSettingProps) {
  const {
    gameOptionsList,
    evnetOptionsList,
    addOption,
    EditOption,
    delOption
  } = useOption(props.gameId, props.event?.id)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [videoUrl, setVideoUrl] = useState<string>(
    props.event ? props.event.video || '' : ''
  )

  const groupOptions = useMemo(() => {
    const list = props.events.map((x) => {
      return {
        label: x.eventName,
        options: gameOptionsList
          .filter((y) => y.eventId === x.id)
          .map((y) => {
            return {
              label: y.optionContent,
              value: y.id!.toString()
            }
          })
      }
    })
    return list.filter((x) => x.options.length > 0)
  }, [props.events, gameOptionsList])

  useEffect(() => {
    if (props.event) {
      form.setFieldsValue({
        eventName: props.event.eventName
      })
      form.setFieldsValue({
        endType: props.event.endType
      })
      form.setFieldsValue({
        enterCondition:
          props.event.enterCondition === ''
            ? []
            : props.event.enterCondition.split(',')
      })
    }
  }, [props.event])

  return (
    <div className={style.settingContain}>
      <header className={style.settingHeader}>
        <Button
          className="blueBtn"
          size="large"
          onClick={() => {
            if (props.event) {
              const editEventData: IEditEvent = {
                id: props.event?.id,
                eventName: form.getFieldValue('eventName'),
                endType: form.getFieldValue('endType'),
                enterCondition: form.getFieldValue('enterCondition'),
                video: videoUrl
              }
              props.onSaveClick(editEventData)
            }
          }}
          icon={<SaveOutlined />}
        ></Button>
        {!props.event?.isStartEvent && (
          <Popconfirm
            title="删除事件"
            description="这将删除其包含的游戏内容与事件关系，你可以之后可以在回收站中将其恢复，确定删除此事件？"
            onConfirm={() => {
              if (props.event) {
                props.onDelClick(props.event.id)
              }
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button size="large" danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        )}
      </header>
      <main className={style.formMain}>
        {props.event && (
          <Form
            onValuesChange={() => {
              if (props.event) {
                const editEventData: IEditEvent = {
                  id: props.event?.id,
                  eventName: form.getFieldValue('eventName'),
                  endType: form.getFieldValue('endType'),
                  enterCondition: form.getFieldValue('enterCondition'),
                  video: videoUrl
                }

                props.onChange(editEventData)
              }
            }}
            form={form}
            layout="vertical"
          >
            <Form.Item name="eventName" label="事件名称">
              <Input placeholder="事件名称" />
            </Form.Item>
            <Form.Item name="endType" label="事件结束类型">
              <Select options={endTypeOptions} />
            </Form.Item>
            {props.event.endType === EventEndType.OPTION && (
              <Form.Item label="选项">
                <OptionsEditList
                  onItemDelClick={(id) => delOption({ optionId: id })}
                  onItemSave={EditOption}
                  onAddClick={() => {
                    addOption({
                      optionContent: '',
                      eventId: props.event?.id || 0
                    })
                  }}
                  options={evnetOptionsList}
                />
              </Form.Item>
            )}
            <Form.Item name="enterCondition" label="进入条件">
              <Select mode="multiple" allowClear options={groupOptions} />
            </Form.Item>

            {props.event.endType === EventEndType.VIDEO && (
              <Form.Item label="视频">
                {props.event.video && props.event.video !== ''
                  ? (
                  <ImgSelectShow
                    onDelClick={() => {
                      if (props.event) {
                        const editEventData: IEditEvent = {
                          id: props.event?.id,
                          eventName: form.getFieldValue('eventName'),
                          endType: form.getFieldValue('endType'),
                          enterCondition: form.getFieldValue('enterCondition'),
                          video: ''
                        }
                        props.onChange(editEventData)
                      }
                      setVideoUrl('')
                    }}
                    url={`${props.event.video}?x-oss-process=video/snapshot,t_1000,m_fast`}
                  />
                    )
                  : (
                  <CloudeFileSelect
                    onFileSure={(url: string) => {
                      if (url !== '') {
                        setVideoUrl(url)
                        if (props.event) {
                          const editEventData: IEditEvent = {
                            id: props.event?.id,
                            eventName: form.getFieldValue('eventName'),
                            endType: form.getFieldValue('endType'),
                            enterCondition:
                              form.getFieldValue('enterCondition'),
                            video: url
                          }
                          props.onChange(editEventData)
                        }
                      }
                    }}
                    type="video"
                  >
                    <Button
                      size="large"
                      icon={<PlusOutlined />}
                      className={style.choImgBtn}
                      type="dashed"
                    ></Button>
                  </CloudeFileSelect>
                    )}
              </Form.Item>
            )}

            <Button
              style={{ marginTop: 20 }}
              type="primary"
              block
              onClick={() => {
                navigate(
                  `/createPage/${props.gameId}/lines/${props.event?.id}/0`
                )
              }}
            >
              跳转到该事件内容编辑页面
            </Button>
          </Form>
        )}
      </main>
    </div>
  )
}

export default EventSetting
