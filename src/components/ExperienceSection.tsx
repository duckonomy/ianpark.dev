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
          company: "Zium Knowledge Service",
          positions: [
            {
              role: "Full-Stack Engineer",
              team: {
                name: "Naver Finance Paymoney / Naver Finance MyBiz Reporting",
              },
              date: "Mar 2025 – Present",
              current: true,
              highlights: [
                {
                  summary: "High-Traffic Paymoney Adapter API Backend Development",
                  details: [
                    "Designed and implemented a high-performance adapter API backend handling millions of Paymoney user transactions daily",
                    "Built an asynchronous, queue-based integration architecture for external payment systems to improve throughput and fault tolerance",
                    "Optimized database queries and introduced caching strategies to reduce API latency by over 60%",
                  ],
                },
                {
                  summary: "Naver Finance MyBiz Business Reporting Service Development",
                  details: [
                    "Developed the frontend platform powering financial reporting dashboards for hundreds of thousands of business users",
                    "Designed data models and API integration strategies to efficiently query and visualize large-scale financial datasets",
                    "Established automated integration tests and CI/CD pipelines to ensure stable deployments and faster iteration cycles",
                  ],
                },
              ],
            },
          ],
        },
        {
          company: "Texas Advanced Computing Center",
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
          company: "지음지식서비스",
          positions: [
            {
              role: "풀스택 엔지니어",
              team: {
                name: "Naver Finance Paymoney / Naver Finance MyBiz Reporting",
              },
              date: "2025.3~",
              current: true,
              highlights: [
                {
                  summary: "Paymoney 대규모 트래픽 어댑터 API 백엔드 개발",
                  details: [
                    "수백만 사용자 트랜잭션을 안정적으로 처리하는 고성능 어댑터 API 서버 설계 및 구현",
                    "외부 결제 시스템과의 비동기·대기열 기반 연동 아키텍처로 처리량과 장애 복원력 확보",
                    "쿼리 최적화 및 캐싱 설계로 API 응답 지연 60% 이상 단축",
                  ],
                },
                {
                  summary: "Naver Finance MyBiz 비즈니스 리포팅 서비스 개발",
                  details: [
                    "수십만 사업자 사용자를 위한 재무 리포팅 웹 애플리케이션의 프론트엔드 설계 및 구현",
                    "대량 재무 데이터를 효율적으로 조회·시각화하기 위한 데이터 모델링 및 API 통합 설계",
                    "프론트엔드-백엔드 연동 자동화 테스트 및 품질 파이프라인 구축으로 배포 안정성 확보",
                  ],
                },
              ],
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
						company: "Texas Advanced Computing Center",
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
                  summary: "백엔드 중심 연구 시각화 플랫폼 설계 및 구축",
                  details: [
                    "자연재해 대규모 시계열·공간 데이터를 처리하기 위한 확장성 있는 데이터 파이프라인 및 API 백엔드 설계",
                    "수십 GB급 GIS 데이터를 효율적으로 전처리·캐싱하여 로딩 시간 80% 단축",
                    "UT 오스틴 공과대학 교수진과 협력해 맞춤형 데이터 분석·시각화 엔진 백엔드 개발",
                  ],
                },
                {
                  summary: "Core Portal / Tapis API 플랫폼 핵심 백엔드 기능 개발",
                  details: [
                    "수천 명의 연구 사용자 세션을 안전하게 관리하는 인증·권한 시스템 설계 및 구현",
                    "15개 이상의 내부 연구 애플리케이션을 지원하는 RESTful API 서버 개발 및 운영",
                    "CI/CD 파이프라인 및 배포 자동화를 개선하여 배포 시간 70% 이상 단축",
                    "여름 인턴십 프로그램에서 백엔드 개발 인턴들을 멘토링하고 코드 품질·성과 평가 수행",
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
