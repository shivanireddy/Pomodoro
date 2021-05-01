let session_seconds = "00";
let session_minutes = 00;

function setInitialTime() {
    document.getElementById("minutes").innerHTML = session_minutes;
    document.getElementById("seconds").innerHTML = session_seconds;
}

function start_work() {
    taskName = document.getElementById("taskname").value;
    const workTime = document.getElementById('worktime').value;
    const breakTime = document.getElementById('breaktime').value;

    session_minutes = workTime-1;
    session_seconds = 59;

    document.getElementById("minutes").innerHTML = session_minutes;
    document.getElementById("seconds").innerHTML = session_seconds;

    // Intervals for minutes and seconds
    minutes_interval = setInterval(minutesTimer, 60000);
    seconds_interval = setInterval(secondsTimer, 1000);

    // functions for intervals
    function minutesTimer() {
        session_minutes = session_minutes - 1;
        document.getElementById("minutes").innerHTML = session_minutes;
    }

    function secondsTimer() {
        session_seconds = session_seconds-1;
        document.getElementById("seconds").innerHTML = session_seconds;
        if(session_seconds <= 0) {
            if(session_minutes <= 0) {
                clearInterval(minutes_interval);
                clearInterval(seconds_interval);
                //popup message to start break
                document.getElementById("done").innerHTML = "Time for a break!";
                document.getElementById("done").classList.add("show_message");
                //start break timer
                start_break(breakTime);
            }
            // reset sec to 60 whenever it reaches 0
            session_seconds = 60;
        }
    }
}

function start_break(breakTime) {
    session_minutes = breakTime-1;
    session_seconds = 59;
    document.getElementById("minutes").innerHTML = session_minutes;
    document.getElementById("seconds").innerHTML = session_seconds;
    minutes_interval = setInterval(minutesTimer,60000);
    seconds_interval = setInterval(secondsTimer, 1000);
    // functions for intervals
    function minutesTimer() {
        session_minutes = session_minutes - 1;
        document.getElementById("minutes").innerHTML = session_minutes;
    }

    function secondsTimer() {
        session_seconds = session_seconds-1;
        document.getElementById("seconds").innerHTML = session_seconds;
        if(session_seconds <= 0) {
            if(session_minutes <= 0) {
                clearInterval(minutes_interval);
                clearInterval(seconds_interval);
                //popup message to start break
                document.getElementById("done").innerHTML = "Your break has ended. Time to Work!";
                document.getElementById("done").classList.add("show_message");
                //start work timer
                start_work();
            }
            // reset sec to 60 whenever it reaches 0
            session_seconds = 60;
        }
    }
}

function reset() {
    clearInterval(minutes_interval)
    clearInterval(seconds_interval)
    let session_seconds='00';
    let session_minutes = 00;
    document.getElementById("minutes").innerHTML = session_minutes;
    document.getElementById("seconds").innerHTML = session_seconds;
}

function startTime() {
    const dateNow = new Date();
    return dateNow;
}

function stopTime() {
    const dateNow = new Date()
    return dateNow;
}

// Event Listeners

document.getElementById("start-button").addEventListener("click", () => {
    start_work();
    start = startTime()

    document.getElementById("start-button").classList.add("d-none")
    document.getElementById("pause-button").classList.remove("d-none")
});

// Pause the timer

document.getElementById("pause-button").addEventListener("click", () => {
    clearInterval(minutes_interval)
    clearInterval(seconds_interval)
    // remove pause btn and reappear resume btn
    document.getElementById("pause-button").classList.add("d-none")
    document.getElementById("resume-button").classList.add("d-none")
});

// when timer is paused, resume the timer

document.getElementById("resume-button").addEventListener("click", () => {
    minutes_interval = setInterval(()=> {
        session_minutes = session_minutes - 1;
        document.getElementById("minutes").innerHTML = session_minutes;}, 
        60000);
    
      seconds_interval = setInterval(() => {
        session_seconds = session_seconds - 1;
        document.getElementById("seconds").innerHTML = session_seconds;
      }, 1000);

      document.getElementById("pause-button").classList.remove("d-none")
      document.getElementById("resume-button").classList.add("d-none")
      document.getElementById("start-button").classList.add("d-none")
});

// Reset everything on button and stop the total timer counter and append the work name in session list including the total time. 
document.getElementById("reset-button").addEventListener("click", () => {
    reset();
    stopp = stopTime()
    totalTime = dateFns.distanceInWords(start, stopp, {addSuffix: true})
  
    const completedSessionList = document.querySelector('#sessions-list')
    const html = `<li class="list-group-item d-flex justify-content-between align-items-center">${taskName} was completed ${totalTime}</li>`;
  
    completedSessionList.innerHTML += html;
  
    //remove the 'take break, continue work' messages
    document.getElementById("done").innerHTML = "";
    document.getElementById("done").classList.remove("show_message");
  
    // make the play button reappear, remove pause button, remove resume button
    document.getElementById("start-button").classList.remove("d-none")
    document.getElementById("pause-button").classList.add("d-none")
    document.getElementById("resume-button").classList.add("d-none")
  
  
  
    
  });