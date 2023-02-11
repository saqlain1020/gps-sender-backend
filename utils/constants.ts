export const LOCATION_UPDATE_RATE_SECONDS = Number(process.env.LOCATION_UPDATE_RATE_SECONDS);
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const JWT_WEB_SECRET = process.env.JWT_WEB_SECRET;
export const RESET_TOKEN_EXPIRES_IN_MINS = Number(process.env.RESET_TOKEN_EXPIRES_IN_MINS);
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD as string;
export const MONGO_STRING = process.env.MONGO_STRING as string;
export const PORT = process.env.PORT as string;
export const SOCKET_SERVER_PORT = process.env.SOCKET_SERVER_PORT as string;
export const COOKIE_EXPIRES_IN = process.env.COOKIE_EXPIRES_IN as string;