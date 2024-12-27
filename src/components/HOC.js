import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HOC = ({ component }) => {  
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodeToken = jwtDecode(token);
        if (decodeToken.exp > new Date().getTime() / 1000) {
          setIsAuth(true);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("credential");
          navigate("/login");
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("credential");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return isAuth && component;
};

export default HOC;
