// Originated by © 2010 Johannes Baagøe (MIT)
// Rewritten by © 2022 Nenad Novaković (MIT)

export function* alea(seed: number = Date.now()) {
  let s0 = 0
  let s1 = 0
  let s2 = 0
  let c = 1

  s0 = seed >>> 0
  s1 = (Math.imul(48271, s0) + 1) >>> 0
  s2 = (Math.imul(2567483615, s1) + 1) >>> 0

  while (true) {
    let t = (Math.imul(2091639, s0) + c) >>> 0
    s0 = s1
    s1 = s2
    c = t >> 31
    s2 = (t & 2147483647) >>> 0
    yield (s2 >>> 0) / 2147483648
  }
}
