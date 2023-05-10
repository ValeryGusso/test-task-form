import { FormEvent, useCallback, useState } from 'react'
import 'react-nice-dates/build/style.css'
import Select from 'react-select'
import { ro, ru } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'
import { BsFillClockFill } from 'react-icons/bs'
import { BiReset } from 'react-icons/bi'
import {
	firstStepOptions,
	hoursOptions,
	minutsOptions,
	secondStepOptions,
	thirdStepOptions,
	modifiers,
} from './assets/const'

function App() {
	const [step, setStep] = useState(1)
	const [building, setBuilding] = useState(0)
	const [floor, setFloor] = useState(0)
	const [room, setRoom] = useState(0)
	const [time, setTime] = useState({ d: new Date(), h: hoursOptions[0].value, m: minutsOptions[0].value })
	const [comment, setComment] = useState('')

	const changeStep = useCallback((type: 'inc' | 'dec') => {
		setStep(prev => {
			let updated = prev
			switch (type) {
				case 'inc':
					if (prev < 6) {
						updated += 1
					}
					break
				case 'dec':
					if (prev > 1) {
						updated -= 1
					}
					break
			}
			return updated
		})
	}, [])

	function renderText() {
		switch (step) {
			case 1:
				return <p className="form__title">Выберите интересующую Вас башню</p>
			case 2:
				return <p className="form__title">Выберите этаж</p>
			case 3:
				return <p className="form__title">Выберите комнату</p>
			case 4:
				return <p className="form__title">На какую дату Вы хотите забронировать?</p>
			case 5:
				return <p className="form__title">Если у Вас есть дополнительные пожелания, оставьте их здесь</p>
			case 6:
				return <p className="form__title">Давайте сверим данные. Всё верно?</p>

			default:
				return null
		}
	}

	function renderCurrentStep() {
		switch (step) {
			case 1:
				return (
					<>
						<Select
							className="form__select"
							value={firstStepOptions[building]}
							onChange={e => setBuilding(e?.value!)}
							options={firstStepOptions}
						/>
					</>
				)
			case 2:
				return (
					<>
						<Select
							className="form__select"
							value={secondStepOptions[floor]}
							onChange={e => setFloor(e?.value!)}
							options={secondStepOptions}
						/>
					</>
				)
			case 3:
				return (
					<>
						<Select
							className="form__select"
							value={thirdStepOptions[room]}
							onChange={e => setRoom(e?.value!)}
							options={thirdStepOptions}
						/>
					</>
				)
			case 4:
				return (
					<div className="form__date">
						<DatePicker
							date={time.d}
							onDateChange={e => setTime(prev => ({ ...prev, d: e! }))}
							locale={ru}
							modifiers={modifiers}
						>
							{({ inputProps, focused }) => (
								<input
									className={'input' + (focused ? ' -focused' : '') + ' form__datepicker__input'}
									{...inputProps}
								/>
							)}
						</DatePicker>
						<Select
							className="form__date__select"
							value={hoursOptions[time.h]}
							onChange={e => setTime(prev => ({ ...prev, h: e?.value! }))}
							options={hoursOptions}
						/>
						<Select
							className="form__date__select"
							value={minutsOptions[time.m]}
							onChange={e => setTime(prev => ({ ...prev, m: e?.value! }))}
							options={minutsOptions}
						/>
					</div>
				)
			case 5:
				return (
					<>
						<textarea className="form__comment" value={comment} onChange={e => setComment(e.target.value)}></textarea>
					</>
				)
			case 6:
				return (
					<p className="form__title">
						Вы хотите забронировать комнату №{room + 1} на {floor + 3} этаже в башне {building === 0 ? ' А' : 'Б'} на{' '}
						{time.d.toLocaleDateString()} с {time.h + 9} часов {time.m * 15} минут. <br />
						{comment && <>Ваше пожелание: {comment}</>}
					</p>
				)
			default:
				return null
		}
	}

	const submit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (step > 6) {
			changeStep('inc')
		} else {
			const data = { building, floor, room, date: time.d, hours: time.h, minuts: time.m }
			console.log(JSON.stringify(data))
		}
	}, [])

	const clear = useCallback(() => {
		setStep(1)
		setBuilding(0)
		setRoom(0)
		setFloor(0)
		setComment('')
		setTime({ d: new Date(), h: hoursOptions[0].value, m: minutsOptions[0].value })
	}, [])

	return (
		<div className="app">
			<form onSubmit={submit}>
				{renderText()}
				<div className="form__content">{renderCurrentStep()}</div>
				<div className="form__buttons">
					<button disabled={step === 1} className="form__button" type="button" onClick={() => changeStep('dec')}>
						<AiOutlineArrowLeft />
						Назад
					</button>
					<button disabled={step === 6} className="form__button" type="button" onClick={() => changeStep('inc')}>
						Продолжить
						<AiOutlineArrowRight />
					</button>
				</div>
				{step === 6 && (
					<>
						<button className="form__button form__button__confirm" type="button" onClick={clear}>
							Очистить!
							<BiReset />
						</button>
						<button className="form__button form__button__confirm">
							Забронировать!
							<BsFillClockFill />
						</button>
					</>
				)}
			</form>
		</div>
	)
}

export default App
