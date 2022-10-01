export const fmtSplit = ' : '
export const PmtSplit = ' / '
export const cptrPrfx = '<',
	cptrSufx = '>'

export const chk = 'checkbox',
	sel = 'string',
	str = 'string',
	pmt = 'prompt',
	int = 'integer',
	bol = 'boolean',
	url = 'url',
	rng = 'range',
	rad = 'radio'
//prettier-ignore
export type Ttype = '' | 'checkbox' | 'string' | 'prompt' | 'integer' | 'boolean' | 'url' | 'range' | 'radio' | Array<Ttype>;
export interface T_SettingsAny extends TBlock, Tprimitive {
	sessionValue?: string | number | boolean
	UpdateSettingsBlockValue: (replaceWith: string) => Promise<void>
}
export type T_settings_map = Map<string, T_SettingsAny>

export type Tprimitive = {
	uid: string
	examined: boolean
	parentKey: string
	string: string
	child: number
	indent: number
	inputType: Ttype
	order: number
	inlineObj: boolean
}
type join = typeof fmtSplit | typeof PmtSplit
export type TBlock = Tprimitive & {
	join: join
}
export type TInline = Tprimitive & TBlock
type Tk = {
	baseValue: string | number
	inputType: Ttype
}
export type TProperty = TBlock &
	Tk & {
		sessionValue: string | number
		caputuredValue: string
		UpdateSettingsBlockValue: (replaceWith: string) => Promise<void>
	}
export type Tdom = Tk & {
	domEl: ''
}
export type TDomProperty = TProperty & Tdom
