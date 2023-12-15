<?php
	header('Content-type: application/json');

	// Forbid any HTTP method except POST
	if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
		http_response_code(403);
		echo json_encode(['message' => 'Method not allowed']);
		return;
	}

	require 'mailer.php';
	$config = include '../../smtp-main-contact-form-config.php';

	$mail = configureMailer($config);
	$errors = [];

	// Sanitize fields
	$nameField = sanitizeInput($_POST['name']);
	$phoneField = sanitizeInput($_POST['phone']);
	$emailField = sanitizeInput($_POST['email']);
	$messageField = sanitizeInput($_POST['message']);
	$policyCheckbox = sanitizeInput($_POST['policy-checkbox']);

	// Validation
	if (empty($nameField)) {
		array_push($errors, '"Name" is empty');
	}
	if (empty($phoneField)) {
		array_push($errors, '"Phone" is empty');
	}
	if ($policyCheckbox !== 'on') {
		array_push($errors, 'Policy was not accepted');
	}
	if (!empty($emailField)) {
		if (!filter_var($emailField, FILTER_VALIDATE_EMAIL)) {
			array_push($errors, 'Email is invalid');
		}
	}

	// Send Bad Request response with errors if there is any
	if (!empty($errors)) {
		http_response_code(400);
		echo json_encode(['errors' => $errors]);
		return;
	}
	
	// Constructing body
	$body = '<b>Anfrage von der Website "Moversbonn"</b><br><br>';

	$body .= "<b>Name:</b> $nameField";
	$body .= "<br><b>Telefonnummer:</b> $phoneField";

	if(!empty($emailField)) {
		$body .= "<br><b>Email Addresse:</b> $emailField";
	}

	if(!empty($messageField)) {
		$body .= "<br><br><b>Nachricht:</b> <i>$messageField</i>";
	}

	$response = sendEmail($mail, $body);

	http_response_code(200);
	echo json_encode($response);
?>
