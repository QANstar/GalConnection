import SignalR from './SignalR'
import User from './User'

const user = new User()
const signalR = new SignalR(user.token)

const stores = {
  user,
  signalR
}

export default stores
