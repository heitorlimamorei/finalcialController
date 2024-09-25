'use client';

import React from 'react';

import { ClientMessage } from '@/app/actions';

import Message from './Message';

interface IMessageContainer {
  conversation: ClientMessage[];
}

export default function MessagesContainer({ conversation }: IMessageContainer) {
  return (
    <ul className="flex flex-col w-full  overflow-y-scroll h-[720px]">
      <Message
        role="assistant"
        display="Olá sou o assistente financeiro, como posso ajudar você ?"
      />
      {conversation.map((c) => {
        return <React.Fragment key={c.id}>{c.display}</React.Fragment>;
      })}
    </ul>
  );
}
