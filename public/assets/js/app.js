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
    photo.name = 'photo';
    divPhoto.className = 'divPhoto';
    divPhoto.setAttribute('type', 'button');
    divPhoto.setAttribute('data-toggle', 'modal');
    divPhoto.setAttribute('data-target', '#myModal');
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


  if (eventCartWish === 'photo') {
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
        let cartto = document.createElement('img');
        cartto.className = 'cartto';
        cartto.setAttribute('name', 'cart');
        cartto.setAttribute('src', '/assets/images/shopping-cart.png');
        divDetailOthers.appendChild(cartto);
        cartto.addEventListener('click', function() {
          countToCart();
          constructorCart(pointerEvent, data, nameSearch);
          viewItem(data);
          calculator();
        });
      });
    let pDetail = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.textContent;
    let iDetail = event.target.parentNode.parentNode.firstChild.firstChild.getAttribute('src');
    let tDetail = event.target.parentNode.parentNode.firstChild.nextSibling.textContent;
    let aDetail = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent;

    let parTitle = document.createElement('p');
    let nodeTitle = document.createTextNode(pDetail);
    parTitle.appendChild(nodeTitle);
    let titleUnique = document.querySelector('.titleUnique');
    titleUnique.innerHTML = '';
    titleUnique.appendChild(parTitle);

    // DIV DEL CONTENEDOR
    let divDetail = document.createElement('div');
    divDetail.className = 'divDetail';
    // DIV DE PHOTO
    let divDetailPhoto = document.createElement('div');
    divDetailPhoto.className = 'divDetailPhoto';
    let imageDetail = document.createElement('img');
    imageDetail.setAttribute('src', iDetail);
    divDetailPhoto.appendChild(imageDetail);
    // DIV DE OTRA INFORMACIÓN
    let divDetailOthers = document.createElement('div');
    let tDetailOther = document.createElement('p');
    tDetailOther.appendChild(document.createTextNode(tDetail));
    divDetailOthers.appendChild(tDetailOther);

    let Details = document.querySelector('.Details');
    let aDetailOther = document.createElement('p');
    aDetailOther.appendChild(document.createTextNode(aDetail));
    aDetailOther.className = 'aDetailOther';
    divDetailOthers.appendChild(aDetailOther);
    Details.innerHTML = '';
    Details.appendChild(divDetailPhoto);
    Details.appendChild(divDetailOthers);
  }

  // FUNCIÓN PARA CREAR CONTENEDOR DE LA SECCIÓN CART y WISH
  // TENDRÁN ESTILOS PARECIDOS
});

let diviAcumulado = 0;

function calculator() {
  // EVENTO CUANDO AGREGUE AL CARRITO RESCATE VALOR Y SUME
  $('.selectQ').change(function(evt) {
    let valueSelect = $(this).val();
    let pPrice = $(this).parent().next().find('p');
    let priceUnic = $(this).parent().next().find('.unitPrice').text();
    pPrice.text('$' + (valueSelect * parseInt(priceUnic)));
    let modalBody = document.querySelector('.modal-body');
    let modalAll = modalBody.getElementsByClassName('divWraperItemCart');
    console.log(modalAll.length);
    let counter = 0;
    let acumulador = 0;
    for (let k = 0; k < modalAll.length; k++) {
      let price = modalAll[k].firstChild.nextSibling.lastChild.firstChild.textContent;
      let priceClear = price.toString().replace('$', '');
      acumulador += parseInt(priceClear);
    }
    console.log(acumulador);
    let totales = $('.total').text();
    $('.total').html('$' + acumulador);
    console.log(totales);
  });
  let modalBody = document.querySelector('.modal-body');
  let modalAll = modalBody.getElementsByClassName('divWraperItemCart');
  console.log(modalAll.length);
  let counter = 0;
  let acumulador = 0;
  for (let k = 0; k < modalAll.length; k++) {
    let price = modalAll[k].firstChild.nextSibling.lastChild.firstChild.textContent;
    let priceClear = price.toString().replace('$', '');
    acumulador += parseInt(priceClear);
  }
  console.log(acumulador);
  let totales = $('.total').text();
  $('.total').html('$' + acumulador);
  console.log(totales);
};

let button = document.querySelector('.button');
button.addEventListener('click', function() {
  console.log('jol');
  let valueCheckout = $('.total').text();
  let priceClear = valueCheckout.toString().replace('$', '');
  let prueba = document.querySelector('#prueba');
  prueba.value = priceClear;
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost:3000/pay';
  xhr.open('POST', url, true);
  xhr.responseType = 'text';
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      xhr.responseText;
      console.log(xhr.responseText);
    }
  };
  let data = JSON.stringify({
    'total': priceClear.toString()
  });
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(data);
});

$(window).on('load', function() {
  let keySearch = 'MLC1648';
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
      viewItem(data);
    });
});