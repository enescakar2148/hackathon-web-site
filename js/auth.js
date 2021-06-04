var ui = new firebaseui.auth.AuthUI(firebase.auth());

var emailcomp = $("#email_input")
var passcomp = $("#password_input")
var repasscomp = $("#repassword_input")


var login = () => {
	let email = emailcomp.val()
	let password = passcomp.val()

	firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user.email)
	console.log("Succesfull")
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

var signin = () => {
	let email = emailcomp.val()
	let password = passcomp.val()
	let repassword = repasscomp.val()

	if (password==repassword) {

		firebase.auth().createUserWithEmailAndPassword(email, password)
	  .then((userCredential) => {
	    // Signed in 
	    var user = userCredential.user;
	    console.log(user.email)
	    console.log("Succesfull")
	    // ...
	  })
	  .catch((error) => {
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    // ..
	    console.log(errorMessage)
	  });
	}

}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    console.log(user.email)
    window.location.href = "https://enescakar2148.github.io/hackathon-web-site/home.html?email="+user.email;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

