import { BrowserRouter , Routes , Route } from "react-router-dom";
import Navbar from './constant/Navbar/Navbar';
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import MySpace from "./components/MySpace";
import Store from "./components/store";
import './App.css'

const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/my-space" element={<MySpace />} /> */}
        <Route path="/store" element={<Store />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App