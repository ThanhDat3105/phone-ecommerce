type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
};

class HttpError extends Error {
  status: number;
  payload: any;
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

const AUTHORIZATION_ERROR = 401;
export const isClient = () => typeof window !== "undefined";

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  option?: CustomOptions | undefined
) => {
  const body = option?.body ? JSON.stringify(option.body) : undefined;

  const baseHeader = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${option?.accessToken ?? ""}`,
    refreshToken: `${option?.refreshToken ?? ""}`,
  };

  const baseUrl =
    option?.baseUrl === undefined
      ? process.env.NEXT_PUBLIC_API_URL
      : option.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...option,
    headers: {
      ...baseHeader,
      ...option?.headers,
    },
    body,
    method,
  });

  const result = await res.json();

  if (result.statusCode === AUTHORIZATION_ERROR) {
    if (isClient()) {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          body: JSON.stringify({ force: true }),
        });
      } catch (error) {
        console.log(error);
      } finally {
        localStorage.removeItem("USER_INFO_KEY");
        location.href = "/sign_in";
      }
    }
  }

  if (result.statusCode >= 300) {
    return {
      status: res.status,
      payload: result,
    };
  }

  const payload: Response = result.content;

  const data = {
    status: res.status,
    payload,
  };
  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, { ...options });
  },

  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },

  put<Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },

  patch<Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PATCH", url, { ...options, body });
  },

  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
