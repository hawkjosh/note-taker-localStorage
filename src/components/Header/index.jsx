import { Link } from 'wouter'
import Icon from '../../components/icons/index.jsx'
import ActionButtons from './components/ActionButtons/index.jsx'

import {
	cActionsPanel,
	cHeaderContainer,
	cNavbarTitle,
	cNavbarTitleContainer,
	cNavbarTitlePanel,
} from './index.module.css'

export default () => {
	return (
		<header className={cHeaderContainer}>
			<nav className={cNavbarTitlePanel}>
				<div className={cNavbarTitleContainer}>
					<Icon
						name='leftPencil'
						width='50px'
					/>
					<Link
						className={cNavbarTitle}
						href='/'>
						Note Taker
					</Link>
				</div>

				<div className={cActionsPanel}>
					<ActionButtons />
				</div>
			</nav>
		</header>
	)
}
