export const cx = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const filterMessageConditions = (
  message: string,
  id: string,
  seenIds: Set<string>
): boolean => {
  const regex = /\[SYSTEM]|<think>|[ERROR]/;

  if (regex.test(message)) return true; // match pattern
  if (seenIds.has(id)) return true; // duplicate id

  seenIds.add(id);
  return false;
};
