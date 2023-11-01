import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home"
import Inwestowanie from "./Components/Inwestowanie"
import Kalendarz from "./Components/Kalendarz"
import Oszczednosci from "./Components/Oszczednosci"
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";


function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
      break;
    case "/Home":
      component = <Home />;
      break;
    case "/Kalendarz":
      component = <Kalendarz />;
      break;
    case "/Oszczednosci":
      component = <Oszczednosci />;
      break;
    case "/Inwestowanie":
      component = <Inwestowanie />;
      break;
    default:
      // Obsługa przypadku, gdy ścieżka URL nie pasuje do żadnej z powyższych
      // Możesz tu np. wyrenderować komunikat o błędzie lub przekierować na stronę domową.
      break;
  }

  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }


  return (
    <React.Fragment>
      <Navbar />
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} /> 
      }
      {component}
    </React.Fragment>
  )
}

export default App;