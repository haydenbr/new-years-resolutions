let typeCache: { [label: string]: boolean } = {};

export function actionType(label: string): string {
  if (typeCache[label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[label] = true;

  return label;
}