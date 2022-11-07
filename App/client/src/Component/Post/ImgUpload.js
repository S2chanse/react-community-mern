import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

export default function ImgUpload({ setImage }) {
  /*
        1.사용자가 이미지를 업로드
        2.업로드 한 이미지를 받아서 서버에 저장
        3.저장한 이미지의 경로를 client에게 전송
        4.경로를 받아서, post model에 저장
    */

  // 기존의 간단한 파일 업로드

  const fileUpload = async (e) => {
    var formData = new FormData();
    formData.append('file', e.target.files[0]);
    try {
      //const result = await axios.post('/api/post/img/upload', formData);
      const result = await axios({
        method: 'post',
        url: '/api/post/img/upload',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data; charset=UTF-8',
        },
      });
      if (result.data.success) {
        console.log(result);
        setImage(result.data.filePath);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Form.Control
        type='file'
        className='shadow-none'
        accept='image/*'
        onChange={(e) => fileUpload(e)}
      />
    </div>
  );
}
