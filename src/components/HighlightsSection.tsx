import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

interface Skill {
	name: string;
}

interface Language {
	name: string;
	level: number;
	type: string;
}

interface Highlights {
	title: string;
	description: string;
	skills: Skill[];
}

const ProgressBar = ({ value }: { value: number }) => (
	<div className="h-1.5 w-full overflow-hidden rounded-full bg-faded">
		<div
			className="h-full rounded-full bg-faded-foreground transition-all ease-out"
			style={{
				width: `${value}%`,
			}}
		/>
	</div>
);

const HighlightCard = ({ highlight }: { highlight: Highlights }) => {
	return (
		<Card className="relative -ml-4 -mt-4 h-fit w-full rounded-lg border-b-0 border-l-0 border-r-0 border-t-0 p-4 shadow-none transition-all">
			<CardHeader className="w-full px-0 pb-0 pt-0">
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<CardTitle className="font-serif text-base font-semibold text-accent-foreground">
							{highlight.title}
						</CardTitle>
						<CardDescription>{highlight.description}</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent className="mt-2 w-full px-0 pb-0">
				<div className="space-y-4">
					<div className="flex w-full flex-wrap gap-2">
						{highlight.skills.map((skill, skillIndex) => (
							<Badge key={skillIndex} variant="secondary">
								{skill.name}
							</Badge>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const HighlightsSection = ({ lang }: { lang: string }) => {
	const techSkills = {
		fullStack: [
			{ name: "React" },
			{ name: "Python" },
			{ name: "Javascript" },
			{ name: "TypeScript" },
			{ name: "SQL" },
			{ name: "Java" },
			{ name: "Kotlin" },
			{ name: "TailwindCSS" },
			{ name: "Redis" },
			{ name: "RabbitMQ" },
		],
		ops: [{ name: "Docker" }, { name: "Kubernetes" }, { name: "RPC" }, { name: "Linux/Unix" }],
	};
	const highlights: Highlights[] =
		lang === "en"
			? [
					{
						title: "Full-Stack Development",
						description: "3+ years of paid experience building web applications and APIs",
						skills: [...techSkills.fullStack],
					},
					{
						title: "System/Ops",
						description: "Experience with high-performance computing and distributed systems",
						skills: [...techSkills.ops],
					},
				]
			: [
					{
						title: "풀스택 개발",
						description: "웹 애플리케이션과 API 개발 3년 이상의 실무 경험",
						skills: [...techSkills.fullStack],
					},
					{
						title: "옵스/시스템",
						description: "고성능 분산 시스템 심화 경험",
						skills: [...techSkills.ops],
					},
				];

	const languages: Language[] =
		lang === "en"
			? [
					{ name: "English", level: 100, type: "Native" },
					{ name: "Korean", level: 90, type: "Fluent" },
				]
			: [
					{ name: "영어", level: 100, type: "원어민" },
					{ name: "한국어", level: 90, type: "유창" },
				];

	return (
		<div className="space-y-6">
			<div className="relative mb-0 grid grid-cols-1 gap-4 [grid-auto-rows:auto] md:grid-cols-1">
				{highlights.map((highlight, index) => (
					<HighlightCard key={index} highlight={highlight} />
				))}
			</div>

			{/* Language Proficiency Card */}
			<Card className="rounded-none border-b-0 border-l-0 border-r-0 border-t-0 shadow-none dark:border-t-0">
				<CardHeader className="px-0 pt-0">
					<div className="flex items-center gap-2">
						<Globe className="h-5 w-5" />
						<CardTitle className="font-serif text-base">
							{lang === "en" ? "Language Proficiency" : "언어"}
						</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="px-0 pb-0">
					<div className="grid gap-6 md:grid-cols-2">
						{languages.map((language, index) => (
							<div key={index} className="space-y-2">
								<div className="flex items-center justify-between">
									<div>
										<span className="text-sm font-semibold text-accent-foreground">
											{language.name}
										</span>
										<span className="ml-2 text-xs text-muted-foreground">({language.type})</span>
									</div>
									<span className="text-xs">{language.level}%</span>
								</div>
								<ProgressBar value={language.level} />
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default HighlightsSection;
