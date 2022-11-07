import React, { useEffect } from "react";
import "./App.css";
import Heading from "./Component/Heading";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, clearUser } from "./Reducer/userSlice";
import firebase from "./FireBase";
import List from "./Component/Post/List";
import Upload from "./Component/Post/Upload";
import PostArea from "./Component/Post/PostArea";
import Edit from "./Component/Post/Edit";
import Login from "./Component/User/Login";
import Register from "./Component/User/Register";
import MyPage from "./Component/User/MyPage";
import Main from "./Component/Post/Main";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo != null) {
        const loginUserInfo = userInfo.multiFactor.user;
        dispatch(
          loginUser({
            displayName: loginUserInfo.displayName,
            uid: loginUserInfo.uid,
            email: loginUserInfo.email,
            accessToken: loginUserInfo.accessToken,
            photoURL: loginUserInfo.photoURL,
          })
        );
        console.log(userInfo);
      } else {
        dispatch(clearUser());
      }
    });
  }, []);

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<Main />} />
        {/**
         * Post Reple
         */}
        <Route path="/upload" element={<Upload />} />
        <Route path="/post/:postNum" element={<PostArea />} />
        <Route path="/edit/:postNum" element={<Edit />} />
        {/**
         * 사용자 관련
         */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myPage/:uid" element={<MyPage />} />
      </Routes>
    </>
  );
}

export default App;
