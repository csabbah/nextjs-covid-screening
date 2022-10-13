import React from 'react';
import styles from '../styles/FormCompleted.module.css';

const formCompleted = () => {
  return (
    <div>
      <div className={styles.container}>
        <p>
          Thank you for filling the forms, your information has been uploaded.
        </p>
      </div>
    </div>
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
