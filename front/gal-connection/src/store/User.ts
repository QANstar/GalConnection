import { action, makeAutoObservable } from 'mobx'
import { IUser } from '../types/type'
class User implements IUser {
  token: string = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '{}').token
    : ''

  id: number = 0
  nickname: string = ''
  avatar: string = ''
  email: string = ''
  createdAt: number = 0
  introduce: string = ''
  banner: string = ''
  groupId: number = 0
  fansCount: number = 0
  followCount: number = 0

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
    this.id = data.id
    this.groupId = data.groupId
    this.fansCount = data.fansCount
    this.followCount = data.followCount
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
    this.id = 0
    this.groupId = 0
    this.fansCount = 0
    this.followCount = 0
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
