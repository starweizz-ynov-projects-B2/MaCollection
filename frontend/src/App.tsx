import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/auth/login.tsx'
import RegisterPage from './pages/auth/register.tsx'
import RecipesPage from './pages/recipes/recipes.tsx'
import MyRecipesPage from './pages/recipes/my-recipes.tsx'
import NavBar from './components/NavBar'
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import CollectionPage from "./pages/collection/collection.tsx";
import StatsPage from "./pages/stats/stats.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

function App() {
  return (
      <AuthProvider>
          <BrowserRouter>
              <NavBar />

              <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/recipes" element={<RecipesPage />} />
                  <Route path="/recipes/mine" element={<MyRecipesPage />} />
                  <Route element={<ProtectedRoute />}>
                      <Route path="/collection" element={<CollectionPage />} />
                      <Route path="/stats" element={<StatsPage />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </AuthProvider>
  )
}

export default App
