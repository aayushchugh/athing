import { trpc } from '@utils/trpc';
import { motion } from 'framer-motion';
import { Button } from './Button';

// Icons
import { RiMenu5Fill } from 'react-icons/ri';

export function Navbar({ pageController }: { pageController: Function }) {
	const res = {
		data: {
			username: 'anon5124',
		},
	}; // trpc.user.me.useQuery();

	// if (res.isLoading) {
	// 	return <></>;
	// }

	return (
		<motion.div className="fixed top-5 flex w-screen items-center justify-center font-spacemono">
			<div className="flex h-[60px] w-[95%] flex-row items-center justify-between rounded-full border-2 border-gray-300 px-5">
				<div className="flex">
					Hi! <b className="px-2">{res.data?.username}</b>
				</div>
				<div className="hidden flex-row divide-x-2 divide-gray-300 lg:flex">
					<button
						className="duration-400 flex px-5 hover:font-semibold"
						onClick={() => {
							pageController(0);
						}}>
						<h1>Notes</h1>
					</button>
					<button
						className="duration-400 flex px-5 hover:font-semibold"
						onClick={() => {
							pageController(1);
						}}>
						<h1>Journals</h1>
					</button>
					<button
						className="duration-400 flex px-5 hover:font-semibold"
						onClick={() => {
							pageController(2);
						}}>
						<h1>Private</h1>
					</button>
				</div>
				<div className="flex flex-col">{<RiMenu5Fill className="h-8 w-8" />}</div>
			</div>
		</motion.div>
	);
}
