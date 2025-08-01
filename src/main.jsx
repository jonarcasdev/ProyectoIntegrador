import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home/Home.jsx'
import Quiz from './pages/quiz/Quiz.jsx'
import About from './pages/About/About.jsx'
import NotFound from './pages/not-found/NotFound.jsx'
import Enfermedades from './pages/Enfermedades/Enfermedades.jsx'
import Trombosis from './pages/Enfermedades/Trombosis/Trombosis.jsx'
import Hipertension from './pages/Enfermedades/Hipertension/Hipertension.jsx'
import Layout from './layout/Layout.jsx'
import Login from './pages/Crud/Login/Login.jsx'
import Arritmia from './pages/Enfermedades/Arritmia/Arritmia.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/enfermedades' element={<Enfermedades />}>
            <Route path='trombosis' element={<Trombosis />} />
            <Route path='hipertension' element={<Hipertension />} />
            <Route path='arritmia' element={<Arritmia />} />
          </Route>
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
)
