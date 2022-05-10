import React, { useState } from 'react';
import AdminPanel from './AdminPanel';

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
            <AdminPanel />
          )
      }
    </div>
  );
}

export default LoginPage;
