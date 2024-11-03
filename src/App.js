import SellerModule from "./seller/sellerapp.js";
import UserModule from "./user/userapp.js";
function App() {
 
  if(localStorage.getItem("sellerid")==null)
  return(<UserModule/>)
  else 
  return(<SellerModule/>)

}

export default App;
