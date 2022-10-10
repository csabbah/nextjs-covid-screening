import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Admin.module.css';

import { AiOutlineFolderView, AiFillDelete } from 'react-icons/ai';

import { useRouter } from 'next/router';

import { server } from '../../utils/config.js';

const Index = ({ userData }) => {
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
      <div className={styles.container}>
        <div className={styles.header}>
          <div>Admin</div>
          <button style={{ width: '100px' }} onClick={() => logout()}>
            Logout
          </button>
        </div>
        <div className={styles.mainWrapper}>
          <table className={`${styles.table} table table-hover align-middle`}>
            <thead className={styles.thead}>
              <tr className={styles.trTitle}>
                <th>
                  <span></span>
                </th>
                <th>
                  <span>Patient</span>
                </th>

                <th>
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            {userData.length == 0 || userData == undefined ? (
              <tbody>
                <td>#</td>
                <td>No Data</td>
                <td>No Data</td>
              </tbody>
            ) : (
              userData.map((patient) => {
                return (
                  <tbody className={styles.tbody} key={patient._id}>
                    <tr className={styles.trTitle}>
                      <td className={styles.td}></td>
                      <td className={styles.td}>
                        <p style={{ marginBottom: '0' }}>
                          {patient.screeningData.firstName}{' '}
                          {patient.screeningData.lastName}
                        </p>
                      </td>
                      <td className={styles.td}>
                        <button
                          onClick={() =>
                            router.push(`admin/patient/${patient._id}`)
                          }
                        >
                          <AiOutlineFolderView />
                        </button>
                        <button>
                          <AiFillDelete />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            )}
          </table>
        </div>
      </div>
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
