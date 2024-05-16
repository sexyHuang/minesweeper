export { default } from 'next-auth/middleware';

export const config = { matcher: ['/userInfo', '/api/user/(.*)'] };
