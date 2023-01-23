import {
  CustomerServiceOutlined,
  FileOutlined,
  FilterOutlined,
  FolderOutlined,
  LeftOutlined,
  PictureOutlined,
  PlaySquareOutlined
} from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import React from 'react'
import { FileType } from '../../types/enums'
import { FilterFileTye } from '../../types/type'
import style from './style.module.scss'

interface IFileToolsProps {
  title: string
  isShowBack: boolean
  onBackClick: () => void
  typeFilterSelect: string
  onTypeFilterSelect: (value: FilterFileTye) => void
}

const FileTools = (props: IFileToolsProps) => {
  const filterFIleItems: MenuProps['items'] = [
    {
      label: (
        <div>
          <FileOutlined style={{ marginRight: 10 }} />
          所有文件
        </div>
      ),
      key: 'all'
    },
    {
      label: (
        <div>
          <FolderOutlined style={{ marginRight: 10 }} />
          文件夹
        </div>
      ),
      key: FileType.FOLDER
    },
    {
      label: (
        <div>
          <PictureOutlined style={{ marginRight: 10 }} />
          图片
        </div>
      ),
      key: FileType.PICTURE
    },
    {
      label: (
        <div>
          <PlaySquareOutlined style={{ marginRight: 10 }} />
          视频
        </div>
      ),
      key: FileType.VIDEO
    },
    {
      label: (
        <div>
          <CustomerServiceOutlined style={{ marginRight: 10 }} />
          音频
        </div>
      ),
      key: FileType.SOUND
    }
  ]

  return (
    <div className={style.main}>
      <div onClick={props.onBackClick} className={style.title}>
        {props.isShowBack && <LeftOutlined style={{ marginRight: 10 }} />}
        {props.title}
      </div>
      <div>
        <Dropdown
          menu={{
            items: filterFIleItems,
            selectable: true,
            selectedKeys: [props.typeFilterSelect],
            onSelect: (data) => {
              props.onTypeFilterSelect(data.key as FilterFileTye)
            }
          }}
        >
          <FilterOutlined
            className={
              props.typeFilterSelect !== 'all'
                ? style.iconActive
                : style.iconDefault
            }
          />
        </Dropdown>
      </div>
    </div>
  )
}

export default FileTools
