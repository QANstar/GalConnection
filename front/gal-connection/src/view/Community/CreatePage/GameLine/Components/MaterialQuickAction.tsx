import React from 'react'
import QuickSelect from '../../../../../Components/QuickSelect'
import useFile from '../../../../../Hooks/useFile'
import { getFileUrl } from '../../../../../service/file'
import { FilterFileTye, IBinding } from '../../../../../types/type'
import style from '../style.module.scss'

interface IMaterialQuickActionProps {
  bindingList: IBinding[]
  groupId: number
  type: FilterFileTye
  bindingId?: number
  materialId?: number
  onBindingSelect: (bindingId: number) => void
  onMaterialSelect: (data: { fileId: number; url: string }) => void
}

function MaterialQuickAction (props: IMaterialQuickActionProps) {
  const { files } = useFile({
    groupId: props.groupId,
    pid:
      props.bindingList.find((x) => x.id === props.bindingId)?.folderId || -1,
    type: props.type
  })

  const getUrl = async (groupId: number, fileId: number) => {
    try {
      const { data, status } = await getFileUrl({
        groupId,
        fileId
      })
      if (status === 200) {
        return data
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={style.materialQuick}>
      <div>文件夹</div>
      <QuickSelect
        onSelect={(value) => {
          props.onBindingSelect(parseInt(value))
        }}
        value={props.bindingId ? props.bindingId.toString() : ''}
        list={props.bindingList.map((item) => {
          const listItem: { value: string; label: string } = {
            value: item.id ? item.id.toString() : '0',
            label: item.name
          }
          return listItem
        })}
      />
      <div>文件</div>
      <QuickSelect
        onSelect={async (value) => {
          const fileId = parseInt(value)
          const url = (await getUrl(props.groupId, fileId)) || ''
          props.onMaterialSelect({ fileId, url })
        }}
        value={props.materialId ? props.materialId.toString() : ''}
        list={files
          .filter((x) => x.type === props.type)
          .map((item) => {
            const listItem: { value: string; label: string } = {
              value: item.id ? item.id.toString() : '0',
              label: item.name
            }
            return listItem
          })}
      />
    </div>
  )
}

export default MaterialQuickAction
