import Head from 'next/head';
import React from 'react';

import Counters from '../components/Counters';
import MenuSidebar from '../components/Menu';
import DescriptionBox from '../components/DescriptionBox';
import ConversationBox from '../components/ConversationBox';
import ResponsesBox from '../components/ResponsesBox';

import DialogueWrapper from '../contexts/dialogue-context';

export default function FrontPage() {
  return (
    <main id="body">
      <Head key="head">
        <title>Wyvernhole</title>
      </Head>
      <div className="container">
        <Counters />
        <MenuSidebar />
        <DialogueWrapper>
          <DescriptionBox roomID="75V5XZzhXs6r7Nhdy9JQMv" />
          <ConversationBox />
          <ResponsesBox />
        </DialogueWrapper>
      </div>
    </main>
  );
}
