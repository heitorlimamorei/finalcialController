'use server';

import { ReactNode } from 'react';

import { openai } from '@ai-sdk/openai';
import { generateId } from 'ai';
import { getMutableAIState, streamUI } from 'ai/rsc';
import { z } from 'zod';

import Message from '@/components/AI/Message';
import ServerWrapper from '@/components/AI/ServerWrapper';

interface IQuery {
  u: string;
  sheetid: string;
  account?: string;
  creditcard?: string;
}

export interface ServerMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClientMessage {
  id: string;
  role: 'user' | 'assistant';
  display: ReactNode;
}

export async function continueConversation(input: string, query: IQuery): Promise<ClientMessage> {
  'use server';

  const history = getMutableAIState();

  const result = await streamUI({
    model: openai('gpt-4o'),
    messages: [...history.get(), { role: 'user', content: input }],
    text: ({ content, done }) => {
      if (done) {
        const nMessages: ServerMessage[] = [
          ...history.get(),
          { role: 'assistant', content: input },
        ];

        history.done(nMessages);

        return <Message role="assistant" display={content} />;
      }
    },
    tools: {
      summarizeExpensesCreditCard: {
        description: 'Resuma os itens salvos no cartão de crédito provido pelo usuário',
        parameters: z.object({}),
        generate: async () => {
          return (
            <Message
              role="assistant"
              display={
                <ServerWrapper u={query.u} creditcard={query.creditcard} sheetid={query.sheetid} />
              }
            />
          );
        },
      },
    },
  });

  return {
    id: generateId(),
    role: 'assistant',
    display: result.value,
  };
}
