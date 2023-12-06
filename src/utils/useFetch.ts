import logger from "../libs/configs/logger";

export default async function useFetch<T>(
  url: string,
  method: string = "GET",
  auth: string = ""
): Promise<T | null> {
  try {
    const response = await fetch(url, {
      method,
      headers: { Accept: "application/json", Authorization: auth },
    });
    const result: Awaited<T> = await response.json();

    return result;
  } catch (err) {
    logger.error(err);
    return null;
  }
}
