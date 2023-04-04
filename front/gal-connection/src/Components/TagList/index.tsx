import React, { useRef, useState } from 'react'
import TagItem from './item'
import style from './style.module.scss'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

interface ITagListProps {
  tags: string[]
  activeTag: string
  onItemClick: (tag: string) => void
}

const onceScrollWidth = 200

const TagList = (props: ITagListProps) => {
  const { tags, activeTag, onItemClick } = props
  const listScrollRef = useRef<HTMLDivElement>(null)
  const [scrollNum, setScrollNum] = useState(0)
  return (
    <div className={style.tagList}>
      <Button
        onClick={() => {
          if (listScrollRef.current) {
            const num = scrollNum === 0 ? 0 : scrollNum - 1
            listScrollRef.current.scrollTo({
              left: onceScrollWidth * num,
              behavior: 'smooth'
            })
            setScrollNum(num)
          }
        }}
        type="link"
        icon={<LeftOutlined />}
      ></Button>
      <div ref={listScrollRef} className={style.tagItems}>
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

      <Button
        onClick={() => {
          if (listScrollRef.current) {
            const width = listScrollRef.current.scrollWidth
            const clientWidth = listScrollRef.current.clientWidth
            const num =
              scrollNum * onceScrollWidth + clientWidth >= width
                ? scrollNum
                : scrollNum + 1
            listScrollRef.current.scrollTo({
              left: onceScrollWidth * num,
              behavior: 'smooth'
            })
            setScrollNum(num)
          }
        }}
        type="link"
        icon={<RightOutlined />}
      ></Button>
    </div>
  )
}

export default TagList
