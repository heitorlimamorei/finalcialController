import ICreditCardItem from '@/types/creditCardItem';
import { openai } from '@ai-sdk/openai';
import { generateId, generateText } from 'ai';
import axios from 'axios';

interface IQuery {
  u: string;
  sheetid: string;
  creditcard?: string;
}

const api = process.env.NEXT_PUBLIC_API_URL;

export default async function ServerWrapper(props: IQuery) {
  const { u, sheetid, creditcard } = props;
  const itemsresp = await axios<ICreditCardItem[]>(
    `${api}/credit_card_items?owid=${u}&sheetid=${sheetid}&credit_card_id=${creditcard}`,
  );

  if (itemsresp.status !== 200) {
    return <div>Error to loding data.....</div>;
  }

  const sanitizeItems = (data: ICreditCardItem[]) => {
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      amount: item.amount,
      interest: item.interest,
      hasbeenpaid: item.hasBeenPaid,
    }));
  };

  const items = JSON.stringify(sanitizeItems(itemsresp.data));

  const textResp = await generateText({
    model: openai('gpt-4o'),
    prompt: `Atue como um analista de gastos pessoais. Analise os gatos do cartão de credito a seguir levando em conta os valores, descricão, data e se foi paga no ultima fatura. Depois escreva um resumo. ${items} `,
  });

  const chunks = textResp.text.split('\n');

  return (
    <ul>
      {chunks.map((chunk) => {
        return <li key={generateId()}>{chunk}</li>;
      })}
    </ul>
  );
}
