import { SiGithub, SiBluesky, SiX, SiInstagram, SiRss } from "@icons-pack/react-simple-icons";
import { MailIcon } from "lucide-react";

const SocialList = () => {
	return (
		<div className="site-social mt-1 flex flex-wrap gap-x-2">
			<a className="my-link-no-icon" href="https://github.com/" rel="noreferrer" target="_blank">
				<div className="flex flex-col justify-center">
					<SiGithub className="h-4 w-4" />
					<span className="sr-only">Github</span>
				</div>
			</a>
			<a className="my-link-no-icon" href="https://twitter.com/" rel="noreferrer" target="_blank">
				<div className="flex flex-col justify-center">
					<SiX className="h-4 w-4" />
					<span className="sr-only">X</span>
				</div>
			</a>
			<a
				className="my-link-no-icon"
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
				className="my-link-no-icon"
				href="https://bsky.app/profile/"
				rel="noreferrer"
				target="_blank"
			>
				<div className="flex flex-col justify-center">
					<SiBluesky className="h-4 w-4" />
					<span className="sr-only">BlueSky</span>
				</div>
			</a>
			<a className="my-link-no-icon" href="mailto:ian@ianpark.dev" rel="noreferrer" target="_blank">
				<div className="flex flex-col justify-center">
					<MailIcon className="h-4 w-4" />
					<span className="sr-only">Mail</span>
				</div>
			</a>
			<a className="my-link-no-icon" href="/rss.xml" rel="noreferrer" target="_blank">
				<div className="flex h-4 w-4 flex-col justify-center">
					<SiRss className="-mr-1 h-3 w-3" />
					<span className="sr-only">RSS</span>
				</div>
			</a>
		</div>
	);
};

export default SocialList;
