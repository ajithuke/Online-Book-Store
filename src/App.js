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

function App() {

  return (
    <div>
        <MyNavbar/>
        <Routes>
            <Route path='/' element={<h1>Home page</h1>}/>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}/>
            <Route path='/book/list' element={<List/>}/>
        </Routes>
    </div>
  );
}

export default App;
