import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/auth/login.tsx'
import RegisterPage from './pages/auth/register.tsx'
import RecipesPage from './pages/recipes/recipes.tsx'
import MyRecipesPage from './pages/recipes/my-recipes.tsx'
import NavBar from './components/NavBar'

function App() {
  return (
      <BrowserRouter>
          <NavBar />

          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/recipes/mine" element={<MyRecipesPage />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
