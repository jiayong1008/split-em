<?php

namespace App\Http\Controllers;

use App\Mail\InvitationMail;
use App\Models\Invitation;
use App\Models\Payment;
use App\Models\Subscription;
use App\Models\SubscriptionMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SubscriptionController extends Controller
{
    public function index(Request $request): Response
    {
        $subscriptions = Subscription::withCount(['members' => function ($q) {
            $q->whereIn('status', ['joined', 'paid']);
        }])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return Inertia::render('Subscriptions/Index', [
            'subscriptions' => $subscriptions,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Subscriptions/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string', 'max:500'],
            'monthly_price' => ['required', 'numeric', 'min:1'],
            'total_slots' => ['required', 'integer', 'min:2', 'max:10'],
        ]);

        $subscription = Subscription::create([
            ...$validated,
            'user_id' => $request->user()->id,
            'join_token' => Str::ulid(),
            'status' => 'draft',
        ]);

        return redirect()->route('subscriptions.show', $subscription);
    }

    public function show(Request $request, Subscription $subscription): Response
    {
        if ($subscription->user_id !== $request->user()->id) {
            abort(403);
        }

        $subscription->load(['members', 'invitations']);

        return Inertia::render('Subscriptions/Show', [
            'subscription' => $subscription,
            'joinUrl' => route('join.subscription', $subscription->join_token),
        ]);
    }

    public function invite(Request $request, Subscription $subscription): RedirectResponse
    {
        if ($subscription->user_id !== $request->user()->id) {
            abort(403);
        }

        $data = $request->validate([
            'emails' => ['required', 'array', 'min:1'],
            'emails.*' => ['email'],
        ]);

        foreach ($data['emails'] as $email) {
            $member = SubscriptionMember::firstOrCreate(
                ['subscription_id' => $subscription->id, 'email' => $email],
                ['status' => 'invited']
            );

            $invitation = Invitation::updateOrCreate(
                ['subscription_id' => $subscription->id, 'email' => $email],
                [
                    'token' => Str::uuid(),
                    'status' => 'pending',
                    'expires_at' => now()->addDays(7),
                ]
            );

            // Send email (queued if configured)
            try {
                $joinUrl = route('join.subscription', $subscription->join_token);
                \Mail::to($email)->send(new InvitationMail($invitation, $joinUrl));
            } catch (\Throwable $e) {
                // swallow for MVP
            }
        }

        return back()->with('success', 'Invitations sent');
    }

    public function publicJoin(Request $request, string $token): Response
    {
        $subscription = Subscription::where('join_token', $token)->firstOrFail();
        $subscription->loadCount(['members' => function ($q) {
            $q->whereIn('status', ['joined', 'paid']);
        }]);

        return Inertia::render('Subscriptions/Join', [
            'subscription' => $subscription,
        ]);
    }

    public function confirmJoin(Request $request, string $token): RedirectResponse
    {
        $subscription = Subscription::where('join_token', $token)->firstOrFail();
        $data = $request->validate([
            'email' => ['required', 'email'],
        ]);

        $member = SubscriptionMember::updateOrCreate(
            ['subscription_id' => $subscription->id, 'email' => $data['email']],
            ['status' => 'joined', 'user_id' => $request->user()?->id, 'joined_at' => now()]
        );

        return redirect()->route('payments.checkout', [$subscription, $member]);
    }
}


