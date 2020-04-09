import { effect as T } from '@matechs/effect'
import * as O from '../src/HelloWorldEnv'

test('helloWorldTest', async () => {
  // hold messages
  const messages: string[] = []

  const consoleTest: O.ConsoleEnv = {
    [O.consoleUri]: {
      log: (s: string) =>
        T.sync(() => {
          messages.push(s)
        })
    }
  }

  // the real "log" & "helloWorld" will be called, console will be
  // using test environment
  await T.runToPromiseExit(T.provideAll(consoleTest)(O.helloWorld))

  expect(messages).toEqual(['hello world'])
})
