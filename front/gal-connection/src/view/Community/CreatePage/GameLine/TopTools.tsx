import {
  DeleteOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
  SaveOutlined
} from '@ant-design/icons'
import { Button, Dropdown, MenuProps, Space, Modal } from 'antd'
import React, { useMemo } from 'react'
import QuickSelect from '../../../../Components/QuickSelect'
import { IEvent, ILines } from '../../../../types/type'
import style from './style.module.scss'

const { confirm } = Modal

interface ITopTools {
  events: IEvent[]
  linesList: ILines[]
  nowLines?: ILines
  choEvent?: IEvent
  onItemClick: (eventId: number) => void
  onLeftInsert: () => void
  onRightInsert: () => void
  onSave: () => void
  onDelete: () => void
  onLinesSelectChange: (linesId: number) => void
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
      <div className={style.top_right}>
        <div className={style.linesOpe}>
          <Button onClick={props.onLeftInsert} icon={<PlusOutlined />} />
          <div className={style.linesSelect}>
            <QuickSelect
              value={props.nowLines?.id?.toString() || ''}
              list={props.linesList.map((x) => {
                const selectValue: { value: string; label: string } = {
                  value: x.id?.toString() || '',
                  label: `id${x.id} : ${x.LinesContent[0].linesContent1}`
                }
                return selectValue
              })}
              isLeftDisable={props.nowLines?.pre === 0}
              isRightDisable={props.nowLines?.next === 0}
              onLeftClick={() => {
                props.onLinesSelectChange(props.nowLines?.pre || 0)
              }}
              onRightClick={() => {
                props.onLinesSelectChange(props.nowLines?.next || 0)
              }}
              onSelect={(val) => {
                props.onLinesSelectChange(parseInt(val))
              }}
            />
          </div>
          <Button onClick={props.onRightInsert} icon={<PlusOutlined />} />
        </div>
        <Button
          style={{ marginRight: 15 }}
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            confirm({
              title: '确定删除这个台词?',
              icon: <ExclamationCircleFilled />,
              content: '此操作无法撤销',
              okText: '确定',
              okType: 'danger',
              cancelText: '取消',
              onOk () {
                props.onDelete()
              }
            })
          }}
          type="primary"
        />
        <Button icon={<SaveOutlined />} onClick={props.onSave} type="primary" />
      </div>
    </div>
  )
}

export default TopTools
