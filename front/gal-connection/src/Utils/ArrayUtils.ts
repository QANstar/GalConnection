export const checkArrayIncludeAnother = (
  bigArray: string[],
  checkArray: string[]
) => {
  for (const item of checkArray) {
    if (!bigArray.includes(item)) return false
  }
  return true
}
