import React from "react";
import { Badge } from "@/components/ui/badge";
import MyLink from "@/components/MyLink";

interface Highlight {
	summary: string;
	details: string[];
}

interface Position {
	role: string;
	team: {
		name: string;
		link?: string;
	};
	date: string;
	highlights?: Highlight[];
	techStack?: string[];
	current?: boolean;
}

interface Experience {
	company: string;
	positions: Position[];
}

const ExperienceSection = ({ lang }: { lang: string }) => {
	const currentPositionRef = React.useRef<HTMLDivElement>(null);
	const containerRef = React.useRef<HTMLDivElement>(null);

	const stacks = {
		tacc: [
			"Python",
			"TypeScript",
			"React",
			"PostgreSQL",
			"Redis",
			"Docker",
			"RabbitMQ",
			"Kubernetes",
			"Angular",
			"Django",
			"Flask",
			"GIS",
			"Jenkins",
			"Splunk",
		],
		research: ["Python", "Pandas", "Angular 2+", "numpy", "SQL", "leaflet", "Bokeh"],
	};

	const experience: Experience[] =
		lang === "en"
			? [
					{
						company: "Zium",
						positions: [
							{
								role: "Software Engineer",
								team: {
									name: "Paymoney",
								},
								date: "2025.3~",
								current: true,
							},
						],
					},
					{
						company: "Republic of Korea Army",
						positions: [
							{
								role: "C4I Communications Operator",
								team: {
									name: "Intelligence Company",
								},
								date: "2023.05–2024.11",
								highlights: [
									{
										summary: "Military Interpreter Service",
										details: [
											"Served as Brigade-level English interpreter during UFS/FS ROK-US Combined Training",
										],
									},
									{
										summary: "Early Promotion",
										details: [
											"Received 3-month early promotion for excellence in military life, basic training, and specialized training",
										],
									},
									{
										summary: "Military Awards",
										details: [
											"Ranger Excellence Award",
											"Hoguk Training Award",
											"Winter Training Award",
											"Outstanding Soldier Award",
										],
									},
								],
								current: true,
							},
						],
					},
					{
						company: "Oracle",
						positions: [
							{
								role: "Software Engineer",
								team: {
									name: "Web & Mobile Applications Team",
									// link: "https://tacc.utexas.edu/about/contact/",
								},
								date: "2020.10–2023.04",
								highlights: [
									{
										summary: "Led hazard research visualization project",
										details: [
											"Created and maintained interactive 2D/3D visualization web-app for geographical data analysis",
											"Optimized large-scale GIS data processing reducing load time by 80%",
											"Collaborated with UT Austin engineering faculty on custom analysis tools",
										],
									},
									{
										summary: "Developed Core Portal/Tapis API platform features",
										details: [
											"Engineered authentication system handling user sessions for researchers",
											"Designed and implemented RESTful API powering 15+ internal applications",
											"Reduced deployment time by 70% through CI/CD pipeline optimization",
											"Mentored and evaluated interns during our summer internship program.",
										],
									},
								],
								techStack: [...stacks.tacc],
							},
						],
					},
					{
						company: "Calvin University",
						positions: [
							{
								role: "Research Intern",
								team: {
									name: "Wind Engineering Laboratory",
									link: "https://calvin.edu/people/fred-haan",
								},
								date: "2019.06–2020.09",
								highlights: [
									{
										summary: "Created research automation pipeline",
										details: [
											"NSF-funded research for analysis of Tornado-based Hazard data",
											"Automated image analysis saving 10+ hours per week",
											"Implemented GIS web applications for reproduction of analysis data",
										],
									},
								],
								techStack: [...stacks.research],
							},
						],
					},
				]
			: [
					{
						company: "Zium",
						positions: [
							{
								role: "소프트웨어 엔지니어",
								team: {
									name: "Paymoney",
								},
								date: "2025.3~",
								current: true,
							},
						],
					},
					{
						company: "대한민국 육군 만기전역",
						positions: [
							{
								role: "C4I 운용병",
								team: {
									name: "2기갑여단 정보중대",
								},
								date: "2023.05–2024.11",
								current: false,
								highlights: [
									{
										summary: "통역병 임무수행",
										details: ["UFS/FS 한미연합 훈련 여단대표 영어 통역병으로 2회 파견 근무"],
									},
									{
										summary: "조기진급",
										details: ["병영생활, 병기본, 주특기, 우수하여, 총 3개월 조기진급"],
									},
									{
										summary: "상장",
										details: ["유격왕", "호국훈련 상장", "혹한기 훈련 상장", "우수 용사 상장"],
									},
								],
							},
						],
					},
					{
						company: "Oracle",
						positions: [
							{
								role: "소프트웨어 엔지니어",
								team: {
									name: "Web & Mobile Applications Team",
									// link: "https://tacc.utexas.edu/about/contact/",
								},
								date: "2020.10–2023.04",
								highlights: [
									{
										summary: "연구 시각화 프로젝트 주도",
										details: [
											"자연재해 데이터 분석을 위한 Interactive 2D/3D 시각화 웹앱 개발",
											"대규모 GIS 데이터 처리 최적화로 로딩 시간 80% 단축",
											"UT 오스틴 공과대학 교수진과 협력하여 맞춤형 분석 도구 개발",
										],
									},
									{
										summary: "Core Portal/Tapis API 플랫폼 주요 기능 개발",
										details: [
											"연구 사용자 세션을 처리하는 인증 시스템 설계",
											"15개 이상의 내부 애플리케이션을 지원하는 RESTful API 개발 및 유지보수",
											"CI/CD 파이프라인 최적화로 배포 시간 70% 단축",
											"여름 인턴십 프로그램에서 인턴들의 업무를 지도하고 성과를 평가했습니다.",
										],
									},
								],

								techStack: [...stacks.tacc],
							},
						],
					},
					{
						company: "Calvin University",
						positions: [
							{
								role: "연구 인턴",
								team: {
									name: "Dr. Fred Haan",
									link: "https://calvin.edu/people/fred-haan",
								},
								date: "2019.06–2020.09",
								highlights: [
									{
										summary: "연구 자동화 파이프라인 구축",
										details: [
											"토네이도 재해 데이터 분석을 위한 NSF 지원 연구",
											"이미지 분석 자동화로 주당 10시간 이상 절감",
											"분석 데이터 재현을 위한 GIS 웹 애플리케이션 구현",
										],
									},
								],
								techStack: [...stacks.research],
							},
						],
					},
				];

	return (
		<div className="space-y-12 md:space-y-16">
			<div className="relative" ref={containerRef}>
				{experience.map((company, index) => (
					<div key={index} className="group relative mb-12 last-of-type:mb-4">
						<div className="px-0 pb-1 pt-0">
							<h2 className="font-serif text-base font-semibold text-accent-foreground">
								{company.company}
							</h2>
						</div>

						<div className="space-y-8">
							{company.positions.map((position, posIndex) => (
								<div
									key={posIndex}
									className="relative"
									ref={position.current ? currentPositionRef : null}
									data-current={position.current}
								>
									<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-4">
										<div className="min-w-0 flex-auto">
											<div>
												<div className="flex flex-row items-center space-x-1">
													<div className="text-sm font-medium text-accent-foreground">
														{position.role}
													</div>
													<div className="bg-background px-0 text-xs text-muted-foreground">
														({position.date})
													</div>
												</div>
												<div className="mt-0 space-y-1">
													<div className="text-muted-foreground">
														{position.team.link ? (
															<MyLink href={position.team.link}>{position.team.name}</MyLink>
														) : (
															<span>{position.team.name}</span>
														)}
													</div>
												</div>
											</div>

											<div className="mt-4 space-y-4">
												{position.techStack && (
													<div className="flex flex-wrap gap-2">
														{position.techStack.map((tech, techIndex) => (
															<Badge
																key={techIndex}
																variant="secondary"
																className="border-0 text-xs"
															>
																{tech}
															</Badge>
														))}
													</div>
												)}

												<ul className="space-y-4 md:pr-4">
													{position.highlights &&
														position.highlights.length > 0 &&
														position.highlights.map((highlight, highlightIndex) => (
															<li key={highlightIndex} className="space-y-2">
																<div className="flex items-start gap-x-2">
																	<span className="font-normal text-accent-foreground">
																		{highlight.summary}
																	</span>
																</div>
																<ul className="ml-0 space-y-1">
																	{highlight.details.map((detail, detailIndex) => (
																		<li key={detailIndex} className="flex items-start gap-x-2 pl-0">
																			<span className="mt-2 h-1 w-1 flex-none rounded-full bg-ring" />
																			<span className="text-pretty">{detail}</span>
																		</li>
																	))}
																</ul>
															</li>
														))}
												</ul>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ExperienceSection;
