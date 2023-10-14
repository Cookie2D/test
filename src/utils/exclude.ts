export function excludeFromObject(object, ...excluding: Array<String>) {
  const filteredObject = {};

  if (!object) return null;

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (excluding.includes(key)) {
        continue;
      }
      filteredObject[key] = object[key];
    }
  }

  return filteredObject;
}
