/* Login Firebase */
// Registro de nuevos usuarios*/
$('#btnCreateAccount').click(function() {
  console.log('diste click en Registrar');
  let email2 = document.getElementById('email2').value;
  let password2 = document.getElementById('pwd2').value;
  console.log(email2);
  console.log(password2);
  firebase.auth().createUserWithEmailAndPassword(email2, password2)
    .then(function() {
      // verificarEmail() aun no se implementa
    })
    .catch(function(error) { // promesa catch, si la autentificacion no ocurre catch ejecuta funcion con parametro e, donde se guardo 2 errores en variables
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // console.log(errorCode);
      // console.log(errorMessage);
      alert(error.code);
    });
});


// Ingreso usuarios o logue
$('#btnSignIn').click(function() {
  console.log('diste click en Ingresar');
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  console.log(email);
  console.log(password);
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // console.log(errorCode);
      // console.log(errorMessage);
      alert(error.code);
    });
});


// función que observa la sesion activa de un usuario
// poner en menu: <li><a class="user" href="#">Bienvenido, ${user.email}</a></li> 
function observador() {
  // Si existe un cambio de usuario
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('Existe usuario activo');
      var displayName = user.displayName;
      var email = user.email;
      // console.log('Correo verificado: ' + user.emailVerified);
      // var emailVerified = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
    } else {
      // No user is signed in.
      console.log('No existe usuario activo');
    }
  });
}
observador(); // se ejecuta cuando se carga la documento


// Funcion para desloguearse 
$('#btnSignOut').click(function() {
  firebase.auth().signOut() // Cierra sesion desde firebase, toma 2 parametros then y catch
    .then(function() { // (respuesta positiva)
      // Sign-out successful.
      console.log('Sesión cerrada');
    }).catch(function(error) {// (respuesta negativa)/error : parametro
      // An error happened.
      console.log(error);
    });
});

// Envía un mensaje de verificación al usuario 
// funcion no se ha implementado aun
function verificarEmail() {
  var user = firebase.auth().currentUser;

  user.sendEmailVerification()
    .then(function() { // (respuesta positiva)
      // Email sent.
      console.log('Correo enviado con éxito'); // muestra un mensaje que 
    }).catch(function(error) { // (respuesta negativa)
      // An error happened.
      console.log(error); // pinta error de verificación
    });
}
/* --------------------------------------------------------------------------------------------------------------- */
