/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';

// create custom hook for set title page
export const useTitle = (title = '') => {
  const documentTitle = title === '' ? 'O`me game' : `${title} - O\`me game`;
  useEffect(() => {
    document.title = documentTitle;
  });
};
