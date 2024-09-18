import { useEffect, useState } from 'react';

import BaseModal from '../common/BaseModal';
import ManageCreditCardModeWrapper from './ManageCreditCardModeWrapper';

interface IManageCreditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  ownerId: string;
}

type RenderModes = 'UPDATE' | 'SHOW' | 'CREATE';

export default function ManageCreditCardsModal({
  isOpen,
  onClose,
  ownerId,
}: IManageCreditCardModalProps) {
  const [animationStart, setAnimatioStart] = useState(true);
  const [renderMode, setRenderMode] = useState<RenderModes>('SHOW');

  const handleRenderMode = (c: RenderModes) => setRenderMode(c);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setAnimatioStart(false), 200);
    }
  }, [isOpen]);

  const handleClose = () => {
    setTimeout(() => setRenderMode('SHOW'), 250);
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose}>
      <div
        className={`w-full h-full overflow-hidden transition-transform duration-300 ${animationStart ? 'translate-x-full' : 'translate-x-0'}`}>
        <ManageCreditCardModeWrapper
          ownerId={ownerId}
          onClose={handleClose}
          currentRenderMode={renderMode}
          handleRenderModeChange={handleRenderMode}
        />
      </div>
    </BaseModal>
  );
}
