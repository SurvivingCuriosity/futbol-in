// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req: NextRequest) {

//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   const { pathname } = req.nextUrl;


//   if (pathname.startsWith('/protected') || pathname.startsWith('/api/protected')) {
//     if (!token) {
//       // Si es una ruta API, devolvemos un error 401
//       if (pathname.startsWith('/api/')) {
//         return new NextResponse(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
//       }
//       const loginUrl = req.nextUrl.clone();
//       loginUrl.pathname = '/login';
//       return NextResponse.redirect(loginUrl);
//     }
//   }

//   if (pathname.startsWith('/admin')) {
//     if (!token || token.role !== 'admin') {
//       const unauthorizedUrl = req.nextUrl.clone();
//       unauthorizedUrl.pathname = '/unauthorized';
//       return NextResponse.redirect(unauthorizedUrl);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/protected/:path*',
//     '/admin/:path*',
//     '/api/protected/:path*',
//     '/api/admin/:path*'
//   ],
// };
