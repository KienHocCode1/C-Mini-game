/*
    <!--
      Author: Trung Kien Bui, 000356049
      Date: July 27, 2023
      Assignment 4 Practice using JavaScript to create a web application using SVG, JavaScript, JavaScript Even Handling, 
      DOM manipulation, and concept of state and variables within a web app.

      File name: TrungKienBuiAssignment4
    -->
*/
window.addEventListener("DOMContentLoaded", (event) => {
    /*************************************** DECLARE SECTION *******************************/
    // assign/retreive id = "nightTime" to new const nightTime(variable) from html file
    const nightTime = document.querySelector("#nightTime");

    // assign/retreive id = "dayTime" to new const dayTime(variable) from html file
    const dayTime = document.querySelector("#dayTime");

    // assign/retreive id = "sunDown" to new const sunDown(variable) from html file
    const sunDown = document.querySelector("#sunDown");

    // assign/retreive id = "playBtn" to new const playBtn(variable) (Easy Mode Button) from html file
    const playBtn = document.querySelector('#playBtn');

    // assign/retreive id = "colorInput" to new const colorInput(variable) to change color of shape from html file
    const colorInput = document.querySelector('#colorInput');

    // assign/retreive id = "shapeInput" to new const shapeInput(variable) to change shape width from html file
    const shapeInput = document.querySelector('#shapeInput');

    // assign/retreive id = "startOver" to new const tryAgain(variable) (Reset Button) from html file
    const tryAgain = document.querySelector('#startOver');

    // constant variable named svgNS used to store the namespace URI and create SVG elements
    const svgNS = "http://www.w3.org/2000/svg";

    // assign/retreive id = "canvas" to new const canvas(variable) (svg canvas) from html file
    let canvas = document.querySelector('#canvas');

    // assign/retreive id = "playBtnHard" to new const hardLevel(variable) (Hard Mode Button) from html file
    let hardLevel = document.querySelector('#playBtnHard');

    // assign/retreive id = "textUpdate" to new const textUpdate(variable) (Pop up text) from html file
    let textUpdate = document.querySelector('#textUpdate');

    // declare counter = 0 for counting score 
    let counter = 0;

    // declare isRunning boolean to start and end program
    let isRunning;

    // declare counterInterval to start counting +1 for every second. Used to start and end (clearInterval() )
    let counterInterval;


    /**************************  EVENT LISTENER SECTION  *************************/
    // Reset button, run location.reload from function named startOver 
    tryAgain.addEventListener('click', startOver);

    // Keyboard Event, run function called jump() to jump when press Space Bar
    window.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            jump();
        }
    });

    // Easy Mode Button, run the game 1 time even thought double click, by checking conditions, function by clicking
    playBtn.addEventListener('click', function () {
        if (!isRunning) {
            isRunning = true;
            startCounter();
            blueBoxAnimation();
        }
    });

    // Night Time theme button, call changeToNightTime() when clicked
    nightTime.addEventListener("click", changeToNightTime);

    // Day Time theme button, call changeToDayTime() when clicked
    dayTime.addEventListener("click", changeToDayTime);

    // Sun Down Time theme button, call changeTosunDownTime() when clicked
    sunDown.addEventListener("click", changeTosunDownTime);

    // Change color for Shape Event Listener, start by taking input and assign it to square.setAttribute('fill', chosenColor);
    colorInput.addEventListener('change', function () {
        const chosenColor = colorInput.value;
        square.setAttribute('fill', chosenColor);
    })

    // Shape Modify Event Listener, start by taking input and assign it to square.setAttribute('width', chosenShape);
    shapeInput.addEventListener('change', function () {
        const chosenShape = parseInt(shapeInput.value);
        square.setAttribute('width', chosenShape);
    })

    // Hard Mode button, run the game 1 time even thought double click, by checking conditions, function by clicking
    hardLevel.addEventListener('click', function () {
        if (!isRunning) {
            isRunning = true;
            startCounter();
            blueBoxAnimationGoFaster()
        }
    });


    /************************** CREATING 2 OBJECTS (SVG ELEMENTS) ***********************/
    /* Create red Square object to play */
    let square = document.createElementNS(svgNS, "rect");
    square.setAttribute('fill', 'red');
    square.setAttribute('x', '200');
    square.setAttribute('y', '500');
    square.setAttribute('height', '100');
    square.setAttribute('width', '100');
    // Add square to canvas
    canvas.appendChild(square);

    /* Create blue object obstacle spawn infinitely until collide with Square object */
    let obstacle = document.createElementNS(svgNS, 'rect');
    obstacle.setAttribute('fill', 'blue');
    obstacle.setAttribute('x', '1500');
    obstacle.setAttribute('y', '525');
    obstacle.setAttribute('height', '75');
    obstacle.setAttribute('width', '75');
    // Add obstacle to canvas
    canvas.appendChild(obstacle);

    
    /********************************FUNCTIONS STARTING FROM HERE **************************/
    /**
     * Purpose: add 1 to counter and update Your Score
     * @param {null}  
     * @return {String} Your Score: 
     */
    function scoreCounter() {
        counter += 1;
        textUpdate.textContent = `Your score: ${counter} points`;
    }
    /**
     * Purpose: call scoreCounter() and start adding +1 to counter every 1s
     * @param {null}  
     * @return {void}
     */
    function startCounter() {
        counterInterval = setInterval(scoreCounter, 1000);
    }
    /**
     * Purpose: stop counting by clearInterval()
     * @param {null}  
     * @return {void}
     */
    function stopCounter() {
        clearInterval(counterInterval);
    }
    /**
     * Purpose: Check collision between 2 SVG elements
     * @param {null}  
     * @return {boolean} return boolean whether collision happen or not 
     */
    function collision() {
        // getting Red Square's X, Y, Width, Height to do math
        const squareX = parseInt(square.getAttribute('x'));
        const squareY = parseInt(square.getAttribute('y'));
        const squareWidth = parseInt(square.getAttribute('width'));
        const squareHeight = parseInt(square.getAttribute('height'));

        // getting Blue Square's X, Y, Width, Height to do math
        const obstacleX = parseInt(obstacle.getAttribute('x'));
        const obstacleY = parseInt(obstacle.getAttribute('y'));
        const obstacleWidth = parseInt(obstacle.getAttribute('width'));
        const obstacleHeight = parseInt(obstacle.getAttribute('height'));

        // Checking condition
        const collisionX = squareX < obstacleX + obstacleWidth && squareX + squareWidth > obstacleX;
        const collisionY = squareY < obstacleY + obstacleHeight && squareY + squareHeight > obstacleY;

        const isColliding = collisionX && collisionY;

        // Display Game over message when collision occured and stop the game
        if (isColliding) {
            const deathMessage = document.getElementById('deathMessage');
            deathMessage.style.display = 'block'; // or 'inline' depending on your page layout
            stopTheGame();
            stopCounter();
        }
        return isColliding;
    }
    /**
     * Purpose: Reload the page
     * @param {null}  
     * @return {void}
     */
    function startOver() {
        location.reload();
    }
    /**
     * Purpose: animate the blue square object running from right to left infinitely
     * @param {null}
     * @return {void}
     */
    function blueBoxAnimation() {
        // Retreive isRunning
        if (!isRunning) return;
        let running = parseInt(obstacle.getAttribute('x'));
        // If isRunning == true (will get boolean == true when click start the game ) the do the animate from right to left infinitely
        if (isRunning == true) {
            running -= 3;
            if (running <= 0) {
                running = 1500;
            }
            // update blue square X for moving position
            obstacle.setAttribute('x', running);
        }
        // if collision take place stop the counting score
        if (collision()) {
            isRunning == false;
            // Handle the collision here, stop the animation, show an alert
            console.log("Collision detected!");
        } else {
            requestAnimationFrame(blueBoxAnimation);
        }
    }
    /**
     * Purpose: to stop the game, stop the counting, and updating counter 
     * @param {null}  
     * @return {void}
     */
    function stopTheGame() {
        isRunning = false;
        textUpdate.textContent = `Your score: ${counter}`;
        stopCounter();
    }
    /**
     * Purpose: animate the blue object but speeding faster
     * @param {null}  
     * @return {void}
     */
    function blueBoxAnimationGoFaster() {
        if (!isRunning) return;
        let running = parseInt(obstacle.getAttribute('x'));
        // If isRunning == true (will get boolean == true when click start the game ) the do the animate from right to left infinitely
        if (isRunning == true) {
            running -= 6;
            if (running <= 0) {
                running = 1500;
            }
            obstacle.setAttribute('x', running);
        }
        // Detect when collision take place and end the game
        if (collision()) {
            isRunning == false;
            // Handle the collision here, stop the animation, show an alert
            console.log("Collision detected!");
        } else {
            requestAnimationFrame(blueBoxAnimationGoFaster);
        }
    }
    /**
     * Purpose: animate the red square jumping 
     * @param {null}
     * @return {void}
     */
    function jump() {
        let e = parseInt(square.getAttribute('y'));
        let direction = 'up';
        //https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
        // This is the website I borrowed the idea how to make it go up/down or right/left
        const moveShape = function () {
            if (direction === 'up') {
                e -= 1;
                square.setAttribute('y', e);
                console.log(square.getAttribute('y'));
                if (e <= 300) {
                    direction = 'down';
                }
            } else {
                e += 1;
                square.setAttribute('y', e);
                console.log(square.getAttribute('y'));

                if (e >= 500) {
                    square.setAttribute('y', 500);
                }
            }
        };
        const intervalId = setInterval(moveShape, 1);
        // Stop the interval when the shape reaches y = 500
        const stopInterval = function () {
            if (e >= 500) {
                clearInterval(intervalId);
            }
        };
        setInterval(stopInterval, 10);

    }

    // Declare moon outside function for easy access (can it be called static variable?)
    let moon;

    // Declare SunNoon for Sun Down Time outside function for easy access (can it be called static variable?)
    let sunNoon;

    // Declare Sun for Day time outside function for easy access (can it be called static variable?)
    let sun;

    /**
     * Purpose: Changing theme to Night Time and draw the Moon
     * @param {null}
     * @return {void}
     */
    function changeToNightTime() {
        if (!moon) {
            moon = document.createElementNS(svgNS, 'circle');
            moon.setAttribute('fill', 'white');
            moon.setAttribute('stroke', 'purple');
            moon.setAttribute('stroke-width', '2');
            moon.setAttribute('cx', '50');
            moon.setAttribute('cy', '50');
            moon.setAttribute('r', '30');
            canvas.appendChild(moon);
        }
        // making sure remove previous theme before creating new theme
        if (sunNoon) {
            canvas.removeChild(sunNoon);
            sunNoon = null;
        }
        // making sure remove previous theme before creating new theme
        if (sun) {
            canvas.removeChild(sun);
            sun = null;
        }
        canvas.style.backgroundColor = "#0D0D0D";
    }

    /**
     * Purpose: Changing theme to Day Time and draw the Sun
     * @param {null}
     * @return {void}
     */
    function changeToDayTime() {
        if (!sun) {
            sun = document.createElementNS(svgNS, 'circle');
            sun.setAttribute('fill', 'yellow');
            sun.setAttribute('stroke', 'green');
            sun.setAttribute('stroke-width', '2');
            sun.setAttribute('cx', '50');
            sun.setAttribute('cy', '150');
            sun.setAttribute('r', '30');
            canvas.appendChild(sun);
        }
        // making sure remove previous theme before creating new theme
        if (moon) {
            canvas.removeChild(moon);
            moon = null; // Reset the moon variable
        }
        // making sure remove previous theme before creating new theme
        if (sunNoon) {
            canvas.removeChild(sunNoon);
            sunNoon = null;
        }
        canvas.style.backgroundColor = "#92D5FF";
    }
    /**
     * Purpose: Changing the theme to Sun Down Time and draw the Sun
     * @param {null}
     * @return {void}
     */
    function changeTosunDownTime() {
        if (!sunNoon) {
            sunNoon = document.createElementNS(svgNS, 'circle');
            sunNoon.setAttribute('fill', '#FF8531');
            sunNoon.setAttribute('stroke', 'blue');
            sunNoon.setAttribute('stroke-width', '2');
            sunNoon.setAttribute('cx', '80');
            sunNoon.setAttribute('cy', '300');
            sunNoon.setAttribute('r', '30');
            canvas.appendChild(sunNoon);
        }
        // making sure remove previous theme before creating new theme
        if (moon) {
            canvas.removeChild(moon);
            moon = null;
        }
        // making sure remove previous theme before creating new theme
        if (sun) {
            canvas.removeChild(sun);
            sun = null;
        }
        canvas.style.backgroundColor = "#FFB17B";
    }
    /////////////////////// Thank you /////////////////////////
});