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
			url: 'messenger.php',
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
			console.log(sendMessage( $smsInfo.val().replace(/[^A-Z0-9]/ig, "")  + 
						 getServiceEmail($smsCarrier.val()))/*;*/ );
			$smsInfo.slideUp();
			$smsCarrier.slideUp();
		}
		if ( $emailCheck.is(':checked') && $emailInfo.val() )  {
			sendMessage( $emailInfo.val() );
			$emailInfo.slideUp();
		}

		$inputs.val("");
		//$('#myCheckbox').prop('checked', true); // Checks it
		//$('#myCheckbox').prop('checked', false); // Unchecks it
	}

	function getServiceEmail(service) {
		switch(service) {
			case 'att' : return '@txt.att.net';
			case 'tmobile' : return '@tmomail.net';
			case 'sprint' : return '@messaging.sprintpcs.com';
			case 'verizon' : return '@vtext.com';
			case 'virgin' : return '@vmobl.com';
			case 'tracfone' : return '@mmst5.tracfone.com';
			case 'metro' : return '@mymetropcs.com';
			case 'boost' : return '@myboostmobile.com';
			case 'cricket' : return '@sms.mycricket.com';
			case 'nextel' : return '@messaging.nextel.com';
			case 'alltel' : return '@message.alltel.com';
			case 'ptel' : return '@ptel.com';
			case 'suncom' : return '@tms.suncom.com';
			case 'qwest' : return '@qwestmp.com';
			case 'usc' : return '@email.uscc.net';

		}
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

