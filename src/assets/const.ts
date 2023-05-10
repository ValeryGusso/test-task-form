export const modifiers = {
	disabled: (date: Date) => {
		const day = new Date(date).getDay()
		return day === 0 || day === 6
	},
}

export const firstStepOptions = [
	{ value: 0, label: 'Строение А' },
	{ value: 1, label: 'Строение Б' },
]

export const secondStepOptions = Array(25)
	.fill(null)
	.map((_, i) => ({ value: i, label: `${i + 3}й этаж` }))

export const thirdStepOptions = Array(10)
	.fill(null)
	.map((_, i) => ({ value: i, label: `Комната №${i + 1}` }))

export const hoursOptions = Array(10)
	.fill(null)
	.map((_, i) => ({ value: i, label: `${i + 9} часов` }))

export const minutsOptions = Array(4)
	.fill(null)
	.map((_, i) => ({ value: i, label: `${i * 15} минут` }))
