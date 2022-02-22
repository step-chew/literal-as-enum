/**
 * Return a utility object to handle a set of given enum.
 *
 * @param args Comma separated string values to be used as enum.
 * @returns A utility object to handle the enum
 *
 * {
 *   * `values` - read-only tuple of the enum.
 *   * `validate` - a type guard to make sure given value conforms to this enum.
 *   * `of` - converts given value into enum type. Return undefined if value is invalid.
 *   * `fallback(str)` - Takes in a default value.
 *   * `fallback(str).of()` - Similar to the object, but `of()` returns a non-nullable value.
 * `
 * }
 */
export const enumFrom = <T extends string[]>(...args: T) => {
  type S = T[number];
  const obj = {
    values: args as Readonly<T>,
    validate(val: any): val is S {
      return args.some((v) => v === val);
    },
    of: (val: any) => args.find((v) => v === val) as S | undefined,
  };

  return {
    ...obj,
    fallback: (ifMissing: S) => ({
      ...obj,
      of: (val: any) => (args.find((v) => v === val) as S) ?? ifMissing,
    }),
  };
};

export type GetEnumType<R extends ReturnType<typeof enumFrom>> =
  // @ts-ignore
  R['values'][number];
