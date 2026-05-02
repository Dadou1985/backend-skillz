import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../app.ts';

vi.mock('../../services/hotel/hotel.services.ts', () => ({
  getHotelsService:    vi.fn(),
  getHotelByIdService: vi.fn(),
  createHotelService:  vi.fn(),
  updateHotelService:  vi.fn(),
  deleteHotelService:  vi.fn(),
}));

import {
  getHotelsService,
  getHotelByIdService,
  createHotelService,
  updateHotelService,
  deleteHotelService,
} from '../../services/hotel/hotel.services.ts';

const BASE = '/api/v1/hotel';

const mockHotel = {
  id: 'clxxxxxxxxxxxxxxxxxxxxxx01',
  hotelName: 'Hotel Test',
  adresse: '1 rue de la Paix',
  city: 'Paris',
  classement: '4',
  code_postal: '75001',
  country: 'France',
  departement: '75',
  region: 'Île-de-France',
  lat: 48.8566,
  lng: 2.3522,
  mail: 'contact@hotel-test.fr',
  partnership: true,
  phone: '0123456789',
  room: 50,
  website: 'https://hotel-test.fr',
  appLink: 'https://app.hotel-test.fr',
  base64Url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA', // truncated for brevity
  logo: 'https://hotel-test.fr/logo.png',
  pricingModel: 'standard',
};

const validHotelBody = {
  hotelName: 'Hotel Test',
  adresse: '1 rue de la Paix',
  city: 'Paris',
  classement: '4',
  code_postal: '75001',
  country: 'France',
  departement: '75',
  region: 'Île-de-France',
  lat: 48.8566,
  lng: 2.3522,
  mail: 'contact@hotel-test.fr',
  partnership: true,
  phone: '0123456789',
  room: 50,
  website: 'https://hotel-test.fr',
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/v1/hotel', () => {
  it('returns 200 with a list of hotels', async () => {
    vi.mocked(getHotelsService).mockResolvedValue([mockHotel]);

    const res = await request(app).get(BASE);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([mockHotel]);
    expect(getHotelsService).toHaveBeenCalledOnce();
  });

  it('returns 500 when the service throws', async () => {
    vi.mocked(getHotelsService).mockRejectedValue(new Error('DB error'));

    const res = await request(app).get(BASE);

    expect(res.status).toBe(500);
  });
});

describe('GET /api/v1/hotel/:id', () => {
  it('returns 200 with the hotel', async () => {
    vi.mocked(getHotelByIdService).mockResolvedValue(mockHotel);

    const res = await request(app).get(`${BASE}/clxxxxxxxxxxxxxxxxxxxxxx01`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockHotel);
  });

  it('returns 404 when hotel is not found', async () => {
    vi.mocked(getHotelByIdService).mockResolvedValue(null);

    const res = await request(app).get(`${BASE}/nonexistent-id`);

    expect(res.status).toBe(404);
  });
});

describe('POST /api/v1/hotel', () => {
  it('returns 201 when body is valid', async () => {
    vi.mocked(createHotelService).mockResolvedValue(mockHotel);

    const res = await request(app).post(BASE).send(validHotelBody);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockHotel);
    expect(createHotelService).toHaveBeenCalledWith(validHotelBody);
  });

  it('returns 400 when body is missing required fields', async () => {
    const res = await request(app).post(BASE).send({ hotelName: 'Only name' });

    expect(res.status).toBe(400);
    expect(createHotelService).not.toHaveBeenCalled();
  });
});

describe('PATCH /api/v1/hotel/:id', () => {
  it('returns 200 with updated hotel', async () => {
    const updated = { ...mockHotel, hotelName: 'Updated Name' };
    vi.mocked(updateHotelService).mockResolvedValue(updated);

    const res = await request(app)
      .patch(`${BASE}/clxxxxxxxxxxxxxxxxxxxxxx01`)
      .send({ ...validHotelBody, hotelName: 'Updated Name' });

    expect(res.status).toBe(200);
    expect(res.body.hotelName).toBe('Updated Name');
  });

  it('returns 400 when body is invalid', async () => {
    const res = await request(app)
      .patch(`${BASE}/clxxxxxxxxxxxxxxxxxxxxxx01`)
      .send({ hotelName: 123 });

    expect(res.status).toBe(400);
    expect(updateHotelService).not.toHaveBeenCalled();
  });
});

describe('DELETE /api/v1/hotel/:id', () => {
  it('returns 204 on successful deletion', async () => {
    vi.mocked(deleteHotelService).mockResolvedValue(mockHotel);

    const res = await request(app).delete(`${BASE}/clxxxxxxxxxxxxxxxxxxxxxx01`);

    expect(res.status).toBe(204);
    expect(deleteHotelService).toHaveBeenCalledWith('clxxxxxxxxxxxxxxxxxxxxxx01');
  });
});
