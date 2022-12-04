import type { UnidirectionalNest } from './types'

export function getFlatNodeConnections<N extends UnidirectionalNest>(
	params: N
) {
	/**
	 * Each time you walk down, track the current index
	 * then you'll create your connection branch
	 */
	let indexPosition = 0
	let indexes = [0]
	let currentNode = params.nest
	/**
	 * Each node's direct children is a branch
	 */
	let branches: N['nest'][][] = []
	let branch: N['nest'][] = []

	while (currentNode) {
		/**
		 * Freeze the current position then push it to the stack
		 */
		let currentIndex = indexes[indexPosition]
		let fallbackNode = currentNode
		branch.push(currentNode)
		currentNode = currentNode.children?.[currentIndex] as N['nest']
		/**
		 * if this node exist and the path is valid
		 * push the direct children's index path
		 */
		if (currentNode) {
			if (indexes[indexPosition + 1] == undefined) {
				indexes.push(0)
			}
			indexPosition++
		} else {
			if (indexPosition == 0) {
				break
			}

			/**
			 * Death end, push this branch to the stack
			 */
			if (!fallbackNode.children?.length) {
				branches.push(branch)
			}

			/**
			 * Otherwise advance to next step
			 * removing the current index from the stack
			 */
			branch = []
			indexes[indexPosition - 1]++
			indexPosition = 0
			indexes.pop()
			currentNode = params.nest
		}
	}
	return branches
}
