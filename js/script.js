$(document).ready(function() {
	'use strict';

	var $smsCheck = $('#sms-check'),
		$smsInfo = $('#sms-info'),
		$smsCarrier = $('#carrier');
	var $emailCheck = $('#email-check'),
		$emailInfo = $('#email-info');
	var $name = $('#name');
	var $message = $('#message');
	var $inputs = $('input, textarea'); // to clear after submit
	var $submit = $('button#sendButton');

	$submit.on('click', function() {
		validator();
	});

	function sendMessage(recipientEmail) {

		$.ajax({
			url: $('form').prop('action'),
			type: 'POST',
			data: { name: $name.val(),
					message: $message.val(),
					email: recipientEmail
				},
		})
		.done(function() {
			console.log("Message Sent!");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	}

	// Validate which inputs are checked 
	// and remove whitespace/spcial characters
	function validator() {
		if ( $smsCheck.is(':checked') && $smsInfo.val() ) {
			sendMessage( $message.val() , 
						 $smsInfo.val()
						 	.replace(/[^A-Z0-9]/ig, "") );
			$smsInfo.slideUp();
			$smsCarrier.slideUp();
		}
		if ( $emailCheck.is(':checked') && $emailInfo.val() )  {
			sendMessage( $message.val() , 
		    			 $emailInfo.val() );
			$emailInfo.slideUp();
		}

		$inputs.val("");
		//$('#myCheckbox').prop('checked', true); // Checks it
		//$('#myCheckbox').prop('checked', false); // Unchecks it
	}

	// if ( checkbox : checked )... 
	// 		slideUp() / slideDown()
	$smsInfo.hide();
	$emailInfo.hide();
	$smsCarrier.hide();
	$smsCheck.on('change', function() {
		if ($smsCheck.is(':checked')) {
			$smsInfo.slideDown();
			$smsCarrier.slideDown();
		} else {
			$smsInfo.slideUp();
			$smsCarrier.slideUp();
		}
	});
	$emailCheck.on('change', function() {
		if ($emailCheck.is(':checked')) {
			$emailInfo.slideDown();
		} else {
			$emailInfo.slideUp();
		}
	});





}); // doc ready()


// AT&T: number@txt.att.net
// T-Mobile: number@tmomail.net
// Verizon: number@vtext.com
// Sprint: number@messaging.sprintpcs.com or number@pm.sprint.com
// Virgin Mobile: number@vmobl.com
// Tracfone: number@mmst5.tracfone.com
// Metro PCS: number@mymetropcs.com
// Boost Mobile: number@myboostmobile.com
// Cricket: number@sms.mycricket.com
// Nextel: number@messaging.nextel.com
// Alltel: number@message.alltel.com
// Ptel: number@ptel.com
// Suncom: number@tms.suncom.com
// Qwest: number@qwestmp.com
// U.S. Cellular: number@email.uscc.net