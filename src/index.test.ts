import { describe, expect, it, vi } from 'vitest'
import { alea } from './index'

describe('test suite', () => {
  const SEED = {
    one: 123,
    two: 456,
  }

  const TEN_RESULTS_OF_SEED_ONE = [
    0.1198014235123992, 0.9354658843949437, 0.5764761702157557,
    0.329674051143229, 0.9269699552096426, 0.04019391303882003,
    0.10265917237848043, 0.5101447412744164, 0.15607460448518395,
    0.9286545519717038,
  ]

  it('is a function', () => {
    const instance = vi.fn(alea)

    expect(instance).toBeTypeOf('function')
  })

  it('accepts one argument', () => {
    const instance = vi.fn(alea)

    instance(SEED.one)

    expect(instance).toHaveBeenCalledWith(SEED.one)
  })

  it('returns same result if seed is identical', () => {
    const instanceOne = vi.fn(alea)
    const instanceTwo = vi.fn(alea)

    const [valueOne, valueTwo] = [
      instanceOne(SEED.one).next().value,
      instanceTwo(SEED.one).next().value,
    ]

    expect(valueOne).toStrictEqual(valueTwo)
  })

  it('returns different result if seed is not identical', () => {
    const instanceOne = vi.fn(alea)
    const instanceTwo = vi.fn(alea)

    const [valueOne, valueTwo] = [
      instanceOne(SEED.one).next().value,
      instanceTwo(SEED.two).next().value,
    ]

    expect(valueOne).not.toStrictEqual(valueTwo)
  })

  it('generates different outputs if looped through a single instance', () => {
    const instance = vi.fn(alea)
    const generator = instance(SEED.one)

    let output = []
    for (let i = 0; i < 10; i++) {
      output.push(generator.next().value)
    }

    expect(output).toStrictEqual(TEN_RESULTS_OF_SEED_ONE)
  })
})
