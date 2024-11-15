import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState(localStorage.getItem("name"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [type, setType] = useState(localStorage.getItem("type"));
  const [image, setImage] = useState(localStorage.getItem("image"));
  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLs = (serverToken, name, userId, type, image) => {
    if(type === "college" || type === "club"){
      image = `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
    }
    setToken(serverToken);
    setName(name);
    setUserId(userId);
    setType(type);
    setImage(image);
   
    localStorage.setItem("token", serverToken);
    localStorage.setItem("userId", userId);
    localStorage.setItem("name", name);
    localStorage.setItem("type", type);
    localStorage.setItem("image", image);
  };

  const isLoggedIn = !!token;

  const [isCollegeRepresentative, setIsCollegeRepresentative] = useState(false);

  const Logout = () => {
    setToken("");
    setName("");
    setUserId("");
    setType("");
    setImage("");
    setIsCollegeRepresentative(false);
    
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("type");
    localStorage.removeItem("image");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLs,
        Logout,
        authorizationToken,
        isCollegeRepresentative,
        setIsCollegeRepresentative,
        name,
        userId,
        type,
        image,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);