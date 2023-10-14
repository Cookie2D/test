export function excludeFromObject(object: Object, ...excluding: Array<String>) {
  const filteredObject: any = {};

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
