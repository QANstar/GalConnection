import React from 'react'
import { useNavigate } from 'react-router-dom'
import CreateAndEditGameForm from '../../../Components/CreateAndEditGameForm'
import { createGame } from '../../../service/game'
import { ICreateGame } from '../../../types/type'
import style from './style.module.scss'

function StartCreate () {
  const navigate = useNavigate()

  const onCreateFinish = async (gameInfo: ICreateGame) => {
    try {
      const { data, status } = await createGame(gameInfo)
      if (status === 200) {
        navigate(`/createPage/${data}`)
      }
    } catch (error) {}
  }

  return (
    <div>
      <div className={style.gameFrom}>
        <CreateAndEditGameForm onFinish={onCreateFinish} />
      </div>
    </div>
  )
}

export default StartCreate
