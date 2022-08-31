import { action, makeAutoObservable } from 'mobx'
import { IUser } from '../types/type'
class User implements IUser {
  token: string = ''
  nickname: string = ''
  avatar: string = ''
  email: string = ''

  constructor () {
    makeAutoObservable(this)
    const localData = localStorage.getItem('user')
    if (localData != null) {
      const userData: IUser = JSON.parse(localData)
      this.setUser(userData)
    }
  }

  @action setUser (data: IUser) {
    this.token = data.token
    this.nickname = data.nickname
    this.email = data.email
    this.avatar = data.avatar
    this.saveLocation()
  }

  @action init () {
    this.token = ''
    this.nickname = ''
    this.email = ''
    this.avatar = ''
    this.saveLocation()
  }

  saveLocation () {
    localStorage.setItem('user', JSON.stringify(this))
  }

  @action setToken (token: string) {
    this.token = token
    this.saveLocation()
  }
}

export default User
