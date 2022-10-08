import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
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

function App () {
  const { getSelfInfo } = useUser()

  useEffect(() => {
    getSelfInfo()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/userCenter/:nickname" element={<UserCenter />} />
        <Route path="/creation" element={<CreationLayout />}>
          <Route path="" element={<MyCreation />} />
          <Route path="myMaterial" element={<MyMaterial />} />
        </Route>
      </Route>
      <Route path="/engine">
        <Route path="" element={<PlayHomeLayout />} />
        <Route path="play" element={<Play />} />
      </Route>
      <Route path="/login" element={<AccountPage type="login" />} />
      <Route path="/signup" element={<AccountPage type="signup" />} />
    </Routes>
  )
}

export default App
