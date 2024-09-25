'use server';

import { ReactNode } from 'react';

import { openai } from '@ai-sdk/openai';
import { generateId } from 'ai';
import { getMutableAIState, streamUI } from 'ai/rsc';
import { z } from 'zod';

import Message from '@/components/AI/Message';

export interface ServerMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClientMessage {
  id: string;
  role: 'user' | 'assistant';
  display: ReactNode;
}

export async function continueConversation(input: string): Promise<ClientMessage> {
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
    tools: {},
  });

  return {
    id: generateId(),
    role: 'assistant',
    display: result.value,
  };
}
