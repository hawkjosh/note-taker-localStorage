import BackIcon from './BackIcon.jsx'
import SaveIcon from './SaveIcon.jsx'
import EditIcon from './EditIcon.jsx'
import TrashIcon from './TrashIcon.jsx'

import { cIcon } from './index.module.css'

const IconNameComponent = {
	back: <BackIcon />,
	save: <SaveIcon />,
	edit: <EditIcon />,
	trash: <TrashIcon />,
}

export default ({
	name,
	width = '100%',
	height = width,
	className = '',
	...other
}) => (
	<span
		style={{ '--icon-width': width, '--icon-height': height }}
		className={`${className} ${cIcon}`}
		{...other}>
		{IconNameComponent[name]}
	</span>
)
