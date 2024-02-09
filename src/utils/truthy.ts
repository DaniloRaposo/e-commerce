const empty = [null, undefined];

export function isEmpty(value: any) {
  return empty.includes(value);
}