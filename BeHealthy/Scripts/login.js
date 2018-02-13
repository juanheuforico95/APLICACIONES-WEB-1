// Initialize Firebase

      var config = {
        apiKey: "AIzaSyDLxr54S26OCqPzyl6rZcOSgRWDiqAbGbU",
        authDomain: "webapp-8ff8d.firebaseapp.com",
        databaseURL: "https://webapp-8ff8d.firebaseio.com",
        projectId: "webapp-8ff8d",
        storageBucket: "webapp-8ff8d.appspot.com",
        messagingSenderId: "322729223975"
      };
      firebase.initializeApp(config);


function registrar(){
	console.log("diste un clic")
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;

	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(function(){
		verificar();
	})
	.catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		console.log(errorCode);
  		console.log(errorMessage);
	});
}

function ingreso(){
	var email2 = document.getElementById('email2').value;
	var password2 = document.getElementById('password2').value;

	firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
	  // Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
  		console.log(errorCode);
  		console.log(errorMessage);
	});
}

function observador(){
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {

	  	console.log("Existe usuario activo");
	  	aparece(user);
	    // User is signed in.
	    var displayName = user.displayName;
	    
	    var email = user.email;
	    var emailVerified = user.emailVerified;
	    console.log(user.emailVerified);
	    
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    var providerData = user.providerData;
	    // ...
	  } else {
	    // User is signed out.
	    console.log("No existe usuario activo");
	    contenido.innerHTML = `
		
		`
	
		;
	  }
	});
}
observador();

function aparece(user){
	var user = user;
	var contenido = document.getElementById('contenido');
	if (user.emailVerified){
		

		/*  Lo que modifique */

		window.location.replace("index.html");

		/* ------------------------ */


		contenido.innerHTML = `
		<div class="container mt-5"> 
		<div class="alert alert-success" role="alert">
			<h4 class="alert-heading">Bienvenido! ${user.email}</h4>
			<p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
			<hr>
			<p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
			</div>
			<button onclick="cerrar()" class="btn btn-danger">Cerrar sesion </button>
			</div>
		`
	
		;
	}
}

function cerrar(){
	firebase.auth().signOut()
	.then(function(){
		console.log("Saliendo")
	})
	.catch(function(error){
		console.log(error)
	})
}

function verificar(){
	var user = firebase.auth().currentUser;

	user.sendEmailVerification().then(function() {
	  // Email sent.
	  console.log("Enviando correo");
	}).catch(function(error) {
		console.log(error);
	});

}