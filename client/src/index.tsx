import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.scss'
import { PortfolioContextProvider } from './context'
import { TrpcProvider } from './trpc'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <TrpcProvider>
        <PortfolioContextProvider>
            <App />
        </PortfolioContextProvider>
    </TrpcProvider>
)
