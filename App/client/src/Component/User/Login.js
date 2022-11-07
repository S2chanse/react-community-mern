import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../../Styled/UserCSS";
import firebase from "../../FireBase";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const signInFnc = async (e) => {
    e.preventDefault();
    if (!(email && password)) {
      alert("모든 값을 채워주세요");
      return;
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setErrMsg("존재하지 않는 이메일입니다.");
          break;
        case "auth/wrong-password":
          setErrMsg("비밀번호가 맞지 않습니다.");
          break;
        default:
          setErrMsg("로그인에 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  return (
    <LoginDiv>
      <form>
        <input
          type="email"
          placeholder="아이디"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {errMsg !== "" ? <p style={{ color: "red" }}>{errMsg}</p> : null}
        <button onClick={(e) => signInFnc(e)}>로그인</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}
