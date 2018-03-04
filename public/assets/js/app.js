function openNav() {
  document.getElementById('mySidenav').style.width = '70%';
  // document.getElementById("flipkart-navbar").style.width = "50%";

  document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
}

function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
  document.body.style.backgroundColor = 'rgba(0,0,0,0)';
}

// FUNCIÓN PARA CREAR LA VISTA DE CADA ARTÍCULO
function viewItem(data) {
  let resultsSearchInput = document.querySelector('.resultsSearchInput');
  resultsSearchInput.innerHTML = '';
  for (let item = 0; item < data.results.length; item++) {
    // Envuelve cada resultado
    let divWrap = document.createElement('div');
    divWrap.className = 'divWrap';
    let divPhoto = document.createElement('div');
    // Foto de cada producto
    let photo = document.createElement('img');
    photo.setAttribute('src', data.results[item].thumbnail);
    divPhoto.appendChild(photo);
    photo.className = 'photo';
    divPhoto.className = 'divPhoto';
    photo.className = 'photo';
    // Precio del producto
    let divPrice = document.createElement('div');
    let price = document.createElement('p');
    divPrice.className = 'divPrice';
    price.textContent = data.results[item].price;
    let simbolPeso = '$';
    let pPeso = document.createElement('p');
    pPeso.textContent = (simbolPeso);
    divPrice.appendChild(pPeso);
    divPrice.appendChild(price);
    divPrice.className = 'divPrice';

    // Título del producto
    let divTitle = document.createElement('div');
    divTitle.className = 'divTitle';
    let title = document.createElement('p');
    title.textContent = data.results[item].title;
    divTitle.appendChild(title);
    let heart = document.createElement('img');
    heart.className = 'heart';
    heart.setAttribute('name', 'heart');
    heart.setAttribute('src', '/assets/images/cupid.png');
    let cartto = document.createElement('img');
    cartto.className = 'cartto';
    cartto.setAttribute('name', 'cart');
    cartto.setAttribute('src', '/assets/images/shopping-cart.png');
    divOptions = document.createElement('div');
    divOptions.className = 'divOptions';
    divOptions.appendChild(heart);
    divOptions.appendChild(cartto);


    divWrap.appendChild(divPhoto);
    divWrap.appendChild(divPrice);
    divWrap.appendChild(divTitle);
    divWrap.appendChild(divOptions);
    divWrap.setAttribute('name', data.results[item].category_id);
    resultsSearchInput.appendChild(divWrap);
  }
  return resultsSearchInput;
}

// FUNCIÓN PARA LA GENERACIÓN DE CATEGORIAS
function categories(data) {
  let select = document.querySelector('.categoriesSelect');
  select.style.fontWeight = 'bold';
  select.style.fontSize = '1.2em';

  for (let category = 0; category < data.length; category++) {
    let option = document.createElement('option');
    option.className = 'option';
    option.value = data[category].id;
    option.textContent = data[category].name;
    option.style.fontWeight = 'bold';
    select.appendChild(option);
  }
  return select;
}

function constructorCart(event, data, nameSearch) {
  // LLAMAR A LA SECCION CART
  let containerCart = document.querySelector('.containerCart');
  // AGREGARLE TÍTULO AL CARRITO DE COMPRAS
  // AGREGAR ITEMS AL CARRITO DE COMPRAS
  let divPhotoItem = document.createElement('div');
  let photoItem = document.createElement('img');
  photoItem.setAttribute('src', event.parentNode.parentNode.firstChild.firstChild.getAttribute('src'));
  divPhotoItem.appendChild(photoItem);
  divPhotoItem.className = 'divPhotoItem';
  let parTitleItem = document.createElement('p');
  let titleItem = event.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.textContent;
  parTitleItem.textContent = titleItem;
  let divTitleItem = document.createElement('div');
  divTitleItem.className = 'divTitleItem';
  divTitleItem.appendChild(parTitleItem);
  let parPriceItem = document.createElement('p');
  let unitPrice = document.createElement('div');
  let priceItem = event.parentNode.parentNode.firstChild.nextSibling.textContent;
  priceItem.className = 'priceItem';
  parPriceItem.textContent = priceItem;
  unitPrice.textContent = priceItem.toString().replace('$', '');
  unitPrice.style.display = 'none';
  unitPrice.className = 'unitPrice';
  let divPriceItem = document.createElement('div');
  divPriceItem.className = ('divPriceItem');
  divPriceItem.appendChild(parPriceItem);
  divPriceItem.appendChild(unitPrice);

  let divWraperItemCart = document.createElement('div');
  divWraperItemCart.appendChild(divPhotoItem);
  let divOtherItems = document.createElement('div');
  divOtherItems.className = 'divOtherItems';
  divOtherItems.appendChild(divTitleItem);
  divWraperItemCart.className = 'divWraperItemCart';

  // CANTIDAD DE ARTÍCULOS
  let select = document.createElement('select');
  select.className = 'selectQ';
  for (let i = 0; i < data.results.length; i++) {
    if (nameSearch === data.results[i].title) {
      let quantityAvailable = data.results[i].available_quantity;
      console.log(quantityAvailable);
      for (let y = 1; y < quantityAvailable + 1; y++) {
        let option = document.createElement('option');
        let textOption = document.createElement('p');
        textOption.textContent = (y);
        option.appendChild(textOption);
        select.appendChild(option);
      }
    }
  }


  
  let Quantity = document.createElement('span');
  Quantity.textContent = 'Quantity: ';
  let divQuantity = document.createElement('div');
  divQuantity.className = 'divQuantity';
  divQuantity.appendChild(Quantity);
  divQuantity.appendChild(select);
  divOtherItems.appendChild(divQuantity);
  divWraperItemCart.appendChild(divOtherItems);
  divOtherItems.appendChild(divPriceItem);

  containerCart.appendChild(divWraperItemCart);
  return containerCart;
}

function countToCart() {
  let counterAddToCart = document.querySelector('.counterAddToCart');
  let valueActualCart = counterAddToCart.textContent;
  let actualCart = parseInt(valueActualCart) + 1;
  counterAddToCart.innerHTML = '';
  counterAddToCart.appendChild(document.createTextNode(actualCart));
  return counterAddToCart;
}




// CONSULTA A LA API DE MERCADOLIBRE PARA OBTENER TODAS LAS CATEGORÍAS
fetch('https://api.mercadolibre.com/sites/MLC/categories', {
  method: 'GET',
  mode: 'cors',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})
  .then(function(respt) {
    return respt.json();
  })
  .then(function(data) {
    console.log(data);
    // LLAMADA DE FUNCIÓN 'categories' PARA GENERAR CATEGORIAS
    categories(data);

    let inputSearch = document.querySelector('.inputSearch');
    let search = document.querySelector('.search');
    search.addEventListener('click', function() {
      let valueInput = inputSearch.value;
      console.log(valueInput);
      for (let i = 0; i < data.length; i++) {
        let regex = new RegExp(valueInput, 'i', 'g');
        let searchApi = data[i].name;
        if (regex.test(searchApi) === true) {
          let caterorySearch = data[i].id;
          fetch('https://api.mercadolibre.com/sites/MLC/search?category=' + caterorySearch, {
            method: 'GET',
            mode: 'cors',

            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
            .then(function(respt) {
              return respt.json();
            })
            .then(function(data) {
              console.log(data);
              viewItem(data);
              // LLAMADA DE FUNCIÓN 'categories' PARA GENERAR CATEGORIAS
            });
        }
      }
    });

    let categoriesSelect = document.querySelector('.categoriesSelect');
    categoriesSelect.addEventListener('change', function() {
      console.log(categoriesSelect.value);
      fetch('https://api.mercadolibre.com/sites/MLC/search?category=' + categoriesSelect.value, {
        method: 'GET',
        mode: 'cors',

        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(function(respt) {
          return respt.json();
        })
        .then(function(data) {
          viewItem(data);

          // LLAMADA DE FUNCIÓN 'categories' PARA GENERAR CATEGORIAS
        });
    });


    let thirdNav = document.querySelector('.thirdNav');
    thirdNav.addEventListener('click', function() {
      console.log(event.target.name);
      fetch('https://api.mercadolibre.com/sites/MLC/search?category=' + event.target.name, {
        method: 'GET',
        mode: 'cors',

        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(function(respt) {
          return respt.json();
        })
        .then(function(data) {
          console.log('fdddddddddddd', data);

          viewItem(data);
        });
    });
  });
// EVENTO PARA DETECTAR SI EL CLICK LO HACE EL USUARIO EN CART O WISH
let resultsSearchInput = document.querySelector('.resultsSearchInput');
resultsSearchInput.addEventListener('click', function() {
  let eventCartWish = event.target.name;
  let pointerEvent = event.target;
  console.log('p', pointerEvent.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.textContent);
  console.log(eventCartWish);
  if (eventCartWish === 'cart') {
    countToCart();
    let keySearch = event.target.parentNode.parentNode.getAttribute('name');
    let nameSearch = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.textContent;
    console.log('oooo', nameSearch);
    fetch('https://api.mercadolibre.com/sites/MLC/search?category=' + keySearch, {
      method: 'GET',
      mode: 'cors',

      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(function(respt) {
        return respt.json();
      })
      .then(function(data) {
        console.log('f', data);
        constructorCart(pointerEvent, data, nameSearch);
        viewItem(data);
        calculator();
      });
  } 


  // FUNCIÓN PARA CREAR CONTENEDOR DE LA SECCIÓN CART y WISH
  // TENDRÁN ESTILOS PARECIDOS
});


function calculator() {
  // EVENTO CUANDO AGREGUE AL CARRITO RESCATE VALOR Y SUME
 
  $('.selectQ').change(function(evt) {
    
    let valueSelect = $(this).val();
    let pPrice = $(this).parent().next().find('p');
    let priceUnic = $(this).parent().next().find('.unitPrice').text();
    pPrice.text('$' + (valueSelect * parseInt(priceUnic)));
    // let priceUnic = priceText.toString().replace('$', '');
    // let total = parseInt(priceUnic * valueSelect);
    // priceText = '$' + total;
  //   pTotal.appendChild(document.createTextNode(total));
  //   let divPriceItem = this.querySelector('.divPriceItem');
  //   divPriceItem.innerHTML = '';
  //   divPriceItem.appendChild(pTotal);
  });
 
  
  // let containerCart = document.querySelector('.containerCart');
  // containerCart.addEventListener('click', function() {
  //   let select =;
  //   let valueSelect = select.value;
  //   console.log(valueSelect);
  //   let priceItem = event.target.parentNode.nextSibling.firstChild.textContent;
  //   let priceUnic = priceItem.toString().replace('$', '');
  //   // console.log(valueSelect, priceUnic);

  //   let total = parseInt(priceUnic * valueSelect);
  //   let pTotal = document.createElement('p');
  //   pTotal.appendChild(document.createTextNode(total));
  //   let divPriceItem = this.querySelector('.divPriceItem');
  //   divPriceItem.innerHTML = '';
  //   divPriceItem.appendChild(pTotal);
  // });
};

// let valueFlip = (inputSearch.value);
// for (let i = 0; i < listCateg.results.length; i++) {
//   let valuesResults = (listCateg.results[i].title);
//   let regex = new RegExp(valueFlip, 'i', 'g');
//   if (regex.test(valuesResults) === true) {


// $(document).ready(function () {

/* Llamando a la api de mercadolibre, categoría electrodomésticos */
// fetch('https://api.mercadolibre.com/sites/MLA/search?category=MLA5726')

// .then(function (response) {
// Turns the the JSON into a JS object
//   return response.json();
// })
// .then(function (data) {
// console.log(data);

/* Creando en la sección ofertas de html un contenedor con imagenes, título, precio y disponibilidad del producto */
// $('#sectionOffers').append('<div class="container-fluid"><div class="row"><div class="col-md-12">' +
//   '<h3>Ofertas recomendadas para ti</h3></div></div></div><div class="container-fluid">' +
//   '<div class="row"><div class="col-md-2"><a href="#"><img class="imgOffers" src="' + data.results[0].thumbnail + '"></a>' +
//   '<p class="productTitle"><strong>' + data.results[0].title + '</strong></p><p class="priceOffers">$ ' + data.results[0].price + '</p>' +
//   '<h4><strong>Disponibilidad: ' + data.results[0].available_quantity + '</strong></h4><a class="viewMore op1" href="#"><p class="toCart">View More</p></a></div>' +
//   '<div class="col-md-2"><a href="#"><img class="imgOffers" src="' + data.results[1].thumbnail + '"></a><p class="productTitle"><strong>' + data.results[1].title + '</strong></p>' +
//   '<p class="priceOffers">$ ' + data.results[1].price + '</p><h4><strong>Disponibilidad: ' + data.results[1].available_quantity + '</strong></h4><a class="viewMore op2" href="#"><p class="toCart">View More</p>' +
//   '</a></div><div class="col-md-2"><a href="#"><img class="imgOffers" src="' + data.results[2].thumbnail + '">' +
//   '</a><p class="productTitle"><strong>' + data.results[2].title + '</strong></p><p class="priceOffers">$ ' + data.results[2].price + '</p><h4><strong>Disponibilidad: ' + data.results[2].available_quantity + '</strong></h4><a class="viewMore op3" href="#"><p class="toCart">View More</p>' +
//   '</a></div><div class="col-md-2"><a href="#"><img class="imgOffers"src="' + data.results[3].thumbnail + '"></a><p class="productTitle"><strong>' + data.results[3].title + '</strong></p>' +
//   '<p class="priceOffers">$ ' + data.results[3].price + '</p><h4><strong>Disponibilidad: ' + data.results[3].available_quantity + '</strong></h4><a class="viewMore op4" href="#"><p class="toCart">View More</p></a></div>' +
//   '<div class="col-md-3 col-md-offset-1 imgBorder"><a href="#"><img class="imgOffers imgRight"src="' + data.results[4].thumbnail +
//   '"></a><p class="productTitle"><strong>' + data.results[4].title + '</strong></p><p class="priceOffers offert">Precio $ ' + data.results[4].price + '</p><h4><strong>Disponibilidad: ' + data.results[4].available_quantity + '</strong></h4><strike><p class="priceOffers originalPrice">' +
//   'Precio original $ ' + data.results[4].original_price + '</p></strike><a class="viewMore op5" href="#"><p class="toCart">View More</p></a></div>' +
//   '</div></div>');

/* Creando en la sección artículos vistos de html un contenedor con imagenes, título, precio y disponibilidad del producto */
// $('#sectionSeen').append('<div class="container-fluid"><div class="row"><div class="col-md-12"><h3>Relacionado con los artículos que has visto' +
//   '</h3></div></div></div><div class="container-fluid"><div class="row"><div class="col-md-2"><a href="#"><img class="imgOffers" src="' + data.results[5].thumbnail + '">' +
//   '</a><p class="productTitle"><strong>' + data.results[5].title + '</strong></p><p class="priceOffers">$ ' + data.results[5].price + '</p><h4><strong>Disponibilidad: ' + data.results[5].available_quantity + '</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2">' +
//   '<a href="#"><img class="imgOffers" src="' + data.results[6].thumbnail + '"></a><p class="productTitle"><strong>' + data.results[6].title + '</strong></p><p class="priceOffers">$ ' + data.results[6].price + '</p><h4><strong>Disponibilidad: ' + data.results[6].available_quantity + '</strong></h4>' +
//   '<a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2"><a href="#"><img class="imgOffers" src="' + data.results[7].thumbnail + '">' +
//   '</a><p class="productTitle"><strong>' + data.results[7].title + '</strong></p><p class="priceOffers">$ ' + data.results[7].price + '</p><h4><strong>Disponibilidad: ' + data.results[7].available_quantity + '</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2">' +
//   '<a href="#"><img class="imgOffers" src="' + data.results[8].thumbnail + '"></a><p class="productTitle"><strong>' + data.results[8].title + '</strong></p><p class="priceOffers">$ ' + data.results[8].price + '</p><h4><strong>Disponibilidad: ' + data.results[8].available_quantity + '</strong></h4><a class="viewMore" href="#">' +
//   '<p class="toCart">View More</p></a></div><div class="col-md-3 col-md-offset-1 imgBorderTwo"><a href="#"><img class="imgOffers imgRight"' +
//   'src="' + data.results[12].thumbnail + '"></a><p class="productTitle"><strong>' + data.results[12].title + '</strong></p><p class="priceOffers offert">Precio $ ' + data.results[12].price + '</p><strike><p class="priceOffers originalPrice">' +
//   'Precio original $ ' + data.results[12].original_price + '</p></strike><a class="viewMore" href="#"><p class="toCart">View More</p></a></div></div></div>');


/* Llamando a la api de mercadolibre, categoría tecnología */
// fetch('https://api.mercadolibre.com/sites/MLA/search?all=new&q=dell')

// .then(function (res) {
// Turns the the JSON into a JS object
//   return res.json();
// })
// .then(function (dat) {
// console.log(dat);

/* Creando en la sección ofertas recomendadas de html un contenedor con imagenes, título, precio y disponibilidad del producto */
// $('#sectionTechnology').append('<div class="container-fluid"><div class="row"><div class="col-md-12">' +
//   '<h3>Ofertas recomendadas para ti</h3></div></div></div><div class="container-fluid">' +
//   '<div class="row"><div class="col-md-2 col-md-offset-1"><a href="#"><img class="imgOffers" src="' + dat.results[0].thumbnail + '"></a><p class="productTitle"><strong>' + dat.results[0].title + '</strong></p><p class="priceOffers">$ ' + dat.results[0].price +
//   '</p><h4><strong>Disponibilidad: ' + dat.results[0].available_quantity + '</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2"><a href="#"><img class="imgOffers" src="' + dat.results[1].thumbnail + '"></a><p class="productTitle"><strong>' + dat.results[1].title + '</strong></p>' +
//   '<p class="priceOffers">$ ' + dat.results[1].price + '</p><h4><strong>Disponibilidad: ' + dat.results[1].available_quantity + '</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2"><a href="#"><img class="imgOffers" src="' + dat.results[2].thumbnail + '">' +
//   '</a><p class="productTitle"><strong>' + dat.results[2].title + '</strong></p><p class="priceOffers">$ ' + dat.results[2].price + '</p><h4><strong>Disponibilidad: ' + dat.results[2].available_quantity + '</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2"><a href="#"><img class="imgOffers"' +
//   'src="' + dat.results[3].thumbnail + '"></a><p class="productTitle"><strong>' + dat.results[3].title + '</strong></p><p class="priceOffers">$ ' + dat.results[3].price + '</p><h4><strong>Disponibilidad: ' + dat.results[3].available_quantity + '</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div>' +
//   '<div class="col-md-2 col-md-offset-right-1"><a href="#"><img class="imgOffers" src="' + dat.results[4].thumbnail + '"></a><p class="productTitle"><strong>' + dat.results[4].title + '</strong></p><p class="priceOffers">$ ' + dat.results[4].price + '</p><h4><strong>Disponibilidad: ' + dat.results[4].available_quantity + '</strong></h4>' +
//   '<a class="viewMore" href="#"><p class="toCart">View More</p></a></div></div></div>');

/* Llamando a la api de mercadolibre, categoría libros */
// fetch('https://api.mercadolibre.com/sites/MLA/search?category=MLA3025')

// .then(function (respt) {
// Turns the the JSON into a JS object
// return respt.json();
// })
// .then(function (info) {
// console.log(info);

/* Creando en la sección libros más vistos de html un contenedor con imagenes, título, precio y disponibilidad del producto */
// $('#sectionBooks').append('<div class="container-fluid"><div class="row"><div class="col-md-12">' +
//   '<h3>Libros más vendidos</h3></div></div></div><div class="container-fluid">' +
//   '<div class="row"><div class="col-md-2 col-md-offset-1"><a href="#"><img class="imgOffers" src="' + info.results[0].thumbnail + '"></a><p class="productTitle"><strong>' + info.results[0].title + '</strong></p><p class="priceOffers">$ ' + info.results[0].price +
//   '</p><h4><strong>Disponibilidad: ' + info.results[0].available_quantity + '</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2"><a href="#"><img class="imgOffers" src="' + info.results[1].thumbnail + '"></a><p class="productTitle"><strong>' + info.results[1].title + '</strong></p><p class="priceOffers">' +
//   '$ ' + info.results[1].price + '</p><h4><strong>Disponibilidad: ' + info.results[1].available_quantity + '</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2"><a href="#"><img class="imgOffers" src="' + info.results[2].thumbnail + '"></a><p class="productTitle"><strong>' + info.results[2].title + '</strong></p>' +
//   '<p class="priceOffers">$ ' + info.results[2].price + '</p><h4><strong>Disponibilidad: ' + info.results[2].available_quantity + '</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2"><a href="#"><img class="imgOffers" src="' + info.results[3].thumbnail + '">' +
//   '</a><p class="productTitle"><strong>' + info.results[3].title + '</strong></p><p class="priceOffers">$ ' + info.results[3].price + '</p><h4><strong>Disponibilidad: ' + info.results[3].available_quantity + '</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2 col-md-offset-right-1"><a href="#">' +
//   '<img class="imgOffers" src="' + info.results[4].thumbnail + '"></a><p class="productTitle"><strong>' + info.results[4].title + '</strong></p><p class="priceOffers">$ ' + info.results[4].price + '</p><h4><strong>Disponibilidad: ' + info.results[4].available_quantity + '</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div></div></div>');

/* Función para crear el detalle de cada producto */
// $('.viewMore').click(function () {
//   console.log(data.results)
//   let pDetail = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.textContent;
//   let iDetail = event.target.parentNode.parentNode.firstChild.firstChild.getAttribute("src");
//   let tDetail = event.target.parentNode.parentNode.firstChild.nextSibling.textContent;
//   let aDetail = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent;

/* Ocultando las demás secciones para que solo aparezca la sección de detalles */
// $('.hr').hide();
// $('#sectionOffers').hide();
// $('#sectionSeen').hide();
// $('#sectionTechnology').hide();
// $('#sectionBooks').hide();
// $('#advertising').hide();


/* Creando la sección de detalles de producto */
// $('#detail').append('<div class="container"><div class="row"><div class="col-md-4"><img class="imgDetail" src="' + iDetail + '">' +
//   '</div><div class="col-md-4"><h4>' + tDetail + '</h4><p>Rating: ' + data.results[0].reviews.rating_average + '</p><p>Price: ' + pDetail + '</p>' +
//   '<p>' + aDetail + '</p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, libero voluptas, similique dolore dolores, aspernatur esse sint dolor' +
//   'cumque expedita dicta ducimus nostrum nemo hic commodi quisquam maxime. Molestias, consectetur.</div></div></div>');

//               });
//             });
//         });
//     });
// });

// let navbarBack = document.querySelector('.navbarBack');
// navbarBack.addEventListener('click', function () {
//   let nameCategoria = event.target.getAttribute('name');
//   console.log(nameCategoria);


// fetch('https://api.mercadolibre.com/sites/MLC/search?category=' + nameCategoria, {
//     method: 'GET',
//     mode: 'cors',
//     headers: {
//       'Access-Control-Allow-Origin': '*'
//     }
//   })
// .then(function (respt) {
//   //Turns the the JSON into a JS object
//   return respt.json();
// })
// .then(function (info) {
//   console.log('ppppp', info);
//   let resultsSearchInput = document.querySelector('.resultsSearchInput');
//   resultsSearchInput.innerHTML = '';

//   let cartUp = document.querySelector(".cartUp");


//   cartUp.addEventListener('click', function () {
//     resultsSearchInput.style.display = 'none';

//     let Totales = document.querySelector('.Totales');
//     Totales.style.display = 'inline';
//     let cartt = document.querySelector('.cartt');
//     cartt.style.display = 'inline';
//     let enviar = document.querySelector('.enviar');
//     enviar.style.display = 'inline';
//   });

// Hacer imagenes de acuerdo a la escogencia del usuario

// Inicio
// for (let k = 0; k < info.results.length; k++) {
// console.log(info.results[k].price);
// console.log(info.results[k].title);
// console.log(info.results[k].available_quantity);
// console.log(info.results[k].thumbnail);

// let resultsList = document.querySelector('.resultsList');
// let divResultsInput = document.createElement('div');
// divResultsInput.className = 'divResultsInput';
// let divImages = document.createElement('div');
// divImages.className = 'divImages';
// let image = document.createElement('img');
// image.className = 'image';
// image.setAttribute('src', info.results[k].thumbnail);
// divImages.appendChild(image);

// let titleProduc = document.createTextNode(info.results[k].title);
// let pTitle = document.createElement('p');
// pTitle.appendChild(titleProduc);
// divTitle = document.createElement('div');
// divTitle.appendChild(pTitle);
// divTitle.className = 'divTitle';


// let priceProduc = document.createTextNode(info.results[k].price);
// let pPrice = document.createElement('p');
// let simbol = document.createTextNode('$ ');
// pPrice.appendChild(simbol);
// pPrice.appendChild(priceProduc);
// divPrice = document.createElement('div');
// divPrice.appendChild(pPrice);
// divPrice.className = 'divPrice';

// let pAvailable = document.createElement('p');
// let availableProduc = document.createTextNode(info.results[k].available_quantity);
// pAvailable.className = 'pAvailable';
// let textA = document.createTextNode('Disponibilidad: ');
// pAvailable.appendChild(textA);

// pAvailable.appendChild(availableProduc);
// divAvailable = document.createElement('div');
// divAvailable.appendChild(pAvailable);

// divResultsInput.appendChild(divImages);
// divResultsInput.appendChild(divTitle);
// divResultsInput.appendChild(divPrice);
// divResultsInput.appendChild(divAvailable);
// // divResultsInput.appendChild(divButton);

// resultsSearchInput.appendChild(divResultsInput);
// fin

// Inicio
// let detailProduct = document.querySelector('.detailProduct');

// image.addEventListener('click', function () {
//   resultsSearchInput.style.display = 'none';

//   detailProduct.innerHTML = '';
//   let divimageTitle = document.createElement('div');
//   divimageTitle.className = 'divimageTitle';
//   let divImag = document.createElement('div');
//   let imag = document.createElement('img');
//   imag.setAttribute('src', event.target.getAttribute('src'));
//   divImag.appendChild(imag);
//   divImag.className = 'divImag';
//   imag.className = 'imagenP';


//   let divTexts = document.createElement('div');
//   let titleDetail = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
//   let ptitleDetail = document.createElement('p');
//   let divtitleDetail = document.createElement('div');
//   ptitleDetail.appendChild(document.createTextNode(titleDetail));
//   divTexts.appendChild(ptitleDetail);
//   divTexts.className = 'divTexts';

//   let priceDetail = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.textContent;
//   let ppriceDetail = document.createElement('p');
//   ppriceDetail.appendChild(document.createTextNode(priceDetail));
//   divTexts.appendChild(ppriceDetail);


//   let availableDetail = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent;
//   let pavailableDetail = document.createElement('p');
//   pavailableDetail.appendChild(document.createTextNode(availableDetail));
//   divTexts.appendChild(pavailableDetail);

//   let pointerName = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
//   for (let index = 0; index < info.results.length; index++) {
//     if (pointerName === info.results[index].title) {
//       let condition = info.results[index].condition;
//       let pCondition;
//       if (condition === 'new') {

//         pCondition = document.createTextNode('Nuevo');
//       } else {
//         pCondition = document.createTextNode('Usado');
//       }
//       let pCond = document.createElement('p');
//       pCond.appendChild(pCondition);
//       divTexts.appendChild(pCond);
//       let shiping = info.results[index].shipping.free_shipping;
//       console.log(shiping)
//       let pshiping;
//       if (shiping === true) {
//         pshiping = document.createTextNode('Envío gratis a todo el país');
//       } else {
//         pshiping = document.createTextNode('El envio no es gratis');
//       }
//       let pShiping = document.createElement('p');
//       pShiping.appendChild(pshiping);
//       divTexts.appendChild(pShiping);

//       let buttonBuy = document.createElement('button');
//       buttonBuy.appendChild(document.createTextNode('Comprar'));
//       buttonBuy.className = 'buttonBuy';
//       divTexts.appendChild(buttonBuy);


//       let precioNormal = info.results[index].original_price;
//       if (precioNormal === null) {
//         let oferta = document.createTextNode('No posee oferta');
//       } else {
//         let oferta = document.createTextNode('Posee oferta');
//       }
//       let precioActual = info.results[index].price;
//     }

//   }
//   divimageTitle.appendChild(divImag)
//   divimageTitle.appendChild(divTexts)

//   detailProduct.appendChild(divimageTitle);

//   let cart = document.querySelector('cart');

// buttonBuy.addEventListener('click', function () {

// let titulo = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
// let imagenBuy = event.target.parentNode.parentNode.firstChild.firstChild.getAttribute('src');
// console.log(imagenBuy);

// for (let z = 0; z < info.results.length; z++) {
//   if (titulo === info.results[z].title) {
//     let selectQuantity = document.createElement('select');
//     selectQuantity.className = 'selectQuantity';
//     let quantityThis = info.results[z].available_quantity;
//     for (let y = 0; y < quantityThis; y++) {
//       let option = document.createElement('option');
//       let textQ = document.createTextNode(y + 1);
//       console.log(textQ);
//       let pQ = document.createElement('p');
//       pQ.appendChild(textQ);
//       option.appendChild(pQ);
//       selectQuantity.appendChild(option);
//     }
//     let divTexts = document.querySelector('.divTexts');
//     divTexts.appendChild(selectQuantity);

//   }
// }
// let cartBuy = document.querySelector('.cartt');
// let divCart = document.createElement('div');
// divCart.className = 'divCart';
// let buttonBuy = document.querySelector('.buttonBuy');
// let selectQuantity = document.querySelector('.selectQuantity');
// let total = document.createTextNode(0);
// let itemNumber = document.querySelector('.item-number');

// buttonBuy.addEventListener('click', function () {

//   let Totales = document.querySelector('.Totales');
//   Totales.style.display = 'none';
//   let detailProduct = document.querySelector('.detailProduct');
//   detailProduct.style.display = 'none';
//   let enviar = document.querySelector('.enviar');
//   enviar.style.display = 'none';
//   let itemNumber = document.querySelector('.item-number');

//   let numerActual = itemNumber.textContent;
//   let actual = parseInt(numerActual) + 1;
//   itemNumber.innerHTML = '';
//   itemNumber.appendChild(document.createTextNode(actual));

//   let imag = document.createElement('img');
//   imag.setAttribute('src', event.target.parentNode.parentNode.firstChild.firstChild.getAttribute('src'));
//   divCart.appendChild(imag);
//   let buyTitle = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
//   let pBuy = document.createElement('p');
//   pBuy.appendChild(document.createTextNode(buyTitle));
//   divCart.appendChild(pBuy);
//   let valueQuantity = selectQuantity.value;
//   let precioUnity = event.target.parentNode.firstChild.nextSibling.firstChild.textContent;
//   let precioClear = precioUnity.toString().replace('$ ', '');
//   console.log(precioClear);
//   let textPrecio = document.createElement('p');
//   textPrecio.appendChild(document.createTextNode(precioClear));
//   divCart.appendChild(textPrecio);
//   let quantitySelect = selectQuantity.value;
//   console.log(quantitySelect);
//   let pQuantity = document.createElement('p');
//   pQuantity.appendChild(document.createTextNode(quantitySelect));
//   divCart.appendChild(pQuantity);
//   cartBuy.appendChild(divCart);
//   let divTotal = document.createElement('div');
//   let Textdiv = document.createTextNode('Total: ');
//   let textTotalp = document.createElement('p');
//   textTotalp.appendChild(Textdiv);
//   let totalP = document.createElement('p');
//   totalP.appendChild(total);
//   divTotal.appendChild(textTotalp);
//   divTotal.className = 'divTotal';
//   divTotal.appendChild(totalP);
//   cartBuy.appendChild(divTotal);
//   console.log(totalP.textContent);
//   let actualTotal = totalP.textContent;
//   console.log(actualTotal);
//   suma += parseInt(actualTotal) + quantitySelect * precioClear;
//   totalP.innerHTML = '';
//   totalP.textContent = suma;
//   document.getElementById('Enviar').value = suma;
//   console.log(document.getElementById('Enviar').value);
//   let divTotall = document.createElement('div');
//   let Textdivv = document.createTextNode('Total: ');
//   let textTotalpp = document.createElement('p');
//   textTotalp.appendChild(Textdivv);
//   let totalPP = document.createElement('p');
//   totalP.appendChild(total);
//   divTotall.appendChild(textTotalpp);
//   divTotall.className = 'divTotal';
//   divTotall.appendChild(totalPP);
//   cartBuy.appendChild(divTotall);
//   console.log(totalP.textContent);
//   let actualTotall = totalP.textContent;
//   console.log(actualTotall);
//   suma += parseInt(actualTotall) + quantitySelect * precioClear;
//   totalP.innerHTML = '';
//   totalP.textContent = suma;
//   document.getElementById('Enviar').value = suma;
//   console.log(document.getElementById('Enviar').value);

// })

//           buttonBuy.addEventListener('click', function () {

//             let Totales = document.querySelector('.Totales');
//             Totales.style.display = 'none';
//             let detailProduct = document.querySelector('.detailProduct');
//             detailProduct.style.display = 'none';
//             let enviar = document.querySelector('.enviar');
//             enviar.style.display = 'none';
//             let itemNumber = document.querySelector('.item-number');

//             let imag = document.createElement('img');
//             imag.setAttribute('src', event.target.parentNode.parentNode.firstChild.firstChild.getAttribute('src'));
//             divCart.appendChild(imag);
//             let buyTitle = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
//             let pBuy = document.createElement('p');
//             pBuy.appendChild(document.createTextNode(buyTitle));
//             divCart.appendChild(pBuy);
//             let valueQuantity = selectQuantity.value;
//             let precioUnity = event.target.parentNode.firstChild.nextSibling.firstChild.textContent;
//             let precioClear = precioUnity.toString().replace('$ ', '');
//             console.log(precioClear);
//             let textPrecio = document.createElement('p');
//             textPrecio.appendChild(document.createTextNode(precioClear));
//             divCart.appendChild(textPrecio);
//             let quantitySelect = selectQuantity.value;
//             console.log(quantitySelect);
//             let pQuantity = document.createElement('p');
//             pQuantity.appendChild(document.createTextNode(quantitySelect));
//             divCart.appendChild(pQuantity);
//             let quantitySelec = selectQuantity.value;
//             console.log(quantitySelect);
//             let pQuantitys = document.createElement('p');
//             pQuantitys.appendChild(document.createTextNode(quantitySelect));
//             divCart.appendChild(pQuantitys);
//             cartBuy.appendChild(divCart);
//             let divTotal = document.createElement('div');
//             let textTotalp = document.createElement('p');
//             let totalP = document.createElement('p');
//             totalP.appendChild(total);
//             divTotal.appendChild(textTotalp);
//             divTotal.className = 'divTotal';
//             divTotal.appendChild(totalP);
//             cartBuy.appendChild(divTotal);
//             console.log(totalP.textContent);
//             let actualTotal = totalP.textContent;
//             console.log(actualTotal);
//             suma += parseInt(actualTotal) + quantitySelect * precioClear;
//             totalP.innerHTML = '';
//             totalP.textContent = suma;
//             document.getElementById('Enviar').value = suma;
//             console.log('hola', document.getElementById('Enviar').value);
//           })
//         })
//       }
//     })
// })