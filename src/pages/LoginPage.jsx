import React, { useState } from 'react';
import AdminPage from './AdminPage';

function LoginPage() {
  const [login, setLogin] = useState(false);
  const logIn = () => {
    setLogin(true);
  };

  return (
    <div>
      {
        login
          ? (
            <form>
              <button type="button" onClick={logIn}>
                Log In
              </button>
            </form>
          )
          : (
            <AdminPage />
          )
      }
    </div>
  );
}

export default LoginPage;
