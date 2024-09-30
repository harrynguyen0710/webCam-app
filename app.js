const cameraVideoElement = document.getElementById('cameraVideo'); //html element displays camera

let cameraStream = null; // stores video stream coming from user
let isCameraOn = true; // turns on camera by default

/* 
Function to start the camera
input: none
process: check user permission for accessing to user camera. If user allows, get the video stream and assign to the html element
for displaying camera, else print error on the console.
output: none
*/
async function startCamera() {
  try {
    // access user camera
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });

    // if user allows to access, assign the video stream to html element
    cameraVideoElement.srcObject = cameraStream;

  } catch (err) {
    console.error('Error accessing the camera: ', err);
  }
}

/*
Function to stop the camera
input: none
process: get all tracks from camera stream and stop them, then assign html element to be null
output: none
*/
function stopCamera() {
  // get tracks from camera stream
  let tracks = cameraStream.getTracks();

  // using loop to stop all tracks.
  tracks.forEach(track => track.stop());
  
  // assign html element to null to stop displaying 
  cameraVideoElement.srcObject = null;
}

/*
Toggle the camera on/off
input: none
process: if user click to the button when isCameraOn  == True, call stopCamera method, else call startCamera method
output: none
*/
toggleCameraButton.addEventListener('click', () => {
  // if user click when camera is active
  if (isCameraOn) {

    // call stopCamera method
    stopCamera(); 

    // modify the content of the camera button
    toggleCameraButton.textContent = 'Turn Camera On';
  } 
  // if user click when camera is anactive
  else {

    // call the startCamera method to open camera
    startCamera();

    // modify the content of the camera button
    toggleCameraButton.textContent = 'Turn Camera Off';
  }
  
  // change the value of the variable. if isCamera == True means the camera is active, else it's inactive
  isCameraOn = !isCameraOn;
});

// Start the camera by default
startCamera();