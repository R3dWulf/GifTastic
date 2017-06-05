// ---Global Variables------
// Public key for Giphy
var publicKey = "dc6zaTOxFJmzC";
// array of preslected topics to choose from on page load
var topics = ["squirrel", "cat", "spongebob", "minions"];

// Make sure the document has finished loading
$('document').ready(function(){
	// ------functions go here-------------
	// Function that will make the buttons for the preselected topics in the array 
	function renderTopics(){
		// Prevent buttons from repeating
		$("#topicButtons").empty();

		// Loop through the array
		for (var i = 0; i < topics.length; i++){
			// create the button tag 
			var topicButton = $("<button>");
			/*
				Add data attribute to store the index of the array
				.attr("data-gif") is undefined thus will not add attribute to button tag because it contains an empty string
				topicButton.attr("data-gif"); 
			 	defining attr() by adding "test" will define the attr and add it to the button because the attr is not longer empty. 
				console.log("data-gif", "test")
			*/
			topicButton.attr("data-gif", topics[i]);
			// Add class for css styling, if empty it will not be added
			topicButton.addClass("I'm a button");
			// Make the index of the array the button text
			topicButton.text(topics[i]);
			// Display the buttons in topics div
			$("#topicButtons").append(topicButton)
		}
	}

	// function that will grab 10 pics for each button
	// $("button").on("click", function(, will not work!
	// $("button").click(function(, will not work!
	$(document).on("click", "button", function(){
	 	// console.log(this);
		//var to store the data-name attribute used to search Giphy where (this) refers to the button tag
		var giphySearch = $(this).attr("data-gif");
		// Tell the code where to search and limit the search to 10
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + giphySearch +  "&api_key=" + publicKey + "&limit=10";

		// AJAX GET request to pull the information
		$.ajax({
			url: queryURL,
			method: "GET"
		// Tell AJAX what to do with the information
		}).done(function(response){
			// Console.log for testing ajax and paths 
			//console.log(response.data[0].images.fixed_height.url);
			//store the array of the object that is placed in data in a varaible
			var results = response.data
			//Loop though the array
			for (var i = 0; i < results.length; i++)
			{
				//make sure the photos are sfw 
				if(results[i].rating !== "r" && results[i].rating !== "pg-13"){
					// Create a div that will hold the rating and image and give it a class for css
					var gifDiv = $("<div class='items'>")
					// Store the ratings in variable so that is can be displayed in the div tag
					var rating = results[i].rating
					// Create a <p> tag to display the ratings
					var pTag = $("<p>").text("Rating: " + rating);
					// Create the <img> tag
					var gifImg = $("<img>");
					// Give the <img> tag an attribute source to link to the picture
					gifImg.attr("src", results[i].images.fixed_height_still.url);
					gifImg.attr("data-state", "still");
					gifImg.attr("data-still", results[i].images.fixed_height_still.url);
					gifImg.attr("data-animate", results[i].images.fixed_height.url);
					// Add the ratings to the <div>
					gifDiv.prepend(pTag);
					// Add the img to the <div>
					gifDiv.prepend(gifImg);
					// 
					$("#topics").prepend(gifDiv);

				// Close If statement	
				}
			// Close For loop
			}
		// Close AJAX
    	});
	// Close Function
	});

	// Add buttons
	$("#addTopics").on("click", function(event){
		// A form tag is used so, prevent the input with type submit from submitting itself.
		event.preventDefault();
		// Grab values from user input box then store them in a variable to add the user input as text for the button
		var userAddedTopics = $("#topic-input").val().trim();
		// Add user input to the array of topics
		topics.push(userAddedTopics);
		// Call the renderTopics functions to add the new button
		renderTopics();
	});
    
    // Turn animated gif on and off
	$(document).on("click", "img", function(){
		//Test to see if on click works
		console.log($(this).attr("src"));
		// Create variable to store the data-state of the image clicked on
		var state = $(this).attr("data-state");
		// Create an if statement that will check the state  of the image and then change it and the scr to the animated gif
		 if(state === "still"){
		 	$(this).attr("src", $(this).attr("data-animate"));
		 	$(this).attr("data-state", "animate"); // If data-still used will not find file looks for img on local host
		 } else {
		 	$(this).attr("src", $(this).attr("data-still"));
		 	$(this).attr("data-state", "still"); // If data-still used will not find file looks for img on local host
		 }

	});
	// Call the render function to display buttons on screen
	renderTopics();
// Close document ready
});
