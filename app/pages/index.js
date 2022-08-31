import Head from 'next/head';
import React from 'react';

import Counters from '../components/Counters';
import MenuSidebar from '../components/Menu';
import DescriptionBox from '../components/DescriptionBox';
import DialogueBox from '../components/DialogueBox';
import ConversationBox from '../components/ConversationBox';

export default function FrontPage() {
  return (
    <main id="body">
      <Head key="head">
        <title>Wyvernhole</title>
      </Head>
      <div className="container">
        <Counters />
        <MenuSidebar />
        <DescriptionBox text="You approach a tavern, the sign on the door reads: The Savoury Salmon. It seems humble, but reasonably well-kept." />
        <DialogueBox />
        <ConversationBox />
      </div>
    </main>
  );
}
