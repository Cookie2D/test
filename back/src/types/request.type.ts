export interface IRequest extends Request {
  user: {
    sub: number;
    role: string;
  };
}
