import { action, makeAutoObservable } from 'mobx'

class ChatCard {
  open: boolean = false
  selectUserId: number = 0

  constructor () {
    makeAutoObservable(this)
  }

  @action init () {
    this.selectUserId = 0
  }

  @action setOpen (isOpen: boolean) {
    this.open = isOpen
  }

  @action setSelectUserId (userId: number) {
    this.selectUserId = userId
  }
}

export default ChatCard
