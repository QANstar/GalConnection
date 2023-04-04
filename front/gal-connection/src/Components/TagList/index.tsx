import React from 'react'
import TagItem from './item'
import style from './style.module.scss'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

interface ITagListProps {
  tags: string[]
  activeTag: string
  onItemClick: (tag: string) => void
}

const TagList = (props: ITagListProps) => {
  const { tags, activeTag, onItemClick } = props
  return (
    <div className={style.tagList}>
      <Button type="link" icon={<LeftOutlined />}></Button>
      <div className={style.tagItems}>
        <TagItem
          onItemClick={() => onItemClick('all')}
          isActive={activeTag === 'all'}
          tag="全部"
          key="all"
        />
        {tags.map((item) => (
          <TagItem
            onItemClick={onItemClick}
            isActive={activeTag === item}
            tag={item}
            key={item}
          />
        ))}
      </div>

      <Button type="link" icon={<RightOutlined />}></Button>
    </div>
  )
}

export default TagList
