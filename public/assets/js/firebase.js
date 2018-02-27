/* Login Firebase */
// Registro de nuevos usuarios*/
let register = document.getElementById('btnCreateAccount');
register.addEventListener('click', registrar());
function registrar() {
  console.log('diste click en Ingresar');
  let email2 = document.getElementById('email2').value;
  let password2 = document.getElementById('pwd2').value;
  console.log(email2);
  console.log(pwd2);
  firebase.auth().createUserWithEmailAndPassword(email2, pwd2)
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
};

// Ingreso usuarios o logueo
let signin = document.getElementById('btnSignIn');
register.addEventListener('click', ingresar());
function ingresar() {
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
};

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


// Funcion para desloguearse Pendiente de terminar
let signOut = document.getElementById('btnSignOut');
register.addEventListener('click', cerrar());
function cerrar() {
  firebase.auth().signOut() // Cierra sesion desde firebase, toma 2 parametros then y catch
    .then(function() { // (respuesta positiva)
      // Sign-out successful.
      console.log('Sesión cerrada');
    }).catch(function(error) {// (respuesta negativa)/error : parametro
      // An error happened.
      console.log(error);
    });
}

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
/* Inicializando Cloud Firestore */
/* esta parte dara errores porque falta implementar al carrito de compras */
firebase.initializeApp({
  apiKey: 'AIzaSyAmkjOzP-gCKgvNm0kEJCYWd56GcGncmss',
  authDomain: 'ecommerce-7b26c.firebaseapp.com',
  projectId: 'ecommerce-7b26c'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Agregar documentos
function guardar() {
  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var fecha = document.getElementById('fecha').value;

  db.collection('users').add({
    first: nombre,
    last: apellido,
    born: fecha
  })
    .then(function(docRef) {
      console.log('Document written with ID: ', docRef.id);
      document.getElementById('nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('fecha').value = '';
    })
    .catch(function(error) {
      console.error('Error adding document: ', error);
    });
}

// Leer documentos
var tabla = document.getElementById('tabla');
db.collection('users').onSnapshot((querySnapshot) => {
  tabla.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().first}`);
    tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().first}</td>
        <td>${doc.data().last}</td>
        <td>${doc.data().born}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
        </tr>
        `;
  });
});

// borrar documentos
function eliminar(id) {
  db.collection('users').doc(id).delete().then(function() {
    console.log('Document successfully deleted!');
  }).catch(function(error) {
    console.error('Error removing document: ', error);
  });
}

// editar documentos
function editar(id, nombre, apellido, fecha) {
  document.getElementById('nombre').value = nombre;
  document.getElementById('apellido').value = apellido;
  document.getElementById('fecha').value = fecha;
  var boton = document.getElementById('boton');
  boton.innerHTML = 'Editar';

  boton.onclick = function() {
    var usersRef = db.collection('users').doc(id);
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fecha = document.getElementById('fecha').value;

    return usersRef.update({
      first: nombre,
      last: apellido,
      born: fecha
    })
      .then(function() {
        console.log('Document successfully updated!');
        boton.innerHTML = 'Guardar';
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('fecha').value = '';
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error actualizando el archivo: ', error);
      });
  };
}