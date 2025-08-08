export const cx = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const filterMessageConditions = (message: string): boolean => {
  const regex = /\[SYSTEM]|<think>|[ERROR]/;
  return regex.test(message);
};
