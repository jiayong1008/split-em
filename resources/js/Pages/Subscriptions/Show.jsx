import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { QRCodeCanvas } from 'qrcode.react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CopyIcon, UsersIcon, CreditCardIcon, MailIcon } from 'lucide-react';

export default function Show({ auth, subscription, joinUrl }) {
  const { data, setData, post, processing, errors } = useForm({ emails: [''] });

  const addEmail = () => setData('emails', [...data.emails, '']);
  const removeEmail = (idx) => setData('emails', data.emails.filter((_, i) => i !== idx));
  const updateEmail = (idx, value) => setData('emails', data.emails.map((e, i) => (i === idx ? value : e)));
  const submit = (e) => {
    e.preventDefault();
    post(route('subscriptions.invite', subscription.id));
  };

  const perMember = (Number(subscription.monthly_price) / Math.max(1, subscription.total_slots)).toFixed(2);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title={subscription.name} />
      <div className="mx-auto max-w-6xl px-4 py-6 lg:px-6">
        {/* Header card */}
        <Card className="mb-6">
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{subscription.name}</CardTitle>
              <CardDescription className="mt-1 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1"><CreditCardIcon className="size-4" /> MYR {subscription.monthly_price}/mo</span>
                <span className="inline-flex items-center gap-1"><UsersIcon className="size-4" /> {subscription.members.length} / {subscription.total_slots} joined</span>
                <span className="inline-flex items-center gap-1"><CreditCardIcon className="size-4" /> MYR {perMember} per member</span>
              </CardDescription>
            </div>
            <Badge variant="outline" className="capitalize">{subscription.status}</Badge>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Invite via link / QR */}
          <Card className="transition duration-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Invite via link / QR</CardTitle>
              <CardDescription>Share the join link or QR code with people you trust.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input readOnly value={joinUrl} className="flex-1" />
                <Button type="button" onClick={() => navigator.clipboard.writeText(joinUrl)} variant="secondary" className="shrink-0">
                  <CopyIcon className="mr-1 size-4" /> Copy
                </Button>
              </div>
              <div className="flex items-center justify-center py-2">
                <QRCodeCanvas value={joinUrl} size={160} />
              </div>
            </CardContent>
          </Card>

          {/* Invite by email */}
          <Card className="transition duration-200 hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Invite by email</CardTitle>
              <CardDescription>We’ll send an email with your join link.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-3">
                {data.emails.map((email, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-full">
                      <Label htmlFor={`email-${idx}`} className="sr-only">Email</Label>
                      <Input id={`email-${idx}`} type="email" placeholder="friend@example.com" value={email} onChange={(e) => updateEmail(idx, e.target.value)} />
                    </div>
                    {data.emails.length > 1 && (
                      <Button type="button" variant="outline" onClick={() => removeEmail(idx)} className="shrink-0">Remove</Button>
                    )}
                  </div>
                ))}
                {errors.emails && <div className="text-sm text-destructive">{errors.emails}</div>}
              </form>
            </CardContent>
            <CardFooter className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={addEmail}>Add email</Button>
              <Button onClick={submit} disabled={processing}><MailIcon className="mr-1 size-4" /> Send invites</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Members */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Members</CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {subscription.members.length === 0 && (
              <div className="py-2 text-sm text-muted-foreground">No members yet.</div>
            )}
            {subscription.members.map((m) => (
              <div key={m.id} className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium">{m.email}</div>
                  <div className="text-xs text-muted-foreground capitalize">{m.status}</div>
                </div>
                {(m.status === 'joined' || m.status === 'invited') && (
                  <Button asChild>
                    <Link href={route('payments.checkout', [subscription.id, m.id])}>Pay {perMember}</Link>
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}



