import React, { useState, useEffect } from "react";
import LoginDiv from "../../Styled/UserCSS";
import firebase from "../../FireBase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [flag, setFlag] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);
  const [nameChkMsg, setNameChkMsg] = useState("");
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("회원가입", user);
    if (user.isLoading && user.accessToken) {
      alert("로그인한 사용자는 접근 불가능합니다.");
      navigate("/");
    }
  }, [user]);

  const RegisterFnc = async (e) => {
    setFlag(true);
    e.preventDefault();
    if (!(name || email || password || pwConfirm)) {
      alert("모든 값을 채워주세요.");
      return;
    }
    if (!nameCheck) {
      alert("닉네임중복검사를 진행해 주세요.");
      return;
    }
    if (password.length < 9) {
      alert("비밀번호는 최소 9글자 이상 입력해주세요.");
      return;
    }
    if (password !== pwConfirm) {
      alert("비밀번호가 같지 않습니다.");
      return;
    }
    try {
      let createUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await createUser.user.updateProfile({ displayName: name });

      console.log(createUser.user);
      let body = {
        email: createUser.user.multiFactor.user.email,
        displayName: createUser.user.multiFactor.user.displayName,
        uid: createUser.user.multiFactor.user.uid,
      };
      const res = await axios.post("api/user/register", body);
      setFlag(false);
      if (res.data.success) {
        //회원가입 성공 시
        alert("회원가입에 성공했습니다");
        navigate("/login");
      } else {
        alert("회원가입에 실패했습니다");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const NameCheckFnc = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/user/nickNameCheck", { nickName: name });
    if (res.data.success && res.data.check) {
      alert("닉네임이 사용가능합니다.");
      setNameCheck(true);
      setNameChkMsg("사용 가능");
    } else {
      alert("해당 닉네임은 존재합니다.");
      setNameChkMsg("사용 불가");
    }
  };

  return (
    <LoginDiv>
      <form>
        <input
          type="name"
          placeholder="닉네임"
          onChange={(e) => setName(e.currentTarget.value)}
          disabled={nameCheck}
        />
        <p>{nameChkMsg}</p>
        <button onClick={(e) => NameCheckFnc(e)}>닉네임 중복검사</button>
        <input
          type="email"
          placeholder="이메일"
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          minLength={8}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          minLength={8}
          onChange={(e) => setPwConfirm(e.currentTarget.value)}
        />
        <button disabled={flag} onClick={(e) => RegisterFnc(e)}>
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}
