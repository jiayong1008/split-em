import { GalleryVerticalEnd } from "lucide-react"
import { Head, useForm, Link } from '@inertiajs/react'
import { RegisterForm } from '@/components/register-form'

export default function RegisterPage({ status }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  function handleSubmit(e) {
    e.preventDefault()
    post(route('register'), { onFinish: () => reset('password', 'password_confirmation') })
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-[3fr_2fr]">
      <Head title="Sign up" />

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

            <RegisterForm
              onSubmit={handleSubmit}
              onChange={(e) => {
                const t = e.target
                if (t.name) setData(t.name, t.value)
              }}
              errors={errors}
              processing={processing}
            />
          </div>
        </div>
      </div>

      {/* reuse the same aurora panel as login */}
      <div className="relative hidden lg:block overflow-hidden bg-[#0b0f1a]">
        <div className="absolute inset-0">
          <div className="absolute -left-40 top-10 h-[70vh] w-[70vh] blur-[120px] opacity-80 animate-aurora bg-[radial-gradient(closest-side,rgba(124,58,237,0.65),transparent_70%)]" />
          <div className="absolute right-[-20%] top-1/4 h-[65vh] w-[65vh] blur-[120px] opacity-80 animate-aurora bg-[radial-gradient(closest-side,rgba(6,182,212,0.55),transparent_70%)]" />
          <div className="absolute -right-20 bottom-[-10%] h-[80vh] w-[80vh] blur-[120px] opacity-80 animate-aurora bg-[radial-gradient(closest-side,rgba(37,99,235,0.6),transparent_75%)]" />
          <div className="absolute left-1/4 top-1/3 h-[40vh] w-[40vh] blur-[100px] opacity-70 animate-aurora bg-[radial-gradient(closest-side,rgba(168,85,247,0.45),transparent_70%)]" />
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <img src="/images/wallet.svg" alt="Wallet" className="pointer-events-none select-none h-[22rem] lg:h-[28rem] w-auto opacity-100 drop-shadow-[0_16px_40px_rgba(0,0,0,0.45)] animate-float" />
          </div>
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/0 to-black/20" />
      </div>
    </div>
  )
}


