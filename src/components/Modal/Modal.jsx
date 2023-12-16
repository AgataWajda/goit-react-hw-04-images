import { useEffect } from 'react';

import css from './Modal.module.css';

export const Modal = ({ alt, image, exit }) => {
  useEffect(() => {
    const handleCloseModal = event => {
      if (event.code === 'Escape') {
        exit();
      }
    };
    window.addEventListener('keydown', handleCloseModal);

    return () => window.removeEventListener('keydown', handleCloseModal);
  }, [exit]);

  return (
    <div className={css.overlay} onClick={exit}>
      <div className={css.modal}>
        <img src={image} alt={alt} className={css.image} />
      </div>
    </div>
  );
};
