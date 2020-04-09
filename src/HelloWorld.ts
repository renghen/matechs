import { effect as T } from "@matechs/effect"
import { Lazy } from "fp-ts/lib/function";
import { Exit } from "@matechs/effect/lib/original/exit";

const helloWorld = T.sync(() => {
    console.log("hello world!")
})

const cancelFunction: Lazy<void> = T.run(helloWorld, (ex: Exit<never, void>) => {
    // executed
})

// cancel the running computation
cancelFunction();