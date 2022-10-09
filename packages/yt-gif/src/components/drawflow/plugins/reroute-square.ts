import type Drawflow from 'drawflow'

export default function (editor: Drawflow) {
	editor.reroute = true
	editor.reroute_fix_curvature = true
	editor.reroute_curvature_start_end = 3
	editor.reroute_curvature = 3
	// @ts-ignore
	// https://codesandbox.io/s/ity1u?file=/src/components/DrawFlow.vue
	editor.createCurvature = function (startPosX, startPosY, endPosX, endPosY) {
		let centerY = (endPosY - startPosY) / 2 + startPosY
		return (
			// prettier-ignore
			' M ' + startPosX + ' ' + startPosY +
			// prettier-ignore
			' L ' + startPosX + ' ' + centerY +
			// prettier-ignore
			' L ' + endPosX + ' ' + centerY +
			// prettier-ignore
			' L ' + endPosX + ' ' + endPosY
		)
	}
}
