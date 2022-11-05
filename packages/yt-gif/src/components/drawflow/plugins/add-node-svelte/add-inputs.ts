export function addInputs(data: unknown, content: HTMLElement) {
	Object.entries(data).forEach(function (key, value) {
		if (typeof key[1] === 'object') {
			insertObjectkeys(null, key[0], key[0])
		} else {
			var elems = content.querySelectorAll('[df-' + key[0] + ']')
			for (var i = 0; i < elems.length; i++) {
				elems[i].value = key[1]
				if (elems[i].isContentEditable) {
					elems[i].innerText = key[1]
				}
			}
		}
	})

	function insertObjectkeys(
		object: object | null,
		name: string,
		completname: string
	) {
		if (object === null) {
			var object = data[name]
		} else {
			var object = object[name]
		}
		if (object !== null) {
			Object.entries(object).forEach(function (key, value) {
				if (typeof key[1] === 'object') {
					insertObjectkeys(object, key[0], completname + '-' + key[0])
				} else {
					var elems = content.querySelectorAll(
						'[df-' + completname + '-' + key[0] + ']'
					)
					for (var i = 0; i < elems.length; i++) {
						elems[i].value = key[1]
						if (elems[i].isContentEditable) {
							elems[i].innerText = key[1]
						}
					}
				}
			})
		}
	}
}
