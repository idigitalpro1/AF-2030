import { allowlistSummary } from "@/lib/auth-allowlist";
import { signIn } from "@/auth";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
};

function errorMessage(code?: string) {
  switch (code) {
    case "AccessDenied":
      return `Access denied. Sign in with an allowed Google account (${allowlistSummary()}).`;
    case "OAuthAccountNotLinked":
      return "This email is already linked to another sign-in method.";
    case "Configuration":
      return "Auth is not configured yet. Set AUTH_SECRET and Google OAuth credentials.";
    default:
      return code
        ? "Sign-in failed. Try again or use an allowed Google account."
        : null;
  }
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const message = errorMessage(params.error);
  const callbackUrl = params.callbackUrl ?? "/dev/";

  return (
    <div className="login-frame">
      <section className="login-card">
        <p className="eyebrow">idigitalpro.com</p>
        <h1 className="login-card__title">
          Shop Desk <em>sign in</em>
        </h1>
        <p className="login-card__lede">
          Continue with Google using your CoPress / Villager Publishing account.
        </p>

        <ul className="login-card__allowlist">
          <li>@idigitalpro.com</li>
          <li>@villagerpublishing.com</li>
          <li>@idigitalprogmail.com</li>
          <li>denverwebguy@gmail.com</li>
        </ul>

        {message ? (
          <p className="login-card__error" role="alert">
            {message}
          </p>
        ) : null}

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: callbackUrl });
          }}
        >
          <button type="submit" className="btn btn--google btn--wide">
            <GoogleMark />
            Continue with Google
          </button>
        </form>

        <p className="login-card__foot">
          Protected routes on <strong>idigitalpro.com/dev</strong> require an
          allowed Google account.
        </p>
      </section>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden focusable="false">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.203 36 24 36c-5.522 0-10-4.478-10-10s4.478-10 10-10c2.523 0 4.817.943 6.571 2.486l5.657-5.657C34.046 10.845 29.268 8 24 8 14.059 8 6 16.059 6 26s8.059 18 18 18 18-8.059 18-18c0-1.214-.124-2.389-.389-3.517z"
      />
      <path
        fill="#FF3D00"
        d="M6 26c0-1.886.515-3.652 1.411-5.171l6.571 5.657C12.734 28.328 12 27.213 12 26s.734-2.328 1.982-3.486l-6.571-5.657A17.936 17.936 0 006 26z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c4.837 0 9.003-1.653 12.011-4.486l-5.657-5.657C28.817 35.943 26.523 36 24 36c-5.203 0-9.654-3.343-11.303-8H6.411C9.515 39.348 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a10.96 10.96 0 01-1.411 5.171l.001-.001 5.657 5.657C42.996 35.003 44 30.837 44 26c0-1.214-.124-2.389-.389-3.517-.001 0-.001.001 0 0z"
      />
    </svg>
  );
}
