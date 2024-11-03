import { HashRouter, Routes, Route, Link } from "react-router-dom";
import MyHome from "./Home";
import Myfooter from "./footer";
import Myheader from "./userheader";
import MyCart from "./cart";
import MyLogin from "./login";
import CreateAccount from "./signup";

const UserModule = () => {
    return (
        <HashRouter>
           <Myheader/>
           <Routes>
               <Route exact path="/" element={<MyHome/>}/>
               <Route exact path="/cart" element={<MyCart/>}/>
               <Route exact path="/login" element={<MyLogin/>}/>
               <Route exact path="/signup" element={<CreateAccount/>}/>

           </Routes>
          
          <Myfooter/>
        </HashRouter>
    )
}
export default UserModule;