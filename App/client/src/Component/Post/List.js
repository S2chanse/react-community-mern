import React from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ko";

export default function List({ contentList }) {
  const user = useSelector((state) => state.user);

  const setTimeWhat = (a, b) => {
    return a === b
      ? moment(a).format("YYYY-MM-DD hh:mm") + "(New)"
      : moment(b).format("YYYY-MM-DD hh:mm") + "(수정됨)";
  };
  return (
    <div>
      <h1>List</h1>
      {contentList.map((content, idx) => {
        return (
          <Link
            to={`/post/${content.postNum}`}
            key={idx}
            style={{ textDecoration: "none", color: "black" }}
            settimewhat={setTimeWhat}
          >
            <div
              id={content.postNum}
              style={{
                width: "100%",
                marginLeft: "1rem",
              }}
            >
              <h2>{content.title}</h2>
              <h5>
                <Avatar
                  size="40"
                  round={true}
                  src={`http://localhost:5000/${user.photoURL}`}
                />
                {content.author.displayName}
              </h5>
              <h3>{content.content}</h3>
              <p>{setTimeWhat(content.createdAt, content.updatedAt)}</p>
              <hr />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
