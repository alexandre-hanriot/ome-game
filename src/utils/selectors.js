import slugify from 'react-slugify';
import classNames from 'classnames';

// Format date : dd/mm/yyyy à hh/mm
export const formatDate = (date, dateOnly = false) => {
  if (date === null || date === '') {
    return '';
  }

  const newDate = new Date(date);

  if (dateOnly) {
    return `${(`0${newDate.getDate()}`).slice(-2)}/${(`0${newDate.getMonth() + 1}`).slice(-2)}/${newDate.getFullYear()}`;
  }

  return `${(`0${newDate.getDate()}`).slice(-2)}/${(`0${newDate.getMonth() + 1}`).slice(-2)}/${newDate.getFullYear()} à ${(`0${newDate.getHours()}`).slice(-2)}h${(`0${newDate.getMinutes()}`).slice(-2)}`;
};

// Truncate long string
export const truncateText = (text, size = 25) => ((text.length > size) ? `${text.substr(0, size - 2)}..` : text);

// Convertir le texte pour une url
export const slugifyId = (id) => slugify(id, {
  lower: true,
});

// Dynamic label
export const labelClassname = (input) => {
  if (input !== null) {
    if (typeof input === 'number') {
      return classNames('global-label', { 'global-label--active': input > 0 });
    }
  
    return classNames('global-label', { 'global-label--active': input.length > 0 });
  }
  return input;
};

