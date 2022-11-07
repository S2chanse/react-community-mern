import React, { useEffect, useState } from 'react';
import Detail from './Detail';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import RepleArea from '../Reple/RepleArea';

export default function PostArea() {
  let params = useParams();
  const [postInfo, setPostInfo] = useState({});
  useEffect(() => {
    axios
      .post('/api/post/detail', { postNum: params.postNum })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.post.author);
          setPostInfo(res.data.post);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  return postInfo.author ? (
    <>
      <Detail postInfo={postInfo} />
      <RepleArea postInfo={postInfo} />
    </>
  ) : (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  );
}
