import Icon from '../../../icons/index.jsx'

import { cNavActionIconsContainer, cNavActionIcons, cSaveNote } from './index.module.css'

export default () => {
	return (
		<div className={cNavActionIconsContainer}>
			<Icon
				// className={`${cNavActionIcons} ${cSaveNote}`}
				className={cNavActionIcons}
				name='save'
				width='30px'
			/>
			<Icon
				className={cNavActionIcons}
				name='plus'
				width='30px'
			/>
		</div>
	)
}
