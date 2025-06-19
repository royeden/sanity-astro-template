import { q, runQuery } from "./builder";

const pagesQuery = q.star.filterByType("page");

export function getPage(pathname: string) {
  const query = pagesQuery
    .parameters<{ pathname: string }>()
    .filterBy("pathname.current == $pathname")
    .slice(0);
  return runQuery(query, { parameters: { pathname } });
}

export function getPages() {
  return runQuery(pagesQuery);
}
