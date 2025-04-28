import { Request } from 'express';
import { Session, SessionData } from 'express-session';

type UserSessionData = {
  user?: {
    id: string;
    username: string;
    role: string;
  };
};

export type RequestWithSession = Request & {
  session?: (Session & Partial<SessionData> & UserSessionData) | undefined;
};

export type Error = { message: string };
