import React, { useEffect, useState } from 'react';

const CreateAccount = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [message, setMessage] = useState('Enter valid details!');
  const [btnDisabled, setBtnDisabled] = useState(false);


  const handleSubmit = () => {
let formStatus = true;
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let mobilePattern = /^[0-9]{10}$/;

    // Full name validation
    if (fullName.trim() === '') {
      setFullNameError('Full name is required!');
      formStatus = false;
    } else {
      setFullNameError('');
    }

    // Email validation
    if (!emailPattern.test(email)) {
      setEmailError('Invalid Email Id!');
      formStatus = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (password === '') {
      setPasswordError('Password is required!');
      formStatus = false;
    } else {
      setPasswordError('');
    }

    // Mobile number validation
    if (!mobilePattern.test(mobile)) {
      setMobileError('Invalid Mobile Number!');
      formStatus = false;
    } else {
      setMobileError('');
    }

    if (formStatus === false) {
      setMessage('Please fill all details correctly.');
    } else {
      setBtnDisabled(true);
      setMessage('Please wait, processing...');

      const newUser = {
        fullName, email, password, mobile
      }
         // Send POST request to the server
         fetch("http://localhost:1234/sellerapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then(response => response.json())
          .then(data => {
            setMessage('Account created successfully!');
            setBtnDisabled(false);
            // Optionally, you can clear the form
            setFullName('');
            setEmail('');
            setPassword('');
            setMobile('');
          })
          .catch(error => {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again.");
            setBtnDisabled(false);
          });
    }

  };

  return (
    <section className="p-5">
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-4'>
            <p className='text-center text-primary'>{message}</p>
            <div className='card border-0 shadow-lg'>
              <div className='card-header bg-danger text-white'>
                <i className='fa fa-user-plus'></i> Create Account 
              </div>
              <div className='card-body'>
                <div className='mb-3'>
                  <label htmlFor="fullName">Enter Full Name</label>
                  <input 
                    type='text' 
                    className='form-control' 
                    onChange={(e) => setFullName(e.target.value)} 
                    value={fullName} 
                  />
                  <small className='text-danger'>{fullNameError}</small>
                </div>
                <div className='mb-3'>
                  <label htmlFor="email">Enter Valid Email Id</label>
                  <input 
                    type='email' 
                    className='form-control' 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}  
                  />
                  <small className='text-danger'>{emailError}</small>
                </div>
                <div className='mb-3'>
                  <label htmlFor="password">Enter Valid Password</label>
                  <input 
                    type='password' 
                    className='form-control' 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}  
                  />
                  <small className='text-danger'>{passwordError}</small>
                </div>
                <div className='mb-3'>
                  <label htmlFor="mobile">Enter Mobile No.</label>
                  <input 
                    type='number' 
                    className='form-control' 
                    onChange={(e) => setMobile(e.target.value)} 
                    value={mobile}  
                  />
                  <small className='text-danger'>{mobileError}</small>
                </div>
              </div>
              <div className='card-footer text-center'>
                <button disabled={btnDisabled} className='btn btn-danger' onClick={handleSubmit}>
                  Submit <i className='fa fa-user-plus'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateAccount;
