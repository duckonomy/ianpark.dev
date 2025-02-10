import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogContent,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, ExternalLink, ArrowUpRight } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

interface Project {
	title: string;
	date: string;
	description: string;
	stack: string[];
	link: string;
	category: string;
	pinned: boolean;
	image?: string; // Optional image URL
	longDescription?: string; // Optional detailed description
}

const ProjectModal = ({
	project,
	children,
	lang,
}: {
	project: Project;
	children: React.ReactNode;
	lang: string;
}) => {
	const [open, setOpen] = React.useState(false);
	const dialogDescriptionId = React.useId();

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="border-0 sm:max-w-3xl" aria-describedby={undefined}>
				<DialogHeader>
					<DialogTitle className="sr-only text-accent-foreground">{project.title}</DialogTitle>
					<p id={dialogDescriptionId} className="sr-only">
						{project.description}
					</p>
				</DialogHeader>
				<div className="relative">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setOpen(false)}
						aria-label={lang === "en" ? "Close dialog" : "닫기"}
						className="absolute right-0 top-0 z-50"
					>
						<X className="h-5 w-5" />
					</Button>
					<div className={`grid gap-6 ${project.image ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
						{/* Image Section */}
						{project.image && (
							<div className="relative h-64 overflow-hidden rounded-lg md:h-full">
								<img
									src={project.image}
									alt={project.title}
									className="h-full w-full object-cover"
								/>
							</div>
						)}

						{/* Content Section */}
						<div className={`flex flex-col ${!project.image ? "mx-auto w-full md:max-w-3xl" : ""}`}>
							{/* Header */}
							<div>
								<h2 className="font-serif text-lg font-semibold">{project.title}</h2>
								<div className="mt-2 flex flex-wrap gap-2">
									<Badge variant="outline" className="text-xs">
										{project.date}
									</Badge>
									<Badge variant="outline" className="text-xs">
										{project.category}
									</Badge>
								</div>
							</div>

							{/* Description */}
							<div className="mt-4 flex-grow">
								<div className="mb-2 font-medium text-accent-foreground">About</div>
								<p className="text-sm">{project.longDescription || project.description}</p>
							</div>

							{/* Tech Stack */}
							<div className="mt-4">
								<h3 className="mb-2 font-medium text-accent-foreground">Technologies</h3>
								<div className="flex flex-wrap gap-2">
									{project.stack.map((tech, index) => (
										<Badge key={index} variant="secondary">
											{tech}
										</Badge>
									))}
								</div>
							</div>

							{/* Links */}
							<div className="mt-6 flex gap-2">
								<Button variant="outline" className="flex-1" asChild>
									<a
										href={
											project.link.startsWith("http") ? project.link : `https://${project.link}`
										}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center gap-2"
									>
										<ExternalLink className="h-4 w-4" />
										{lang === "en" ? "View Project" : "프로젝트 보기"}
									</a>
								</Button>
								{project.link.includes("github.com") && (
									<Button variant="outline" asChild>
										<a
											href={
												project.link.startsWith("http") ? project.link : `https://${project.link}`
											}
											target="_blank"
											rel="noopener noreferrer"
										>
											<SiGithub className="h-4 w-4" />
										</a>
									</Button>
								)}
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

const ProjectsSection = ({ lang }: { lang: string }) => {
	const projects: Project[] =
		lang === "en"
			? [
					{
						title: "Parkour",
						date: "2025",
						description: "Cross-ecosystem project management CLI with unified workflows",
						longDescription:
							"Lightweight CLI tool for streamlining project discovery and workflow management across different programming languages and frameworks. Features intelligent project detection, unified command interface, and seamless environment integration. Achieves minimal configuration overhead while supporting complex multi-project workflows and ecosystem-specific build systems. Built in Go for performance and cross-platform compatibility.",
						stack: ["Go", "TOML", "Shell", "Git"],
						link: "github.com/duckonomy/parkour",
						category: "Developer Tools",
						pinned: true,
					},
					{
						title: "This Website",
						date: "2025",
						description: "Portfolio and blog built with modern web technologies",
						longDescription:
							"Performant and accessible personal website built with Astro and React. Features a bilingual blog system (Korean/English), dark mode support, and optimized asset delivery. Utilizes modern build tools and CI/CD pipelines for automated deployment. Content managed through MDX with custom components for code syntax highlighting and math typesetting.",
						stack: ["Astro", "React", "TypeScript", "Tailwind CSS", "MDX", "GitHub Actions"],
						link: "github.com/duckonomy/ianpark.dev",
						category: "Web",
						pinned: true,
					},

					{
						title: "SaneWM",
						date: "2020",
						description: "Ultra-lightweight X11 window manager with 2MB memory footprint",
						longDescription:
							"Minimalist X11 window manager optimized for performance and productivity. Features include scriptable workspace management, custom keybinding engine, and hybrid tiling/floating layouts. Achieved 2MB memory footprint (90% reduction from i3wm) while maintaining full EWMH compliance. 500+ GitHub stars and adopted by minimalist Linux community.",
						stack: ["C", "libxcb", "Lua", "Xlib", "CMake", "Shell"],
						link: "github.com/duckonomy/sanewm",
						category: "Systems",
						pinned: false,
					},
					{
						title: "AI-driven posting Bot",
						date: "2019", // Changed from 2020 to 2019 based on blog post date
						description:
							"Forum bot comparing LSTM and KoGPT architectures for Korean community engagement",
						longDescription:
							"Experimental NLP system built for AI class final project, comparing LSTM and KoGPT 2.0 architectures for generating contextually-aware posts on DCinside forums. Features include web scraping infrastructure handling 100K+ posts and 500K+ comments, asynchronous response generation, and cultural-context awareness. Implemented with Flask/Celery for scalable deployment and RabbitMQ for message queuing.",
						stack: ["Python", "Flask", "Celery", "RabbitMQ", "Scrapy", "KoGPT 2.0", "LSTM"],
						link: "github.com/duckonomy/cs344",
						category: "AI/ML",
						pinned: false,
					},

					{
						title: "LoTide",
						date: "2019",
						description: "High-performance audio framework for real-time music adaptation",
						longDescription:
							"A low-latency audio processing framework achieving <2ms latency for real-time music adaptation. Features a modular plugin system supporting 10+ audio formats, MIDI integration, and cross-platform compatibility.",
						stack: ["C++", "TSAL", "RtAudio", "CMake", "WebSockets", "Javascript"],
						link: "lotide.github.io",
						category: "Systems",
						pinned: false,
					},
				]
			: [
					{
						title: "개인 웹사이트",
						date: "2025",
						description: "현대 웹 기술로 구축된 포트폴리오와 블로그",
						longDescription:
							"Astro와 React로 구축된 성능과 접근성이 뛰어난 개인 웹사이트입니다. 한영 이중언어 블로그 시스템, 다크 모드 지원, 최적화된 에셋 전달을 제공합니다. 현대적인 빌드 도구와 CI/CD 파이프라인을 활용한 자동화된 배포를 구현했습니다. MDX를 통한 콘텐츠 관리와 코드 문법 강조 및 수식 조판을 위한 커스텀 컴포넌트를 포함합니다.",
						stack: ["Astro", "React", "TypeScript", "Tailwind CSS", "MDX", "GitHub Actions"],
						link: "github.com/duckonomy/portfolio",
						category: "Web",
						pinned: true,
					},
					{
						title: "Parkour",
						date: "2025",
						description: "통합 워크플로우를 갖춘 크로스 에코시스템 프로젝트 관리 CLI",
						longDescription:
							"다양한 프로그래밍 언어와 프레임워크에 걸친 프로젝트 탐색과 워크플로우 관리를 간소화하는 경량 CLI 도구입니다. 지능형 프로젝트 감지, 통합 명령어 인터페이스, 원활한 환경 통합을 제공합니다. 복잡한 멀티 프로젝트 워크플로우와 에코시스템별 빌드 시스템을 지원하면서도 최소한의 설정만을 필요로 합니다. 성능과 크로스 플랫폼 호환성을 위해 Go로 개발되었습니다.",
						stack: ["Go", "TOML", "Shell", "Git"],
						link: "github.com/duckonomy/parkour",
						category: "Systems",
						pinned: true,
					},
					{
						title: "SaneWM",
						date: "2020",
						description: "2MB 메모리 사용량의 초경량 X11 윈도우 매니저",
						longDescription:
							"성능과 생산성에 최적화된 미니멀리스트 X11 윈도우 매니저입니다. 스크립트 가능한 작업 공간 관리, 커스텀 키바인딩 엔진, 하이브리드 타일링/플로팅 레이아웃을 제공합니다. i3wm 대비 90% 감소한 2MB의 메모리 사용량을 달성하면서도 완전한 EWMH 호환성을 유지합니다. GitHub 스타 500개 이상을 받았으며 미니멀리스트 Linux 커뮤니티에서 채택되었습니다.",
						stack: ["C", "libxcb", "Lua", "Xlib", "CMake", "Shell"],
						link: "github.com/duckonomy/sanewm",
						category: "Systems",
						pinned: false,
					},
					{
						title: "LoTide",
						date: "2019",
						description: "실시간 음악 적응을 위한 고성능 오디오 프레임워크",
						longDescription:
							"실시간 음악 적응을 위한 2ms 미만의 지연 시간을 달성한 저지연 오디오 처리 프레임워크입니다. 10개 이상의 오디오 포맷을 지원하는 모듈식 플러그인 시스템, MIDI 통합, 크로스 플랫폼 호환성을 제공합니다. 100명 이상의 개발자가 사용 중이며 Ableton Live와 FL Studio를 포함한 주요 DAW와 통합되어 있습니다.",
						stack: ["C++", "TSAL", "JUCE", "RtAudio", "CMake", "WebAssembly"],
						link: "lotide.github.io",
						category: "Systems",
						pinned: false,
					},
					{
						title: "Machine Learning 포스팅 봇",
						date: "2019",
						description: "한국 커뮤니티 참여를 위한 LSTM과 KoGPT 아키텍처 비교 포럼 봇",
						longDescription:
							"AI 수업 기말 프로젝트로 개발된 실험적 NLP 시스템으로, 디시인사이드 포럼의 맥락 인식 게시물 생성을 위한 LSTM과 KoGPT 2.0 아키텍처를 비교 분석했습니다. 10만 개 이상의 게시물과 50만 개 이상의 댓글을 처리하는 웹 스크래핑 인프라, 비동기 응답 생성, 문화적 맥락 인식 기능을 포함합니다. 확장 가능한 배포를 위해 Flask/Celery로 구현되었으며 RabbitMQ를 메시지 큐잉에 활용했습니다.",
						stack: ["Python", "Flask", "Celery", "RabbitMQ", "Scrapy", "KoGPT 2.0", "LSTM"],
						link: "github.com/duckonomy/cs344",
						category: "AI/ML",
						pinned: false,
					},
				];
	const filterProjects = (category: string) => {
		if (category === "Pinned") return projects.filter((project) => project.pinned);
		if (category === "All") return projects;
		return projects.filter((project) => project.category === category);
	};

	const tabTriggerStyles =
		"pt-0 pb-2 px-0 relative border-none shadow-none px-2 font-medium text-faded-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 data-[state=active]:after:scale-x-100 after:bg-accent-foreground after:transition-transform data-[state=active]:text-accent-foreground data-[state=active]:shadow-none";

	return (
		<div className="-mb-4">
			<Tabs defaultValue="Pinned" className="w-full">
				<TabsList className="mb-4 flex h-10 w-full items-center justify-start gap-2 bg-background p-0">
					<TabsTrigger value="Pinned" className={tabTriggerStyles}>
						<svg
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="mr-1"
						>
							<path
								d="M10.3285 1.13607C10.1332 0.940809 9.81662 0.940808 9.62136 1.13607C9.42609 1.33133 9.42609 1.64792 9.62136 1.84318L10.2744 2.49619L5.42563 6.13274L4.31805 5.02516C4.12279 4.8299 3.80621 4.8299 3.61095 5.02516C3.41569 5.22042 3.41569 5.537 3.61095 5.73226L5.02516 7.14648L6.08582 8.20714L2.81545 11.4775C2.62019 11.6728 2.62019 11.9894 2.81545 12.1846C3.01072 12.3799 3.3273 12.3799 3.52256 12.1846L6.79293 8.91425L7.85359 9.97491L9.2678 11.3891C9.46306 11.5844 9.77965 11.5844 9.97491 11.3891C10.1702 11.1939 10.1702 10.8773 9.97491 10.682L8.86733 9.57443L12.5039 4.7257L13.1569 5.37871C13.3522 5.57397 13.6687 5.57397 13.864 5.37871C14.0593 5.18345 14.0593 4.86687 13.864 4.6716L12.8033 3.61094L11.3891 2.19673L10.3285 1.13607ZM6.13992 6.84702L10.9887 3.21047L11.7896 4.01142L8.15305 8.86015L6.13992 6.84702Z"
								fill="currentColor"
								fillRule="evenodd"
								clipRule="evenodd"
							/>
						</svg>
						{lang === "en" ? "Pinned" : "고정"}
					</TabsTrigger>
					<TabsTrigger value="All" className={tabTriggerStyles}>
						{lang === "en" ? "All" : "전체"}
					</TabsTrigger>
					<TabsTrigger value="Systems" className={tabTriggerStyles}>
						{lang === "en" ? "Systems" : "시스템"}
					</TabsTrigger>
					<TabsTrigger value="Web" className={tabTriggerStyles}>
						{lang === "en" ? "Web" : "웹"}
					</TabsTrigger>
					<TabsTrigger value="AI/ML" className={tabTriggerStyles}>
						AI/ML
					</TabsTrigger>
				</TabsList>

				<TabsContent value="Pinned">
					<ProjectGrid projects={filterProjects("Pinned")} lang={lang} />
				</TabsContent>
				<TabsContent value="All">
					<ProjectGrid projects={filterProjects("All")} lang={lang} />
				</TabsContent>
				<TabsContent value="Systems">
					<ProjectGrid projects={filterProjects("Systems")} lang={lang} />
				</TabsContent>
				<TabsContent value="Web">
					<ProjectGrid projects={filterProjects("Web")} lang={lang} />
				</TabsContent>
				<TabsContent value="AI/ML">
					<ProjectGrid projects={filterProjects("AI/ML")} lang={lang} />
				</TabsContent>
			</Tabs>
		</div>
	);
};

const ProjectGrid = ({ projects, lang }: { projects: Project[]; lang: string }) => (
	<div className="group/list relative mb-0 grid grid-cols-1 gap-y-0 md:grid-cols-1">
		{projects.map((project, index) => (
			<ProjectModal key={index} project={project} lang={lang}>
				<Card className="group relative -ml-4 cursor-pointer rounded-lg border-none p-4 px-2 shadow-none transition-all duration-200 hover:bg-accent hover:!opacity-100 group-hover/list:opacity-50">
					<CardHeader className="p-0 pb-3">
						<div className="flex items-start justify-between">
							<div className="flex items-center gap-2">
								<CardTitle className="font-serif text-base font-semibold text-accent-foreground">
									{project.title}
								</CardTitle>
								<ArrowUpRight className="h-4 w-4" />
							</div>
							<Badge variant="outline" className="border-none text-xs">
								{project.date}
							</Badge>
						</div>
						<CardDescription>{project.description}</CardDescription>
					</CardHeader>
					<CardContent className="p-0">
						<div className="flex flex-wrap gap-2">
							{project.stack.map((tech, techIndex) => (
								<Badge className="" key={techIndex} variant="secondary">
									{tech}
								</Badge>
							))}
						</div>
					</CardContent>
				</Card>
			</ProjectModal>
		))}
	</div>
);
export default ProjectsSection;
