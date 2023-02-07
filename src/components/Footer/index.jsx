import { cDisclaimer, cFooterContainer } from './index.module.css'

export default () => (
	<footer className={cFooterContainer}>
		<p className={cDisclaimer}>
			© {new Date().getFullYear()} Joshua Wilde Hawk. All Rights Reserved.
		</p>
	</footer>
)
