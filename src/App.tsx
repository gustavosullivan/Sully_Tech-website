import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { SitePage } from './pages/SitePage'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <div className="noise" aria-hidden />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/site" element={<SitePage />} />
      </Routes>
    </BrowserRouter>
  )
}
