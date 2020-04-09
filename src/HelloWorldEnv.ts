import { effect as T } from '@matechs/effect'

export const consoleUri: unique symbol = Symbol()
export interface ConsoleEnv {
  [consoleUri]: {
    log: (s: string) => T.Effect<unknown, never, void>
  }
}

function log(s: string) {
  return T.accessM((env: ConsoleEnv) => env[consoleUri].log(s))
}

export const helloWorld: T.Effect<ConsoleEnv, never, void> = log('hello world')

const consoleLive: ConsoleEnv = {
  [consoleUri]: {
    log: (s: string) => T.sync(() => console.log(s))
  }
}

T.run(T.provideAll(consoleLive)(helloWorld))
