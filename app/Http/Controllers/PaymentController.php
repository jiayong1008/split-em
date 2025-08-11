<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Subscription;
use App\Models\SubscriptionMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function checkout(Request $request, Subscription $subscription, SubscriptionMember $member): Response
    {
        if ($subscription->user_id !== $request->user()->id && $member->email !== $request->user()->email) {
            abort(403);
        }

        // Create a pending payment record. Airwallex intent will be created on frontend via API call.
        $payment = Payment::create([
            'subscription_id' => $subscription->id,
            'subscription_member_id' => $member->id,
            'user_id' => $request->user()?->id,
            'amount' => round($subscription->monthly_price / max(1, $subscription->total_slots), 2),
            'currency' => 'MYR',
            'status' => 'pending',
            'provider' => 'airwallex',
        ]);

        return Inertia::render('Payments/Checkout', [
            'subscription' => $subscription,
            'member' => $member,
            'payment' => $payment,
            'airwallex' => [
                'publicKey' => config('services.airwallex.public_key'),
                'region' => config('services.airwallex.region', 'ap-sg'),
            ],
        ]);
    }

    public function webhook(Request $request): RedirectResponse
    {
        // TODO: verify Airwallex signature and update payment status accordingly
        return redirect()->route('dashboard');
    }
}


