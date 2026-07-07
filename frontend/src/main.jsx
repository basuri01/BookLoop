import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'
import Home from './Pages/Home.jsx'
import CategoryPage from './Pages/CategoryPage.jsx'
import SearchPage from './Pages/SearchPage.jsx'
import AuthorPage from './Pages/AuthorPage.jsx'
import UserPage from './Pages/UserPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx'
import SellBookPage from './Pages/SellBookPage.jsx'
import RentBookPage from './Pages/RentBookPage.jsx'
import BuyBookPage from './Pages/BuyBookPage.jsx'

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='category/:categoryName' element={<CategoryPage/>}/>
      <Route path='author/:authorName' element={<AuthorPage/>}/>
      <Route path='search/:searchTerm' element={<SearchPage/>}/>
      <Route path='user' element={<UserPage/>}/>
      <Route path='login' element={<LoginPage/>}/>
      <Route path='register' element={<RegisterPage/>}/>
      <Route path='sell' element={<SellBookPage/>}/>
      <Route path='rent' element={<RentBookPage/>}/>
      <Route path='buy' element={<BuyBookPage/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
