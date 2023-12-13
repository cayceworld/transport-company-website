<?php
	require 'mailer.php';

	$config = include '../../smtp-details-contact-form-config.php';
	$mail = configureMailer($config);
	
	// Constructing body
	$body = '';
	if(trim(!empty($_POST['name']))) {
		$body.='Name: '.$_POST['name'].'<br>';
	}
	if(trim(!empty($_POST['phone']))) {
		$body.='Phone: '.$_POST['phone'].'<br>';
	}
	if(trim(!empty($_POST['date']))) {
		$body.='Date: '.$_POST['date'].'<br>';
	}
	if(trim(!empty($_POST['from']))) {
		$body.='From: '.$_POST['from'].'<br>';
	}
	if(trim(!empty($_POST['to']))) {
		$body.='To: '.$_POST['to'].'<br>';
	}
	if(trim(!empty($_POST['serviceType']))) {
		$body.='Service type: '.$_POST['serviceType'];
	}

	sendEmail($mail, $body);
?>
