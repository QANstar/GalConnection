import { SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useState } from 'react'
import style from './style.module.scss'

interface ISearchInputProps {
  width?: string | number
  onSearch?: (value: string) => void
}

function SearchInput (props: ISearchInputProps) {
  const [value, setValue] = useState('')

  return (
    <Input.Group
      compact
      style={{ width: props.width }}
      className={style.searchGroup}
    >
      <Input
        onPressEnter={() => {
          if (props.onSearch) {
            props.onSearch(value)
          }
        }}
        value={value}
        onChange={(val) => {
          setValue(val.target.value)
        }}
        className={style.searchInput}
        placeholder="搜索"
      />
      <Button
        onClick={() => {
          if (props.onSearch) {
            props.onSearch(value)
          }
        }}
        icon={<SearchOutlined />}
        className={style.searchBtn}
      />
    </Input.Group>
  )
}

export default SearchInput
