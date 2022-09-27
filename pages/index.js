import Head from 'next/head';
import axios from 'axios';
import { server } from '../utils/config';
import Forms from '../components/Forms';

export default function Home({ users }) {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Best Next Template" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Forms />
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const userData = await axios.get(`${server}/api/users`);

  return {
    props: {
      users: userData.data,
    },
  };
};
