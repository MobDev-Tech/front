import { Platform } from 'react-native';

import { getDeviceId } from './device-id';

const defaultApiUrl = Platform.OS === 'web' ? 'http://localhost:8080' : 'http://10.0.2.2:8080';
const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? defaultApiUrl).replace(/\/$/, '');

export type ApiErrorPayload = {
  status?: number;
  message?: string;
  errors?: Record<string, string>;
};

/** Representa um erro da API com o status HTTP e os detalhes recebidos. */
export class ApiError extends Error {
  /** Cria o erro com a mensagem e os dados disponíveis da resposta. */
  constructor(
    message: string,
    public readonly status?: number,
    public readonly details?: Record<string, string>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

/** Envia uma solicitação à API e transforma respostas HTTP inválidas em ApiError. */
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const deviceId = await getDeviceId();
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  headers.set('X-Device-ID', deviceId);

  let body: BodyInit | undefined;
  if (options.body !== undefined) {
    headers.set('Content-Type', 'application/json');
    body = JSON.stringify(options.body);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      body,
      signal: controller.signal,
    });
  } catch (error) {
    if (controller.signal.aborted)
      throw new ApiError('A API demorou para responder. Tente novamente.');
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  const contentType = response.headers.get('content-type') ?? '';
  const payload = contentType.includes('application/json')
    ? ((await response.json()) as ApiErrorPayload | T)
    : undefined;

  if (!response.ok) {
    const errorPayload = payload as ApiErrorPayload | undefined;
    throw new ApiError(
      errorPayload?.message ?? `Não foi possível concluir a operação (${response.status}).`,
      response.status,
      errorPayload?.errors,
    );
  }

  return payload as T;
}

/** Reúne métodos HTTP tipados para os serviços do aplicativo. */
export const api = {
  /** Busca dados na API. */
  get: <T>(path: string) => apiRequest<T>(path),
  /** Cria um recurso na API. */
  post: <T>(path: string, body: unknown) => apiRequest<T>(path, { method: 'POST', body }),
  /** Substitui um recurso na API. */
  put: <T>(path: string, body: unknown) => apiRequest<T>(path, { method: 'PUT', body }),
  /** Atualiza parcialmente um recurso na API. */
  patch: <T>(path: string, body?: unknown) => apiRequest<T>(path, { method: 'PATCH', body }),
  /** Exclui um recurso na API. */
  delete: <T>(path: string) => apiRequest<T>(path, { method: 'DELETE' }),
};

export { API_URL };
