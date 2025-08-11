<?php

namespace App\Mail;

use App\Models\Invitation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Invitation $invitation, public string $joinUrl)
    {
    }

    public function build(): self
    {
        return $this->subject("You're invited to join a subscription on Split'em")
            ->view('emails.invitation')
            ->with([
                'invitation' => $this->invitation,
                'joinUrl' => $this->joinUrl,
            ]);
    }
}


