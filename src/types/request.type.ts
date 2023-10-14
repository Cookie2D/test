export interface IRequest extends Request {
  user: {
    sub: number;
    email: string;
  };
}
