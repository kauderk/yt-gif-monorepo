import { LoremIpsum } from 'lorem-ipsum'
class Lorem extends LoremIpsum {
	constructor(...args: ConstructorParameters<typeof LoremIpsum>) {
		super(...args)
	}
	randomWords(min: number, max: number) {
		const range = Math.floor(Math.random() * (max - min) + min)
		let w: string[] = []

		for (let index = 0; index < range; index++) {
			w.push(this.generateWords(1))
		}
		return w
	}
}

export const lorem = new Lorem({
	sentencesPerParagraph: {
		max: 8,
		min: 4,
	},
	wordsPerSentence: {
		max: 16,
		min: 1,
	},
})
