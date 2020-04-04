// make my namespace object
const lotteryApp = {};

// make a randomizing function
lotteryApp.randomNumb = function(){
    // return a random number between 1 and 50
    return Math.floor(Math.random() * 50) + 1;
}

// make a funtion that checks to see if there are matches
lotteryApp.checkForMatch = function(mainArray, arrayToCheck){

    // loop through the array and check if number in the array
    for (let i = 0; i < arrayToCheck.length; i++){

        // if the number is included, add the class of 'match'
        if(mainArray.indexOf(arrayToCheck[i]) > -1){
            
            $(`.${arrayToCheck[i]}`).addClass('match');
        }
    }

}

// make function that generates the tickets of random numbers
lotteryApp.makeTicket = function(){

    // make empty array to push numbers to
    let newTicket = [];

    // make a for loop to push random numbers to the winning ticket 
    for (let i = 0; i < 5; i++){

        // hold the number in a variable
        let newNumber = lotteryApp.randomNumb();

        // check if its already in array
        if(newTicket.indexOf(newNumber) > -1){
            // make a new number to push
            altNumber = lotteryApp.randomNumb();
            newTicket.push(altNumber);

            // push the original number
        } else {
            newTicket.push(newNumber);
        } 
    }

    // return the array
    return newTicket;
}

// make function that displays the numbers
lotteryApp.displayTickets = function(array, className){

    // for each item in array, append to the page as an li
    array.forEach(function(number){

        // make a variable for the content to append
        const htmlToAppend = `
            <li class="${number}">
                <p>${number}</p>
            </li>
        `;

        // append the numbers
        $(`.${className}`).append(htmlToAppend);
    })
}

// make initalizing function
lotteryApp.init = function (){

    // set one array to the winning ticket | call function that generates random numbers
    let winningTicket = lotteryApp.makeTicket();

    // set one array to the user ticket | call function that generates random numbers
    let userTicket = lotteryApp.makeTicket();

    // on button click, refresh numbers
    $('.refresh').on('click', function(){

        // clear containers
        $('.winningNumbers').empty();
        $('.yourNumbers').empty();

        // call function that generates random numbers
        winningTicket = lotteryApp.makeTicket();

        // call function that generates random numbers
        userTicket = lotteryApp.makeTicket();

        // call a function that displays the numbers, with the user ticket
        lotteryApp.displayTickets(userTicket, 'yourNumbers');

        // call a function that displays the numbers, with the winning ticket
        lotteryApp.displayTickets(winningTicket, 'winningNumbers');

        // call a function that checks to see if there are matches
        lotteryApp.checkForMatch(winningTicket, userTicket);


    });

    // call a function that displays the numbers, with the winning ticket
    lotteryApp.displayTickets(winningTicket, 'winningNumbers');

    // call a function that displays the numbers, with the user ticket
    lotteryApp.displayTickets(userTicket, 'yourNumbers');

    // call a function that checks to see if there are matches
    lotteryApp.checkForMatch(winningTicket, userTicket);


}

// document ready
$(function(){
    

    // call initializing function
    lotteryApp.init();
});