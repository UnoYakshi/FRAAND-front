function LoginPage() {
  return (
    <div className="page login">
      <form action="" className="login__form">
        <div className="login__part">
          <label htmlFor="login">Login</label>
          <input
            className="login__input"
            type="text"
            placeholder="login"
            id="login"
          />
        </div>
        <div className="login__part">
          <label htmlFor="password">Password</label>
          <input
            className="login__input"
            type="password"
            placeholder="password"
            id="password"
          />
        </div>
        <input className="login__btn" type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default LoginPage;
