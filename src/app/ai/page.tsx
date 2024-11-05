'use client';

import { generateId } from 'ai';
import { useActions, useUIState } from 'ai/rsc';

import ChatNavbar from '@/components/AI/ChatNavBar';
import InputContainer from '@/components/AI/InputContainer';
import Message from '@/components/AI/Message';
import MessagesContainer from '@/components/AI/MessagesContainer';

import { ClientMessage } from '../actions';
import { AI } from '../ai';

interface IFcAIProps {
  searchParams: {
    u: string;
    account?: string;
    creditcard?: string;
  };
}

export default function FinancialControllerAI(props: IFcAIProps) {
  const [conversation, setConversation] = useUIState<typeof AI>();
  const { continueConversation } = useActions<typeof AI>();

  const personalSpreadsheet = 'vW4IJc9KvA3X3uBR9m2k';

  const handleSubmit = async (c: string) => {
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      { id: generateId(), role: 'user', display: <Message role="user" display={c} /> }, // ui state
    ]);

    const message = await continueConversation(c, {
      u: props.searchParams.u,
      sheetid: personalSpreadsheet,
      account: props.searchParams.account,
      creditcard: props.searchParams.creditcard,
    }); // ai state

    setConversation((currentConversation: ClientMessage[]) => [...currentConversation, message]); // ui state
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-between bg-gray-100 text-black dark:bg-zinc-800 dark:text-white">
      <div className="flex flex-col h-full w-full px-3 py-4">
        <MessagesContainer conversation={conversation} />
        <InputContainer onSubmit={handleSubmit} />
      </div>
      <ChatNavbar
        cid={props.searchParams.creditcard}
        acid={props.searchParams.account}
        u={props.searchParams.u}
        selectedButton={'a'}
      />
    </div>
  );
}
