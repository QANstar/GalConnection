import { DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Form, Input, Popconfirm, Select } from 'antd'
import React, { useEffect } from 'react'
import { EventEndType } from '../../../../types/enums'
import { IEvent } from '../../../../types/type'
import style from './style.module.scss'

interface IEventSettingProps {
  event?: IEvent
  onDelClick: (eventId: number) => void
}

const endTypeOptions = [
  { value: EventEndType.NEXT, label: '下一个事件' },
  { value: EventEndType.OPTION, label: '选项' },
  { value: EventEndType.END, label: '游戏结束' },
  { value: EventEndType.VIDEO, label: '视频' }
]

function EventSetting (props: IEventSettingProps) {
  const [form] = Form.useForm()
  useEffect(() => {
    if (props.event) {
      form.setFieldsValue({
        eventName: props.event.eventName
      })
    }
  }, [props.event])

  return (
    <div className={style.settingContain}>
      <header className={style.settingHeader}>
        <Button
          className="blueBtn"
          size="large"
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
        <Form form={form} layout="vertical">
          <Form.Item name="eventName" label="事件名称">
            <Input placeholder="事件名称" />
          </Form.Item>
          <Form.Item name="endType" label="事件结束类型">
            <Select
              defaultValue={props.event ? props.event.endType : 0}
              options={endTypeOptions}
            />
          </Form.Item>
        </Form>
      </main>
    </div>
  )
}

export default EventSetting
