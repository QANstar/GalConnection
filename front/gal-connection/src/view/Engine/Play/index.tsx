import React, { useEffect, useState } from 'react'
import CharaPicList from '../../../Components/CharaPicList'
import OptionList from '../../../Components/OptionList'
import PlayLines from '../../../Components/PlayLines'
import useGame from '../../../Hooks/useGame'
import style from './style.module.scss'

function Play () {
  const { currentLines, nextLines, options, choOption } = useGame()
  const [optionVisable, setOptionVisable] = useState(false)

  useEffect(() => {
    if (options.length > 0) {
      setOptionVisable(true)
    }
  }, [options])

  return (
    <div
      style={{
        backgroundImage: `url(${currentLines.background.background})`
      }}
      onClick={nextLines}
      className={style.main}
    >
      <OptionList
        choOption={(choId: string) => {
          setOptionVisable(false)
          choOption(choId)
        }}
        data={options}
        visable={optionVisable}
      />
      <CharaPicList charaPics={currentLines.charaPics} />
      <PlayLines openSave={() => {}} data={currentLines} />
    </div>
  )
}

export default Play
