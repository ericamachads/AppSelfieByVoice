// Initialize the speech recognition API
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

// Get the textarea element by its ID
var Textbox = document.getElementById("textbox"); 

Webcam.attach(camera);

// Function to start speech recognition
function start()
{
    Textbox.innerHTML = ""; 
    recognition.start();
} 

// Event handler when speech recognition results are available
recognition.onresult = function(event) {
    console.log(event); 
    // Get the transcribed content from the recognition results
    var Content = event.results[0][0].transcript;

    // Display the transcribed content in the textarea
    Textbox.innerHTML = Content;
    console.log(Content);

    // Check if the transcribed content is "take my selfie"
    if(Content == "take my selfie" || Content =="Take my selfie" )
    {
    console.log("Taking a selfie...");
    speak();
    }
}

// Function to generate a spoken message
function speak(){
    var synth = window.speechSynthesis;

    // Message to be spoken
    speak_data = "Taking your selfie in 5 seconds";

    // Create a speech synthesis utterance
    var utterThis = new SpeechSynthesisUtterance(speak_data);

    // Use the speech synthesis API to speak the message
    synth.speak(utterThis);

    // Delay taking the selfie after 5 seconds
    setTimeout(function()
    { 
        take_selfie(); 
        save();
    }, 5000);
}

// Webcam configuration
camera = document.getElementById("camera");
Webcam.set({
    width:360,
    height:250,
    image_format : 'jpeg',
    jpeg_quality:90
});

// Function to take a selfie using the webcam
function take_selfie()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'"/>';
    });
}

// Function to save the selfie as a download link
function save()
{
  link = document.getElementById("link");
  image = document.getElementById("selfie_image").src ;
  link.href = image;
  link.click();
}