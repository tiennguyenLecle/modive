import { NextRequest, NextResponse } from 'next/server';

import { createServerSupabase } from '@/lib/supabase/factory.server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const kakaoError = searchParams.get('error');

  // If Kakao error or no code, redirect to login page
  if (kakaoError || !code) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('error', 'Authentication failed');
    return NextResponse.redirect(redirectUrl);
  }

  try {
    // ---- Step 1 & 2: Exchange code for token and get Kakao user info ----
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!,
        client_secret: process.env.KAKAO_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user/kakao-callback`,
        code: code,
      }),
    });
    const tokenData = await tokenResponse.json();
    if (tokenData.error)
      throw new Error(`Kakao token error: ${tokenData.error_description}`);

    const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const kakaoUser = await userResponse.json();
    if (!kakaoUser || !kakaoUser.id)
      throw new Error('Failed to fetch user info from Kakao.');

    // ---- Step 3: Handle email (keep the same) ----
    let email = kakaoUser.kakao_account.email;
    const kakaoId = kakaoUser.id;
    const nickname = kakaoUser.kakao_account.profile.nickname;
    const avatarUrl = kakaoUser.kakao_account.profile.thumbnail_image_url;

    if (!email) {
      email = `user_${kakaoId}@modive.com`;
    }

    // ---- Step 4: Find or create user ----
    // Initialize Supabase client for App Router (by default - use cookies from next/headers)
    const supabase = createServerSupabase('user', undefined, 'service');
    let { data, error: findUserError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .limit(1);

    if (!data || data.length === 0 || findUserError) {
      const {
        data: { user: newUser },
        error: createUserError,
      } = await supabase.auth.admin.createUser({
        email: email,
        user_metadata: {
          full_name: nickname,
          avatar_url: avatarUrl,
          provider: 'kakao',
          provider_id: kakaoId,
        },
      });
      if (createUserError) throw createUserError;
    }

    // ---- Step 5: Create session for user ----
    // `generateLink` does not return a token directly.
    // We need to create a magic link, extract the token from the link,
    // and then verify the token to get the session.
    const { data: linkData, error: linkError } =
      await supabase.auth.admin.generateLink({
        type: 'magiclink',
        email: email,
      });
    if (linkError) throw linkError;

    const otp = linkData.properties.email_otp;

    if (!otp) {
      throw new Error('Could not extract OTP from magic link response');
    }

    const { data: verifyData, error: verifyError } =
      await supabase.auth.verifyOtp({
        type: 'magiclink',
        email: email,
        token: otp,
      });

    if (verifyError) throw verifyError;
    if (!verifyData.session)
      throw new Error('Verification did not return a session');

    // Use token to set session. Client `supabase` is configured with cookieStore
    // so this operation will automatically set cookie for the response.
    await supabase.auth.setSession({
      access_token: verifyData.session.access_token,
      refresh_token: verifyData.session.refresh_token,
    });

    // ---- Step 6: Redirect to home page ----
    // Redirect to the root of the application
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Error in Kakao callback:', error);
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('error', 'An unexpected error occurred');
    return NextResponse.redirect(redirectUrl);
  }
}
