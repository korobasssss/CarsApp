import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'mobx-react'
import { authUserStore, carStore, usersStore } from './app/store/mobxStore'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider 
      authUserStore={authUserStore}
      carStore={carStore}
      usersStore={usersStore}
    >
      <App />
     </Provider>
    
  </StrictMode>,
)
