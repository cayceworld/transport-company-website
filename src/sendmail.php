<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/SMTP.php';
	require 'phpmailer/src/PHPMailer.php';
	
	$config = include '../send-contact-form-config.php';

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

	// Adding receivers adresses
	$receivers = $config['receivers'];
	for ($i = 0; $i < count($receivers); $i++) {
		$mail->addAddress($receivers[$i]);
	}

	// Subject
	$mail->Subject = $config['subject'];

	// Constructing body
	$body = '';
	if(trim(!empty($_POST['name']))) {
		$body.='Name: '.$_POST['name'].'<br>';
	}
	if(trim(!empty($_POST['phone']))) {
		$body.='Phone: '.$_POST['phone'].'<br>';
	}
	if(trim(!empty($_POST['email']))) {
		$body.='Email: '.$_POST['email'].'<br><br>';
	}
	if(trim(!empty($_POST['message']))) {
		$body.='Message: '.$_POST['message'];
	}

	$mail->Body = $body;

	// Sending
	if (!$mail->send()) {
		$message = 'Server connection problem, please try again later.';
	} else {
		$message = 'Request sent!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>
