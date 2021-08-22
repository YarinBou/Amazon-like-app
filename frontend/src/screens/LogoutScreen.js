import React, { useEffect, useState } from 'react';
import Axios from "axios";

export default function LogoutScreen() {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(async () => {
    try{
      const result = await Axios.get("/api/logout");
      document.location = "/";
    }
    catch (e){
      setErrorMessage(e.toString());
    }
  }, []);

  return (
    <div>
        <div>
  <h1>Logging out...</h1>
        </div>
  <div>{errorMessage}</div>
    </div>
  );
}
