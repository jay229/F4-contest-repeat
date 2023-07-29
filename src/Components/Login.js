import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [errorMsg,setErrMsg]=useState("");
  const navigate=useNavigate();

  const handleLogin = () => {
    if(!usernameState || !passwordState){
        setErrMsg("All the fields needs to be filled!");
        return;
    }
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameState,
        password: passwordState,
      }),
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
        else{
          setErrMsg("Incorrect credentials!");
          throw new Error("Incorrect credentials!");
        }
      })
      .then((data) =>{
          localStorage.setItem("id",data.id);
          localStorage.setItem("token",data.token);
          navigate("/profile");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="main-container">
    <div className="login-container">
            <div className="login">
                      <span>Welcome Back 👋</span>
                      <h3>Sign in to your account</h3>
                      <label htmlFor="username">Email</label>
                    <input
                      type="text"
                      id="username"
                      value={usernameState}
                      onChange={(e) => setUsernameState(e.target.value)}
                    
                    />
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      value={passwordState}
                      onChange={(e) => setPasswordState(e.target.value)}
                      
                    />
            </div>
            <button type="button" onClick={handleLogin}>
                      Continue
                    </button>
                    <p className="errorMessage">{errorMsg}</p>
                    <a href="#">Forgot your Password</a>
  </div>
  <div className="bottom-text">
              <span>Don't have an account? </span>
              <a href="#">Sign Up</a>
            </div>
  </div>
  );
};

export default Login;