import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Main() {
  const [contentList, setContentList] = useState([]);
  const [sort, setSort] = useState("최신순");
  const [searchTerm, setSearchTerm] = useState("");
  const [skip, setSkip] = useState(0);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    SearchHandler();
  }, []);

  const SearchHandler = () => {
    axios
      .post("/api/post/list", { sort, searchTerm, skip })
      .then((res) => {
        if (res.data.success) {
          let postList = res.data.postList;
          setContentList([...contentList, ...postList]);
          setSkip(skip + postList.length);
          if (postList.length < 5) {
            setLoadMore(false);
          }
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <InputGroup className="mb-3">
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary">{sort}</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSort("최신순")}>
              최신순
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSort("인기순")}>
              인기순
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
        />
        <Button variant="outline-secondary" onClick={() => SearchHandler()}>
          Button
        </Button>
      </InputGroup>
      <List contentList={contentList} />
      <div className="d-grid gap-2">
        {loadMore ? (
          <>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => SearchHandler()}
            >
              더 불러오기
            </Button>
          </>
        ) : (
          <p>마지막 글 입니다.</p>
        )}
      </div>
    </div>
  );
}
