"use strict";
//focus on initial input when page loads
window.onload = () => document.getElementById("name").focus();
document.getElementById("createAccount").addEventListener("click", event => {
	//stop that event!
	event.preventDefault();

	//grab DOM elements for validation
	let username = document.getElementById("name").value;
	let password = document.getElementById("password").value;
	let email = document.getElementById("email").value;
	let showError = document.getElementById("error");
	let error = 0; //track number of errors
	let errorMsg = ""; //append to me!

	//check input length (basic validation)
	if (validateInputLength(username, 3)) {
		error++;
		errorMsg += " Usernames must be 3 or more characters."
	}
	if (validateInputLength(password, 8)) {
		error++;
		errorMsg += " Passwords must be 8 or more characters."
	}

	//if error, display it
	if (error) {
		showError.classList.add("error");
		showError.textContent = errorMsg;
	} else {
		//call xhr with form data
		xhr({
			url : "/create",
			data :`user=${username}&pass=${password}&email=${email}`,
			method: "POST"
		}).then(data => {
			//on promise resolve, parse the message, toggle success/error, and show response msg
			let response = JSON.parse(data);
			console.log(data);
			if (response["flag"] === true) toggleError(showError, "success", "error");
			else toggleError(showError, "error", "success");
			showError.textContent += response["msg"];
		});
	}
}, false);