import React, { useContext, createContext } from 'react';
import { AuthProvider } from './Client/context/AuthContext';
import AppNav from './Client/navigation/AppNav';



function App() {
  return (
    <AuthProvider>
      {/* {userToken !== null ? <AuthUser /> : <UnAuthUser />} */}
      <AppNav />
    </AuthProvider>
  );
}

export default App;
