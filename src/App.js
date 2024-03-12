// importing CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Routes,Route} from 'react-router-dom'

// importing components
import MyNavbar from './components/MyNavbar'

// importing pages
import Register from './pages/Register'
import Login from './pages/Login'
import List from './pages/List'
import Home from './pages/Home'
import Details from './pages/Details'
import OrdersPage from './pages/ViewOrders'
import ViewOrderDetails from './pages/ViewOrderDetails'

function App() {

  return (
    <div>
        <MyNavbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/book/list' element={<List/>}/>
            <Route path='/book/view/:bookId' element={<Details/>}/>
            <Route path='/book/orders' element={<OrdersPage/>}/>
            <Route path='/book/orders/:bookId' element={<ViewOrderDetails/>}/>
        </Routes>
    </div>
  );
}

export default App;
