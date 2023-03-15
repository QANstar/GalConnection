import React from 'react'

import style from './style.module.scss'

interface IFloatMenuProps {
  menus: { item: React.ReactNode; key: string }[]
}

const FloatMenu = (props: IFloatMenuProps) => {
  return (
    <div className={style.main}>
      <div className={style.floatMenu}>
        {props.menus.map((item) => (
          <div className={style.item} key={item.key}>
            {item.item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FloatMenu
