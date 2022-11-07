import React, { useEffect, useState } from 'react';
import RepleList from './RepleList';
import RepleUpload from './RepleUpload';

export default function RepleArea({ postInfo }) {
  return (
    <div>
      <RepleUpload postInfo={postInfo} />
      <RepleList postInfo={postInfo} />
    </div>
  );
}
