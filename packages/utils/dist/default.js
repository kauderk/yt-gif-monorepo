/**
 *
 * @param {HTMLElement} node Self node
 * @param {string} argument hello
 * @returns
 */
export function inject(node, argument = 'body') {
	let targetNode

	if (typeof argument !== 'string') {
		targetNode = argument
	} else {
		targetNode = document.querySelector(argument)
	}

	targetNode.appendChild(node)

	return {
		destroy() {
			node.remove()
		}
	}
}
