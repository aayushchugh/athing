import { Journal } from '@prisma/client';
import { showJournalPickerAtom, userInfo } from '@utils/store';
import { trpc } from '@utils/trpc';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Button } from './Button';
import { JournalBook } from './JournalBook';

const JournalPickerAnimations = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
};

export const JournalPicker = () => {
	// Atoms
	const [, setShowJournalPickerModal] = useAtom(showJournalPickerAtom);
	const [journals, setJournals] = useState<Journal[]>([]);
	const [user] = useAtom(userInfo);

	// tRPC
	const journalsQuery = trpc.journals.getJournalsByUserId.useQuery(
		{
			id: user.id,
		},
		{
			onError(err) {
				setJournals([]);
			},
		},
	);

	useEffect(() => {
		if (journalsQuery.data) {
			setJournals(journalsQuery.data);
		}
	}, [journalsQuery.data]);

	return (
		<motion.div
			className="absolute top-0 left-0 flex min-h-screen z-[998] w-screen items-center justify-center bg-white"
			initial={JournalPickerAnimations.hidden}
			animate={JournalPickerAnimations.visible}
			exit={JournalPickerAnimations.hidden}
			transition={{
				duration: 0.5,
			}}>
			<div className="absolute top-5 right-5">
				<Button
					type="button"
					onClick={() => {
						setShowJournalPickerModal(false);
					}}
					width="fit"
					styles="opposite">
					<IoClose className="h-6 w-6" />
				</Button>
			</div>
			<div className="flex flex-col flex-wrap p-10 lg:flex-row">
				{journals?.length > 0 ? (
					journals.map((journal, i) => {
						return <JournalBook type="select" journal={journal} key={journal.id} />;
					})
				) : (
					<div className="flex flex-col">
						<h1 className="text-center text-2xl font-bold">You have no journals! You have to create one first.!</h1>
					</div>
				)}
			</div>
		</motion.div>
	);
};
