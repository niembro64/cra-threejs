export const readJsonResponse = async <Payload>(response: Response, fallbackMessage: string): Promise<Payload> => {
  const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';

  if (!contentType.includes('application/json')) {
    throw new Error(fallbackMessage);
  }

  try {
    return (await response.json()) as Payload;
  } catch {
    throw new Error(fallbackMessage);
  }
};
