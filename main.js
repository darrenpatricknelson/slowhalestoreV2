// I'm going to build the catalogue page using the constructor function
// constructor function that will create each catalogue item
function itemDescription(name, size, price, description, image, id) {
  this.name = name;
  this.size = size;
  this.price = price;
  this.description = description;
  this.image = image;
  this.id = id;
  this.showItem = function () {
    // make the overlay appear
    let overlay = document.getElementById('itemOverlay');
    overlay.innerHTML = '';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.position = 'fixed';
    overlay.style.zIndex = '1';
    overlay.style.height = '100vh';
    overlay.style.width = '100vw';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';

    // creat a div the will house all of the item content
    let container = document.createElement('div');
    container.style.display = 'flex';
    container.style.width = '70%';
    container.style.height = '70%';
    container.style.backgroundColor = '#fff';
    container.style.padding = '20px';
    container.style.zIndex = '2';
    container.style.borderRadius = '2rem';

    // now we create a container to house an image of the item
    let imageContainer = document.createElement('div');
    imageContainer.style.width = '50%';
    imageContainer.style.height = '100%';
    // add the image
    let itemImage = document.createElement('img');
    itemImage.src = this.image;
    itemImage.style.width = '100%';
    itemImage.style.height = '100%';
    itemImage.style.borderRadius = '2rem';

    // now we create a container to house the information about the item
    let itemInformation = document.createElement('div');
    itemInformation.style.display = 'flex';
    itemInformation.style.flexDirection = 'column';
    itemInformation.style.justifyContent = 'center';
    itemInformation.style.alignItems = 'center';
    itemInformation.style.width = '50%';
    itemInformation.style.height = '100%';
    // add the information
    // heading
    let itemHeading = document.createElement('h3');
    itemHeading.id = 'itemHeading';
    itemHeading.classList.add('sectionHeadings');
    itemHeading.innerHTML = this.name;
    // body of information
    let itemBody = document.createElement('p');
    itemBody.style.textAlign = 'center';
    itemBody.innerHTML =
      this.description +
      '<br><br> Available sizes: ' +
      this.size +
      '<br><br> Price: R ' +
      this.price +
      '.00';

    // create an add to cart button
    // classList: btn btn-outline-success addToCart
    let addToCartButton = document.createElement('button');
    addToCartButton.classList = 'btn btn-outline-success addToCart';
    addToCartButton.innerHTML = 'Add to Cart';

    // Append the inner items to the inner container
    // the image
    imageContainer.appendChild(itemImage);
    // the information
    itemInformation.appendChild(itemHeading);
    itemInformation.appendChild(itemBody);
    itemInformation.appendChild(addToCartButton);

    // Append the inner container to the outer container
    container.appendChild(imageContainer);
    container.appendChild(itemInformation);

    // append the container to the overlay
    overlay.appendChild(container);

    // add an event listener so that when the overlay is clicked, it is closed and cleared
    overlay.addEventListener('click', function () {
      overlay.style.display = 'none';
      overlay.innerHTML = '';
    });
  };
}

// creating objects
let item1 = new itemDescription(
  'Black Set',
  'XS, S, M, L, XL, XXL',
  80,
  'A pretty Black bikini set',
  '../../images/blackSet.jpg',
  'item1'
);
let item2 = new itemDescription(
  'Emarald Set',
  'XS, S, M, L, XL, XXL',
  70,
  'A pretty Emarald bikini set',
  '../../images/greenSet1.jpg',
  'item2'
);
let item3 = new itemDescription(
  'Fire Orange Set',
  'XS, S, M, L, XL, XXL',
  90,
  'A pretty Fire Orange bikini set',
  '../../images/orangeSetSlim.jpg',
  'item3'
);
let item4 = new itemDescription(
  'Orange Top Set',
  'XS, S, M, L, XL, XXL',
  120,
  'A set of Orange bikini tops',
  '../../images/orangeTopCombo.jpeg',
  'item4'
);
let item5 = new itemDescription(
  'Sea Blue Bottoms',
  'XS, S, M, L, XL, XXL',
  60,
  'A pretty Sea Blue bikini bottom',
  '../../images/blueBottom.jpeg',
  'item5'
);
let item6 = new itemDescription(
  'Emarald Bottoms',
  'XS, S, M, L, XL, XXL',
  80,
  'A pretty black bikini set',
  '../../images/greenBottom.jpeg',
  'item6'
);
let item7 = new itemDescription(
  'Reversable Set',
  'XS, S, M, L, XL, XXL',
  120,
  'A gorgeaous 2-for-1 reversable set',
  '../../images/reversableSet.jpeg',
  'item7'
);
let item8 = new itemDescription(
  'Emarald Luna One piece',
  'XS, S, M, L, XL, XXL',
  100,
  'A pretty Emarald Luna One piece',
  '../../images/emaraldOnepiece.jpeg',
  'item8'
);
let item9 = new itemDescription(
  'Brown Set',
  'XS, S, M, L, XL, XXL',
  60,
  'A pretty brown bikini set',
  '../../images/lightBrownSet.jpeg',
  'item9'
);
let item10 = new itemDescription(
  'Orange Top',
  'XS, S, M, L, XL, XXL',
  70,
  'A pretty Orange bikini Top',
  '../../images/orangeTop.jpeg',
  'item10'
);
let item11 = new itemDescription(
  'Purpple Set',
  'XS, S, M, L, XL, XXL',
  100,
  'A pretty Purple bikini set',
  '../../images/purpleSet.jpg',
  'item11'
);
let item12 = new itemDescription(
  'Beach Necklace',
  'XS, S, M, L, XL, XXL',
  30,
  'Beach jewelry is a must! <br><br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ipsa blanditiis reiciendis perferendis repellat, facere modi quasi soluta! Vitae, porro?',
  '../../images/necklace.jpg',
  'item12'
);

// create and array with all the above objects
const catalogue = [
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  item7,
  item8,
  item9,
  item10,
  item11,
  item12
];

// construct the catalogue
let loaded = {};

loaded.buildCatalogue = function () {
  // overlay.style.height = '100%';
  catalogue.forEach(function (item) {
    //   to build the catalogue, I will need to create the card:
    // connect to the DOM row
    let row = document.getElementById('catalogueRow');

    // build the div with class: col-lg-4 col-md-6 col-sm-12
    // This particular container will house the card
    let outerContainer = document.createElement('div');
    outerContainer.id = item.id;
    outerContainer.classList = 'col-lg-4 col-md-6 col-sm-12';
    outerContainer.addEventListener('click', function (e) {
      item.showItem();
    });

    // Build the div with class: card
    let innerrContainer = document.createElement('div');
    innerrContainer.classList = 'card';

    // build the image
    // The image will use the location in the item object
    // it will have the class: card-img-top img-fluid imgBorder
    // the alternative with be the name of the item object
    let image = document.createElement('img');
    image.classList = 'card-img-top img-fluid imgBorder';
    image.alt = item.name;
    image.src = item.image;

    // next, we'll build the container that will house the information about the product
    // This will have the class list of: card-body
    let cardBody = document.createElement('div');
    cardBody.classList = 'card-body';

    // Add the heading
    // This will have the class: card-title
    let cardTitle = document.createElement('h5');
    cardTitle.classList = 'card-title';
    cardTitle.innerHTML = item.name;

    // add the body of information
    // This will have the class: card-text
    let cardText = document.createElement('p');
    cardText.classList = 'card-text';
    cardText.innerHTML =
      'Available sizes: ' + item.size + '<br> Price: ' + item.price;

    // Add the 'view item' button
    // classList: btn btn-outline-success addToCart
    let viewItemButton = document.createElement('button');
    viewItemButton.classList = 'btn btn-outline-primary viewItem';
    viewItemButton.innerHTML = 'View item';
    viewItemButton.style.marginLeft = '10px';
    viewItemButton.addEventListener('click', function (e) {
      item.showItem();
    });
    viewItemButton.id = item.id;

    // Add the 'add to cart' button
    // classList: btn btn-outline-success addToCart
    let addToCartButton = document.createElement('button');
    addToCartButton.classList = 'btn btn-outline-success addToCart';
    addToCartButton.innerHTML = 'Add to Cart';

    // Now we append and build the entire cart
    // we start from the bottom
    // apending the text and button to the card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(addToCartButton);
    cardBody.appendChild(viewItemButton);

    // the image and the card body are the main content of the inner container, so not we add it to the innerContainer
    innerrContainer.appendChild(image);
    innerrContainer.appendChild(cardBody);

    // then we add the inner container to the out container
    outerContainer.appendChild(innerrContainer);

    // and lastly, the outer container to the row
    row.appendChild(outerContainer);
  });

  storageCheckLoca();
};

function storageCheckLoca() {
  // check for local storage
  if (localStorage.getItem('loadedTheCatalogue') === null) {
    //   create local variables
    localStorage.setItem('catalogueItems', JSON.stringify(catalogue));
    localStorage.setItem('loadedTheCatalogue', true);
  } else {
    // fetch local variables
    catalogueItems = JSON.parse(localStorage.getItem('catalogueItems'));
  }
}
