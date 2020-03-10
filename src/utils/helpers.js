export const toObj = (arr, key = null, fn = val => val) => {
  return arr.reduce((prev, current = {}, idx) => {
    return {
      ...prev,
      [current[key] || idx]: fn({ ...current, id: current[key] || idx })
    };
  }, {});
};
