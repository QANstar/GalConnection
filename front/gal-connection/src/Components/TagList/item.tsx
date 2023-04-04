import React from 'react'
import style from './style.module.scss'

interface ITagItemProps {
  tag: string
  isActive: boolean
  onItemClick: (tag: string) => void
}

const TagItem = (props: ITagItemProps) => {
  const { tag, isActive, onItemClick } = props
  return (
    <div
      onClick={() => {
        onItemClick(tag)
      }}
      className={isActive ? style.tagItemActive : style.tagItem}
    >
      {tag}
    </div>
  )
}

export default TagItem
