import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './view/App'
import 'antd/dist/reset.css'
import './assets/styles/global.scss'
import { Provider } from 'mobx-react'
import store from './store'
import 'cropperjs/dist/cropper.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
