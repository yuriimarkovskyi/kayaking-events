import React, { useState } from 'react';
import EventsInformation from './EventsInformation';

function LoginPage() {
  const [login, setLogin] = useState(false);
  const logIn = () => {
    setLogin(true);
  };

  return (
    <div>
      {
        !login
          ? (
            <form>
              <button type="button" onClick={logIn}>
                Log In
              </button>
            </form>
          )
          : (
            <EventsInformation />
          )
      }
    </div>
  );
}

export default LoginPage;
