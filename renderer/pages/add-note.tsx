import React, { useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

const AddNote = () => {
  const [values, setValues] = useState({
    title: '',
    description: '',
  });

  const onConfirm = () => {
    console.log(values)
  }

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  };

  return (
    <React.Fragment>
      <Head>
        <title>Add new note</title>
      </Head>
      <div className='grid grid-col-1 text-2xl w-full text-center'>
        <form onSubmit={onConfirm}>
          <input type="text" name="title" placeholder="Titre" value={values.title} onChange={handleChange} />
          <input type="text" name="content" placeholder="Contenu" value={values.description} onChange={handleChange}/>
          <button type="submit">Enregistrer</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default AddNote;
