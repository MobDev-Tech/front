import { ApiError, api } from './api';

export type Residence = {
  id: number;
  address: string;
  complement: string | null;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  geofenceActive: boolean;
};

export type ResidenceInput = Omit<Residence, 'id'>;

export type GeofenceStatus = {
  insidePerimeter: boolean;
  distanceFromHomeMeters: number;
  allowedRadiusMeters: number;
  statusMessage: string;
};

/** Busca a residência; retorna null quando ela ainda não foi cadastrada. */
export async function getResidence(): Promise<Residence | null> {
  try {
    return await api.get<Residence>('/api/v1/residence');
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

/** Salva os dados da residência na API. */
export function saveResidence(residence: ResidenceInput) {
  return api.post<Residence>('/api/v1/residence', residence);
}

/** Consulta à API a situação do aparelho em relação ao perímetro residencial. */
export function checkGeofence(latitude: number, longitude: number) {
  return api.post<GeofenceStatus>('/api/v1/residence/check-geofence', {
    currentLatitude: latitude,
    currentLongitude: longitude,
  });
}
