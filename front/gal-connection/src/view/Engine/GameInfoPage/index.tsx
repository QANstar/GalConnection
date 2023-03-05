import React from 'react'
import style from './style.module.scss'
import wave from '../../../assets/img/wave.svg'
import { Link, useParams } from 'react-router-dom'
import useGameInfo from '../../../Hooks/useGameInfo'
import { motion } from 'framer-motion'
import { Image } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

const GameInfoPage = () => {
  const { gameId } = useParams()
  const { gameInfo } = useGameInfo(parseInt(gameId || '0'))

  const scrollToAnchor = (anchorName: string) => {
    if (anchorName) {
      const anchorElement = document.getElementById(anchorName)
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
    }
  }

  return (
    <div className={style.info}>
      <div
        style={{ backgroundImage: `url(${gameInfo?.homeBg})` }}
        className={style.home}
      >
        <div className={style.mask}>
          <div className={style.start}>
            <div className={style.gameName}>
              <div>{gameInfo?.gameName}</div>
              <Link to={`/engine/${gameId}/home`} className={style.startBtn}>
                开始
                <ArrowRightOutlined style={{ marginLeft: 10 }} />
              </Link>
            </div>
            <div className={style.menu}>
              <ul>
                <li onClick={() => scrollToAnchor('introduce')}>介绍</li>|
                <li>评论</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={style.wave_cover}>
          <img src={wave} alt="波浪" />
        </div>
      </div>
      <div id="introduce" className={style.introduction}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className={style.header}
        >
          <h1>介绍</h1>
          <span>about game</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
        >
          <div className={style.introduce}> {gameInfo?.introduce}</div>
        </motion.div>
        <div className={style.imgList}>
          <Image.PreviewGroup>
            {gameInfo?.preCG.map((item, index) => (
              <motion.div
                key={item}
                initial={{ translateX: '200px', opacity: 0 }}
                whileInView={{ translateX: '0px', opacity: 1 }}
                viewport={{ once: false }}
                transition={{
                  duration: 1 + index * 0.5 - Math.floor(index / 3) * 1.5
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={style.cover}
                >
                  <Image src={item} />
                </motion.div>
              </motion.div>
            ))}
          </Image.PreviewGroup>
        </div>
      </div>
    </div>
  )
}

export default GameInfoPage
