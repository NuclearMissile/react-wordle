import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Wordle from './Wordle.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Wordle/>
    </StrictMode>,
)
