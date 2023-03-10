import React, { useMemo } from 'react'
import { ISave } from '../../../../types/type'
import SaveItem from './item'
import style from './style.module.scss'

interface ISaveListProps {
  list: ISave[]
  page: number
  isSave?: boolean
  onItemSaveClick: (index: number, isSaved: boolean) => void
  onItemLoadClick: (data: ISave) => void
}

const onePageItemNum = 10

function SaveList (props: ISaveListProps) {
  const saveList = useMemo(() => {
    const elementList: React.ReactNode[] = []
    for (
      let i = (props.page - 1) * onePageItemNum + 1;
      i <= onePageItemNum * props.page;
      i++
    ) {
      const itemData = props.list.find((x) => x.saveIndex === i)
      elementList.push(
        <SaveItem
          onClick={() => {
            if (props.isSave) {
              props.onItemSaveClick(i, !!itemData)
            } else {
              if (itemData) {
                props.onItemLoadClick(itemData)
              }
            }
          }}
          isSave={props.isSave}
          index={i}
          item={itemData}
          key={i}
        />
      )
    }
    return elementList
  }, [props.list, props.page, props.isSave])
  return <div className={style.list}>{saveList}</div>
}

export default SaveList
