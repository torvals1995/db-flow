export const successReturn = {
  code: 0,
  msg: 'success',
}
export function failReturn(reason) {
  return {
    code: -1,
    msg: 'success',
    reason
  }
}