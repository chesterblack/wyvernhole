import Head from 'next/head';
import React from 'react';

import Counters from '../components/Counters';
import MenuSidebar from '../components/Menu';
import TextBox from '../components/TextBox';
import DialogueBox from '../components/DialogueBox';
import ResponseBox from '../components/ResponseBox';

export default function FrontPage() {
  return (
    <main id="body">
      <Head key="head">
        <title>Wyvernhole</title>
      </Head>
      <div className="container">
        <Counters />
        <MenuSidebar />
        <TextBox />
        <DialogueBox />
        <ResponseBox />
      </div>
    </main>
  );
}
