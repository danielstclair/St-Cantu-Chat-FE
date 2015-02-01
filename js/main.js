$(document).ready(function() {
	$("#slideshow > div:gt(0)").hide();

	setInterval(function() { 
		$('#slideshow > div:first')
			.fadeOut(800)
			.next()
			.fadeIn(800)
			.end()
			.appendTo('#slideshow');
		},  5000);




	function postMessage(){
		// var user_name = $('#user-name').val();
		$.ajax({
			url:'https://young-castle-2791.herokuapp.com/messages.json',
			method: 'POST',
			data: {
				message: {message: $('#text').val(), user_name: $("#user-name").val()}
			}
			// success: createUser()
		}).done(function(message) {
				console.log(message, name);
				render(message, name);
			}
			);
		
		// var message = $('#user-name').val();
		// var gifUrl = hasGif(message);
		// if (gifUrl != false) {
		// 	gifLoader();
		// }
		// // var imageRegex = /([^s]+(?=.(jpg|gif|png)).2)/gm;
		// function hasGif(myMessage){
		// 	var words = message.split();
		// 	for (var i = 0; i < words.length; i++) {
		// 		var firstChars = words[i].substring(i, 7);
		// 		var lastChars = words[i].substring(words[i].length-4);
		// 		// var gif = false;
		// 		if (firstChars == 'http://' && lastChars == '.gif') {
		// 			return words[i];
		// 		}

		// 		// if (lastChars == '.gif') {
		// 		// 	gifLoader();
		// 		// };
		// 	}
		// 	return false;
		// }
		// function gifLoader(){ 
		// 	console.log('hey');
		// 	$(message).append('<img src="">');
		// }
	}

	var getMessages = function() {
		$.ajax({
			url:'https://young-castle-2791.herokuapp.com/messages.json',
			method: 'GET'
		}).done(function(messages) {
				render(messages, name);
			})
	};

	getMessages();

	var render = function(messages, name) {
		console.log(messages, name);
		var messageRow = _.template('<div class="row"><div><%= message %></div><div class="user-name"><%= user_name %></div></div>')
		// console.table(messages)

		if(messages.length > 0){
			for(var i=0; i<messages.length; i++) {
				$('#message-board').prepend(messageRow(messages[i]));
			}
		}
		else{
			$('#message-board').append(messageRow(messages));
		}
	};

	


	// setInterval(getMessages, 1000);
	// function createUser(){
	// 	$.ajax({
	// 		url:'https://young-castle-2791.herokuapp.com/users.json',
	// 		method: 'POST',
	// 		data: {
	// 			user: {name: $('#user-name').val()}
	// 		}
	// 		// crossDomain: true
	// 	}).done(function(message) {
	// 			console.log(message);
	// 			render(message);
	// 		});
	// }
	
	// function postMessage(){
	// 	$.ajax({
	// 		url:'https://young-castle-2791.herokuapp.com/messages.json',
	// 		method: 'POST',
	// 		data: {
	// 			message: {message: $('#text').val()}
	// 		}
	// 		// crossDomain: true
	// 	}).done(function(message) {
	// 			console.log(message);
	// 			render(message);
	// 		});
	// 	// var message = $('#user-name').val();
	// 	// var gifUrl = hasGif(message);
	// 	// if (gifUrl != false) {
	// 	// 	gifLoader();
	// 	// }
	// 	// // var imageRegex = /([^s]+(?=.(jpg|gif|png)).2)/gm;
	// 	// function hasGif(myMessage){
	// 	// 	var words = message.split();
	// 	// 	for (var i = 0; i < words.length; i++) {
	// 	// 		var firstChars = words[i].substring(i, 7);
	// 	// 		var lastChars = words[i].substring(words[i].length-4);
	// 	// 		// var gif = false;
	// 	// 		if (firstChars == 'http://' && lastChars == '.gif') {
	// 	// 			return words[i];
	// 	// 		}

	// 	// 		// if (lastChars == '.gif') {
	// 	// 		// 	gifLoader();
	// 	// 		// };
	// 	// 	}
	// 	// 	return false;
	// 	// }
	// 	// function gifLoader(){ 
	// 	// 	console.log('hey');
	// 	// 	$(message).append('<img src="">');
	// 	// }
	// }
	$('#submit').on('click', postMessage);
	$('#send').on('click', postMessage);

});
