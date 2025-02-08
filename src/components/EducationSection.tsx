import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MyLink from "@/components/MyLink";

interface Course {
	name: string;
	code: string;
}

const EducationSection = ({ lang }: { lang: string }) => {
	const relevantCourses: Course[] = [
		{ code: "CS 374", name: "High Performance Computing" },
		{ code: "CS 364", name: "Computer Security" },
		{ code: "CS 262", name: "Software Engineering" },
		{ code: "CS 344", name: "Artificial Intelligence" },
	];

	const awards =
		lang === "en"
			? ["Dean's List (All Semesters 2018-2020)", "Trustee's Scholarship"]
			: ["학장 명단 선정 (전체 학기 2018-2020)", "Trustee's 장학금"];

	return (
		<div className="w-full">
			<Card className="w-full border-none bg-transparent shadow-none">
				<CardHeader className="w-full p-0">
					<div className="flex w-full items-start justify-between">
						<div className="w-full">
							<CardTitle className="font-playfair text-base font-semibold dark:text-zinc-200">
								Calvin University
							</CardTitle>

							<div className="mt-0 space-y-1">
								<div className="flex flex-row space-x-1">
									<MyLink
										href="https://calvin.edu/majors-programs/bachelor-computer-science-bcs"
										className="text-sm dark:text-zinc-400"
									>
										Computer Science, B.CS.
									</MyLink>
									<Badge
										variant="secondary"
										className="bg-transparent text-xs text-neutral-400 dark:text-zinc-500"
									>
										(2016.09–2020.05)
									</Badge>
								</div>
								<div className="flex gap-3">
									<span className="text-sm dark:text-zinc-400">GPA: 3.52/4.00</span>
									<span className="text-sm dark:text-zinc-400">
										{lang === "en" ? "Major GPA: " : "전공 GPA: "}3.798/4.00
									</span>
								</div>
							</div>
						</div>
					</div>
				</CardHeader>

				<CardContent className="mt-4 w-full space-y-6 p-0">
					{/* Relevant Coursework */}
					<div className="w-full">
						<h3 className="mb-3 text-sm font-medium tracking-wider text-neutral-700 dark:text-zinc-400">
							{lang === "en" ? "Relevant Coursework" : "주요 수강 과목"}
						</h3>
						<div className="grid w-full grid-cols-1 gap-2">
							{relevantCourses.map((course, index) => (
								<div
									key={index}
									className="flex w-full items-center justify-between rounded-md px-0 py-0"
								>
									<div className="flex items-center gap-2">
										<span className="text-xs font-medium text-neutral-400 dark:text-zinc-500">
											{course.code}
										</span>
										<span className="text-sm text-neutral-600 dark:text-zinc-300">
											{course.name}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="grid w-full grid-cols-1 gap-6">
						{/* Awards & Honors */}
						<div className="w-full">
							<h3 className="mb-3 text-sm font-medium tracking-wider text-neutral-700 dark:text-zinc-400">
								{lang === "en" ? "Awards & Honors" : "수상 및 장학금"}
							</h3>
							<ul className="w-full space-y-2">
								{awards.map((award, index) => (
									<li key={index} className="flex items-start gap-x-2">
										<span className="mt-2 h-1 w-1 flex-none rounded-full bg-neutral-400 dark:bg-zinc-600" />
										<span className="text-sm text-neutral-500 dark:text-zinc-400">{award}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default EducationSection;
