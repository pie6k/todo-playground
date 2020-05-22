function isObject(value: any) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

type Primitive = string | number | boolean | null | undefined | void;

export function isPrimivite(input: any): input is Primitive {
  return !isObject(input);
}
