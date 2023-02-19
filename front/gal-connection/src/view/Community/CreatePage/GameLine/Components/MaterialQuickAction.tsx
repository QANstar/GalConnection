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
        onLeftClick={() => {
          if (props.bindingList.length > 0) {
            if (
              !props.bindingId ||
              props.bindingId <= 0 ||
              !props.bindingList.find((x) => x.id === props.bindingId)
            ) {
              props.onBindingSelect(props.bindingList[0].id!)
            } else {
              const bindingItem = props.bindingList.find(
                (x) => x.id === props.bindingId
              )
              if (bindingItem) {
                const index = props.bindingList.indexOf(bindingItem)
                if (index === 0) {
                  props.onBindingSelect(
                    props.bindingList[props.bindingList.length - 1].id!
                  )
                } else {
                  props.onBindingSelect(props.bindingList[index - 1].id!)
                }
              }
            }
          }
        }}
        onRightClick={() => {
          if (props.bindingList.length > 0) {
            if (
              !props.bindingId ||
              props.bindingId <= 0 ||
              !props.bindingList.find((x) => x.id === props.bindingId)
            ) {
              props.onBindingSelect(props.bindingList[0].id!)
            } else {
              const bindingItem = props.bindingList.find(
                (x) => x.id === props.bindingId
              )
              if (bindingItem) {
                const index = props.bindingList.indexOf(bindingItem)
                if (index + 1 === props.bindingList.length) {
                  props.onBindingSelect(props.bindingList[0].id!)
                } else {
                  props.onBindingSelect(props.bindingList[index + 1].id!)
                }
              }
            }
          }
        }}
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
        onLeftClick={async () => {
          if (files.length > 0) {
            if (
              !props.materialId ||
              props.materialId <= 0 ||
              !files.find((x) => x.id === props.materialId)
            ) {
              const url = (await getUrl(props.groupId, files[0].id!)) || ''
              props.onMaterialSelect({ fileId: files[0].id!, url })
            } else {
              const materalItem = files.find((x) => x.id === props.materialId)
              if (materalItem) {
                const index = files.indexOf(materalItem)
                if (index === 0) {
                  const fileId = files[files.length - 1].id!
                  const url = (await getUrl(props.groupId, fileId)) || ''
                  props.onMaterialSelect({ fileId, url })
                } else {
                  const fileId = files[index - 1].id!
                  const url = (await getUrl(props.groupId, fileId)) || ''
                  props.onMaterialSelect({ fileId, url })
                }
              }
            }
          }
        }}
        onRightClick={async () => {
          if (files.length > 0) {
            if (
              !props.materialId ||
              props.materialId <= 0 ||
              !files.find((x) => x.id === props.materialId)
            ) {
              const url = (await getUrl(props.groupId, files[0].id!)) || ''
              props.onMaterialSelect({ fileId: files[0].id!, url })
            } else {
              const materalItem = files.find((x) => x.id === props.materialId)
              if (materalItem) {
                const index = files.indexOf(materalItem)
                if (index + 1 === files.length) {
                  const fileId = files[0].id
                  const url = (await getUrl(props.groupId, fileId)) || ''
                  props.onMaterialSelect({ fileId, url })
                } else {
                  const fileId = files[index + 1].id
                  const url = (await getUrl(props.groupId, fileId)) || ''
                  props.onMaterialSelect({ fileId, url })
                }
              }
            }
          }
        }}
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
