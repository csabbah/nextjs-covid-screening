import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

const submissionError = () => {
  let router = useRouter();

  useEffect(() => {
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  }, []);

  return (
    <>
      <Navbar boolean={true} header={'Submission Error'} />
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80vw',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <span>
            Failed to submit data, possible reason: Weak or no internet service.
            Please try again!
          </span>
          <button style={{ width: '175px' }} onClick={() => router.push('/')}>
            Go back
          </button>
        </div>
      </div>
    </>
  );
};

export default submissionError;
