import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ILinesContent } from '../../../types/type'
import style from './style.module.scss'

interface IPlayLinesProps {
  data?: ILinesContent
  openSave: () => void
  openLoad: () => void
  autoClick: () => void
  skipClick: () => void
  backLogClick: () => void
  isDevMode?: boolean
  currentLinesText?: string
}
function PlayLines (props: IPlayLinesProps) {
  const { gameId } = useParams()
  const skipClick = (e: any) => {
    e.stopPropagation()
    props.skipClick()
  }
  const backLogClick = (e: any) => {
    e.stopPropagation()
    props.backLogClick()
  }
  const openSave = (e: any) => {
    e.stopPropagation()
    props.openSave()
  }

  const openLoad = (e: any) => {
    e.stopPropagation()
    props.openLoad()
  }

  const autoClick = (e: any) => {
    e.stopPropagation()
    props.autoClick()
  }
  return (
    <div className={style.play_lines}>
      {props.data && (
        <div className={style.lines}>
          <div className={style.name}>{props.data.characters}</div>
          <div className={style.text}>
            {props.isDevMode
              ? props.data.linesContent1
              : props.currentLinesText}
          </div>
        </div>
      )}
      {!props.isDevMode && (
        <div className={style.play_tool}>
          <ul>
            <li>
              <Link to={`/engine/${gameId}/home`}>Title</Link>
            </li>
            <li onClick={autoClick}>Auto</li>
            <li onClick={skipClick}>Skip</li>
            <li onClick={backLogClick}>BackLog</li>
            <li onClick={openSave}>Save</li>
            <li onClick={openLoad}>Load</li>
            {/* <li>Config</li> */}
          </ul>
        </div>
      )}
    </div>
  )
}

export default PlayLines
