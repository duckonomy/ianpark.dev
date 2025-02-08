import { Badge } from "@/components/ui/badge";

interface LeadershipRole {
	organization: string;
	role: string;
	date: string;
	achievements: string[];
}

const LeadershipSection = ({ lang }: { lang: string }) => {
	const leadershipRoles: LeadershipRole[] =
		lang === "en"
			? [
					{
						organization: "CalvinHacks",
						role: "Founder & Head of Technology",
						date: "2018–2020",
						achievements: [
							"Founded and scaled university's first MLH hackathon to 200+ participants from 15+ universities",
							"Secured $15,000+ yearly in sponsorships from 10+ tech companies including Google, Microsoft and Steelcase",
							"Led technical team of 5 to develop full-stack event platform handling registration, judging, and event logistics",
							"Organized workshops and mentorship programs reaching 300+ students over 2 years",
						],
					},
					{
						organization: "Abstraction, Computer Science Club",
						role: "President",
						date: "2019–2020",
						achievements: [
							"Grew weekly meeting attendance from 15 to 40+ members through industry speaker series and hands-on workshops",
							"Established partnership with university cybersecurity team to create student-led penetration testing workshop series",
							"Launched mock interview program connecting 30+ students with industry professionals",
						],
					},
				]
			: [
					{
						organization: "CalvinHacks",
						role: "창립자 & 기술 총괄",
						date: "2018–2020",
						achievements: [
							"대학 최초의 MLH 해커톤을 창립하여 15개 이상 대학에서 200명 이상의 참가자 규모로 성장",
							"Google과 Microsoft를 포함한 10개 이상의 기업으로부터 매년 $15,000 이상의 후원금 유치",
							"5명의 기술팀을 이끌어 등록, 심사, 행사 운영을 처리하는 풀스택 이벤트 플랫폼 개발",
							"2년간 300명 이상의 학생들이 참여한 워크샵과 멘토링 프로그램 운영",
						],
					},
					{
						organization: "Abstraction, Computer Science Club",
						role: "회장",
						date: "2019–2020",
						achievements: [
							"산업체 연사 시리즈와 실습 워크샵을 통해 주간 모임 참석자를 15명에서 40명 이상으로 증가",
							"대학 사이버보안팀과 협력하여 학생 주도의 모의해킹 워크샵 시리즈 구축",
							"30명 이상의 학생들을 업계 전문가와 연결하는 모의 면접 프로그램 출시",
						],
					},
				];

	return (
		<div className="space-y-12 md:space-y-16">
			<div className="group">
				<div className="relative">
					<div className="space-y-8">
						{leadershipRoles.map((role, index) => (
							<div key={index} className="relative">
								<div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-4">
									<div className="min-w-0 flex-auto">
										<div>
											<h3 className="font-playfair text-base font-semibold text-neutral-700 dark:text-zinc-200">
												{role.organization}
											</h3>
											<div className="mt-1 space-y-1">
												<div className="flex space-x-1">
													<div className="text-sm font-normal text-neutral-700 dark:text-zinc-400">
														{role.role}
													</div>

													<div>
														<Badge
															variant="secondary"
															className="bg-transparent px-0 text-xs text-neutral-400 dark:text-zinc-500"
														>
															({role.date})
														</Badge>
													</div>
												</div>
											</div>
										</div>

										<div className="mt-2">
											<ul className="space-y-2">
												{role.achievements.map((achievement, achievementIndex) => (
													<li key={achievementIndex} className="flex items-start gap-x-2">
														<span className="mt-2 h-1 w-1 flex-none rounded-full bg-neutral-400 dark:bg-zinc-700" />
														<span className="text-sm text-neutral-500 dark:text-zinc-400">
															{achievement}
														</span>
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
			</div>
		</div>
	);
};

export default LeadershipSection;
