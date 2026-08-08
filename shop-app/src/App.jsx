import './App.css'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import CatalogPage from './pages/CatalogPage/CatalogPage'
import CartPage from './pages/CartPage/CartPage'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header/Header'
import ProductPage from './pages/ProductPage/ProductPage'
import FooterPage from './components/FooterPage/FooterPage'


function App() {
 
  return (
  <div className='app'>
    <Header/>
    <main className='main'>
   <Routes>
      <Route path='/register'
      element={<RegisterPage/>}/>
      <Route path='/login'
      element={<LoginPage/>}/>
      <Route path='/catalog'
      element={
        
      <CatalogPage/>
     
      }/>
      <Route path='/product/:id'
      element={<ProductPage/>}/>
      <Route path='/cart'
      element={
        <ProtectedRoute>
      <CartPage/>
      </ProtectedRoute>
      }/>
   </Routes>
   </main>
   <FooterPage/>
   </div>
  )
}

export default App
