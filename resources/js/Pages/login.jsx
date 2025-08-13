import { GalleryVerticalEnd } from "lucide-react"
import { Head, Link, useForm } from '@inertiajs/react';
import { LoginForm } from "@/components/login-form"

export default function LoginPage({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('login'), { onFinish: () => reset('password') });
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <Head title="Log in" />
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Split'em
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {status ? (
              <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
            ) : null}
            <LoginForm onSubmit={handleSubmit} onChange={(e) => {
              const target = e.target;
              if (target.name === 'email') setData('email', target.value);
              if (target.name === 'password') setData('password', target.value);
            }} />
            {(errors.email || errors.password) ? (
              <div className="mt-3 space-y-1">
                {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
                {errors.password ? <p className="text-sm text-destructive">{errors.password}</p> : null}
              </div>
            ) : null}
            <div className="mt-4 text-center text-sm">
              {canResetPassword ? (
                <Link href={route('password.request')} className="underline underline-offset-4">
                  Forgot your password?
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block overflow-hidden bg-[#0b0f1a]">
        <div className="absolute inset-0">
          <div className="absolute -left-40 top-10 h-[70vh] w-[70vh] blur-[120px] opacity-80 animate-aurora bg-[radial-gradient(closest-side,rgba(124,58,237,0.65),transparent_70%)]" />
          <div className="absolute right-[-20%] top-1/4 h-[65vh] w-[65vh] blur-[120px] opacity-80 animate-aurora bg-[radial-gradient(closest-side,rgba(6,182,212,0.55),transparent_70%)]" />
          <div className="absolute -right-20 bottom-[-10%] h-[80vh] w-[80vh] blur-[120px] opacity-80 animate-aurora bg-[radial-gradient(closest-side,rgba(37,99,235,0.6),transparent_75%)]" />
          <div className="absolute left-1/4 top-1/3 h-[40vh] w-[40vh] blur-[100px] opacity-70 animate-aurora bg-[radial-gradient(closest-side,rgba(168,85,247,0.45),transparent_70%)]" />

          {/* Centered wallet mark (above overlays) */}
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <img
              src="/images/wallet.svg"
              alt="Wallet"
              className="pointer-events-none select-none h-[22rem] lg:h-[28rem] w-auto opacity-100 drop-shadow-[0_16px_40px_rgba(0,0,0,0.45)] animate-float"
            />
          </div>
        </div>
        {/* soften (very light) vignette, placed under the wallet via z-index */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/0 to-black/20" />
      </div>
    </div>
  );
}
