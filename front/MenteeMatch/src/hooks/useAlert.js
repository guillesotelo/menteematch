import { useState } from 'react';

const useToggleSkills = () => {
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return [show, handleClose, handleOpen];
};

export default useToggleSkills;
