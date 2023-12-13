<?php
	require 'mailer.php';

	$config = include '../../smtp-main-contact-form-config.php';
	$mail = configureMailer($config);
	
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

	sendEmail($mail, $body);
?>
