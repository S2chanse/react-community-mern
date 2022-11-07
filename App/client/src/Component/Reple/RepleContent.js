import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Avatar from "react-avatar";
import moment from "moment";
import "moment/locale/ko";

export default function RepleContent({ reple }) {
  const [flag, setFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [chReple, setChReple] = useState(reple.reple);
  const ref = useRef();
  const user = useSelector((state) => state.user);
  useOnClickOutside(ref, () => setFlag(false));

  const RepleUpdateHandler = (e) => {
    e.preventDefault();
    let body = {
      uid: user.uid,
      reple: chReple,
      postId: reple.postId,
      _id: reple._id,
    };
    axios.post("/api/reple/edit", body).then((res) => {
      if (res.data.success) {
        alert("댓글 수정에 성공했습니다.");
      } else {
        alert("댓글 수정에 실패했습니다.");
      }
      window.location.reload();
    });
  };
  const RepleDeleteHandler = (e) => {
    e.preventDefault();
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      axios.post("/api/reple/delete", reple).then((res) => {
        if (res.data.success) {
          alert("댓글이 삭제됐습니다.");
          window.location.reload();
        }
      });
    }
  };

  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }

  const setTimeWhat = (a, b) => {
    return a === b
      ? moment(a).format("YYYY-MM-DD hh:mm") + "(New)"
      : moment(b).format("YYYY-MM-DD hh:mm") + "(수정됨)";
  };
  return (
    <div>
      <h6>
        <Avatar
          size="20"
          round={true}
          src={`http://localhost:5000/${user.photoURL}`}
        />
        <p>{setTimeWhat(reple.createdAt, reple.updatedAt)}</p>
        {reple.author.displayName}
      </h6>
      {user.uid === reple.author.uid && (
        <span ref={ref} onClick={() => setFlag(!flag)}>
          ...
          {flag && (
            <span>
              <button onClick={() => setEditFlag(true)}>수정</button>
              <button onClick={(e) => RepleDeleteHandler(e)}>삭제</button>
            </span>
          )}
        </span>
      )}
      {editFlag ? (
        <div>
          <form>
            <textarea
              id="content"
              type="text"
              value={chReple}
              onChange={(event) => setChReple(event.currentTarget.value)}
            />
            <Button onClick={(e) => RepleUpdateHandler(e)}>전송</Button>
            <Button
              style={{ backgroundColor: "red", border: "1px solid red" }}
              onClick={(e) => {
                e.preventDefault();
                setEditFlag(false);
              }}
            >
              취소
            </Button>
          </form>
        </div>
      ) : (
        <h3>{reple.reple}</h3>
      )}
    </div>
  );
}
