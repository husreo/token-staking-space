export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function hasSpace(str: string) {
  return /\s/.test(str);
}

export const shortAddress = (address?: string, start = 6, end = -4): string => {
  if (!!address) return `${address.slice(0, start)}...${address.slice(end)}`;

  return "";
};

export const addLeadingZero = (n: number) => {
  if (typeof n !== "number") {
    return n;
  }
  if (n < 0) return n;
  if (n >= 10) return n;
  return "0" + n;
};

export const detectLoginType = (input?: string) => {
  if (!input) return;
  // Regular expression to check if the input is an email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // If the input matches the email pattern, assume it's an email
  if (emailRegex.test(input)) {
    return "email";
  } else {
    // Otherwise, assume it's a username
    return "username";
  }
};

export const formatStats = ({
  n,
  notation = "standard",
}: {
  n: number;
  notation?: "standard" | "scientific" | "engineering" | "compact";
}) => {
  if (typeof n === "number" && !isNaN(n))
    return Intl.NumberFormat("en", {
      notation,
    }).format(n);

  return 0;
};

export const addReqParams = (
  url: string,
  params: Iterable<[string, string]>,
) => {
  const reqURL = new URL(url);
  const reqSearchParams = reqURL.searchParams;
  for (const [key, value] of params) {
    reqSearchParams.append(key, value);
  }
  console.log(reqURL.href);
  return reqURL.href;
};

//console.log error with red text
export const consoleError = (message: string) => {
  console.log(`%c${message}`, "color: red");
};
