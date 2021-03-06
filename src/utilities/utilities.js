export const formatName = (string) => {
  return string.replace(/[A-Z]/g, letter => ` ${letter.toLowerCase()}`);
}

export const formReducer = (state, { field, value }) => {
  if (field === 'age') {
    return {
      ...state,
      [field]: parseInt(value)
    }
  }

  return {
    ...state,
    [field]: value
  }
}