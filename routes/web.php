<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Landing');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Subscriptions
    Route::get('/subscriptions', [SubscriptionController::class, 'index'])->name('subscriptions.index');
    Route::get('/subscriptions/create', [SubscriptionController::class, 'create'])->name('subscriptions.create');
    Route::post('/subscriptions', [SubscriptionController::class, 'store'])->name('subscriptions.store');
    Route::get('/subscriptions/{subscription}', [SubscriptionController::class, 'show'])->name('subscriptions.show');
    Route::post('/subscriptions/{subscription}/invite', [SubscriptionController::class, 'invite'])->name('subscriptions.invite');

    // Checkout
    Route::get('/subscriptions/{subscription}/members/{member}/checkout', [PaymentController::class, 'checkout'])->name('payments.checkout');
});

// Public join via token
Route::get('/join/{token}', [SubscriptionController::class, 'publicJoin'])->name('join.subscription');
Route::post('/join/{token}', [SubscriptionController::class, 'confirmJoin'])->name('join.subscription.confirm');

require __DIR__.'/auth.php';

// Minimal webhook endpoint (Airwallex sandbox-ready). Switch to API route if preferred.
Route::post('/webhooks/airwallex', function (Request $request) {
    // TODO: verify signature against config('services.airwallex.webhook_secret')
    // Accept event and return 200 to sandbox
    return response()->json(['received' => true]);
})->name('webhooks.airwallex');
