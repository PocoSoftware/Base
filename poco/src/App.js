import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home"
import Inwestowanie from "./Components/Inwestowanie"
import Kalendarz from "./Components/Kalendarz"
import Oszczednosci from "./Components/Oszczednosci"

function App() {
  let component;
  switch (window.location.pathname) {
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
  return (
    <React.Fragment>
      <Navbar />
      {component}
    </React.Fragment>
  )
}

export default App;