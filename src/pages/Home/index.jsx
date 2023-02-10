import CustomButton from '../../components/CustomButton/index.jsx'

import NotesIcon from '../../components/NotesIcon/index.jsx'

import {
	cHomePageWrapper,
	cWelcomeContainer,
	cWelcomeTitleContainer,
	cWelcomeTitle,
	cWelcomeSubtitle,
} from './index.module.css'

export default () => {
	return (
		<>
			<div className={cHomePageWrapper}>
				<section className={cWelcomeContainer}>
					<NotesIcon iconSize='clamp(16rem, 10.46rem + 20.712vw, 32rem)' />
					<div className={cWelcomeTitleContainer}>
						<div className={cWelcomeTitle}>Note Taker</div>
						<div className={cWelcomeSubtitle}>A simple notes app!</div>
						<CustomButton href='/notes'>Get Started</CustomButton>
					</div>
				</section>
			</div>
		</>
	)
}
