# Literal as enum

Converts string constants into string literal type and provides handy utility functions.

# Usage

## Setting up an enum type

```typescript
import { GetEnumType, enumFrom } from 'literal-as-enum';

export const Status = enumFrom('idle', 'running', 'cancelling', 'terminated');
// Make `Status` is a string literal type with possible values of:
// 'idle', 'running', 'cancelling' and 'terminated'
export type Status = GetEnumType<typeof Status>;
```

## Converting a string to an enum type

```typescript
// Some dynamic input
const input = JSON.parse('"running"');

const status = Status.of(input); // status has the value of 'running'
```

## Converting an invalid string to an enum type

```typescript
// Some dynamic input
const input = JSON.parse('"hello-world"');

const status = Status.of(input); // status is undefined
```

## Type guard

```typescript
// Some dynamic input
const input = JSON.parse('"terminated"');

if (Status.validate(input)) {
  // `input` now has a type of "Status"
} else {
  // `input` is not a valid "Status"
}
```

## Fallback

As shown in the example above, invalid string values will be converted into `undefined`.
Should there be a need to always fallback to a default value, `fallback` method can be used.

```typescript
const Role = enumFrom('member', 'moderator', 'admin').fallback('member');
type Role = GetEnumType<typeof Role>;

const inputA = JSON.parse('"admin"');
const roleA = Role.of(inputA); // roleA is 'admin'

const inputB = JSON.parse('"hacker"');
const roleB = Role.of(inputB); // roleB is 'member'
```

# Quirks

As you could see in the code snippet below

```typescript
const Role = enumFrom('member', 'moderator', 'admin');
type Role = GetEnumType<typeof Role>;
```

Line 1 creates an object (or you can think of it as an instance of a class) that comes with a bunch of
useful functions to convert/validate a given value to the enum type. It is available during runtime.

Line 2 however, is inferring the initialised values in Line 1, and make the type a string literal union.

Therefore, giving both of them the same value does not conflict each other - first one is a runtime variable/instance, whilst the second is a compile-time typing. In fact, they complement each other.

However, in some ESLint configurations, [`no-redeclare`](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-redeclare.md) rule was enforced, and it may complain that variable is already defined.

There are 2 (obvious) approaches of overcoming it: -

1. Rename the variable, e.g. `Role` for the runtime instance and `TRole` for the typing.
2. Suppress ESLint rule for the line/file, e.g. `/* eslint-disable @typescript-eslint/no-redeclare */`

Personally I'd go with the latter, as I find the code is cleaner. But one man's meat is another man's poison.
