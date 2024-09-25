import { createAI } from 'ai/rsc';

import { ServerMessage, ClientMessage, continueConversation } from './actions';

export const AI = createAI<
  ServerMessage[],
  ClientMessage[],
  { continueConversation: typeof continueConversation }
>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});
