import Icon from '../../components/icons/index.jsx'
import Button from '../../components/MyButton/index.jsx'

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
					<Button href='/notes'>Get Started</Button>
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
