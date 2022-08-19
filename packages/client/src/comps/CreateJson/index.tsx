import React from 'react';
import SqlEdit from '../SqlEdit';

const CreateJson = () => {
  return (
    <>
      <div style={{ width: '100%', height: '200px' }}>
        <SqlEdit theme="panda-syntax" mode="text/javascript" />
      </div>
    </>
  );
};

export default CreateJson;
