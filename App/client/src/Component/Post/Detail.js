import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";

export default function Detail({ postInfo }) {
  let params = useParams();
  const naviagte = useNavigate();
  const user = useSelector((state) => state.user);
  /** 삭제 fnc **/
  const deleteRow = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        const res = await axios.post("/api/post/delete", params);
        if (res.data.success) {
          alert("삭제가 완료됐습니다.");
          naviagte("/");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const setTimeWhat = (a, b) => {
    return a === b
      ? moment(a).format("YYYY-MM-DD hh:mm") + "(New)"
      : moment(b).format("YYYY-MM-DD hh:mm") + "(수정됨)";
  };
  return (
    <div>
      <h1>{postInfo.title}</h1>
      <p>{setTimeWhat(postInfo.createdAt, postInfo.updatedAt)}</p>
      <p>
        <Avatar
          size="40"
          round={true}
          src={`http://localhost:5000/${user.photoURL}`}
        />
        {postInfo.author.displayName}
      </p>
      {postInfo.image ? (
        <img
          src={`http://localhost:5000/${postInfo.image}`}
          alt="이미지"
          style={{ width: "100px", height: "100px" }}
        />
      ) : null}
      <h3>{postInfo.content}</h3>
      {user.uid === postInfo.author.uid && (
        <>
          <Link to={`/edit/${postInfo.postNum}`}>
            <button> 수정 </button>
          </Link>
          <button
            onClick={() => {
              deleteRow();
            }}
          >
            삭제
          </button>
        </>
      )}
    </div>
  );
}
