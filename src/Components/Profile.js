import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState();
  const navigate=useNavigate();
  function handleSignOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setUserData([]);
    navigate("/");
  }
  useEffect(() => {
    let id = localStorage.getItem("id");
    fetch(`https://dummyjson.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserData(data);
      })
      .catch((error) => console.log(error.message));
  }, []);
  return (
    <div className="ProfilePage">
      {userData && (
        <>
        <h1>Profile Page</h1>
        <h2>Name: {userData.firstName} {userData.lastName}</h2>
        <img src={userData.image} alt="user-image"/>
        <UserTable userData={userData} />
        
        </>
      )}
    </div>
  );
};

export default Profile;