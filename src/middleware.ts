import type { NextRequest } from 'next/dist/server/web/spec-extension/request';

import { NextResponse } from 'next/server';

export default function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon|icon|logo|browserconfig|sitemap|robots|manifest).*)'],
};
