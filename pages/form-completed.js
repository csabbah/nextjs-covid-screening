import React from 'react';
import FormCompleted from '../components/FormCompleted';
import Navbar from '../components/Navbar';

const formCompleted = ({ myCookie }) => {
  return (
    <>
      <Navbar boolean={true} header={'Form Submitted'} />
      <FormCompleted submitted={myCookie.submitted} />
    </>
  );
};

export default formCompleted;

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.res.req.cookies || '';

  if (!myCookie.submitted) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      myCookie,
    },
  };
};
