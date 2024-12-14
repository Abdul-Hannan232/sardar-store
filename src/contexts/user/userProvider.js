// 'use client';
// import React, { useState, createContext, useContext, useEffect  } from 'react';

// // Define UserContext with default value
// const UserContext = createContext();

// // Hook to use the UserContext
// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };



// const isBrowser = typeof window !== 'undefined';
// export const UserProvider = ({ children }) => {
  
//   // const [user, setUser] = useState(null);
//   const [user, setUser] = useState(() => {
//     if (isBrowser) {
//       const storedUser = localStorage.getItem('user');
//       return storedUser ? JSON.parse(storedUser) : null;
//     }
//     return null;
//   });


//   useEffect(() => {
//     // Update localStorage whenever the user state changes
//     if (user) {
//       localStorage.setItem('user', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('user');
//     }
//   }, [user]);
//   const login = (userData) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;


 

'use client';
import React, { useState, useEffect  } from 'react';
import UserContext from '@contexts/user/userContext';


const isBrowser = typeof window !== 'undefined';
export const UserProvider = ({ children }) => {
  
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState(() => {
    if (isBrowser) {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });


  useEffect(() => {
    // update localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  const signin = (userData) => {
    setUser(userData);
  };

  // const logoutuser = () => {
  //   setUser(null);
  // };

  return (
    // <UserContext.Provider value={{ user, login, logoutuser }}>
    <UserContext.Provider value={{ user, signin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
