import React from 'react';
import FormCompleted from '../components/FormCompleted';
import Navbar from '../components/Navbar';

const formCompleted = () => {
  return (
    <>
      <Navbar boolean={true} header={'Form Submitted'} />
      <FormCompleted />
    </>
  );
};

export default formCompleted;
