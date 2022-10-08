import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

import { useRouter } from 'next/router';

import { server } from '../../utils/config.js';

const Index = ({ userData }) => {
  console.log(userData);
  const router = useRouter();

  const logout = async () => {
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    router.reload(window.location.pathname);
  };

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"
        />
      </Head>
      <div>Admin</div>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

export default Index;

// Fetch all the active products and Orders via admin dashboard
export const getServerSideProps = async (ctx) => {
  // If there is a request, we are going to take the cookie, else, make it an empty string
  const myCookie = ctx.res.req.cookies.token || '';

  // If token is not valid, redirect to login
  if (myCookie !== process.env.TOKEN) {
    return {
      // This is a next.js function to redirect to a different page
      redirect: {
        destination: '/admin/login',
        // Setting to false will keep users on the same tab
        permanent: false,
      },
    };
  }
  const users = await axios.get(`${server}/api/patients`);

  return {
    props: {
      userData: users.data,
    },
  };
};
