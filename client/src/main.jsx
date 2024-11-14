import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import "./styles/App.css"

/** Redux Store */
import store from './redux/store';
import { Provider } from 'react-redux';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Provider store={store}>
      <App />
    </Provider>
  </ClerkProvider>,
)
