import { Fragment, StrictMode } from 'react'
import { Route, Switch, useLocation } from 'wouter'

import Header from './components/Header/index.jsx'
import Footer from './components/Footer/index.jsx'
import Parallax from './components/Parallax/index.jsx'
import CloudsLayer from './components/Parallax/components/CloudsLayer/index.jsx'
import StarsLayer from './components/Parallax/components/StarsLayer/index.jsx'
import Home from './pages/Home/index.jsx'
import Notes from './pages/Notes/index.jsx'
import GetNotesProvider from './cache/readNotes.jsx'
import PostNotesProvider from './cache/writeNotes.jsx'

import './App.css'

export default () => {
	const [location] = useLocation()

	return (
		<StrictMode>
			{location === '/' ? null : <Header />}

			<Parallax className='page'>
				{location === '/' ? (
					<Fragment>
						<StarsLayer />
						<CloudsLayer />
					</Fragment>
				) : null}

				<main>
					<Switch>
						<Route path='/'>
							<Home />
						</Route>

						<GetNotesProvider>
							<PostNotesProvider>
								<Route path='/notes'>
									<Notes />
								</Route>
							</PostNotesProvider>
						</GetNotesProvider>
					</Switch>
				</main>

				<Footer />
			</Parallax>
		</StrictMode>
	)
}
