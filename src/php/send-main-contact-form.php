<?php
	require 'mailer.php';

	$config = include '../../smtp-main-contact-form-config.php';
	$mail = configureMailer($config);
	
	// Constructing body
	$body = '<b>Korrespondenz von der Website "Moversbonn & Transport"</b><br>';

	if(trim(!empty($_POST['name']))) {
		$body.='Name: '.$_POST['name'].'<br>';
	}
	if(trim(!empty($_POST['phone']))) {
		$body.='Telefonnummer: '.$_POST['phone'].'<br>';
	}
	if(trim(!empty($_POST['email']))) {
		$body.='Email Addresse: '.$_POST['email'].'<br><br>';
	}
	if(trim(!empty($_POST['message']))) {
		$body.='Nachricht: '.$_POST['message'];
	}

	sendEmail($mail, $body);
?>
