<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\SMTP;
  use PHPMailer\PHPMailer\Exception;

  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/SMTP.php';
  require 'phpmailer/src/PHPMailer.php';

  function configureMailer($config) {
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->IsHTML(true);

    // SMTP Authentication
    $mail->isSMTP();                              // Send using SMTP
    $mail->SMTPAuth   = true;                     // Enable SMTP authentication
    $mail->Host       = $config['smtp_host'];     // Set the SMTP server to send through
    $mail->Username   = $config['smtp_username']; // SMTP username
    $mail->Password   = $config['smtp_password']; // SMTP password
    $mail->SMTPSecure = 'ssl';                    // Enable implicit TLS encryption
    $mail->Port       = 465;                      // TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    // Set sender email
    $mail->setFrom($config['smtp_username'], $config['sender_name']);

    // Adding receivers addresses
    $receivers = $config['receivers'];
    for ($i = 0; $i < count($receivers); $i++) {
        $mail->addAddress($receivers[$i]);
    }

    // Subject
    $mail->Subject = $config['subject'];

    return $mail;
  }

  function sendEmail($mail, $message) {
    $mail->Body = $message;

    // Sending
    if (!$mail->send()) {
        $response = ['message' => 'Server connection problem, please try again later.'];
    } else {
        $response = ['message' => 'Request sent!'];
    }

    return $response;
  }

  function sanitizeInput($input) {
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return $input;
  }
?>
