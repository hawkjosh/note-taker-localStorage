import { Fragment, StrictMode } from 'react'
import { Route, Switch, useLocation } from 'wouter'

import Parallax from './components/Parallax/index.jsx'
import CloudsLayer from './components/Parallax/components/CloudsLayer/index.jsx'
import StarsLayer from './components/Parallax/components/StarsLayer/index.jsx'
import Home from './pages/Home/index.jsx'
import Notes from './pages/Notes/index.jsx'

import './App.css'

export default () => {
	const [location] = useLocation()

	return (
		<StrictMode>
			<Parallax className='page'>
				{location === '/' ? (
					<Fragment>
						<StarsLayer />
						<CloudsLayer />
					</Fragment>
				) : null}
			</Parallax>
			
				<main>
					<Switch>
						<Route path='/'>
							<Home />
						</Route>
						<Route path='/notes'>
							<Notes />
						</Route>
					</Switch>
				</main>
		</StrictMode>
	)
}
