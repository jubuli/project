
import { useState } from "react";


const MyLogin = () =>{
    let[email, setEmail] = useState("");
    let[password, setPassword] = useState("");

    let[emailError, setEmailError] = useState("");
    let[passwordError, setPasswordError] = useState("");

    let[message, setMessage] = useState("Enter Login Details");
    let[mybtn, handlebtn] = useState(false);

    const loginCheck = () =>{
        let formstatus = true;
        let epattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        //             mohit.mca209@gmail.com
        //             username + @ + domainname + . + extension

        if( ! epattern.test(email) ){
            setEmailError("Invalid Email id !");
            formstatus = false;
        }else{
            setEmailError("");
        }

        if(password ==""){
            setPasswordError("Invalid Password !");
            formstatus=false;
        }else{
            setPasswordError("");
        }

        if(formstatus==false){
            setMessage("Please fill the details !");
        }else{
            handlebtn(true);
            
            setMessage("Please Wait Processing...");
            fetch("http://localhost:1234/sellerapi")
            .then(response =>response.json())
            .then(accountArray =>{
              let loginstatus = false;
              for(let i=0; i<accountArray.length; i++){
                  let seller = accountArray[i];
                  if(seller.email==email && seller.password==password)
                  {
                    loginstatus = true;
                    localStorage.setItem("sellerid", seller.id);
                    localStorage.setItem("sellername", seller.fullName);
                    window.location.reload();
                  }
              }// for end
              if(loginstatus == false){
                setMessage("Fail : Invalid or Not Exist !");
                handlebtn(false);
              }

            })
        }
    }

    return(
    <section className="p-5">
      <div className="container">
        <div className="row">
          <div className="col-xl-4"></div>
          <div className="col-xl-4">
            <p className="text-center text-primary"> {message} </p>
            <div className="card border-0 shadow-lg">
              <div className="card-header bg-danger text-white"> <i className="fa fa-lock"></i> Vendor Login </div>
              <div className="card-body">
                <div className="mb-3">
                  <label> Your e-Mail Id </label>
                  <input type="email" className="form-control" onChange={obj=>setEmail(obj.target.value)}/>
                  <small className="text-danger"> {emailError} </small>
                </div>
                <div className="mb-3">
                  <label> Your Password </label>
                  <input type="password" className="form-control" onChange={obj=>setPassword(obj.target.value)}/>
                  <small className="text-danger"> {passwordError} </small>
                </div>
              </div>
              <div className="card-footer text-center">
                <button disabled={mybtn} className="btn btn-danger" onClick={loginCheck}> Login <i className="fa fa-arrow-right"></i> </button>
              </div>
            </div>
          </div>
          <div className="col-xl-4"></div>
        </div>
      </div>
    </section>)
}

export default MyLogin;