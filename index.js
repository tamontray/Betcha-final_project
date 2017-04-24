$(document).ready(function() {

	// $(".hamburger").click(menu);

	// function menu() {
	// 	$("nav").slideToggle();
	// }

// Call out and set default point levels

var total = 1000000;

var wins = 0;

var losses = 0;

var totalWon = 0;

var totalLost = 0;


// Event listener when clicking on "Plus Sign" to add a new bet
$(".add-bet").click(showBet);

	function showBet() {

		$(".bet-form").slideToggle("fast");

		console.log("hi!");
	}


//Set up the event listener on the input field
$(".post").on("click", addBet);

//addToDoListIte When user submits new to-do list item
function addBet() {

	event.preventDefault();

	// Get the value of input fields and store in a variable
	var title = $("#title").val();

	var description = $("#description").val();

	var type = $("#bet-type").val();

// Only allow bet to be created if the amount of the bet is less than the total # of points in your "account"
	if (parseInt($("#amount").val(),10) > total) {
		alert("You do not have enough points for this bet!")
	}

	else if (parseInt($("#amount").val(),10) <= total) {

	var amount = parseInt($("#amount").val(),10);

	total -= amount;

// newCard creates the new card with the inputs from the hidden form
	var newCard = '<div class="demo-card-wide mdl-card mdl-shadow--2dp card"><div class="mdl-card__title"><h2 class="mdl-card__title-text">'

		newCard += title;

		newCard += '</h2></div><div class="mdl-card__supporting-text">'
					    
		newCard += description;
		
		newCard += '</div><div class="mdl-card__supporting-text amount"><span>Bet Amount:</span><span type="number" class="bet-amount">'

		newCard += " " + amount;

		newCard += '</span></div><div class="mdl-card__supporting-text amount"><span class="bet-class">Bet Type:</span><span>'

		newCard += " " + type;

		newCard += '</span></div><div class="mdl-card__actions mdl-card--border"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect edit-bet">Edit Bet</a>'

		newCard += '<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect loser">I Lose</button><button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect winner">I Win</button></div>'

		newCard += '<div class="mdl-card__menu"><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"><i class="material-icons">share</i></button></div></div>'

$(".bet-form").slideToggle();

$("#clear").find('input:text').val("");

// Places bets in the appropriate bet tab
$("#all-panel").prepend(newCard);

	if (type === "Video Game") {
		$("#vg-panel").prepend(newCard);
	}

	else if (type === "Sports") {
		$("#sports-panel").prepend(newCard);
	}

// Updates total points
	$(".ttl-points").html(total);
}
}

// Actions when "Winning" a bet
$(".mdl-tabs__panel").on("click", ".winner", winBet)

	function winBet() {
// Add the class "won". Will change background color and take away win/loss/edit buttons
		$(this).parent().parent().addClass("won");
		$(this).parent().hide();
// Updates total points won score
		totalWon += parseInt($(this).parent().parent().children(".amount").children(".bet-amount").text(),10);
// Updates total points. Need to multiply this by 2 because I take points out of the account for the bet, so need to replace original points, and add in winnings
		total += parseInt($(this).parent().parent().children(".amount").children(".bet-amount").text(),10)*2;
// Updates wins
		wins += 1;
// Post scores to html
		$(".bets-won").html(wins);

		$(".point-won").html(totalWon);

		$(".ttl-points").html(total)

		console.log(totalWon);
	}
// Losing actions
$(".mdl-tabs__panel").on("click", ".loser", loseBet)

	function loseBet() {

		$(this).parent().parent().toggleClass("loss");
		$(this).parent().hide();
// Updates total points lost
		totalLost -= parseInt($(this).parent().parent().children(".amount").children(".bet-amount").text(),10);
// Updates total loss
		losses += 1;
// NO NEED TO UPDATE TOTAL. I TAKE THE POINTS OUT OF THE TOTAL WHEN THE BET IS PLACED
		$(".bets-lost").html(losses);;

		$(".point-lost").html(totalLost);

		$(".ttl-points").html(total);

		console.log(totalLost);
	}


	console.log("ready!");
});