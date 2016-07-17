<!-- connect_mailer -->

<?php
	require 'PHPMailerAutoload.php';


    // Get the form fields and remove whitespace.
    $name = strip_tags(trim($_POST["name"]));
            $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    $sender = trim($_POST["sender"]);

	$mail = new PHPMailer;

	$mail->SMTPDebug = 3;                               // Enable verbose debug output


	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'ns8341.hostgator.com; ns8342.hostgator.com';       // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'chris@chrislacaille.com';                 // SMTP username
	$mail->Password = 'saitek150';                           // SMTP password
	$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 587;                                    // TCP port to connect to

	$mail->setFrom("chrislacaille5@gmail.com", $name);
	// $mail->addAddress('example@example.com', 'Joe User');     // Add a recipient
	$mail->addAddress($email);               // Name is optional
	// $mail->addReplyTo('info@example.com', 'Information');
	// $mail->addCC('cc@example.com');
	// $mail->addBCC('bcc@example.com');

	$mailsubject = 'Sender Email: ' . $sender;

	$mail->Subject = $mailsubject ;
	$mail->Body    = $message;
	// $mail->AltBody = $message;

	if(!$mail->send()) {
	    echo 'Message could not be sent.';
	    echo 'Mailer Error: ' . $mail->ErrorInfo;
	} else {
	    echo 'Message has been sent';
	}


	// $mail->isSMTP();                                      // Set mailer to use SMTP
	// $mail->Host = 'ns8341.hostgator.com';       // Specify main and backup SMTP servers
	// $mail->SMTPAuth = true;                               // Enable SMTP authentication
	// $mail->Username = 'chris@chrislacaille.com';                 // SMTP username
	// $mail->Password = 'saitek150';                           // SMTP password
	// $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
	// $mail->Port = 587;                                    // TCP port to connect to


	
	// $mail->addReplyTo('info@example.com', 'Information');
	// $mail->addCC('cc@example.com');
	// $mail->addBCC('bcc@example.com');

	// $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
	// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
	// $mail->isHTML(true);                                  // Set email format to HTML