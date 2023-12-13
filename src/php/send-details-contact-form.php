<?php
	require 'mailer.php';

	$config = include '../../smtp-details-contact-form-config.php';
	$mail = configureMailer($config);
	
	// Constructing body
	$body = '<b>Korrespondenz von der Website "Bonner Umzug & Transport"</b><br>';

	if(trim(!empty($_POST['name']))) {
		$body.='Name: '.$_POST['name'].'<br>';
	}
	if(trim(!empty($_POST['phone']))) {
		$body.='Telefonnummer: '.$_POST['phone'].'<br>';
	}
	if(trim(!empty($_POST['email']))) {
		$body.='Email Addresse: '.$_POST['email'].'<br>';
	}
	if(trim(!empty($_POST['date']))) {
		$body.='Abholdatum: '.$_POST['date'].'<br>';
	}
	if(trim(!empty($_POST['from']))) {
		$body.='Wo: '.$_POST['from'].'<br>';
	}
	if(trim(!empty($_POST['to']))) {
		$body.='Wohin: '.$_POST['to'].'<br>';
	}
	if(trim(!empty($_POST['serviceType']))) {
		$body.='Leistungen: '.$_POST['serviceType'];
	}

	sendEmail($mail, $body);
?>
