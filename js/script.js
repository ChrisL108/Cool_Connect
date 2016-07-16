$(document).ready(function() {
	'use strict';

	var $smsCheck = $('#sms-check'), 
		$smsInfo = $('#sms-info'), //sms number to send to
		$smsCarrier = $('#carrier'); //sms carrier name
	var $emailCheck = $('#email-check'),
		$emailInfo = $('#email-info'); // email to send to
	var $name = $('#name'); // name of sender
	var $message = $('#message'); //message to send
	var $inputs = $('input'); // to clear after submit
	var $submit = $('button#sendButton'); //submit button
	var $clear = $('#clearButton');
	// list of messages sent
	var $historyList = $('ul#history');
	// item variable for adding to history list
	var itemToAdd; 

	$submit.on('click', function() {
		validator();
	});
	var sendTo, msg;
	// populate history list on page load
	(function() {
		
		for (var i=0; i < localStorage.length; i++) {
			sendTo = localStorage.key(i);
			msg = localStorage.getItem(sendTo);
			
			addToList(sendTo, msg);
		}
	})();

	// Validate which inputs are checked 
	// and remove whitespace/special characters
	function validator() {
		if ( $smsCheck.is(':checked') && $smsInfo.val() ) {
			
			sendMessage( $smsInfo.val().replace(/[^A-Z0-9]/ig, "") + 
						 getServiceEmail( $smsCarrier.prop('value') ));
			
			console.log("sms email sent");
			$smsInfo.slideUp();
			$smsCarrier.slideUp();
		}
		if ( $emailCheck.is(':checked') && $emailInfo.val() )  {
			sendMessage( $emailInfo.val() );
			console.log("regular email Sent...");
			$emailInfo.slideUp();
		}

		// clear inputs
		$inputs.val("");
		// uncheck checkboxes
		$smsCheck.prop('checked', false);  
		$emailCheck.prop('checked', false); 

	}

	// function that handles AJAX calls
	function sendMessage($email) {

		$.ajax({
			url: 'phpMailer/connect_mailer.php',
			type: 'POST',
			data: { name: $name.val(),
					message: $message.val(),
					email: $email
			},
			success: function(){
			 	// add to list if successful
		        addToList($email, $message.val() );
		        console.log("in Ajax - " + $email + $message.val() );
		        $('.success').fadeIn(1000)
		        			 .fadeOut(1000);
		    }
		})
		.done(function() {
			console.log("Message Sent!");
		})
		.fail(function(e) {
			console.log("error - " + e.responseText);
		})
		.always(function() {
			console.log("complete");
		});
		
	} // sendMessage()

	// function for adding items to list & localStorage
	function addToList(listTo, listMsg) {
		localStorage.setItem(listTo, listMsg);
		
		itemToAdd = '<li>'+listTo+ ':' + listMsg + '</li>';
		$historyList.append(itemToAdd);
		console.log("in addToList() - " + listTo + $message.val());
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
			default: return "Not a valid service provider.";
		}
	}

	// event handlers

	// $clear.on('click', function(event) {
	// 	localStorage.clear();
	// });

	$smsInfo.hide();
	$emailInfo.hide();
	$smsCarrier.hide();
	// checkbox event handler :
	// if ( checkbox : checked )... 
	// 	    slideDown()
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


// ~~~~~~~~~~~Get SMTP server names

// Open up a command prompt (CMD.exe)
// Type nslookup and hit enter
// Type set type=MX and hit enter
// Type the domain name and hit enter, for example: google.com
// The results will be a list of host names that are set up for SMTP

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


