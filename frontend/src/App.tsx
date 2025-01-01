import { SignUp } from "./pages/SignUp"
import{ SignIn} from "./pages/SignIn";
import { CardList } from "./components/cardList";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import  NavBar  from "./components/NavBar";

function App() {
  // const location = useLocation();
  // const hideNavbarRoutes = ["/signin", "/signup"];
  // const showNavbar = !hideNavbarRoutes.includes(location.pathname);
  // console.log(showNavbar)

  return (
  <div>
    <Router>
      <NavBar />
       <Routes>
     <Route path="/signup" element={ <SignUp />} />
     <Route path="/signin" element={<SignIn />} />
     <Route path="/dashboard" element={ <CardList />} />
    </Routes>
    </Router>
    
    
   
    
  </div>
  )
}

export default App
