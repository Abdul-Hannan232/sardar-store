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
//       const storedUser = sessionStorage.getItem('user');
//       return storedUser ? JSON.parse(storedUser) : null;
//     }
//     return null;
//   });


//   useEffect(() => {
//     // Update localStorage whenever the user state changes
//     if (user) {
//       sessionStorage.setItem('user', JSON.stringify(user));
//     } else {
//       sessionStorage.removeItem('user');
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


 

// 'use client';
// import React, { useState, useEffect  } from 'react';
// import UserContext from '@contexts/user/userContext';
// import Cookies from 'js-cookie';



// const isBrowser = typeof window !== 'undefined';
// export const UserProvider = ({ children }) => {
  
//   // const [user, setUser] = useState(null);
//   const [user, setUser] = useState(() => {
//     if (isBrowser) {
//       const storedUser = sessionStorage.getItem('user');
//       return storedUser ? JSON.parse(storedUser) : null;
//     }
//     return null;
//   });


//   useEffect(() => {
//     // update localStorage
//     if (user) {
//       sessionStorage.setItem('user', JSON.stringify(user));
//     } else {
//       sessionStorage.removeItem('user');
//      Cookies.remove('auth_token')
//     } 
//   }, [user]);

//   const signin = (userData) => {
//     setUser(userData);
//   };


//   return (
//     // <UserContext.Provider value={{ user, login, logoutuser }}>
//     <UserContext.Provider value={{ user, signin }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;


'use client';
import React, { useState, useEffect } from 'react';
import UserContext from '@contexts/user/userContext';
import Cookies from 'js-cookie';

const isBrowser = typeof window !== 'undefined';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial validation

  useEffect(() => {
    if (isBrowser) {
      const token = Cookies.get('auth_token');
      const storedUser = sessionStorage.getItem('user');
      
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
        Cookies.remove('auth_token');
        document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        sessionStorage.removeItem('user');
      }

      setIsLoading(false); // Validation complete
    }
  }, []);

  useEffect(() => {
    // Update session storage whenever user state changes
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
      Cookies.remove('auth_token');
    }
  }, [user]);

  const signin = (userData) => {
    setUser(userData); // Save user in state
  };

  const logout = () => {
    setUser(null); // Clear user state
    Cookies.remove('auth_token');
    sessionStorage.removeItem('user');
  };

  if (isLoading) {
    return <div>Loading...</div>; // Display loader until validation is done
  }

  return (
    <UserContext.Provider value={{ user, signin, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

