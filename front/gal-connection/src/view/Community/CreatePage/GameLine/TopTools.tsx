import { SaveOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps, Space } from 'antd'
import React, { useMemo } from 'react'
import { IEvent } from '../../../../types/type'
import style from './style.module.scss'

interface ITopTools {
  events: IEvent[]
  choEvent?: IEvent
  onItemClick: (eventId: number) => void
  onSave: () => void
}

function TopTools (props: ITopTools) {
  const items: MenuProps['items'] = useMemo(() => {
    return props.events.map((event) => {
      const item = {
        key: event.id.toString(),
        label: (
          <div
            onClick={() => {
              props.onItemClick(event.id)
            }}
          >
            {event.eventName}
          </div>
        )
      }
      return item
    })
  }, [props.events])

  return (
    <div className={style.top}>
      <div>
        <Dropdown menu={{ items }}>
          <Space className={style.choEvent}>
            {props.choEvent && props.choEvent.eventName}
          </Space>
        </Dropdown>
      </div>
      <div>
        <Button icon={<SaveOutlined />} onClick={props.onSave} type="primary" />
      </div>
    </div>
  )
}

export default TopTools
