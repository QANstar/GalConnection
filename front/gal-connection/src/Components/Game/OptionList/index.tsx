import { motion } from 'framer-motion'
import React from 'react'
import { IOptions } from '../../../types/gameTypes'
import style from './style.module.scss'

interface IOptionListProps {
  data: IOptions[]
  visable: boolean
  choOption: (choId: string) => void
}
function OptionList (props: IOptionListProps) {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '-100%' }
  }

  return (
    <motion.div
      animate={props.visable ? 'open' : 'closed'}
      variants={variants}
      className={style.cover}
    >
      {props.data.map((item) => (
        <div
          onClick={(event) => {
            event.stopPropagation()
            props.choOption(item.id)
          }}
          className={style.option}
          key={item.id}
        >
          {item.content}
        </div>
      ))}
    </motion.div>
  )
}

export default OptionList
