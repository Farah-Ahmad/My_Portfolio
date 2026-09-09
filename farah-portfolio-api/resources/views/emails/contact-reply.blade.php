<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ $replySubject }}</title>
</head>

<body style="font-family: Arial, sans-serif; background:#f8fafc; padding:30px;">

    <div style="
        max-width:600px;
        margin:auto;
        background:white;
        padding:30px;
        border-radius:10px;
    ">

        <h2>Farah Ahmad</h2>

        <p style="color:#64748b;">
            Full Stack Web Developer
        </p>

        <hr>

        <p style="
            white-space:pre-line;
            line-height:1.7;
            color:#334155;
        ">{{ $replyMessage }}</p>

        <hr>

        <small style="color:#94a3b8;">
            Sent from Farah Ahmad Portfolio
        </small>

    </div>

</body>
</html>
