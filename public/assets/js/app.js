let acumula = 0;
let suma = 0;


function openNav() {
  document.getElementById("mySidenav").style.width = "70%";
  // document.getElementById("flipkart-navbar").style.width = "50%";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.body.style.backgroundColor = "rgba(0,0,0,0)";
}

fetch('https://api.mercadolibre.com/sites/MLC/search?condition=all&q=all', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then(function (respt) {
    //Turns the the JSON into a JS object
    return respt.json();
  })
  .then(function (product) {
    console.log('a', product);
    let listCateg = product;
    let butt = document.querySelector('.butt');
    let inputSearch = document.querySelector('.inputSearch');
    let cartUp = document.querySelector(".cartUp");
    let resultsSearchInput = document.querySelector('.resultsSearchInput');

    cartUp.addEventListener('click', function(){
      resultsSearchInput.style.display = 'none';
let Totales = document.querySelector('.Totales');
Totales.style.display = 'inline';
let cartt = document.querySelector('.cartt');
cartt.style.display = 'none';
    });    

    butt.addEventListener('click', function () {
      
      resultsSearchInput.innerHTML = '';
      let valueFlip = (inputSearch.value);
      for (let i = 0; i < listCateg.results.length; i++) {
        let valuesResults = (listCateg.results[i].title);
        let regex = new RegExp(valueFlip, 'i', 'g');
        if (regex.test(valuesResults) === true) {
          
          let divResultsInput = document.createElement('div');
          divResultsInput.className = 'divResultsInput';
          let divImages = document.createElement('div');
          divImages.className = 'divImages';
          let image = document.createElement('img');
          image.className = 'image';
          image.setAttribute('src', listCateg.results[i].thumbnail);
          divImages.appendChild(image);

          let titleProduc = document.createTextNode(listCateg.results[i].title);
          let pTitle = document.createElement('p');
          pTitle.appendChild(titleProduc);
          divTitle = document.createElement('div');
          divTitle.className = 'divTitle';
          divTitle.appendChild(pTitle);
          divTitle.className = 'divTitle';


          let priceProduc = document.createTextNode(listCateg.results[i].price);
          let simbol = document.createTextNode('$ ');
          let pPrice = document.createElement('p');
          pPrice.appendChild(simbol);
          pPrice.appendChild(priceProduc);
          divPrice = document.createElement('div');
          divPrice.appendChild(pPrice);
          divPrice.className = 'divPrice';

          let pAvailable = document.createElement('p');
          let pDisp = document.createTextNode('Disponibilidad: ');
          let availableProduc = document.createTextNode(listCateg.results[i].available_quantity);
          pAvailable.appendChild(pDisp);
          pAvailable.appendChild(availableProduc);
          divAvailable = document.createElement('div');
          divAvailable.appendChild(pAvailable);
          divAvailable.className = 'divAvailable';

          let itemNumber = document.querySelector('.item-number');

          let WishList = document.querySelector('.WishList');

          let heart = document.createElement('img');
          heart.setAttribute('src', '/assets/images/nolike.png');
          let divHeart = document.createElement('div');
          divHeart.appendChild(heart);
          divResultsInput.appendChild(divImages);
          divResultsInput.appendChild(divTitle);
          divResultsInput.appendChild(divPrice);
          divResultsInput.appendChild(divAvailable);
          
          resultsSearchInput.appendChild(divResultsInput);

          let detailProduct = document.querySelector('.detailProduct');

          image.addEventListener('click', function () {
            resultsSearchInput.style.display = 'none';
            detailProduct.innerHTML = '';
            let divimageTitle = document.createElement('div');
            divimageTitle.className = 'divimageTitle';
            let divImag = document.createElement('div');
            let imag = document.createElement('img');
            imag.setAttribute('src', event.target.getAttribute('src'));
            divImag.appendChild(imag);
            divImag.className = 'divImag';
            imag.className = 'imagenP';


            let divTexts = document.createElement('div');
            let titleDetail = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
            let ptitleDetail = document.createElement('p');
            let divtitleDetail = document.createElement('div');
            ptitleDetail.appendChild(document.createTextNode(titleDetail));
            divTexts.appendChild(ptitleDetail);
            divTexts.className = 'divTexts';

            let priceDetail = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.textContent;
            let ppriceDetail = document.createElement('p');
            ppriceDetail.appendChild(document.createTextNode(priceDetail));
            divTexts.appendChild(ppriceDetail);


            let availableDetail = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent;
            let pavailableDetail = document.createElement('p');
            pavailableDetail.appendChild(document.createTextNode(availableDetail));
            divTexts.appendChild(pavailableDetail);

            let pointerName = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
            for (let index = 0; index < listCateg.results.length; index++) {
              if (pointerName === listCateg.results[index].title) {
                let condition = listCateg.results[index].condition;
                let pCondition;
                if (condition === 'new') {

                  pCondition = document.createTextNode('Nuevo');
                } else {
                  pCondition = document.createTextNode('Usado');
                }
                let pCond = document.createElement('p');
                pCond.appendChild(pCondition);
                divTexts.appendChild(pCond);
                let shiping = listCateg.results[index].shipping.free_shipping;
                console.log(shiping)
                let pshiping;
                if (shiping === true) {
                  pshiping = document.createTextNode('Envío gratis a todo el país');
                } else {
                  pshiping = document.createTextNode('El envio no es gratis');
                }
                let pShiping = document.createElement('p');
                pShiping.appendChild(pshiping);
                divTexts.appendChild(pShiping);



                let buttonBuy = document.createElement('button');
                buttonBuy.appendChild(document.createTextNode('Comprar'));
                buttonBuy.className = 'buttonBuy';
                divTexts.appendChild(buttonBuy);


                let precioNormal = listCateg.results[index].original_price;
                if (precioNormal === null) {
                  let oferta = document.createTextNode('No posee oferta');
                } else {
                  let oferta = document.createTextNode('Posee oferta');
                }
                let precioActual = listCateg.results[index].price;
              }

            }

            divimageTitle.appendChild(divImag)
            divimageTitle.appendChild(divTexts)


            detailProduct.appendChild(divimageTitle);

            let cart = document.querySelector('cart');

            
            let titulo = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
            let imagenBuy = event.target.parentNode.parentNode.firstChild.firstChild.getAttribute('src');
            console.log(imagenBuy);

            for (let z = 0; z < listCateg.results.length; z++) {
              if (titulo === listCateg.results[z].title) {
                let selectQuantity = document.createElement('select');
                selectQuantity.className = 'selectQuantity';
                let quantityThis = listCateg.results[z].available_quantity;
                for (let y = 0; y < quantityThis; y++) {
                  let option = document.createElement('option');
                  let textQ = document.createTextNode(y + 1);
                  console.log(textQ);
                  let pQ = document.createElement('p');
                  pQ.appendChild(textQ);
                  option.appendChild(pQ);
                  selectQuantity.appendChild(option);
                }
                let divTexts = document.querySelector('.divTexts');
                divTexts.appendChild(selectQuantity);

              }
            }
            let divCart = document.createElement('div');
            divCart.className = 'divCart';
            let cartBuy = document.querySelector('.cartt');
            let buttonBuy = document.querySelector('.buttonBuy');
            let selectQuantity = document.querySelector('.selectQuantity');

            let total = document.createTextNode(0);
            let itemNumber = document.querySelector('.item-number');

            buttonBuy.addEventListener('click', function () {
              let detailProduct = document.querySelector('.detailProduct');
              detailProduct.style.display ='none';             

              let itemNumber = document.querySelector('.item-number');

              let numerActual = itemNumber.textContent;
              let actual = parseInt(numerActual) + 1;
              itemNumber.innerHTML = '';
              itemNumber.appendChild(document.createTextNode(actual));

              let imag = document.createElement('img');
              imag.setAttribute('src', event.target.parentNode.parentNode.firstChild.firstChild.getAttribute('src'));
              divCart.appendChild(imag);
              let buyTitle = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
              let pBuy = document.createElement('p');
              pBuy.appendChild(document.createTextNode(buyTitle));
              divCart.appendChild(pBuy);
              let valueQuantity = selectQuantity.value;
              let precioUnity = event.target.parentNode.firstChild.nextSibling.firstChild.textContent;
              let precioClear = precioUnity.toString().replace('$ ', '');
              console.log(precioClear);
              let textPrecio = document.createElement('p');
              textPrecio.appendChild(document.createTextNode(precioClear));
              divCart.appendChild(textPrecio);
              let quantitySelect = selectQuantity.value;
              console.log(quantitySelect);
              let pQuantity = document.createElement('p');
              pQuantity.appendChild(document.createTextNode(quantitySelect));
              divCart.appendChild(pQuantity);
              let quantitySelec = selectQuantity.value;
              console.log(quantitySelect);
              let pQuantitys = document.createElement('p');
              pQuantitys.appendChild(document.createTextNode(quantitySelect));
              divCart.appendChild(pQuantitys);
              cartBuy.appendChild(divCart);
              let divTotal = document.createElement('div');
              let Textdiv = document.createTextNode('Total: ');
              let textTotalp = document.createElement('p');
              textTotalp.appendChild(Textdiv);
              let totalP = document.createElement('p');
              totalP.appendChild(total);
              divTotal.appendChild(textTotalp);
              divTotal.className = 'divTotal';
              divTotal.appendChild(totalP);
              cartBuy.appendChild(divTotal);
              console.log(totalP.textContent);
              let actualTotal = totalP.textContent;
              console.log(actualTotal);
              suma += parseInt(actualTotal) + quantitySelect * precioClear;
              totalP.innerHTML = '';
              totalP.textContent = suma;
              document.getElementById('Enviar').value = suma;
              console.log(document.getElementById('Enviar').value);
            })

          })

        }
      }
      inputSearch.value = '';

    })
  })


let listCategories;

fetch('https://api.mercadolibre.com/sites/MLC/categories', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then(function (respt) {
    //Turns the the JSON into a JS object
    return respt.json();
  })
  .then(function (info) {
    listCategories = info;
    console.log(info);

    cartUp.addEventListener('click', function(){
      resultsSearchInput.style.display = 'none';
let Totales = document.querySelector('.Totales');
Totales.style.display = 'inline';
let cartt = document.querySelector('.cartt');
cartt.style.display = 'none';
    });

    let categoriesSelect = document.querySelector('.categoriesSelect');

    for (let i = 0; i < info.length; i++) {
      let textOption = info[i].name;
      let pOption = document.createTextNode(textOption);
      let option = document.createElement('option');
      option.value = info[i].id;
      option.appendChild(pOption);
      categoriesSelect.appendChild(option);
    }
  })

let categoriesSelect = document.querySelector('.categoriesSelect');

categoriesSelect.addEventListener('change', function () {
  let idCategoria = categoriesSelect.value;

  fetch('https://api.mercadolibre.com/sites/MLC/search?category=' + idCategoria, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(function (respt) {
      //Turns the the JSON into a JS object
      return respt.json();
    })
    .then(function (info) {
      console.log('p', info);

      cartUp.addEventListener('click', function(){
        resultsSearchInput.style.display = 'none';
  let Totales = document.querySelector('.Totales');
  Totales.style.display = 'inline';
  let cartt = document.querySelector('.cartt');
  cartt.style.display = 'inline';
      });

      let resultsSearchInput = document.querySelector('.resultsSearchInput');
      resultsSearchInput.innerHTML = '';

      for (let k = 0; k < info.results.length; k++) {
        
        let resultsList = document.querySelector('.resultsList');
        let divResultsInput = document.createElement('div');
        divResultsInput.className = 'divResultsInput';
        let divImages = document.createElement('div');
        divImages.className = 'divImages';
        let image = document.createElement('img');
        image.className = 'image';
        image.setAttribute('src', info.results[k].thumbnail);
        divImages.appendChild(image);

        let titleProduc = document.createTextNode(info.results[k].title);
        let pTitle = document.createElement('p');
        pTitle.appendChild(titleProduc);
        divTitle = document.createElement('div');
        divTitle.appendChild(pTitle);
        divTitle.className = 'divTitle';


        let priceProduc = document.createTextNode(info.results[k].price);
        let pPrice = document.createElement('p');
        let simbol = document.createTextNode('$ ');
        pPrice.appendChild(simbol);
        pPrice.appendChild(priceProduc);
        divPrice = document.createElement('div');
        divPrice.appendChild(pPrice);
        divPrice.className = 'divPrice';

        let pAvailable = document.createElement('p');
        let availableProduc = document.createTextNode(info.results[k].available_quantity);
        pAvailable.className = 'pAvailable';
        let textA = document.createTextNode('Disponibilidad: ');
        pAvailable.appendChild(textA);

        pAvailable.appendChild(availableProduc);
        divAvailable = document.createElement('div');
        divAvailable.appendChild(pAvailable);

        
        divResultsInput.appendChild(divImages);
        divResultsInput.appendChild(divTitle);
        divResultsInput.appendChild(divPrice);
        divResultsInput.appendChild(divAvailable);
        
        resultsSearchInput.appendChild(divResultsInput);

        
        let detailProduct = document.querySelector('.detailProduct');

        image.addEventListener('click', function () {
          resultsSearchInput.style.display = 'none';

          detailProduct.innerHTML = '';
          let divimageTitle = document.createElement('div');
          divimageTitle.className = 'divimageTitle';
          let divImag = document.createElement('div');
          let imag = document.createElement('img');
          imag.setAttribute('src', event.target.getAttribute('src'));
          divImag.appendChild(imag);
          divImag.className = 'divImag';
          imag.className = 'imagenP';


          let divTexts = document.createElement('div');
          let titleDetail = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
          let ptitleDetail = document.createElement('p');
          let divtitleDetail = document.createElement('div');
          ptitleDetail.appendChild(document.createTextNode(titleDetail));
          divTexts.appendChild(ptitleDetail);
          divTexts.className = 'divTexts';

          let priceDetail = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.textContent;
          let ppriceDetail = document.createElement('p');
          ppriceDetail.appendChild(document.createTextNode(priceDetail));
          divTexts.appendChild(ppriceDetail);


          let availableDetail = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent;
          let pavailableDetail = document.createElement('p');
          pavailableDetail.appendChild(document.createTextNode(availableDetail));
          divTexts.appendChild(pavailableDetail);

          let pointerName = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
          for (let index = 0; index < info.results.length; index++) {
            if (pointerName === info.results[index].title) {
              let condition = info.results[index].condition;
              let pCondition;
              if (condition === 'new') {

                pCondition = document.createTextNode('Nuevo');
              } else {
                pCondition = document.createTextNode('Usado');
              }
              let pCond = document.createElement('p');
              pCond.appendChild(pCondition);
              divTexts.appendChild(pCond);
              let shiping = info.results[index].shipping.free_shipping;
              console.log(shiping)
              let pshiping;
              if (shiping === true) {
                pshiping = document.createTextNode('Envío gratis a todo el país');
              } else {
                pshiping = document.createTextNode('El envio no es gratis');
              }
              let pShiping = document.createElement('p');
              pShiping.appendChild(pshiping);
              divTexts.appendChild(pShiping);

              let buttonBuy = document.createElement('button');
              buttonBuy.appendChild(document.createTextNode('Comprar'));
              buttonBuy.className = 'buttonBuy';
              divTexts.appendChild(buttonBuy);


              let precioNormal = info.results[index].original_price;
              if (precioNormal === null) {
                let oferta = document.createTextNode('No posee oferta');
              } else {
                let oferta = document.createTextNode('Posee oferta');
              }
              let precioActual = info.results[index].price;
            }

          }

          divimageTitle.appendChild(divImag)
          divimageTitle.appendChild(divTexts)


          detailProduct.appendChild(divimageTitle);

          let cart = document.querySelector('cart');

          let titulo = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
          let imagenBuy = event.target.parentNode.parentNode.firstChild.firstChild.getAttribute('src');
          console.log(imagenBuy);



          for (let z = 0; z < info.results.length; z++) {
            if (titulo === info.results[z].title) {
              let selectQuantity = document.createElement('select');
              selectQuantity.className = 'selectQuantity';
              let quantityThis = info.results[z].available_quantity;
              for (let y = 0; y < quantityThis; y++) {
                let option = document.createElement('option');
                let textQ = document.createTextNode(y + 1);
                console.log(textQ);
                let pQ = document.createElement('p');
                pQ.appendChild(textQ);
                option.appendChild(pQ);
                selectQuantity.appendChild(option);
              }
              let divTexts = document.querySelector('.divTexts');
              divTexts.appendChild(selectQuantity);

            }
          }
          let cartBuy = document.querySelector('.cartt');
          let divCart = document.createElement('div');
          divCart.className = 'divCart';
          let buttonBuy = document.querySelector('.buttonBuy');
          let selectQuantity = document.querySelector('.selectQuantity');
          let total = document.createTextNode(0);
          let itemNumber = document.querySelector('.item-number');

          buttonBuy.addEventListener('click', function () {

            let Totales = document.querySelector('.Totales');
            Totales.style.display='inline';
            let itemNumber = document.querySelector('.item-number');

            let numerActual = itemNumber.textContent;
            let actual = parseInt(numerActual) + 1;
            itemNumber.innerHTML = '';
            itemNumber.appendChild(document.createTextNode(actual));

            let imag = document.createElement('img');
            imag.setAttribute('src', event.target.parentNode.parentNode.firstChild.firstChild.getAttribute('src'));
            divCart.appendChild(imag);
            let buyTitle = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
            let pBuy = document.createElement('p');
            pBuy.appendChild(document.createTextNode(buyTitle));
            divCart.appendChild(pBuy);
            let valueQuantity = selectQuantity.value;
            let precioUnity = event.target.parentNode.firstChild.nextSibling.firstChild.textContent;
            let precioClear = precioUnity.toString().replace('$ ', '');
            console.log(precioClear);
            let textPrecio = document.createElement('p');
            textPrecio.appendChild(document.createTextNode(precioClear));
            divCart.appendChild(textPrecio);
            let quantitySelect = selectQuantity.value;
            console.log(quantitySelect);
            let pQuantity = document.createElement('p');
            pQuantity.appendChild(document.createTextNode(quantitySelect));
            divCart.appendChild(pQuantity);
            cartBuy.appendChild(divCart);
            let divTotal = document.createElement('div');
            let Textdiv = document.createTextNode('Total: ');
            let textTotalp = document.createElement('p');
            textTotalp.appendChild(Textdiv);
            let totalP = document.createElement('p');
            totalP.appendChild(total);
            divTotal.appendChild(textTotalp);
            divTotal.className = 'divTotal';
            divTotal.appendChild(totalP);
            cartBuy.appendChild(divTotal);
            console.log(totalP.textContent);
            let actualTotal = totalP.textContent;
            console.log(actualTotal);
            suma += parseInt(actualTotal) + quantitySelect * precioClear;
            totalP.innerHTML = '';
            totalP.textContent = suma;
            document.getElementById('Enviar').value = suma;
            console.log(document.getElementById('Enviar').value);
            let divTotall = document.createElement('div');
            let Textdivv = document.createTextNode('Total: ');
            let textTotalpp = document.createElement('p');
            textTotalp.appendChild(Textdivv);
            let totalPP = document.createElement('p');
            totalP.appendChild(total);
            divTotall.appendChild(textTotalpp);
            divTotall.className = 'divTotal';
            divTotall.appendChild(totalPP);
            cartBuy.appendChild(divTotall);
            console.log(totalP.textContent);
            let actualTotall = totalP.textContent;
            console.log(actualTotall);
            suma += parseInt(actualTotall) + quantitySelect * precioClear;
            totalP.innerHTML = '';
            totalP.textContent = suma;
            document.getElementById('Enviar').value = suma;
            console.log(document.getElementById('Enviar').value);

          })

        })

      }
    })

})


$(document).ready(function(){

/* Llamando a la api de mercadolibre, categoría electrodomésticos */
fetch('https://api.mercadolibre.com/sites/MLA/search?category=MLA5726')

    .then(function (response) {
        //Turns the the JSON into a JS object
        return response.json();
    })
    .then(function (data) {
        //console.log(data);
        
/* Creando en la sección ofertas de html un contenedor con imagenes, título, precio y disponibilidad del producto */
    $('#sectionOffers').append('<div class="container-fluid"><div class="row"><div class="col-md-12">'+
    '<h3>Ofertas recomendadas para ti</h3></div></div></div><div class="container-fluid">'+
    '<div class="row"><div class="col-md-2"><a href="#"><img class="imgOffers" src="'+data.results[0].thumbnail+'"></a>'+
    '<p class="productTitle"><strong>'+data.results[0].title+'</strong></p><p class="priceOffers">$ '+data.results[0].price+'</p>'+
    '<h4><strong>Disponibilidad: '+data.results[0].available_quantity+'</strong></h4><a class="viewMore op1" href="#"><p class="toCart">View More</p></a></div>'+
    '<div class="col-md-2"><a href="#"><img class="imgOffers" src="'+data.results[1].thumbnail+'"></a><p class="productTitle"><strong>'+data.results[1].title+'</strong></p>'+
    '<p class="priceOffers">$ '+data.results[1].price+'</p><h4><strong>Disponibilidad: '+data.results[1].available_quantity+'</strong></h4><a class="viewMore op2" href="#"><p class="toCart">View More</p>'+
    '</a></div><div class="col-md-2"><a href="#"><img class="imgOffers" src="'+data.results[2].thumbnail+'">'+
    '</a><p class="productTitle"><strong>'+data.results[2].title+'</strong></p><p class="priceOffers">$ '+data.results[2].price+'</p><h4><strong>Disponibilidad: '+data.results[2].available_quantity+'</strong></h4><a class="viewMore op3" href="#"><p class="toCart">View More</p>'+
    '</a></div><div class="col-md-2"><a href="#"><img class="imgOffers"src="'+data.results[3].thumbnail+'"></a><p class="productTitle"><strong>'+data.results[3].title+'</strong></p>'+
    '<p class="priceOffers">$ '+data.results[3].price+'</p><h4><strong>Disponibilidad: '+data.results[3].available_quantity+'</strong></h4><a class="viewMore op4" href="#"><p class="toCart">View More</p></a></div>'+
    '<div class="col-md-3 col-md-offset-1 imgBorder"><a href="#"><img class="imgOffers imgRight"src="'+data.results[4].thumbnail+
    '"></a><p class="productTitle"><strong>'+data.results[4].title+'</strong></p><p class="priceOffers offert">Precio $ '+data.results[4].price+'</p><h4><strong>Disponibilidad: '+data.results[4].available_quantity+'</strong></h4><strike><p class="priceOffers originalPrice">'+
    'Precio original $ '+data.results[4].original_price+'</p></strike><a class="viewMore op5" href="#"><p class="toCart">View More</p></a></div>'+
    '</div></div>');

/* Creando en la sección artículos vistos de html un contenedor con imagenes, título, precio y disponibilidad del producto */
    $('#sectionSeen').append('<div class="container-fluid"><div class="row"><div class="col-md-12"><h3>Relacionado con los artículos que has visto'+
    '</h3></div></div></div><div class="container-fluid"><div class="row"><div class="col-md-2"><a href="#"><img class="imgOffers" src="'+data.results[5].thumbnail+'">'+
    '</a><p class="productTitle"><strong>'+data.results[5].title+'</strong></p><p class="priceOffers">$ '+data.results[5].price+'</p><h4><strong>Disponibilidad: '+data.results[5].available_quantity+'</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2">'+
    '<a href="#"><img class="imgOffers" src="'+data.results[6].thumbnail+'"></a><p class="productTitle"><strong>'+data.results[6].title+'</strong></p><p class="priceOffers">$ '+data.results[6].price+'</p><h4><strong>Disponibilidad: '+data.results[6].available_quantity+'</strong></h4>'+
    '<a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2"><a href="#"><img class="imgOffers" src="'+data.results[7].thumbnail+'">'+
    '</a><p class="productTitle"><strong>'+data.results[7].title+'</strong></p><p class="priceOffers">$ '+data.results[7].price+'</p><h4><strong>Disponibilidad: '+data.results[7].available_quantity+'</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2">'+
    '<a href="#"><img class="imgOffers" src="'+data.results[8].thumbnail+'"></a><p class="productTitle"><strong>'+data.results[8].title+'</strong></p><p class="priceOffers">$ '+data.results[8].price+'</p><h4><strong>Disponibilidad: '+data.results[8].available_quantity+'</strong></h4><a class="viewMore" href="#">'+
    '<p class="toCart">View More</p></a></div><div class="col-md-3 col-md-offset-1 imgBorderTwo"><a href="#"><img class="imgOffers imgRight"'+
    'src="'+data.results[12].thumbnail+'"></a><p class="productTitle"><strong>'+data.results[12].title+'</strong></p><p class="priceOffers offert">Precio $ '+data.results[12].price+'</p><strike><p class="priceOffers originalPrice">'+
    'Precio original $ '+data.results[12].original_price+'</p></strike><a class="viewMore" href="#"><p class="toCart">View More</p></a></div></div></div>');


/* Llamando a la api de mercadolibre, categoría tecnología */
  fetch('https://api.mercadolibre.com/sites/MLA/search?all=new&q=dell')

    .then(function (res) {
        //Turns the the JSON into a JS object
        return res.json();
    })
    .then(function (dat) {
        //console.log(dat);

/* Creando en la sección ofertas recomendadas de html un contenedor con imagenes, título, precio y disponibilidad del producto */
   $('#sectionTechnology').append('<div class="container-fluid"><div class="row"><div class="col-md-12">'+
    '<h3>Ofertas recomendadas para ti</h3></div></div></div><div class="container-fluid">'+
    '<div class="row"><div class="col-md-2 col-md-offset-1"><a href="#"><img class="imgOffers" src="'+dat.results[0].thumbnail+'"></a><p class="productTitle"><strong>'+dat.results[0].title+'</strong></p><p class="priceOffers">$ '+dat.results[0].price+
    '</p><h4><strong>Disponibilidad: '+dat.results[0].available_quantity+'</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2"><a href="#"><img class="imgOffers" src="'+dat.results[1].thumbnail+'"></a><p class="productTitle"><strong>'+dat.results[1].title+'</strong></p>'+
    '<p class="priceOffers">$ '+dat.results[1].price+'</p><h4><strong>Disponibilidad: '+dat.results[1].available_quantity+'</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2"><a href="#"><img class="imgOffers" src="'+dat.results[2].thumbnail+'">'+
    '</a><p class="productTitle"><strong>'+dat.results[2].title+'</strong></p><p class="priceOffers">$ '+dat.results[2].price+'</p><h4><strong>Disponibilidad: '+dat.results[2].available_quantity+'</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2"><a href="#"><img class="imgOffers"'+
    'src="'+dat.results[3].thumbnail+'"></a><p class="productTitle"><strong>'+dat.results[3].title+'</strong></p><p class="priceOffers">$ '+dat.results[3].price+'</p><h4><strong>Disponibilidad: '+dat.results[3].available_quantity+'</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div>'+
    '<div class="col-md-2 col-md-offset-right-1"><a href="#"><img class="imgOffers" src="'+dat.results[4].thumbnail+'"></a><p class="productTitle"><strong>'+dat.results[4].title+'</strong></p><p class="priceOffers">$ '+dat.results[4].price+'</p><h4><strong>Disponibilidad: '+dat.results[4].available_quantity+'</strong></h4>'+
    '<a class="viewMore" href="#"><p class="toCart">View More</p></a></div></div></div>');

/* Llamando a la api de mercadolibre, categoría libros */
   fetch('https://api.mercadolibre.com/sites/MLA/search?category=MLA3025')

    .then(function (respt) {
        //Turns the the JSON into a JS object
        return respt.json();
    })
    .then(function (info) {
        //console.log(info);

/* Creando en la sección libros más vistos de html un contenedor con imagenes, título, precio y disponibilidad del producto */
    $('#sectionBooks').append('<div class="container-fluid"><div class="row"><div class="col-md-12">'+
    '<h3>Libros más vendidos</h3></div></div></div><div class="container-fluid">'+
    '<div class="row"><div class="col-md-2 col-md-offset-1"><a href="#"><img class="imgOffers" src="'+info.results[0].thumbnail+'"></a><p class="productTitle"><strong>'+info.results[0].title+'</strong></p><p class="priceOffers">$ '+info.results[0].price+
    '</p><h4><strong>Disponibilidad: '+info.results[0].available_quantity+'</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2"><a href="#"><img class="imgOffers" src="'+info.results[1].thumbnail+'"></a><p class="productTitle"><strong>'+info.results[1].title+'</strong></p><p class="priceOffers">'+
    '$ '+info.results[1].price+'</p><h4><strong>Disponibilidad: '+info.results[1].available_quantity+'</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2"><a href="#"><img class="imgOffers" src="'+info.results[2].thumbnail+'"></a><p class="productTitle"><strong>'+info.results[2].title+'</strong></p>'+
    '<p class="priceOffers">$ '+info.results[2].price+'</p><h4><strong>Disponibilidad: '+info.results[2].available_quantity+'</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2"><a href="#"><img class="imgOffers" src="'+info.results[3].thumbnail+'">'+
    '</a><p class="productTitle"><strong>'+info.results[3].title+'</strong></p><p class="priceOffers">$ '+info.results[3].price+'</p><h4><strong>Disponibilidad: '+info.results[3].available_quantity+'</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div><div class="col-md-2 col-md-offset-right-1"><a href="#">'+
    '<img class="imgOffers" src="'+info.results[4].thumbnail+'"></a><p class="productTitle"><strong>'+info.results[4].title+'</strong></p><p class="priceOffers">$ '+info.results[4].price+'</p><h4><strong>Disponibilidad: '+info.results[4].available_quantity+'</strong></h4><a class="viewMore" href="#"><p class="toCart">View More</p></a></div></div></div>');

/* Función para crear el detalle de cada producto */
        $('.viewMore').click(function(){
      console.log(data.results)
      let pDetail = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.textContent;
      let iDetail = event.target.parentNode.parentNode.firstChild.firstChild.getAttribute("src");
      let tDetail = event.target.parentNode.parentNode.firstChild.nextSibling.textContent;
      let aDetail = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent;
 
/* Ocultando las demás secciones para que solo aparezca la sección de detalles */
      $('.hr').hide();
      $('#sectionOffers').hide(); 
      $('#sectionSeen').hide(); 
      $('#sectionTechnology').hide(); 
      $('#sectionBooks').hide();
      $('#advertising').hide();


/* Creando la sección de detalles de producto */
      $('#detail').append('<div class="container"><div class="row"><div class="col-md-4"><img class="imgDetail" src="'+iDetail+'">'+
        '</div><div class="col-md-4"><h4>'+tDetail+'</h4><p>Rating: '+data.results[0].reviews.rating_average+'</p><p>Price: '+pDetail+'</p>'+
        '<p>'+aDetail+'</p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, libero voluptas, similique dolore dolores, aspernatur esse sint dolor'+
        'cumque expedita dicta ducimus nostrum nemo hic commodi quisquam maxime. Molestias, consectetur.</div></div></div>');
    
});
});
});
});


let navbarBack = document.querySelector('.navbarBack');
navbarBack.addEventListener('click', function () {
  let nameCategoria = event.target.getAttribute('name');
  console.log(nameCategoria);



  fetch('https://api.mercadolibre.com/sites/MLC/search?category=' + nameCategoria, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(function (respt) {
      //Turns the the JSON into a JS object
      return respt.json();
    })
    .then(function (info) {
      console.log('ppppp', info);
      let resultsSearchInput = document.querySelector('.resultsSearchInput');
      resultsSearchInput.innerHTML = '';

      //Hacer imagenes de acuerdo a la escogencia del usuario


      //Inicio
      for (let k = 0; k < info.results.length; k++) {
        let resultsList = document.querySelector('.resultsList');
        let divResultsInput = document.createElement('div');
        divResultsInput.className = 'divResultsInput';
        let divImages = document.createElement('div');
        divImages.className = 'divImages';
        let image = document.createElement('img');
        image.className = 'image';
        image.setAttribute('src', info.results[k].thumbnail);
        divImages.appendChild(image);

        let titleProduc = document.createTextNode(info.results[k].title);
        let pTitle = document.createElement('p');
        pTitle.appendChild(titleProduc);
        divTitle = document.createElement('div');
        divTitle.appendChild(pTitle);
        divTitle.className = 'divTitle';


        let priceProduc = document.createTextNode(info.results[k].price);
        let pPrice = document.createElement('p');
        let simbol = document.createTextNode('$ ');
        pPrice.appendChild(simbol);
        pPrice.appendChild(priceProduc);
        divPrice = document.createElement('div');
        divPrice.appendChild(pPrice);
        divPrice.className = 'divPrice';

        let pAvailable = document.createElement('p');
        let availableProduc = document.createTextNode(info.results[k].available_quantity);
        pAvailable.className = 'pAvailable';
        let textA = document.createTextNode('Disponibilidad: ');
        pAvailable.appendChild(textA);

        pAvailable.appendChild(availableProduc);
        divAvailable = document.createElement('div');
        divAvailable.appendChild(pAvailable);

        
        divResultsInput.appendChild(divImages);
        divResultsInput.appendChild(divTitle);
        divResultsInput.appendChild(divPrice);
        divResultsInput.appendChild(divAvailable);
        // divResultsInput.appendChild(divButton);

        resultsSearchInput.appendChild(divResultsInput);
        
        let detailProduct = document.querySelector('.detailProduct');

        image.addEventListener('click', function () {
          resultsSearchInput.style.display = 'none';

          detailProduct.innerHTML = '';
          let divimageTitle = document.createElement('div');
          divimageTitle.className = 'divimageTitle';
          let divImag = document.createElement('div');
          let imag = document.createElement('img');
          imag.setAttribute('src', event.target.getAttribute('src'));
          divImag.appendChild(imag);
          divImag.className = 'divImag';
          imag.className = 'imagenP';


          let divTexts = document.createElement('div');
          let titleDetail = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
          let ptitleDetail = document.createElement('p');
          let divtitleDetail = document.createElement('div');
          ptitleDetail.appendChild(document.createTextNode(titleDetail));
          divTexts.appendChild(ptitleDetail);
          divTexts.className = 'divTexts';

          let priceDetail = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.textContent;
          let ppriceDetail = document.createElement('p');
          ppriceDetail.appendChild(document.createTextNode(priceDetail));
          divTexts.appendChild(ppriceDetail);


          let availableDetail = event.target.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent;
          let pavailableDetail = document.createElement('p');
          pavailableDetail.appendChild(document.createTextNode(availableDetail));
          divTexts.appendChild(pavailableDetail);

          let pointerName = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
          for (let index = 0; index < info.results.length; index++) {
            if (pointerName === info.results[index].title) {
              let condition = info.results[index].condition;
              let pCondition;
              if (condition === 'new') {

                pCondition = document.createTextNode('Nuevo');
              } else {
                pCondition = document.createTextNode('Usado');
              }
              let pCond = document.createElement('p');
              pCond.appendChild(pCondition);
              divTexts.appendChild(pCond);
              let shiping = info.results[index].shipping.free_shipping;
              console.log(shiping)
              let pshiping;
              if (shiping === true) {
                pshiping = document.createTextNode('Envío gratis a todo el país');
              } else {
                pshiping = document.createTextNode('El envio no es gratis');
              }
              let pShiping = document.createElement('p');
              pShiping.appendChild(pshiping);
              divTexts.appendChild(pShiping);

              let buttonBuy = document.createElement('button');
              buttonBuy.appendChild(document.createTextNode('Comprar'));
              buttonBuy.className = 'buttonBuy';
              divTexts.appendChild(buttonBuy);


              let precioNormal = info.results[index].original_price;
              if (precioNormal === null) {
                let oferta = document.createTextNode('No posee oferta');
              } else {
                let oferta = document.createTextNode('Posee oferta');
              }
              let precioActual = info.results[index].price;
            }

          }
          divimageTitle.appendChild(divImag)
          divimageTitle.appendChild(divTexts)


          detailProduct.appendChild(divimageTitle);

          let cart = document.querySelector('cart');

          // buttonBuy.addEventListener('click', function () {

          let titulo = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
          let imagenBuy = event.target.parentNode.parentNode.firstChild.firstChild.getAttribute('src');
          console.log(imagenBuy);



          for (let z = 0; z < info.results.length; z++) {
            if (titulo === info.results[z].title) {
              let selectQuantity = document.createElement('select');
              selectQuantity.className = 'selectQuantity';
              let quantityThis = info.results[z].available_quantity;
              for (let y = 0; y < quantityThis; y++) {
                let option = document.createElement('option');
                let textQ = document.createTextNode(y + 1);
                console.log(textQ);
                let pQ = document.createElement('p');
                pQ.appendChild(textQ);
                option.appendChild(pQ);
                selectQuantity.appendChild(option);
              }
              let divTexts = document.querySelector('.divTexts');
              divTexts.appendChild(selectQuantity);

            }
          }
          let cartBuy = document.querySelector('.cartt');
          let divCart = document.createElement('div');
          divCart.className = 'divCart';
          let buttonBuy = document.querySelector('.buttonBuy');
          let selectQuantity = document.querySelector('.selectQuantity');
          let total = document.createTextNode(0);
          let itemNumber = document.querySelector('.item-number');

          buttonBuy.addEventListener('click', function () {
            let Totales = document.querySelector('.Totales');
            Totales.style.display='inline';
            let itemNumber = document.querySelector('.item-number');

            let numerActual = itemNumber.textContent;
            let actual = parseInt(numerActual) + 1;
            itemNumber.innerHTML = '';
            itemNumber.appendChild(document.createTextNode(actual));
            
            let imag = document.createElement('img');
            imag.setAttribute('src', event.target.parentNode.parentNode.firstChild.firstChild.getAttribute('src'));
            divCart.appendChild(imag);
            let buyTitle = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
            let pBuy = document.createElement('p');
            pBuy.appendChild(document.createTextNode(buyTitle));
            divCart.appendChild(pBuy);
            let valueQuantity = selectQuantity.value;
            let precioUnity = event.target.parentNode.firstChild.nextSibling.firstChild.textContent;
            let precioClear = precioUnity.toString().replace('$ ', '');
            console.log(precioClear);
            let textPrecio = document.createElement('p');
            textPrecio.appendChild(document.createTextNode(precioClear));
            divCart.appendChild(textPrecio);
            let quantitySelect = selectQuantity.value;
            console.log(quantitySelect);
            let pQuantity = document.createElement('p');
            pQuantity.appendChild(document.createTextNode(quantitySelect));
            divCart.appendChild(pQuantity);
            cartBuy.appendChild(divCart);
            let divTotal = document.createElement('div');
            let Textdiv = document.createTextNode('Total: ');
            let textTotalp = document.createElement('p');
            textTotalp.appendChild(Textdiv);
            let totalP = document.createElement('p');
            totalP.appendChild(total);
            divTotal.appendChild(textTotalp);
            divTotal.className = 'divTotal';
            divTotal.appendChild(totalP);
            cartBuy.appendChild(divTotal);
            console.log(totalP.textContent);
            let actualTotal = totalP.textContent;
            console.log(actualTotal);
            suma += parseInt(actualTotal) + quantitySelect * precioClear;
            totalP.innerHTML = '';
            totalP.textContent = suma;
            document.getElementById('Enviar').value = suma;
            console.log(document.getElementById('Enviar').value);
            let divTotall = document.createElement('div');
            let Textdivv = document.createTextNode('Total: ');
            let textTotalpp = document.createElement('p');
            textTotalp.appendChild(Textdivv);
            let totalPP = document.createElement('p');
            totalP.appendChild(total);
            divTotall.appendChild(textTotalpp);
            divTotall.className = 'divTotal';
            divTotall.appendChild(totalPP);
            cartBuy.appendChild(divTotall);
            console.log(totalP.textContent);
            let actualTotall = totalP.textContent;
            console.log(actualTotall);
            suma += parseInt(actualTotall) + quantitySelect * precioClear;
            totalP.innerHTML = '';
            totalP.textContent = suma;
            document.getElementById('Enviar').value = suma;
            console.log(document.getElementById('Enviar').value);

          })


          buttonBuy.addEventListener('click', function () {
            let imag = document.createElement('img');
            imag.setAttribute('src', event.target.parentNode.parentNode.firstChild.firstChild.getAttribute('src'));
            divCart.appendChild(imag);
            let buyTitle = event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.textContent;
            let pBuy = document.createElement('p');
            pBuy.appendChild(document.createTextNode(buyTitle));
            divCart.appendChild(pBuy);
            let valueQuantity = selectQuantity.value;
            let precioUnity = event.target.parentNode.firstChild.nextSibling.firstChild.textContent;
            let precioClear = precioUnity.toString().replace('$ ', '');
            console.log(precioClear);
            let textPrecio = document.createElement('p');
            textPrecio.appendChild(document.createTextNode(precioClear));
            divCart.appendChild(textPrecio);
            let quantitySelect = selectQuantity.value;
            console.log(quantitySelect);
            let pQuantity = document.createElement('p');
            pQuantity.appendChild(document.createTextNode(quantitySelect));
            divCart.appendChild(pQuantity);
            let quantitySelec = selectQuantity.value;
            console.log(quantitySelect);
            let pQuantitys = document.createElement('p');
            pQuantitys.appendChild(document.createTextNode(quantitySelect));
            divCart.appendChild(pQuantitys);
            cartBuy.appendChild(divCart);
            let divTotal = document.createElement('div');
            let Textdiv = document.createTextNode('Total: ');
            let textTotalp = document.createElement('p');
            textTotalp.appendChild(Textdiv);
            let totalP = document.createElement('p');
            totalP.appendChild(total);
            divTotal.appendChild(textTotalp);
            divTotal.className = 'divTotal';
            divTotal.appendChild(totalP);
            cartBuy.appendChild(divTotal);
            console.log(totalP.textContent);
            let actualTotal = totalP.textContent;
            console.log(actualTotal);
            suma += parseInt(actualTotal) + quantitySelect * precioClear;
            totalP.innerHTML = '';
            totalP.textContent = suma;
            document.getElementById('Enviar').value = suma;
            console.log(document.getElementById('Enviar').value);
          })
        
        })

      }
    })

})
