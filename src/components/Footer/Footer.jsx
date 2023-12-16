import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../Logo/Logo"

function Footer() {
  return (
    <footer className="w-full bottom-0 px-4 py-8 dark:bg-slate-950 dark:text-gray-400">
	<div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
		<div className="flex lg:flex-row flex-col pr-3 space-x-4 sm:space-x-8">
			<Link to="/" className= "flex-1">
		        <Logo />
			</Link>
			<ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
				<li>
					<a rel="noopener noreferrer" href="#">Terms of Use</a>
				</li>
				<li>
					<a rel="noopener noreferrer" href="#">Privacy</a>
				</li>
			</ul>
		</div>
		<ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
			<li>
				<a rel="noopener noreferrer" href="#">Instagram</a>
			</li>
			<li>
				<a rel="noopener noreferrer" href="#">Facebook</a>
			</li>
			<li>
				<a rel="noopener noreferrer" href="#">Twitter</a>
			</li>
		</ul>
	</div>
</footer>
  )
}

export default Footer