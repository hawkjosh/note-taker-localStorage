import { cMyButton } from './index.module.css'

export default (props) => {
	if (props.href) {
		return (
			<a
				className={cMyButton}
				{...props}
			/>
		)
	}
	return (
		<button
			className={cMyButton}
			type='button'
			{...props}
		/>
	)
}
