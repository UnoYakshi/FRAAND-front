import React from "react";
import AuthProvider from "./Provider/AuthProvider";
import Routes from "./routes";
import Main from "./pages/Main/MainPage";
import Header from "./components/Header/HeaderComponent";
import LoginPage from "./pages/Login/LoginPage";

function App() {
  return (
    <div className="App">
      <Header />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
