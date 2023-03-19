import * as signalR from '@microsoft/signalr'

class SignalR {
  connection: signalR.HubConnection | undefined = undefined

  constructor (token: string) {
    this.init(token)
  }

  start () {
    if (this.connection) {
      this.connection
        .start()
        .then(() => console.log('connected'))
        .catch((err) => console.log(err))
    }
  }

  init (token: string) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_SERVER_URL}/hub`, {
        accessTokenFactory: () => `${token}`
      })
      .withAutomaticReconnect()
      .build()
    this.start()
  }
}

export default SignalR
