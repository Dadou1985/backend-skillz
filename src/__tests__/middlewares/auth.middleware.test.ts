import { describe, it, expect, vi } from 'vitest';
import { authMiddleware } from '../../middlewares/auth/auth.middleware.ts';
import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../../middlewares/auth/auth.middleware.ts';

vi.mock('../../utils/jwt/verifyToken.ts', () => ({
  verifyToken: vi.fn(),
}));

import { verifyToken } from '../../utils/jwt/verifyToken.ts';

function makeReqResMock(headers: Record<string, string> = {}) {
  const req = { headers } as unknown as AuthRequest;
  const res = {} as Response;
  const next = vi.fn() as NextFunction;
  return { req, res, next };
}

describe('authMiddleware', () => {
  it('calls next with AUTH_HEADER_MISSING when no authorization header', () => {
    const { req, res, next } = makeReqResMock();

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'AUTH_HEADER_MISSING' })
    );
  });

  it('calls next with AUTH_HEADER_MISSING when header does not start with Bearer', () => {
    const { req, res, next } = makeReqResMock({ authorization: 'Basic abc' });

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'AUTH_HEADER_MISSING' })
    );
  });

  it('attaches userId and calls next() on valid token', () => {
    vi.mocked(verifyToken).mockReturnValue({ userId: 'user-123' });
    const { req, res, next } = makeReqResMock({ authorization: 'Bearer valid.token.here' });

    authMiddleware(req, res, next);

    expect(req.userId).toBe('user-123');
    expect(next).toHaveBeenCalledWith();
  });

  it('calls next with INVALID_TOKEN when verifyToken throws', () => {
    vi.mocked(verifyToken).mockImplementation(() => { throw new Error('expired'); });
    const { req, res, next } = makeReqResMock({ authorization: 'Bearer bad.token' });

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({ code: 'INVALID_TOKEN' })
    );
  });
});
