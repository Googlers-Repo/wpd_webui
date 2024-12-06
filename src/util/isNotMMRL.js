export const isNotMMRL = () => {
  try {
    return !window.ksu.mmrl();
  } catch {
    return true;
  }
};
