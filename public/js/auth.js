const myForm = document.querySelector("form");

var url = window.location.hostname.includes("localhost")
	? "http://localhost:8080/api/auth/"
	: "https://restserver-curso-fher.herokuapp.com/api/auth/";

myForm.addEventListener("submit", (event) => {
	//Stopts default refreshing whem submitted
	event.preventDefault();

	const formData = {};
	//Extract all the data of fields with names in it of myForm
	for (let el of myForm.elements) {
		if (el.name.length > 0) {
			formData[el.name] = el.value;
		}
	}
	fetch(url + "login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(formData),
	})
		.then((resp) => resp.json())
		.then(({ msg, token }) => {
			if (msg) return console.log(msg);
			localStorage.setItem("xToken", token);
			window.location = "/chat.html";
		})
		.catch((errors) => console.log(errors));
});
function onSignIn(googleUser) {
	// var profile = googleUser.getBasicProfile();
	// console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
	// console.log("Name: " + profile.getName());
	// console.log("Image URL: " + profile.getImageUrl());
	// console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.

	var id_token = googleUser.getAuthResponse().id_token;
	const data = { id_token };

	fetch(url + "google", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	})
		.then((resp) => resp.json())
		.then(({ token }) => {
			console.log("Nuestro server\n Token:", token);
			localStorage.setItem("xToken", token);
			window.location = "/chat.html";
		})
		.catch(console.log);
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log("User signed out.");
	});
}
