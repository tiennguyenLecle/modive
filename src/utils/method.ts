export const cx = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const deepMerge = <
  T extends Record<string, unknown>,
  U extends Record<string, unknown>,
>(
  target: T,
  source: U
): T & U => {
  // 1. Start with a shallow copy of target to ensure immutability
  const result: Record<string, unknown> = { ...target };

  // 2. Loop through source object
  for (const [key, sourceValue] of Object.entries(source)) {
    const targetValue = result[key];

    // 3. Handle Array: Replace and deep clone object elements
    if (Array.isArray(sourceValue)) {
      result[key] = sourceValue.map(item => {
        // If the element in the array is an object, clone it
        if (_isPlainObject(item)) {
          return deepMerge({}, item as Record<string, unknown>); // <-- Trick: merge with empty object to clone
        }
        return item;
      });
      continue;
    }

    // 4. Handle Object: Merge or Clone
    if (_isPlainObject(sourceValue)) {
      // If the corresponding target is also an object, then merge recursively
      if (_isPlainObject(targetValue)) {
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        );
      } else {
        // If not, clone the entire object from source
        result[key] = deepMerge({}, sourceValue); // <-- Trick: merge with empty object to clone
      }
      continue;
    }

    // 5. Handle special types
    if (sourceValue instanceof Date) {
      result[key] = new Date(sourceValue);
      continue;
    }
    if (sourceValue instanceof RegExp) {
      result[key] = new RegExp(sourceValue);
      continue;
    }

    // 6. Override primitive values
    result[key] = sourceValue;
  }

  return result as T & U;
};

const _isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== 'object') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

export const filterMessageConditions = (
  message: string,
  id: string,
  seenIds: Set<string>
): boolean => {
  const regex = /\[SYSTEM]|<think>|[ERROR]/;

  if (regex.test(message)) return true; // match pattern
  if (seenIds.has(id)) return true; // duplicate id
  if (
    message.includes(
      'Something went wrong, internally. But this might not be a problem. This is informational message.'
    )
  )
    return true;

  seenIds.add(id);
  return false;
};

export const getPublicUrl = (key?: string) => {
  if (!key) return '';
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/medias/${key}`;
};
