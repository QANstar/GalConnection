import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PlayHomeLayout from '../Engine/PlayHomeLayout'
import Play from '../Engine/Play'
import MainLayout from '../Community/MainLayout'
import Home from '../Community/Home'
import AccountPage from '../Community/AccountPage'
import useUser from '../../Hooks/useUser'
import UserCenter from '../Community/UserCenter.tsx'
import CreationLayout from '../Community/CreationLayout'
import MyCreation from '../Community/MyCreation'
import MyMaterial from '../Community/MyMaterial'
import UserNotFound from '../Community/UserNotFound'
import StartCreate from '../Community/StartCreate'
import CreatePage from '../Community/CreatePage'
import GameInfo from '../Community/CreatePage/GameInfo'
import EventPage from '../Community/CreatePage/EventPage'
import GameLine from '../Community/CreatePage/GameLine'
import MaterialBinding from '../Community/CreatePage/MaterialBinding'
import GameInfoPage from '../Engine/GameInfoPage'
import SearchPage from '../Community/SearchPage'
import SearchGamePage from '../Community/SearchPage/SearchGamePage'
import SearchUserPage from '../Community/SearchPage/SearchUserPage'
import MoreUserGame from '../Community/MoreUserGame'

function App () {
  const { getSelfInfo } = useUser()

  useEffect(() => {
    getSelfInfo()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/search/:content" element={<SearchPage />}>
          <Route path="" element={<Navigate to={'games'} />} />
          <Route path="games" element={<SearchGamePage />} />
          <Route path="users" element={<SearchUserPage />} />
        </Route>
        <Route path="/userCenter/:id" element={<UserCenter />} />
        <Route path="/moreUserGame/:userId" element={<MoreUserGame />} />
        <Route path="/userNotFound" element={<UserNotFound />} />
        <Route path="/creation" element={<CreationLayout />}>
          <Route path="" element={<MyCreation />} />
        </Route>
        <Route path="/myMaterial/:groupId/:pid" element={<MyMaterial />} />
        <Route path="/startCreate" element={<StartCreate />} />
        <Route path="/createPage/:gameId" element={<CreatePage />}>
          <Route path="" element={<Navigate to={'info'} />} />
          <Route path="info" element={<GameInfo />} />
          <Route path="event" element={<EventPage />} />
          <Route path="material" element={<MaterialBinding />} />
          <Route path="lines/:eventId/:linesId" element={<GameLine />} />
        </Route>
      </Route>
      <Route path="/engine/:gameId">
        <Route path="info" element={<GameInfoPage />} />
        <Route path="home" element={<PlayHomeLayout />} />
        <Route path="play" element={<Play />} />
      </Route>
      <Route path="/login" element={<AccountPage type="login" />} />
      <Route path="/signup" element={<AccountPage type="signup" />} />
    </Routes>
  )
}

export default App
