import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Head from 'next/head';
import styles from '../../styles/Admin.module.css';
import Navbar from '../../components/Navbar';

import { AiFillFolderOpen, AiFillDelete } from 'react-icons/ai';

import { useRouter } from 'next/router';

import { server } from '../../utils/config.js';

const Index = ({ userData }) => {
  const [patientList, setPatientList] = useState(userData);

  const router = useRouter();

  const logout = async () => {
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    router.reload(window.location.pathname);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/api/patients/${id}`);

      // Normally, when we delete something from the database, it doesn't show right away
      // So, we update the pizzaList useState object which reflects realtime changes
      setPatientList(patientList.filter((patient) => patient._id !== id));
    } catch (err) {
      console.log(err);
    }
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
      <Navbar boolean={true} header={'Admin Dashboard'} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div>Admin</div>
          <button style={{ width: '100px' }} onClick={() => logout()}>
            Logout
          </button>
        </div>
        <div className={styles.mainWrapper}>
          <table className={`${styles.table} table align-middle`}>
            <thead className={styles.thead}>
              <tr className={styles.trTitle}>
                <th>
                  <span></span>
                </th>
                <th>
                  <span>Patient</span>
                </th>

                <th>
                  <span></span>
                </th>
              </tr>
            </thead>
            {patientList.length == 0 || patientList == undefined ? (
              <tbody>
                <tr>
                  <td>#</td>
                  <td>No Data</td>
                  <td>No Data</td>
                </tr>
              </tbody>
            ) : (
              patientList.map((patient) => {
                let { firstName, lastName } = patient.screeningData;

                return (
                  <tbody className={styles.tbody} key={patient._id}>
                    <tr className={styles.trTitle}>
                      <td className={styles.td}></td>
                      <td className={styles.td}>
                        <p style={{ marginBottom: '0' }}>
                          {firstName} {lastName}
                        </p>
                      </td>
                      <td className={styles.td}>
                        <button
                          onClick={() =>
                            router.push(`admin/patient/${patient._id}`)
                          }
                        >
                          <AiFillFolderOpen />
                        </button>
                        <button>
                          <AiFillDelete
                            onClick={() => handleDelete(patient._id)}
                          />
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
