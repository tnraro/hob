import sanitize from "sanitize-html";

type Crawler = (url: URL) => Promise<
  | {
      site: string;
      title: string;
      no?: number;
      category?: string;
      difficulty?: string;
      topics?: string[];
      content?: string;
    }
  | undefined
>;

const crawlers: Crawler[] = [
  async (url) => {
    if (url.hostname !== "leetcode.com") return;
    const match = url.pathname.match(/\/problems\/(.+?)(?=\/|$)/);
    if (match == null) throw "";
    const titleSlug = match[1];

    const res = await fetch("https://leetcode.com/graphql/", {
      headers: {
        "content-type": "application/json",
      },
      referrer: `https://leetcode.com/problems/${titleSlug}/`,
      body: JSON.stringify({
        query:
          "\n    query questionDetail($titleSlug: String!) {\n  languageList {\n    id\n    name\n  }\n  submittableLanguageList {\n    id\n    name\n    verboseName\n  }\n  statusList {\n    id\n    name\n  }\n  questionDiscussionTopic(questionSlug: $titleSlug) {\n    id\n    commentCount\n    topLevelCommentCount\n  }\n  ugcArticleOfficialSolutionArticle(questionSlug: $titleSlug) {\n    uuid\n    chargeType\n    canSee\n    hasVideoArticle\n  }\n  question(titleSlug: $titleSlug) {\n    title\n    titleSlug\n    questionId\n    questionFrontendId\n    questionTitle\n    translatedTitle\n    content\n    translatedContent\n    categoryTitle\n    difficulty\n    stats\n    companyTagStatsV2\n    topicTags {\n      name\n      slug\n      translatedName\n    }\n    similarQuestionList {\n      difficulty\n      titleSlug\n      title\n      translatedTitle\n      isPaidOnly\n    }\n    mysqlSchemas\n    dataSchemas\n    frontendPreviews\n    likes\n    dislikes\n    isPaidOnly\n    status\n    canSeeQuestion\n    enableTestMode\n    metaData\n    enableRunCode\n    enableSubmit\n    enableDebugger\n    envInfo\n    isLiked\n    nextChallenges {\n      difficulty\n      title\n      titleSlug\n      questionFrontendId\n    }\n    libraryUrl\n    adminUrl\n    hints\n    codeSnippets {\n      code\n      lang\n      langSlug\n    }\n    exampleTestcaseList\n    hasFrontendPreview\n  }\n}\n    ",
        variables: {
          titleSlug,
        },
        operationName: "questionDetail",
      }),
      method: "POST",
    });

    if (!res.ok) throw res;
    const body = (await res.json()) as {
      data: {
        question?: {
          title: string;
          questionId: number;
          categoryTitle: string;
          difficulty: string;
          topicTags: { name: string }[];
          content: string;
        };
      };
    };
    if (body.data.question == null) throw { status: 404 };
    return {
      site: url.hostname,
      title: body.data.question.title,
      no: body.data.question.questionId,
      category: body.data.question.categoryTitle.toLowerCase(),
      difficulty: body.data.question.difficulty.toLowerCase(),
      topics: body.data.question.topicTags.map((tag) => tag.name.toLowerCase()),
      content: sanitize(body.data.question.content),
    };
  },
];

export async function crawlPs(url: string) {
  const _url = new URL(url.trim());
  for (const crawl of crawlers) {
    const result = await crawl(_url);
    if (result != null) return result;
  }
  throw new Error(`unexpected url pattern: ${_url.href}`);
}
