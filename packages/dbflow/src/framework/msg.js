export function successReturn(reason, data = {}) {
  return {
    code: 0,
    msg: reason,
    data,
  }
}
export function failReturn(reason) {
  return {
    code: -1,
    msg: reason,
  }
}