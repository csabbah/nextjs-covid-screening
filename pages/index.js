import Head from 'next/head';
import Forms from '../components/Forms';

export default function Home() {
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
      <Forms />
    </div>
  );
}

// Fetch all the active products and Orders via admin dashboard
export const getServerSideProps = async (ctx) => {
  // If there is a request, we are going to take the cookie, else, make it an empty string
  const myCookie = ctx.res.req.cookies || '';

  // If token is not valid, redirect to login
  if (myCookie.submitted) {
    return {
      // This is a next.js function to redirect to a different page
      redirect: {
        destination: '/form-completed',
        // Setting to false will keep users on the same tab
        permanent: false,
      },
    };
  }

  return {
    props: {
      cookie: myCookie,
    },
  };
};
