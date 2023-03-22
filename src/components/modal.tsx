import { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const elRef = useRef(null as null | HTMLElement);
  if (!elRef.current) elRef.current = document.createElement('div');

  useEffect(() => {
    if (!elRef.current) return;
    const modalRoot = document.getElementById('modal');
    modalRoot?.appendChild(elRef.current);

    return () => {
      if (elRef.current !== null) modalRoot?.removeChild(elRef.current);
    };
  }, []);

  return createPortal(children, elRef.current);
};

export default Modal;
