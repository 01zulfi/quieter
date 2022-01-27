import React, { FC } from 'react';
import Button from './Button';

interface ModalProps {
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
}

const Modal: FC<ModalProps> = function Modal({ closeModal, children }) {
  return (
    <section>
      <div>{children}</div>
      <div>
        <Button type="button" textContent="Close" clickHandler={closeModal} />
      </div>
    </section>
  );
};

export default Modal;
