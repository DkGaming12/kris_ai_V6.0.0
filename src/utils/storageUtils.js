/**
 * Utilities for managing local storage persistence.
 */

const KEY_SAVED_WORKS = 'kris_saved_works';

export const saveWork = (work) => {
  const works = getSavedWorks();
  const newWork = {
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    ...work
  };
  localStorage.setItem(KEY_SAVED_WORKS, JSON.stringify([newWork, ...works]));
  return newWork;
};

export const getSavedWorks = () => {
  const data = localStorage.getItem(KEY_SAVED_WORKS);
  return data ? JSON.parse(data) : [];
};

export const deleteWork = (id) => {
  const works = getSavedWorks();
  localStorage.setItem(KEY_SAVED_WORKS, JSON.stringify(works.filter(w => w.id !== id)));
};
