import { NextRequest, NextResponse } from 'next/server';

// === CATCH-ALL API ROUTE ===
// This route handles all API requests that don't match any existing endpoints
// It ensures that non-existent API endpoints return proper JSON error responses
// instead of falling through to the page router's catch-all route

// === HTTP METHOD HANDLERS ===
// Each HTTP method needs its own handler function

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleNotFound(request, params.path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleNotFound(request, params.path);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleNotFound(request, params.path);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleNotFound(request, params.path);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleNotFound(request, params.path);
}

export async function HEAD(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleNotFound(request, params.path);
}

export async function OPTIONS(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleNotFound(request, params.path);
}

// === HELPER FUNCTION ===
// Creates consistent API 404 responses with detailed error information
function handleNotFound(request: NextRequest, path: string[]) {
  const requestedPath = `/api/${path.join('/')}`;
  const method = request.method;

  // Log for debugging in development environment
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[API_404] ${method} ${requestedPath} - Endpoint not found`);
  }

  // Return a structured JSON error response
  return NextResponse.json(
    {
      error: {
        message: 'API endpoint not found',
        code: 'ENDPOINT_NOT_FOUND',
        status: 404,
        details: {
          path: requestedPath,
          method: method,
          timestamp: new Date().toISOString(),
        },
      },
    },
    {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        // Add CORS headers if needed
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}
