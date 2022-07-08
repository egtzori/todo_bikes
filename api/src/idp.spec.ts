import {idp} from './idp';
import jwt from 'jsonwebtoken';
import secret from './secret';

describe('test idp and twofactor', () => {
  it('should return 400 for bad code', async () => {
    const badRequest = {
      body: {
        challenge: 123,
        code: 123,
      }
    };
    let response  = { } as any;
    response.status = jest.fn().mockReturnValue(response);
    response.send = jest.fn().mockReturnValue(response);

    idp(badRequest as any, response);
    expect(response.status).toBeCalledWith(400);
  });

  it('should return valid JWT when valid code is supplied', async () => {
    const goodRequest = {
      body: {
        challenge: 123,
        code: 1123,
      }
    };
    let response  = { } as any;
    response.status = jest.fn().mockReturnValue(response);
    response.send = jest.fn().mockReturnValue(response);

    idp(goodRequest as any, response);
    expect(response.status).toBeCalledWith(200);
    
    const encodedToken = response.send.mock.calls[0][0];

    const token = jwt.verify(encodedToken as string, secret);
    expect(token).toEqual(
      expect.objectContaining({
        "user": "admin"
      })
    )
  });

});
