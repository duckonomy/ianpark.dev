import { SiGithub, SiBluesky, SiX, SiInstagram, SiRss } from "@icons-pack/react-simple-icons";
import { MailIcon } from "lucide-react";

const SocialList = () => {
	return (
		<div className="site-social flex flex-wrap gap-x-2 text-neutral-600 dark:text-zinc-400">
			<a
				className="-mx-1 -my-1 inline-block rounded-md px-1 py-1 transition sm:hover:bg-neutral-100 sm:hover:text-neutral-700 sm:dark:hover:bg-neutral-800 sm:dark:hover:text-neutral-200"
				href="https://github.com/duckonomy/"
				rel="noreferrer"
				target="_blank"
			>
				<div className="flex flex-col justify-center">
					<SiGithub className="h-4 w-4" />
					<span className="sr-only">Github</span>
				</div>
			</a>
			<a
				className="-mx-1 -my-1 inline-block rounded-md px-1 py-1 transition sm:hover:bg-neutral-100 sm:hover:text-neutral-700 sm:dark:hover:bg-neutral-800 sm:dark:hover:text-neutral-200"
				href="https://twitter.com/duckonomy/"
				rel="noreferrer"
				target="_blank"
			>
				<div className="flex flex-col justify-center">
					<SiX className="h-4 w-4" />
					<span className="sr-only">X</span>
				</div>
			</a>
			<a
				className="-mx-1 -my-1 inline-block rounded-md px-1 py-1 transition sm:hover:bg-neutral-100 sm:hover:text-neutral-700 sm:dark:hover:bg-neutral-800 sm:dark:hover:text-neutral-200"
				href="https://x.com/iannnpark/"
				rel="noreferrer"
				target="_blank"
			>
				<div className="flex flex-col justify-center">
					<SiInstagram className="h-4 w-4" />
					<span className="sr-only">Instagram</span>
				</div>
			</a>
			<a
				className="-my-1 -ml-0.5 -mr-1 inline-block rounded-md px-1 py-1 transition sm:hover:bg-neutral-100 sm:hover:text-neutral-700 sm:dark:hover:bg-neutral-800 sm:dark:hover:text-neutral-200"
				href="https://bsky.app/profile/ianpark.dev/"
				rel="noreferrer"
				target="_blank"
			>
				<div className="flex flex-col justify-center">
					<SiBluesky className="h-4 w-4" />
					<span className="sr-only">BlueSky</span>
				</div>
			</a>
			<a
				className="-my-1 -ml-0.5 -mr-1 inline-block rounded-md px-1 py-1 transition sm:hover:bg-neutral-100 sm:hover:text-neutral-700 sm:dark:hover:bg-neutral-800 sm:dark:hover:text-neutral-200"
				href="mailto:ian@ianpark.dev"
				rel="noreferrer"
				target="_blank"
			>
				<div className="flex flex-col justify-center">
					<MailIcon className="h-4 w-4" />
					<span className="sr-only">Mail</span>
				</div>
			</a>
			<a
				className="-my-1 inline-block rounded-md px-1 py-1 transition sm:hover:bg-neutral-100 sm:hover:text-neutral-700 sm:dark:hover:bg-neutral-800 sm:dark:hover:text-neutral-200"
				href="/rss.xml"
				rel="noreferrer"
				target="_blank"
			>
				<div className="flex h-4 w-4 flex-col justify-center">
					<SiRss className="-mr-1 h-3 w-3" />
					<span className="sr-only">RSS</span>
				</div>
			</a>
		</div>
	);
};

export default SocialList;
