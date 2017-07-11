function submit(){
	// define event listener
	function onClick(){
		let submitBtn = document.getElementById("submit");
		let input = document.getElementById("text");
    
    let message = input.value;
		alert("Hello! I am an alert box!!");
		
	}
	
	// set event listener
	let redSlider = document.getElementById("slider-red");
	redSlider.addEventListener("input", onSliderChanged);
	let greenSlider = document.getElementById("slider-green");
	greenSlider.addEventListener("input", onSliderChanged);
	let blueSlider = document.getElementById("slider-blue");
	blueSlider.addEventListener("input", onSliderChanged);
	// initialize the color
	onSliderChanged();

}
