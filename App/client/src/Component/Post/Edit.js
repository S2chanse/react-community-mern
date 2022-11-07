import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UploadDiv, UploadForm, UploadButtonDiv } from '../../Styled/UploadCSS';
import ImgUpload from './ImgUpload';

export default function Edit() {
  let params = useParams();
  const naviagte = useNavigate();
  const [contentInfo, setContentInfo] = useState({});
  const [image, setImage] = useState('');

  useEffect(() => {
    axios
      .post('/api/post/detail', { postNum: params.postNum })
      .then((res) => {
        console.log(res);
        setContentInfo(res.data.post);
        setImage(res.data.post.image);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    console.log(contentInfo);
  }, [contentInfo]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      contentInfo.image = image;

      const res = await axios.post('/api/post/update', contentInfo);
      console.log(res.data.post);
      naviagte(`/post/${res.data.post.postNum}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor='label'>제목</label>
        <input
          id='label'
          type='text'
          value={contentInfo.title}
          onChange={(event) =>
            setContentInfo({
              ...contentInfo,
              title: event.currentTarget.value,
            })
          }
        />
        <ImgUpload setImage={setImage} />
        <label htmlFor='content'>내용</label>
        <textarea
          id='content'
          type='text'
          value={contentInfo.content}
          onChange={(event) =>
            setContentInfo({
              ...contentInfo,
              content: event.currentTarget.value,
            })
          }
        />
        <UploadButtonDiv>
          <button
            onClick={(e) => {
              e.preventDefault();
              naviagte(-1);
            }}
          >
            취소
          </button>
          <button onClick={(e) => onSubmit(e)}>제출</button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}
