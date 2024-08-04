import React from "react";
import Main from "./pages/Main/MainPage";
import Header from "./components/Header/HeaderComponent";
import LoginPage from "./pages/Login/LoginPage";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Main /> */}
      <LoginPage />
    </div>
  );
}

export default App;
