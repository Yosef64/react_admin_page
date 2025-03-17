import { Submission } from "@/comps/Admin/content/models";

interface LeaderboardEntry {
  name: string;
  rank: number;
  penalty: number;
  solved: number;
}
export function transformSubmission(submissions: Submission[]) {
  submissions.sort((a: Submission, b: Submission) =>
    b.score !== a.score
      ? b.score - a.score
      : parseInt(a.submission_time, 10) - parseInt(b.submission_time, 10)
  );

  const leaderboard = submissions.map((sub, index) => {
    return {
      name: sub.student.name,
      rank: index + 1,
      penalty: sub.wrong_question.length,
      solved: sub.score,
    };
  });
  return leaderboard;
}
