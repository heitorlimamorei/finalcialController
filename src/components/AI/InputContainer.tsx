'use client';

import { useForm } from 'react-hook-form';

import { sendMessageSchema } from '@/schemas/sendMessageSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import SendIcon from '@mui/icons-material/Send';
import { TextareaAutosize } from '@mui/material';
import { z } from 'zod';

type SendMessageData = z.infer<typeof sendMessageSchema>;

interface InputContainerProps {
  onSubmit: (prompt: string) => Promise<void>;
}

export default function InputContainer(props: InputContainerProps) {
  const { register, handleSubmit, formState, reset } = useForm<SendMessageData>({
    resolver: zodResolver(sendMessageSchema),
  });

  const onSubmit = async (data: SendMessageData) => {
    await props.onSubmit(data.prompt);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
      <div className="flex flex-row items-center self-end mb-6 w-full rounded-2xl border-[1px] p-3 border-zinc-600">
        <TextareaAutosize
          {...register('prompt')}
          className="bg-transparent w-full h-[3rem] outline-none p-2 resize-none"
        />
        <button className="flex hover:cursor-pointer w-fit py-2" type="submit">
          <SendIcon />
        </button>
      </div>
      {formState.errors.prompt && (
        <p className="flex items-center text-red-500 font-bold text-sm">
          {formState.errors.prompt.message}
        </p>
      )}
    </form>
  );
}
