import React, { useState } from "react";
import { Link } from "react-router-dom";
import useInput from "../hook/useInput";

function Login() {
  const [id, idHandler] = useInput("");
  const [password, passwordHandler] = useInput("");

  return (
    <>
      <div>
        <form>
          <label>
            <input
              type="text"
              placeholder="ID"
              value={id}
              onChange={idHandler}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={passwordHandler}
            />
          </label>
          <button>로그인</button>
        </form>
      </div>
      <Link to="/">이전</Link>
      <Link to="/signup">회원가입</Link>
    </>
  );
}

export default Login;
