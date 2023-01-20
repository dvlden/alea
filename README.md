![alea](https://repository-images.githubusercontent.com/591486972/b889810e-bc65-4628-9186-d6f1936fdb7e)

![GitHub package.json version](https://img.shields.io/github/package-json/v/dvlden/alea?color=86c7ff&style=flat-square)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@dvlden/alea?color=%2386c7ff&style=flat-square)

# Alea

Pseudorandom number generator created by Johannes Baagøe, but rewritten a bit differently.
If you ever needed a seedable random numbers, this is one way to achive that with a simple ES generator function.

> Check test cases if you are still wondering what it does.

<br>

## Installation

Use your favourite package manager... In my case that's `pnpm`.

```bash
pnpm i @dvlden/alea
```

<br>

## Usage

**Browser**

```ts
import { alea } from '@dvlden/alea'

const random = alea(123) // where `123` is your seed

console.log(random.next().value) // 0.1198014235123992
```

**Node**

```ts
const { alea } = require('@dvlden/alea')

const random = alea(123) // where `123` is your seed

console.log(random.next().value) // 0.1198014235123992
```

**Iterations**

Since this PRNG has been written as generator, it will yield a new value whenever you need it.
Do any loop that you want, just make sure to constraint it as a generator will do it infinitely otherwise.

```ts
import { alea } from '@dvlden/alea'

const random = alea(123)

for (let i = 0; i < 10; i++) {
  console.log(random.next().value)
}
```
