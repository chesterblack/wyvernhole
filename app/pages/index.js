import Head from 'next/head';
import React from 'react';

import Counters from '../components/Counters';
import MenuSidebar from '../components/Menu';
import DescriptionBox from '../components/DescriptionBox';
import ConversationBox from '../components/ConversationBox';
import ResponsesBox from '../components/ResponsesBox';

import { useSaveContext } from '../contexts/save-context';

export default function FrontPage() {
  const { saveCodeObj } = useSaveContext();
  const roomID = saveCodeObj.r;

  return (
    <main id="body">
      <Head key="head">
        <title>Wyvernhole</title>
      </Head>
      <div className="container">
        <Counters />
        <MenuSidebar />
        <DescriptionBox roomID={roomID} />
        <ConversationBox roomID={roomID} />
        <ResponsesBox />
      </div>
    </main>
  );
}
