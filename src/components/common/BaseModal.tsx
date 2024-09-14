import { useEffect, useState } from 'react';

interface IBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BaseModal({ isOpen, onClose, children }: IBaseModalProps) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isContainerVisible, setIsContainerVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsContainerVisible(true);
      setTimeout(() => setIsModalVisible(true), 100);
    } else {
      setIsModalVisible(false);
      setTimeout(() => setIsContainerVisible(false), 200);
    }
  }, [isOpen]);

  const handleOnClose = () => {
    if (isOpen) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-0 flex items-end justify-center ${isContainerVisible ? '' : 'hidden'}`}>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-500 ${isModalVisible ? 'opacity-50' : 'opacity-0'}`}
        onClick={handleOnClose}></div>
      <div
        className={`dark:bg-zinc-800 bg-gray-100 w-full md:w-1/2 h-[90%] transform transition-transform duration-500 ${isModalVisible ? 'translate-y-0' : 'translate-y-full'} rounded-t-xl`}>
        {children}
      </div>
    </div>
  );
}
