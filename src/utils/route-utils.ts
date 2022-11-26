import queryString from "query-string";
import { ignoreEmptyObject } from "./object-utils";

export const isActiveRoute = ({
  path,
  route,
}: {
  path: string;
  route: string;
}) => {
  path = getValidRouteName(path);
  route = getValidRouteName(route);
  return path === route;
};

const getValidRouteName = (pathname: string) => {
  if (pathname) {
    let newPathname = pathname;
    if (!newPathname.startsWith("/")) {
      newPathname = `/${newPathname}`;
    }
    if (!newPathname.endsWith("/")) {
      newPathname = `${newPathname}/`;
    }
    return newPathname;
  }
  return pathname;
};

export const getSearchString = (
  object: Record<string, any>,
  options?: queryString.StringifyOptions & { prefixQuestionMark?: boolean }
): string => {
  let searchString = queryString.stringify(object, {
    skipNull: true,
    skipEmptyString: true,
    ...options,
  });
  searchString = `${
    searchString
      ? options?.prefixQuestionMark
        ? `?${searchString}`
        : searchString
      : ""
  }`;
  return searchString;
};

export const getSearchQuery = (
  string: string,
  options?: queryString.ParseOptions
): queryString.ParsedQuery<string> => {
  if (string.startsWith("?")) string = string.substring(1);
  let searchObject: any = queryString.parse(string, { ...options });
  searchObject = ignoreEmptyObject(searchObject);
  return searchObject;
};

export const getSearchStringWithUrl = (
  object: queryString.UrlObject,
  options?: queryString.StringifyOptions & { prefixQuestionMark?: boolean }
): string => {
  let url = queryString.stringifyUrl(object, {
    skipNull: true,
    skipEmptyString: true,
    ...options,
  });
  return url || "";
};

export const getSearchQueryFromUrl = (
  url: string,
  options?: queryString.StringifyOptions
): queryString.ParsedUrl => {
  let searchObject: any = queryString.parseUrl(url, {
    parseFragmentIdentifier: true,
    ...options,
  });
  searchObject = ignoreEmptyObject(searchObject);
  searchObject = {
    ...searchObject,
    query: ignoreEmptyObject(searchObject?.query),
    fragmentIdentifier: searchObject?.fragmentIdentifier,
  };
  return searchObject;
};

export const getCompleteUrl = (route: string) => {
  const baseurl = removeSlashAtLast(window.location.origin);
  if (route) {
    if (route.startsWith(baseurl)) return route;
    return `${baseurl}${route}`;
  }
  return route;
};

export const navigateToUrl = (url: string) => {
  window.location.href = url;
};

export const removeSlashAtLast = (route: string) => {
  if (route !== "/") {
    while (route.endsWith("/")) {
      route = route.slice(0, -1);
    }
  }
  return route;
};
