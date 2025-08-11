<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // host
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('monthly_price', 10, 2);
            $table->unsignedInteger('total_slots');
            $table->enum('status', ['draft', 'active', 'pending', 'cancelled'])->default('draft');
            $table->date('start_date')->nullable();
            $table->string('join_token')->unique();
            $table->timestamps();
        });

        Schema::create('subscription_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subscription_id')->constrained('subscriptions')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('email');
            $table->enum('status', ['invited', 'joined', 'paid', 'removed'])->default('invited');
            $table->timestamp('joined_at')->nullable();
            $table->timestamps();
            $table->unique(['subscription_id', 'email']);
        });

        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subscription_id')->constrained('subscriptions')->cascadeOnDelete();
            $table->string('email');
            $table->string('token')->unique();
            $table->enum('status', ['pending', 'accepted', 'expired'])->default('pending');
            $table->timestamp('expires_at')->nullable();
            $table->timestamp('accepted_at')->nullable();
            $table->timestamps();
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subscription_id')->constrained('subscriptions')->cascadeOnDelete();
            $table->foreignId('subscription_member_id')->nullable()->constrained('subscription_members')->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('MYR');
            $table->enum('status', ['pending', 'succeeded', 'failed'])->default('pending');
            $table->string('provider')->default('airwallex');
            $table->string('provider_payment_id')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
        Schema::dropIfExists('invitations');
        Schema::dropIfExists('subscription_members');
        Schema::dropIfExists('subscriptions');
    }
};


