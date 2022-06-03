import React, { useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
  const [notes, setNotes] = useState();

  return (
    <React.Fragment>
      <Head>
        <title>Noteo</title>
      </Head>
      <Link href="/add-note">
        Ajouter nouveau note
      </Link>
    </React.Fragment>
  );
}

export default Home;
