import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/dist/server/web/spec-extension/request';

export default function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon|icon|logo|browserconfig|sitemap|robots|manifest).*)'],
};
