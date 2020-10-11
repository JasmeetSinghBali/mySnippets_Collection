// Init webkitSpeechRecognition API
var speechRecognition = window.webkitSpeechRecognition;
var recognition=new speechRecognition();

//pull a native DOM element from a jQuery object
var textoutput=$("#textoutput");
var instructions=$("#instructions")

// DOM Elements
const body = document.querySelector('body');


// Init content we speak
let content = '';

recognition.continuous=true;

//when recognition starts handling built in functions.
recognition.onstart=()=>{
	instructions.text("Voice Recognition is on");
	// Add background animation
		body.style.background = '#141414 url(img/text.gif)';
		body.style.backgroundRepeat = 'repeat-x';
		body.style.backgroundSize = '100% 100%';
};

recognition.onspeechend=()=>{
	instructions.text("No Activity");
	//Done speaking...
  body.style.background = '#141414';

};

recognition.error=()=>{
	instructions.text("Something Went Wrong Try Again Please.");
};

//transfering data of the user speech and processing it.
recognition.onresult=(e)=>{
	var current=event.resultIndex;
	var transcript=event.results[current][0].transcript
	content+=transcript;
	textoutput.val(content);//just putting the speech to text output in the textoutput area.
};
//handling event when User speaks
$("#start").click((e)=>{
	if(content.length){
		content+=''

	}
	recognition.start();
});
