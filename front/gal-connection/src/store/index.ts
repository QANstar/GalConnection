import ChatCard from './ChatCard'
import SignalR from './SignalR'
import User from './User'

const user = new User()
const chatCard = new ChatCard()
const signalR = new SignalR(user.token)

const stores = {
  user,
  signalR,
  chatCard
}

export default stores
