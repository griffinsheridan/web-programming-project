/*** You will not need this file until Unit 5 ***/
/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [x] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
const themeButton = document.getElementById('theme-button');

// Step 2: Write the callback function
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
};

// Step 3: Register a 'click' event listener for the theme button
if (themeButton) {
  themeButton.addEventListener('click', toggleDarkMode);
} else {
  console.error("Theme button not found!");
}


/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and other details 
    they entered should be added to the list of participants.

  When To Modify:
  - [x] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [x] Project 7 (REQUIRED FEATURE)
  - [x] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Query for the submit RSVP button
const rsvpButton = document.getElementById('rsvp-button');

// Step 2: Write the callback function (accepts person object)
const addParticipant = (person) => {
    const participant = document.createElement('p');
    participant.textContent = `🎟️ ${person.name} from South Florida has RSVP'd.`;
    document.querySelector('.rsvp-participants').appendChild(participant);
};


/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [x] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [x] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 2: Write the callback function
const validateForm = () => {
  let containsErrors = false;
  var rsvpInputs = document.getElementById("rsvp-form").elements;

  // Create person object for Unit 9
  const person = {
    name: document.getElementById('name').value.trim()
  };

  // Validation loop
  for (let i = 0; i < rsvpInputs.length; i++) {
    const input = rsvpInputs[i];
    if (input.type === "text" || input.type === "email" || input.type === "tel") {
      const value = input.value.trim();
      if (value.length < 2) {
        containsErrors = true;
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    }
  }

  // If valid → add to list + show success modal
  if (!containsErrors && person.name) {
    addParticipant(person);
    toggleModal(person);
    document.getElementById("rsvp-form").reset();
  }
};

// Step 3: Event listener
if (rsvpButton) {
  rsvpButton.addEventListener('click', validateForm);
} else {
  console.error("RSVP button not found!");
}


/*** Scroll Animations ***
  
  Purpose:
  - Use this starter code to add scroll animations to your website.

  When To Modify:
  - [ ] Project 8 (REQUIRED FEATURE)
  - [ ] Any time after
***/

let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
        let current = revealableContainers[i];
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = current.getBoundingClientRect().top;
        let revealDistance = parseInt(getComputedStyle(current).getPropertyValue('--reveal-distance'), 10);

        if (topOfRevealableContainer < windowHeight - revealDistance) {
            current.classList.add('active');
        } else {
            current.classList.remove('active');
        }
    }
};

window.addEventListener('scroll', reveal);
reveal();


/*** Reduce Motion Stretch ***/
const reduceMotionButton = document.getElementById('reduce-motion-button');
const toggleReduceMotion = () => {
    document.body.classList.toggle('reduce-motion');
    if (document.body.classList.contains('reduce-motion')) {
        reduceMotionButton.textContent = 'Enable Motion';
    } else {
        reduceMotionButton.textContent = 'Reduce Motion';
    }
};
if (reduceMotionButton) {
    reduceMotionButton.addEventListener('click', toggleReduceMotion);
}


/*** Unit 9 Success Modal ***/

const modal = document.getElementById('thanks-modal');
const modalContent = document.getElementById('thanks-modal-content');
const modalImage = document.getElementById('modal-image');
const closeModalButton = document.getElementById('close-modal-button');

let scaleFactor = 1;
let intervalId = null;

const scaleImage = () => {
    scaleFactor = (scaleFactor === 1) ? 0.85 : 1;
    modalImage.style.transform = `scale(${scaleFactor})`;
};

const toggleModal = (person) => {
    modal.style.display = 'flex';
    modalContent.textContent = `Thank you, ${person.name}! You're officially signed up for the Boca Lax Showdown! 🥍🌴`;

    intervalId = setInterval(scaleImage, 600);

    setTimeout(() => {
        modal.style.display = 'none';
        if (intervalId) clearInterval(intervalId);
        scaleFactor = 1;
        modalImage.style.transform = 'scale(1)';
    }, 5500);
};

if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
        if (intervalId) clearInterval(intervalId);
    });
}

/*** Countdown Timer ***/
const countdownElement = document.getElementById('timer');

const eventDate = new Date("June 15, 2026 00:00:00").getTime();

const countdown = () => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        countdownElement.innerHTML = "The Event is Happening Now! 🥳";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

// Update every second
setInterval(countdown, 1000);
countdown(); // Run once immediately