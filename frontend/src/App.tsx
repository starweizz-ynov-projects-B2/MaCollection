import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/auth/login.tsx'
import RegisterPage from './pages/auth/register.tsx'
import RecipesPage from './pages/recipes/recipes.tsx'
import NavBar from './components/NavBar'
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import CollectionPage from "./pages/collection/collection.tsx";
import StatsPage from "./pages/stats/stats.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { CollectionProvider } from "./context/CollectionContext.tsx";
import Home from "./pages/home.tsx";

function App() {
  return (
      <AuthProvider>
          <CollectionProvider>
              <BrowserRouter>
                  <div className="flex min-h-screen flex-col bg-cream font-sans text-ink">
                      <NavBar />

                      <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/register" element={<RegisterPage />} />
                          <Route path="/recipes" element={<RecipesPage />} />
                          <Route element={<ProtectedRoute />}>
                              <Route path="/collection" element={<CollectionPage />} />
                              <Route path="/stats" element={<StatsPage />} />
                          </Route>
                      </Routes>
                  </div>
              </BrowserRouter>
          </CollectionProvider>
      </AuthProvider>
  )
}

export default App
