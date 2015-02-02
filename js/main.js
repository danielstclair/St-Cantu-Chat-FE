$(document).ready(function() {
	$("#slideshow > div:gt(0)").hide();
	var date = new Date();
	var dateDisplay = (date.getMonth()+1) + '/' + (date.getDate()) + '/' + date.getFullYear();
	// var date = function(d){
	// 	// var
	// }
	console.log(date);


	setInterval(function() { 
		$('#slideshow > div:first')
			.fadeOut(800)
			.next()
			.fadeIn(800)
			.end()
			.appendTo('#slideshow');
		},  5000);




	function postMessage(){
		$.ajax({
			url:'https://young-castle-2791.herokuapp.com/messages.json',
			method: 'POST',
			data: {
				message: {message: $('#text').val(), user_name: $("#user-name").val()} 
				// message_date: {message_date: $(dateDisplay).val()}
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
		// function parseTwitterDate(text) {
		// 	var text = messages.created_at;
		// 	var newtext = text.replace(/(\+\S+) (.*)/, '$2 $1')	
		// 	var date = new Date(Date.parse(text)).toLocaleDateString();
		// 	var time = new Date(Date.parse(text)).toLocaleTimeString();
		// 	return date +' • ' + time;
		// }
	}

	var getMessages = function() {
		$.ajax({
			url:'https://young-castle-2791.herokuapp.com/messages.json',
			method: 'GET'
			// ifModified:true
		}).done(function(messages) {
				render(messages, name);
			})
		// if(id++ == true)
		// 	(function(messages) {
		// 		render(messages, name);
		// 	})
	};

	getNewMessages = function() {
		$.ajax({
			url:'https://young-castle-2791.herokuapp.com/messages.json',
			method: 'GET',

			ifModified: true,
			success: (function(messages, status) {
				if(status == 'success'){
					render(messages, name);

				}
				else{
					return
				}
			})
		})
	};

	getMessages();
	// getNewMessages();
	// setInterval(getNewMessages, 1000);

	var render = function(messages, name) {
		console.log(messages, name);
		console.log(messages.created_at)
		
		var messageRow = _.template('<div class="row"><div><%= message %></div><div class="user-name"><%= user_name %></div><div id="time"><%= created_at %></div>')
		// console.table(messages)
		// $('#message-board').prepend(messageRow(messages[0]))



		if(messages.length > 0){
			for(var i=0; i<messages.length; i++) {
				$('#message-board').prepend(messageRow(messages[i]));
			}
		}
		else{
			$('#message-board').append(messageRow(messages));
		}
	};

	// var printNewMessages = function(messages, name) {
	// 	console.log(messages, name);
	// 	var messageRow = _.template('<div class="row"><div><%= message %></div><div class="user-name"><%= user_name %></div><div>' + d + '</div>')
	// 	// console.table(messages)
	// 	$('#message-board').append(messageRow(messages))
	// };

	var printNew = function(messages, name){
		if(messages.length++ == true){
			$('#message-board').prepend(messageRow(messages[0]));
		}
	}





	// $('#submit').on('click', postMessage);
	$('#send').on('click', postMessage);
	$('#send').on('click', function(){
		$("#text").val('');
	});
	


});
