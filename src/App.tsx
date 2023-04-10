import './App.css'
import { Routes, Route } from "react-router-dom";
// import { addProduct, getall } from './api/product';
// import ProductAdd from './pages/productAdd';
import Signin from './pages/signin';
import Signup from './pages/signup';
import AddCategory from './pages/Category';
import ProductAdd from './pages/productAdd';
import Product from './pages/product';
import ProductEdit from './pages/productEdit';

function App() {


  return (
    <div className="App">
      <Routes >
        <Route path="/addCategory" element={<AddCategory />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productAdd" element={<ProductAdd />} />
        <Route path="/product" element={<Product />} />
        <Route path='/productEdit/:id' element={<ProductEdit />} />


      </Routes>
    </div>

  )
}

export default App
