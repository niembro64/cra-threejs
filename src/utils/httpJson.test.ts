import { readJsonResponse } from './httpJson';

test('returns a valid JSON response', async () => {
  const response = new Response(JSON.stringify({ available: true }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

  await expect(readJsonResponse<{ available: boolean }>(response, 'Service unavailable.')).resolves.toEqual({
    available: true,
  });
});

test('replaces an HTML response with a useful service error', async () => {
  const response = new Response('<!doctype html><title>Bad Request</title>', {
    status: 400,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });

  await expect(readJsonResponse(response, 'Service unavailable.')).rejects.toThrow('Service unavailable.');
});

test('replaces malformed JSON with a useful service error', async () => {
  const response = new Response('{invalid', {
    headers: { 'Content-Type': 'application/json' },
  });

  await expect(readJsonResponse(response, 'Service unavailable.')).rejects.toThrow('Service unavailable.');
});
