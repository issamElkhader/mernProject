
import {BrowserRouter as Router  ,Routes ,  Route} from "react-router-dom"
import Header from "./components/Header.jsx";
import Dashboard from "./pages/Dashboard.jsx"
import Login from "./pages/Login.jsx" ;
import Register from "./pages/Register.jsx"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
//  --template redux

function App() {
  return (
    <>
    <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
          </Routes>
        </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
