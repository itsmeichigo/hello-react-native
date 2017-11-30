export const SELECT_LIBRARY = 'select_library';

export const selectLibrary = (libraryId) => {
  return {
    type: SELECT_LIBRARY,
    payload: libraryId,
  };
};
