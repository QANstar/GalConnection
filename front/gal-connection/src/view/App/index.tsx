import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PlayHomeLayout from '../Engine/PlayHomeLayout'
import Play from '../Engine/Play'
import MainLayout from '../Community/MainLayout'
import Home from '../Community/Home'
import AccountPage from '../Community/AccountPage'

function App () {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
      </Route>
      <Route path="/engine">
        <Route path="" element={<PlayHomeLayout />} />
        <Route path="play" element={<Play />} />
      </Route>
      <Route path="/login" element={<AccountPage type="login" />} />
      <Route path="/signin" element={<AccountPage type="signin" />} />
    </Routes>
  )
}

export default App
