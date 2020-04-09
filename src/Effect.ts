import { effect as T, exit as E } from '@matechs/effect'
import { right } from 'fp-ts/lib/Either'
import { semigroupSum, fold } from 'fp-ts/lib/Semigroup'

const pureValues = T.pure(1)

const syncValues = T.sync(() => 1)

const syncTry = T.trySync<Error>(() => {
  // tslint:disable-next-line: no-string-throw
  throw 'error'
})

const asyncValue = T.async<never, number>(r => {
  const timer = setTimeout(() => {
    r(right(10))
  }, 100)

  return cb => {
    clearTimeout(timer)
    cb()
  }
})

const sumOf = fold(T.getSemigroup(semigroupSum))(T.pure(0), [pureValues, syncValues, asyncValue])

const foldExit = E.fold(
  a => console.log(a),
  e => console.error('error:', e),
  e => console.error('abort', e),
  () => console.error('interrupt')
)

T.run(pureValues, foldExit) // print 1
T.run(syncValues, foldExit) // print 1
T.run(syncTry, foldExit) // print error: error
T.run(asyncValue, foldExit) // print 10
T.run(sumOf, foldExit) // print 12
