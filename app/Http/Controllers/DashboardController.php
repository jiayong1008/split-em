<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use App\Models\Payment;
use App\Models\Subscription;
use App\Models\SubscriptionMember;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();

        $activeCount = Subscription::where('user_id', $user->id)
            ->where('status', '!=', 'archived')
            ->count();

        $membersJoined = SubscriptionMember::whereHas('subscription', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->whereIn('status', ['joined', 'paid'])
            ->count();

        $pendingInvites = Invitation::whereHas('subscription', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->where('status', 'pending')
            ->count();

        $monthlyIntake = Payment::whereHas('subscription', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->where('created_at', '>=', now()->subDays(30))
            ->sum('amount');

        return Inertia::render('Dashboard', [
            'kpi' => [
                'activeCount' => $activeCount,
                'membersJoined' => $membersJoined,
                'pendingInvites' => $pendingInvites,
                'monthlyIntake' => (float) $monthlyIntake,
            ],
        ]);
    }
}


