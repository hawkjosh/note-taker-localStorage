import { cCustomButton } from './index.module.css'

export default (props) => {
	if (props.href) {
		return (
			<a
				className={cCustomButton}
				{...props}
			/>
		)
	}
	return (
		<button
			className={cCustomButton}
			type='button'
			{...props}
		/>
	)
}
