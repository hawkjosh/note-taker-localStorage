import LeftPencilIcon from './LeftPencilIcon.jsx'
import RightPencilIcon from './RightPencilIcon.jsx'
import PlusIcon from './PlusIcon.jsx'
import SaveIcon from './SaveIcon.jsx'
import TrashIcon from './TrashIcon.jsx'

import { cIcon } from './index.module.css'

const IconNameComponent = {
	leftPencil: <LeftPencilIcon />,
	rightPencil: <RightPencilIcon />,
	plus: <PlusIcon />,
	save: <SaveIcon />,
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
