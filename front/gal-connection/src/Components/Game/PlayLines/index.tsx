import React from 'react'
import { Link } from 'react-router-dom'
import { ILinesContent } from '../../../types/type'
import style from './style.module.scss'

interface IPlayLinesProps {
  data?: ILinesContent
  openSave: () => void
  isDevMode?: boolean
}
function PlayLines (props: IPlayLinesProps) {
  const test = (e: any) => {
    e.stopPropagation()
  }
  const openSave = (e: any) => {
    e.stopPropagation()
    props.openSave()
  }
  return (
    <div className={style.play_lines}>
      {props.data && (
        <>
          <div className={style.name}>{props.data.characters}</div>
          <div className={style.text}>{props.data.linesContent1}</div>
        </>
      )}
      {!props.isDevMode && (
        <div className={style.play_tool}>
          <ul>
            <li>
              <Link to="/">Title</Link>
            </li>
            <li onClick={test}>Auto</li>
            <li>Skip</li>
            <li>Back</li>
            <li>Next</li>
            <li onClick={openSave}>Save</li>
            <li>Load</li>
            <li>Config</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default PlayLines
