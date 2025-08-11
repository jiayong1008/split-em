<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'subscription_id',
        'subscription_member_id',
        'user_id',
        'amount',
        'currency',
        'status',
        'provider',
        'provider_payment_id',
        'metadata',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'metadata' => 'array',
    ];

    public function subscription(): BelongsTo
    {
        return $this->belongsTo(Subscription::class);
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(SubscriptionMember::class, 'subscription_member_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}


