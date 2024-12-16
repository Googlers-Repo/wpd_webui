export const isMMRL = () => {
  try {
    $mmrl_wpd.manager();
    return true;
  } catch {
    return false;
  }
};
