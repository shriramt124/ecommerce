import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import axios from 'axios'
import './index.css'
import router from './routes'
import { AuthProvider } from './context/AuthContext'
import store from './store/store'

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
