import Icon from '../../components/icons/index.jsx'
import CustomButton from '../../components/CustomButton/index.jsx'

import {
	cHomePageWrapper,
	cWelcomeContainer,
	cWelcomeSubtitle,
	cWelcomeTitle,
	cWelcomeTitleContainer,
	cFooterContainer,
	cDisclaimer,
} from './index.module.css'

export default () => {
	return (
		<>
			<div className={cHomePageWrapper}>
				<section className={cWelcomeContainer}>
					<div className={cWelcomeTitleContainer}>
						<Icon
							name='leftPencil'
							width='85px'
						/>
						<div className={cWelcomeTitle}>Note Taker</div>
						<Icon
							name='rightPencil'
							width='85px'
						/>
					</div>
					<div className={cWelcomeSubtitle}>
						A simple app to keep track of your notes!
					</div>
					<CustomButton href='/notes'>Get Started</CustomButton>
				</section>
			</div>

			<footer className={cFooterContainer}>
				<p className={cDisclaimer}>
					© {new Date().getFullYear()} Joshua Wilde Hawk. All Rights Reserved.
				</p>
			</footer>
		</>
	)
}
