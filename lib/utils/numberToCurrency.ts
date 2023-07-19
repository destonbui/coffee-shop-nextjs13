/**
 * @returns price in VND format as string
 *
 * @param value - price in number.
 *
 * @example
 * ```ts
 * console.log(toVND(15000))
 * ```
 */
export function toVND(value: number) {
  const formatter = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(value);
}
