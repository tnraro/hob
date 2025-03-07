const parsers: ((url: URL) => { url: string; title: string } | undefined)[] = [
  (url) => {
    if (url.host !== "leetcode.com") return;
    const match = url.pathname.match(/\/problems\/(.+?)(?=\/|$)/);
    if (match == null) throw "";
    return {
      url: `${url.origin}${match[0]}`,
      title: match[1],
    };
  },
];

export function parsePsUrl(url: string | URL) {
  const _url = new URL(url);
  try {
    for (const parse of parsers) {
      const result = parse(_url);
      if (result == null) continue;
      return result;
    }
  } catch (e) {
    throw new Error(`unexpected url pattern: ${_url.href}`, { cause: e });
  }
  throw new Error(`unexpected url pattern: ${_url.href}`);
}
