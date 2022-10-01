import type {
	TInline,
	TBlock,
	Ttype,
	Tprimitive,
	TDomProperty,
	Tdom,
	TProperty} from './types';
import {
	PmtSplit,
	pmt,
	fmtSplit,
} from './types'

export function InlinePmt(blockContent = ''): TInline {
	return <const>{
		//promptObj
		...BasePmt(),
		inlineObj: true,
		string: blockContent,
	}
}
export function BasePmt(blockContent = ''): TBlock {
	return <const>{
		//promptObj
		...baseTmp(),
		join: PmtSplit,
		inputType: pmt,
		string: blockContent,
	}
}
/*--------------------------------*/
export function BaseSetting(inputType?: Ttype): Tprimitive {
	return baseTmp(inputType)
}
/*---------------------------------------------*/
export function BaseDom(baseValue = '', inputType: Ttype): TDomProperty {
	return <const>{
		//domObj
		...subTemp(),
		domEl: '',
		baseValue: baseValue,
		inputType: inputType,
		inlineObj: false,
	}
}
export function dom(baseValue = '', inputType: Ttype = ''): Tdom {
	return <const>{
		//domObj
		...subTemp(),
		domEl: '',
		baseValue: baseValue,
		inputType: inputType,
	}
}
/*--------------------*/
export function BaseInitSetting(
	baseValue: string | number = '',
	inputType: Ttype
): TProperty {
	return <const>{
		//subInputObj
		...subTemp(),
		baseValue: baseValue,
		inputType: inputType,
		inlineObj: false,
	}
}
/*---------------------------------------------------------------*/
function subTemp(baseValue = '', inputType?: Ttype): TProperty {
	return <const>{
		...baseTmp(inputType),
		baseValue: baseValue,
		sessionValue: undefined as any,
		caputuredValue: '<>',
		join: fmtSplit,
		inlineObj: true,
		UpdateSettingsBlockValue: async function () {
			console.warn(
				//@tsignore-flag
				`Update block not implemented... ${this.uid} ${this.string}`
			)
		},
	}
}
function baseTmp(_inputType: Ttype = '', _string = ''): Tprimitive {
	return <const>{
		examined: false,

		uid: '',
		parentKey: '',
		string: _string,

		inputType: _inputType,

		indent: 0,
		child: 0,
		order: 0,

		inlineObj: false,
	}
}
