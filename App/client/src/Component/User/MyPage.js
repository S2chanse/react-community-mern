import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from 'react-avatar';
import styled from '@emotion/styled';
import axios from 'axios';
import fireBase from '../../FireBase';
import { LoginDiv, MyPageDiv } from '../../Styled/UserCSS';

export default function MyPage() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  let params = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [userPhoto, setUserPhoto] = useState('');
  useEffect(() => {
    if (user.isLoading && !user.accessToken) {
      navigate('/');
    } else {
      setUserPhoto(user.photoURL);
    }
  }, [user]);
  const fileUpload = async (e) => {
    var formData = new FormData();
    formData.append('file', e.target.files[0]);
    try {
      //const result = await axios.post('/api/post/img/upload', formData);
      const result = await axios({
        method: 'post',
        url: '/api/user/profile/img',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data; charset=UTF-8',
        },
      });
      if (result.data.success) {
        console.log(result);
        setUserPhoto(result.data.filePath);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const UpdateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(userPhoto);
      await fireBase.auth().currentUser.updateProfile({
        photoURL: userPhoto,
      });
      let body = {
        photoURL: userPhoto,
        uid: user.uid,
      };

      const res = await axios.post('/api/user/profile/update', body);
      console.log(res);
      if (res.data.success) {
        alert('프로필 수정이 완료됐습니다.');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MyPageDiv style={{ width: '100vw', height: '100vh' }}>
      <form
        style={{
          width: '50%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        <label>
          <input
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={(e) => fileUpload(e)}
          />
          <Avatar
            size='100'
            round={true}
            src={userPhoto}
            style={{ border: '1px solid #c6c6c6', cursor: 'pointer' }}
          />
        </label>
        <button onClick={(e) => UpdateProfileHandler(e)}>저장</button>
      </form>
    </MyPageDiv>
  );
}

const MyPageTopDiv = styled.div`
  width: 100vw;
  hieght: 100vh;
`;
const MyPageForm = styled.form`
  width: 50%;
  margin: 0 auto;
  display: flex;
  flexdirection: column;
  alignitems: center;
  margintop: 2rem;
`;
