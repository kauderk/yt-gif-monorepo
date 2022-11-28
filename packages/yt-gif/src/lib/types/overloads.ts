// https://stackoverflow.com/a/52761156/13914180
// https://github.com/microsoft/TypeScript/issues/32164

// https://github.com/microsoft/TypeScript/issues/32164#issuecomment-1146737709
// https://www.typescriptlang.org/play?ts=4.7.2&ssl=93&ssc=22&pln=1&pc=1#code/C4TwDgpgBA8gbhATgGwPYEMAmAFRqwDOAPACrxJpYB8UAvFNgJYDGA1qeShpgDRSsQQqAGZQyCLtQDcAWABQoSLAmVMAVQB2jVBoBKEZgFdEBRgg4rufEtnSJgjdMk6q6UQxtYbUAdw016cQpuKAgAD2AIDUwCKAAKeSgoADpUuwBzAgAuKEYNYSQxAEFETPkASjoaPILEMX1gYw1EqAB+KAB6DoZECAQNYFz8vMZIqF6jE20NKAAjECgCYHwwPPTxg2NTHSgfAAsosVt7R2dLLBakrqg99Fj0ZiMAW0NkdEjMKCdkKBEoYAOYhcIVM6Q072MEAIyUuRzsDicwKwoQiURiQPOmFh7Q0fSQsKysKSSQAPspglhNNN9JNTOYicTGTZ4ackZ8AGQYim8BmMpLMk6IzFQTlxOKpZIZbLFUoESq0GgkBpNSqctm4fDEIKSTBUXnEvVyPnEsliiVSnIkEqZeWK5WIDTlFo5XESWQKcDQNlUnQWbkoyLRWLitKynLoDQgADaAF1bV9IwEoABRMLMZCGTAQIgtb1aHQ0rZmbOw64kQEAIji8ddSAri0YYIhvSgLyWc2ge1QjCWEE+y3+leEeAG9b+AIgpe6eUiJgMDh0fGEqDqwB8qA2dx00vQlVmBnQhgI0AmRZ2S01uwOM1GuQIU9CGmYqA8s77fAjn1mlVvx4gT1iAcwF6fpBgnKBn2QN5CGgP4CEMWZjwAR0MKJgAfCtnyeMB3kYWZkAgetQXBRpemDCB0mSKAq3jOBu0wesZw3Kt0FaHIAEZaPoityh4B99hYPYoHSYt7igTBGAmQZnw0CRthmAd0HcfMNBhI1iTFGs8UQVUuR1FoqD49TtVccJA3RasqigWs6hxbSoBySyFWs7T5Cod15A6AAqeRy2gYBEBYVhAI3cD0FmVAEA2Wlpi+XoJXkeRdygABJfIkECjR1nAnDEHQJ4IFnBNPl6UiFM9WI-gjX5MT7KBhA8ZgFxmHxGCg9xj3kcC3nbSL-WI5sID4ATmCEnsvjAXK0OQBZqvCMBkBYW8s2IiCuxYCA1Pkb9UoGJBjyatYvgbLKCIbJtSOgVqAUHWDApE8Efhnfb52mPhmGq3oVyzRAusBZ650OnY4jAVACFMfDZpmDxMFQZ40Lq0ws1CYQCia1pyi2uRmEqNLZwO5rYg+mYdBmjsNgAWm+pB32s1BBnBRA8B8Oq4l6TBDGYPteKgABlVA+AneQAYJ2LbhC8nelmQw2sGPJbuogUETObl63SKIkBYQXr3kU8ph2YnyYvSa6v2Q5wIa9qRdenZxY7Q4pZl5BgDUmAJ0QVrj218b11eEqoVeOWZmqmoRjGPX5LUryOkSuRrmTSFWHQABCLrPTEKFgCKdi3DzaYiAAbxaascjoxhMHdJI4nQDjyg4yv4hrqAACY+FmHJm7rlv3QAX3c2P48wdWoAAYTuCAchoqybKIxsSMhVsj0Gfcbm7XtMDUxRoBITOimb3PMR9DRC+Lruy4r4um84+vL47tuO675uG5Lly3XkPuPLj7pkyH6Ax+PHIAARQwC0WDvGgANS69wWyoCeKMD4m9047yWEUAAzAfbkR8T7qRfufZ+V8u7sWfmfeiUhOjdA5qAj6kRb4t3vi3R++Da713IeJEBi1qGTjkB-Ae3QABy9N-K3DAoCamdQ-h9R1LEcaTx0AzjkbiT48twIeDeleQSrYIARnvF-Qc7xcjAAAOSxBAvtPCZ0jxHSUkfEgqA8YvSBuVJQZsWzgUkaoTy3QxGtnePjKifkURczAM1O81EnI0BnsNPYGi7YDhXutdenj-ihUBMOHQgxxz-T2oDZqVEAASvhtJ8FGMYhWTwwaDAIJAZgjBhAsHOvPXoRlrgjSEgVbRq8ewOCygYxYXY-ZG3QAUXIogVEqVCTJCQHw5gPFYMkhMSTraOKxtcNKtRMrrCUqonYfxcr5UKoURoC0oS-DqKVJo-wKqhO8D4KAoNwbmM2mnJQ6o7D7PxqQAMaJgzmjDAmaMcYrIRhAEmY47z9pEDzr6EgVB+4eheZie0GgSCek+WZb58RfmZHDJGWM8ZgVJiRSiyAkLD4qVILCz+W8M5LAAEI53oK8vKBUPlFxwSQ8uTCoDX25Vy1ucwH4d2IS6bSvc4XPO3pnWl+9GWIsKk0Yl2Y2VVw5RfHBrFmG8tofy9uDChWnxFW-bh4rdECLGOBCsM8NhlUuUoYmhjl7QDyOmTMtN9wfSPNAbZGhYjXSEjZJJsM6ZBxdcjUYakgA
type OverloadProps<TOverload> = Pick<TOverload, keyof TOverload>
type OverloadUnionRecursive<
	TOverload,
	TPartialOverload = unknown
> = TOverload extends (...args: infer TArgs) => infer TReturn
	? // Prevent infinite recursion by stopping recursion when TPartialOverload
	  // has accumulated all of the TOverload signatures.
	  TPartialOverload extends TOverload
		? never
		:
				| OverloadUnionRecursive<
						TPartialOverload & TOverload,
						TPartialOverload &
							((...args: TArgs) => TReturn) &
							OverloadProps<TOverload>
				  >
				| ((...args: TArgs) => TReturn)
	: never
type OverloadUnion<TOverload extends (...args: any[]) => any> = Exclude<
	OverloadUnionRecursive<
		// The "() => never" signature must be hoisted to the "front" of the
		// intersection, for two reasons: a) because recursion stops when it is
		// encountered, and b) it seems to prevent the collapse of subsequent
		// "compatible" signatures (eg. "() => void" into "(a?: 1) => void"),
		// which gives a direct conversion to a union.
		(() => never) & TOverload
	>,
	TOverload extends () => never ? never : () => never
>

/*
The tricks to the above recursion are...

a) Inferring the parameter and return types of an overloaded function will use
the last overload signature, which is apparently an explicit design choice.

b) Intersecting a single signature with the original intersection, can reorder
the intersection (possibly an undocumented side effect?).

c) Intersections can only be re-ordered, not narrowed (reduced), So, the
intersection has to be rebuilt in the "TPartialOverload" generic, then
recursion can be stopped when the full intersection has been rebuilt.
Otherwise, this would result in an infinite recursion.
*/

// Eureka!
type TestA1 = OverloadUnion<{
	(): void
	(a: 1): 1
	(a: 2, b: 2): 2
}>

// Edge Case: "() => never" signature must be hoisted.
type TestA2 = OverloadUnion<{
	(): void
	(a: 1): 1
	(a: 2, b: 2): 2
	(): never
}>

// Edge Case: Duplicate signatures are omitted.
type TestA3 = OverloadUnion<{
	(): void
	(a: 1): 1
	(): void // duplicate
	(a: 2, b: 2): 2
	(a: 1): 1 // duplicate
}>

// Note that the order of overloads is maintained in the union, which means
// that it's reversible using a UnionToIntersection type where the overload
// order matters. The exception is "() => never", which has to be hoisted
// to the front of the intersection. However, it's the most specific signature,
// which means hoisting it should be safe if the union is converted back to an
// intersection.

// Inferring a union of parameter tuples or return types is now possible.
export type OverloadParameters<T extends (...args: any[]) => any> = Parameters<
	OverloadUnion<T>
>
export type OverloadReturnType<T extends (...args: any[]) => any> = ReturnType<
	OverloadUnion<T>
>

type TestB1 = OverloadParameters<{
	(): void
	(a: 1): 1
	(a: 2, b: 2): 2
	(): never
}>[0]

type TestB2 = OverloadReturnType<{
	(): void
	(a?: 1): 1
	(a: 2, b: 2): 2
	(): never
}>

// Note the "never" return type can't be included, because unions with never
// do not include it.

// https://stackoverflow.com/a/50375286/13914180
export type UnionToIntersection<U> = (
	U extends any ? (k: U) => void : never
) extends (k: infer I) => void
	? I
	: never
