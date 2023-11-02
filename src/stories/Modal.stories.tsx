/* eslint-disable storybook/story-exports */
import Input from '../components/input';
import ModalForm from '../components/template/ModalForm';
import type { Meta, StoryObj } from '@storybook/react';

interface ModalFormProps {
  isOpen: boolean;
  className?: string;
}

const ModalTest = ({ isOpen, className }: ModalFormProps) => {
  return (
    <ModalForm isOpen>
      <Input ref={null} onChange={ev} />
    </ModalForm>
  );
};

const meta = {
  title: 'Modal',
  component: ModalTest,
} as Meta<ModalFormProps>;

export default meta;

const Default = {};
