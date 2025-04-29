import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
			<Card className="w-full border-none shadow-none">
				<CardHeader className="w-full p-0">
					<div className="flex w-full items-start justify-between">
						<div className="w-full">
							<CardTitle className="font-serif text-base font-semibold text-accent-foreground">
								University of Michigan, Ann Arbor
							</CardTitle>

							<div className="mt-0 space-y-1">
								<div className="flex flex-row items-center space-x-1">
									<MyLink href="https://calvin.edu/majors-programs/bachelor-computer-science-bcs">
										Computer Science, B.CS.
									</MyLink>
									<div className="text-xs text-muted-foreground">(2016.09–2020.05)</div>
								</div>
								<div className="flex gap-3">
									<span>GPA: 3.52/4.00</span>
									<span>{lang === "en" ? "Major GPA: " : "전공 GPA: "}3.798/4.00</span>
								</div>
							</div>
						</div>
					</div>
				</CardHeader>

				<CardContent className="mt-4 w-full space-y-6 p-0">
					{/* Relevant Coursework */}
					<div className="w-full">
						<div className="mb-3 text-sm font-medium text-accent-foreground">
							{lang === "en" ? "Relevant Coursework" : "주요 수강 과목"}
						</div>
						<div className="grid w-full grid-cols-1 gap-2">
							{relevantCourses.map((course, index) => (
								<div
									key={index}
									className="flex w-full items-center justify-between rounded-md px-0 py-0"
								>
									<div className="flex items-center gap-2">
										<span className="text-xs font-medium text-faded-foreground">{course.code}</span>
										<span>{course.name}</span>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="grid w-full grid-cols-1 gap-6">
						{/* Awards & Honors */}
						<div className="w-full">
							<div className="mb-3 text-sm font-medium text-accent-foreground">
								{lang === "en" ? "Awards & Honors" : "수상 및 장학금"}
							</div>
							<ul className="w-full space-y-2">
								{awards.map((award, index) => (
									<li key={index} className="flex items-start gap-x-2">
										<span className="mt-2 h-1 w-1 flex-none rounded-full bg-ring" />
										<span>{award}</span>
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
