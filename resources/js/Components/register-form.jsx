import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from '@inertiajs/react'

export function RegisterForm({ className, onSubmit, onChange, errors = {}, processing = false }) {
  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={onSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Start splitting subscriptions in seconds
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" placeholder="Your name" onChange={onChange} required />
          {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" onChange={onChange} required />
          {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" onChange={onChange} required />
          {errors.password ? <p className="text-sm text-destructive">{errors.password}</p> : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password_confirmation">Confirm password</Label>
          <Input id="password_confirmation" name="password_confirmation" type="password" onChange={onChange} required />
          {errors.password_confirmation ? <p className="text-sm text-destructive">{errors.password_confirmation}</p> : null}
        </div>

        <Button type="submit" className="w-full" disabled={processing}>
          Create account
        </Button>
      </div>

      <div
        className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>

      <Button variant="outline" className="w-full">
        <img src="/images/google.svg" alt="Google" className="h-4 w-4" />
        Sign up with Google
      </Button>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link href={route('login')} className="underline underline-offset-4">Log in</Link>
      </div>
    </form>
  );
}


