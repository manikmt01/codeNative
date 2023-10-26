// For step item id and class
const currentStepElement = document.getElementById('current-step');
const currentStepElement2 = document.getElementById('current-step2');
const progressBar = document.querySelector('.progressbar .bar1');
const progressBar2 = document.querySelector('.progressbar .bar2');
const stepLabels = document.querySelectorAll('.rightside ul li .step-label');
const listItems = document.querySelectorAll('.rightside ul li');
const checkboxes = document.querySelectorAll('.rightside ul li label');
const stepSections = document.querySelectorAll('.mainItemLeft .step-section');

const nextButton = document.getElementById('next-button');
const nextButtonTitle = document.getElementById('nextButtonTitle');
const backButton = document.getElementById('back-button');

// for uploaded images or file id
const fileInput = document.getElementById('fileInput');
const uploadSection = document.getElementById('uploadSection');
const filePreview = document.getElementById('filePreview');
const imagePreview = document.getElementById('imagePreview');

// Get references to all the color pickers, hex color code inputs, and pencil buttons
const colorPickers = document.querySelectorAll('.colorPicker');
const hexColorCodeInputs = document.querySelectorAll('.hexColorCode');
const pencilButtons = document.querySelectorAll('.pencil');

// -----------------------------------------------------------------------------------------------------------

// For step item script

let totalStep = stepSections.length;
console.log(totalStep);
let currentStep = 1;

nextButton.addEventListener('click', () => {
  if (currentStep < totalStep) {
    if (validateInput(currentStep)) {
      // Mark the current step as processed
      stepLabels[currentStep - 1].classList.add('processed');
      listItems[currentStep].classList.add('active');
      currentStep++;
      // Show the "Back" button from the second step onward
      if (currentStep === 2) {
        backButton.style.display = 'flex';
      }
      // Check if it's the last step and update the button text
      if (currentStep === totalStep) {
        nextButtonTitle.innerText = 'Build Now';
      } else {
      }

      updateStepUI(currentStep);
    } else {
      alert('Please fill out the required fields for Step ' + currentStep);
    }
  }
});

backButton.addEventListener('click', () => {
  if (currentStep > 1) {
    // Unmark the current step as processed
    stepLabels[currentStep - 1].classList.remove('processed');
    currentStep--;

    // Hide the "Back" button on the first step
    if (currentStep === 1) {
      backButton.style.display = 'none';
    }
    // Check if it's not the last step and update the button text
    if (currentStep !== totalStep) {
      nextButtonTitle.innerText = 'Next Step';
    }

    updateStepUI(currentStep);
    listItems[currentStep].classList.remove('active');
  }
});

function updateStepUI(step) {
  currentStepElement.innerText = step;
  currentStepElement2.innerText = step;
  progressBar.style.width = step * (100 / totalStep) + '%';
  progressBar2.style.width = step * (100 / totalStep) + '%';
  // Check if it's the last step and update the button text

  // Show or hide the checkbox for the current and next steps
  for (let i = 0; i < checkboxes.length; i++) {
    if (i < step - 1) {
      checkboxes[i].style.display = 'inline-block';
    } else {
      checkboxes[i].style.display = 'none';
    }
  }
  // Show the current step section and hide the previous ones
  for (let i = 0; i < stepSections.length; i++) {
    if (i === step - 1) {
      stepSections[i].classList.add('active');
    } else {
      stepSections[i].classList.remove('active');
    }
  }
}

function validateInput(step) {
  // Modify the validation logic to check all input fields within the current section
  const section = stepSections[step - 1];
  const inputs = section.querySelectorAll('input, select');
  // for (const input of inputs) {
  //   if (input.type === 'text' || input.type === 'select-one') {
  //     if (input.value.trim() === '') {
  //       return false;
  //     }
  //   }
  //   // else if (input.type === 'checkbox' && !input.checked) {
  //   //   return false;
  //   // }
  // }
  return true;
}

// Initialize the UI
updateStepUI(1);

// --------------------------------------------------------------------------------------- end

// Get references to all the color pickers, hex color code inputs, and pencil buttons
// Loop through each color picker set
for (let i = 0; i < colorPickers.length; i++) {
  const colorPicker = colorPickers[i];
  const hexColorCodeInput = hexColorCodeInputs[i];
  const pencilButton = pencilButtons[i];

  // Event handler for when the color picker value changes
  colorPicker.addEventListener('input', function () {
    // Update the value of the corresponding hex color code input
    hexColorCodeInput.value = colorPicker.value;
  });

  // Event handler for when the pencil button is clicked
  pencilButton.addEventListener('click', function () {
    // Open the color picker dialog for the corresponding color picker
    colorPicker.click();
  });
}
// --------------------------------------------------------------------------------------- end
// for uploaded images or file script
fileInput.addEventListener('change', function () {
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      filePreview.style.display = 'block';
      uploadSection.style.display = 'none';
    };

    reader.readAsDataURL(file);
  } else {
    imagePreview.src = '';
    filePreview.style.display = 'none';
    uploadSection.style.display = 'block';
  }
});
