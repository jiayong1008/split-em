<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Join Subscription</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif; }
        .btn { background:#4f46e5;color:#fff;padding:10px 14px;border-radius:8px;text-decoration:none;display:inline-block }
    </style>
    </head>
<body>
    <h2>You're invited to join {{ $invitation->subscription->name }}</h2>
    <p>Click the button below to join and pay your share.</p>
    <p><a class="btn" href="{{ $joinUrl }}">Join now</a></p>
    <p>Or copy this link: {{ $joinUrl }}</p>
</body>
</html>



