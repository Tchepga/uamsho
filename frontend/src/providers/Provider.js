import React, { useEffect, useState } from "react";
import firebase from "../components/authentification/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
 // const [firebaseUser, setFirebaseCurrentUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase
      .auth()
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
        fetch(process.env.REACT_APP_API_URL + "/api/user?email=" + user.email)
          .then((response) => response.json())
          .then((data) => {
            setCurrentUser(data);
          })
          .catch((error) => console.error(error));
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
