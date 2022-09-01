import { action, makeAutoObservable } from 'mobx'
import { IUser } from '../types/type'
class User implements IUser {
  token: string = JSON.parse(localStorage.getItem('user') || '').token
  nickname: string = ''
  avatar: string = ''
  email: string = ''
  createdAt: number = 0
  introduce: string = ''
  banner: string = ''

  constructor () {
    makeAutoObservable(this)
    const localData = localStorage.getItem('user')
    if (localData != null) {
      const userData: IUser = JSON.parse(localData)
      this.setUser(userData)
    }
  }

  @action setUser (data: IUser) {
    this.nickname = data.nickname
    this.email = data.email
    this.avatar = data.avatar
    this.createdAt = data.createdAt
    this.introduce = data.introduce
    this.banner = data.banner
    this.saveLocation()
  }

  @action init () {
    this.token = ''
    this.nickname = ''
    this.email = ''
    this.avatar = ''
    this.createdAt = 0
    this.introduce = ''
    this.banner = ''
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
