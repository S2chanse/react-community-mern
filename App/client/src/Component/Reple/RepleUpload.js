import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function RepleUpload({ postInfo }) {
  const user = useSelector((state) => state.user);
  const [reple, setReple] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!reple) {
      alert("댓글을 써주세요");
      return;
    }
    let body = {
      postid: postInfo._id,
      uid: user.uid,
      reple: reple,
    };

    axios.post("/api/reple/submit", body).then((res) => {
      if (res.data.success) {
        alert("댓글을 저장했습니다.");
        setReple("");
        window.location.reload();
      }
    });
  };
  return (
    <div>
      {user.accessToken && (
        <form>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            type="text"
            value={reple}
            onChange={(event) => setReple(event.currentTarget.value)}
          />
          <Button onClick={(e) => submitHandler(e)}>전송</Button>
        </form>
      )}
    </div>
  );
}
