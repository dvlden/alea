import { describe, expect, it, vi } from 'vitest'
import { alea } from './index'

describe('test suite', () => {
  const SEED = {
    number: 123,
    string: 'hello',
  }

  const TEN_RESULTS_OF_SEED_ONE = [
    0.4801303152926266, 0.06268894905224442, 0.463917750865221,
    0.29265914228744805, 0.6509405097458512, 0.4605325092561543,
    0.27594090229831636, 0.5570068266242743, 0.7574450396932662,
    0.7531666262075305,
  ]

  it('returns a function', () => {
    const instance = vi.fn(alea)

    expect(instance).toBeTypeOf('function')
  })

  it('runs without the seed', () => {
    const instance = vi.fn(alea)

    instance()

    expect(instance).toHaveBeenCalled()
  })

  it('accepts seed as number', () => {
    const instance = vi.fn(alea)

    const { value } = instance(SEED.number).next()

    expect(instance).toHaveBeenCalled()
    expect(value).toBe(0.4801303152926266)
  })

  it('accepts seed argument as string', () => {
    const instance = vi.fn(alea)

    const { value } = instance(SEED.string).next()

    expect(instance).toHaveBeenCalled()
    expect(value).toBe(0.8750656815245748)
  })

  it('returns same result if seed is identical', () => {
    const instanceOne = vi.fn(alea)
    const instanceTwo = vi.fn(alea)

    const [{ value: valueOne }, { value: valueTwo }] = [
      instanceOne(SEED.number).next(),
      instanceTwo(SEED.number).next(),
    ]

    expect(valueOne).toStrictEqual(valueTwo)
  })

  it('returns different result if seed is not identical', () => {
    const instanceOne = vi.fn(alea)
    const instanceTwo = vi.fn(alea)

    const [{ value: valueOne }, { value: valueTwo }] = [
      instanceOne(SEED.number).next(),
      instanceTwo(SEED.string).next(),
    ]

    expect(valueOne).not.toStrictEqual(valueTwo)
  })

  it('returns a result as uint32 if second argument is given', () => {
    const instance = vi.fn(alea)

    const { value } = instance(SEED.number, 'uint32').next()

    expect(value).toBe(2062144002)
  })

  it('returns a result as fract53 if second argument is given', () => {
    const instance = vi.fn(alea)

    const { value } = instance(SEED.number, 'fract53').next()

    expect(value).toBe(0.48013031540441564)
  })

  it('generates different outputs if looped through a single instance', () => {
    const instance = vi.fn(alea)
    const generator = instance(SEED.number)

    let output = []
    for (let i = 0; i < 10; i++) {
      output.push(generator.next().value)
    }

    expect(output).toStrictEqual(TEN_RESULTS_OF_SEED_ONE)
  })
})
