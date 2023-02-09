import LeftPencilIcon from './LeftPencilIcon.jsx'
import RightPencilIcon from './RightPencilIcon.jsx'
import AddIcon from './AddIcon.jsx'
import SaveIcon from './SaveIcon.jsx'
import EditIcon from './EditIcon.jsx'
import TrashIcon from './TrashIcon.jsx'

import { cIcon } from './index.module.css'

const IconNameComponent = {
	leftPencil: <LeftPencilIcon />,
	rightPencil: <RightPencilIcon />,
	add: <AddIcon />,
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
