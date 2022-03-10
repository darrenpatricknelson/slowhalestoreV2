/*
REFERENCES:

Needed alot of help during this project so I dont alot of research. 
All of the code is mine.

I went from website to website gathering information and ways to solve my problems and did not copy the links of the websites but I used references such as:

- W3schools
- stackoverflow 
and 
- youtube

One video that really helped me was this one:
- https://www.youtube.com/watch?v=1LFfp8bTpvc&t=894s&ab_channel=AllThingsJavaScript%2CLLC
-  I struggled with arrayd and objects and the channel "All things Javascript, LLC" really provided good advice
- https://www.youtube.com/channel/UCRQhZGXC0WK85YRXl7nGX0w

I also got alot of help from my friend and mentor Evan Christians
- The code was from lines 904 to 945 was written with his help

FOR THE JQUERY:
- function that shows and hides is in the delivery form. Choosing different delivery options and different payment options will yeld different results
- drop-down menu is the accordion on the catalogue page
- animation is the the scaling of the payment option buttons
- chained effects are also apart of the payment option buttons


OTHER NOTES: 
- I contemplated clearing the check out page once the user clicks the confirm order button. I would have done this by clearing the lineItemsArray in the local storage. However, I decided againts this because I want the code reviewer to test the randomly generated number that appears on that buttons click
- I really struggled trying to figure out all the javascript in this task so my css is definetely lacking. I don't think my website looks as good as it could but my main focus was implementing the javscript. apologies for that
- The user can add multiple of the same product to their cart. This presented me with a tough solution to figure out when it comes to displaying cards and amounnts. My mentor Evan Christians helped me through this process. However, I am still responsible for the flow of this .js file. He just helped me out with the quantity bit of multiple products in the cart.

*/

// STEP 1: Check the local storage to see if the user visited our site before and if they have any items in their cart...
// Notably, this won't be our onload function. However, our onload function will have a line of code that runs this function and returns the lineItemsArray
var lineItemsArray = new Array(); // creating a new empty array
const checkStorage = () => {
  // create an array for lineitems.
  // Line items are items stored in the users cart
  let lineItems_string = localStorage.getItem('lineItemsArray');

  // check to see if this exits and if it doesnt, create it.
  if (localStorage.getItem('userReturn') === null) {
    localStorage.setItem('lineItemsArray', JSON.stringify(lineItemsArray));
    localStorage.setItem('userReturn', true);
  } else {
    lineItemsArray = JSON.parse(lineItems_string);
  }

  // We returning this array because in our following functions, we will run this functions when declaring the variable. This will make more sense when you see it in action.
  return lineItemsArray;
};

// =====
// =====
// =====

// STEP 2: Create a class that will have a constructor function as well as methods within the class.
class itemDescription {
  constructor(name, size, price, description, image, id, type) {
    this.name = name; // Name of the product
    this.size = size; // Size of the product. Since this is an example store, I won't be putting in proper sizes but all the avalable sizes
    this.price = price; // Price of the product. This price will be made up
    this.description = description; // A short description. Also made up
    this.image = image; // the image source of the product
    this.id = id; // An ID for the product
    this.type = type; // The type of product it is. Since we have different types of items available for sale, I'll use a fiilter to filter out products that the use is not interested in. For example, if the users are only looking at bikini tops, they can filter out the rest of the products.
  }

  showItem() {
    // Step 1: Create containers that will display all the information
    // make the overlay appear
    let overlay = document.getElementById('itemOverlay');
    overlay.classList.remove('hidden');
    overlay.classList.add('overlay');
    overlay.innerHTML = '';

    // add a close container to the overlay
    let closeOverlayButton = document.createElement('div');
    closeOverlayButton.classList.add('closeOverlayButton');
    closeOverlayButton.innerHTML = 'Close Cart  X';

    // creat a div the will house all of the item content
    let container = document.createElement('div');
    container.classList.add('itemDisplayContainer');

    // now we create a container to house an image of the item
    let imageContainer = document.createElement('div');
    imageContainer.classList.add('itemDisplayImageContainer');
    // add the image
    let itemImage = document.createElement('img');
    itemImage.src = this.image;
    itemImage.classList.add('itemDisplayImage');

    // now we create a container to house the information about the item
    let itemInformation = document.createElement('div');
    itemInformation.classList.add('itemInformationContainer');
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

    // Step 2: Append children to their parents
    // Append the inner items to the inner container
    // the image
    imageContainer.appendChild(itemImage);
    // the information
    itemInformation.appendChild(itemHeading);
    itemInformation.appendChild(itemBody);

    // Append the inner container to the outer container
    container.appendChild(imageContainer);
    container.appendChild(itemInformation);

    // append the container to the overlay
    overlay.appendChild(closeOverlayButton);
    overlay.appendChild(container);

    // Step 3: Add an event listener so that when the user clcks the close button, the overlay is closed and cleared
    closeOverlayButton.addEventListener('click', function () {
      overlay.classList.add('hidden');
      overlay.classList.remove('overlay');
    });
  }

  // Add to cart method
  addToCart() {
    let lineItemsArray = checkStorage();

    let lineItem = {
      name: this.name,
      size: this.size,
      price: this.price,
      description: this.description,
      image: this.image,
      id: this.id,
      type: this.type,
      quantity: 1
    };

    let existingLineItemIndex = lineItemsArray.findIndex(
      (li) => li.id == lineItem.id
    );

    if (existingLineItemIndex >= 0) {
      lineItemsArray[existingLineItemIndex].quantity++;
    } else {
      lineItemsArray.push(lineItem);
    }
    let cartTotal = cartPriceTotal(lineItemsArray); // a cart total of all items

    alert(`Your total is R ${cartTotal}.00 before tax`);
    localStorage.setItem('lineItemsArray', JSON.stringify(lineItemsArray));

    // checks the amount stored in the cart
    cartAmount();
  }
}

// =====
// =====
// =====>

// STEP 3: Using the constructor function, create objects for each product for sale
let item1 = new itemDescription(
  'Black Set', // name
  'XS, S, M, L, XL, XXL', // size
  80, // price
  'A pretty Black bikini set', // description
  '../../images/blackSet.jpg', // image source
  'item1', // ID
  'set' // clothing class
);
let item2 = new itemDescription(
  'Emarald Set',
  'XS, S, M, L, XL, XXL',
  70,
  'A pretty Emarald bikini set',
  '../../images/greenSet1.jpg',
  'item2',
  'set'
);
let item3 = new itemDescription(
  'Fire Orange Set',
  'XS, S, M, L, XL, XXL',
  90,
  'A pretty Fire Orange bikini set',
  '../../images/orangeSetSlim.jpg',
  'item3',
  'set'
);
let item4 = new itemDescription(
  'Orange Top Set',
  'XS, S, M, L, XL, XXL',
  120,
  'A set of Orange bikini tops',
  '../../images/orangeTopCombo.jpeg',
  'item4',
  'top'
);
let item5 = new itemDescription(
  'Sea Blue Bottoms',
  'XS, S, M, L, XL, XXL',
  60,
  'A pretty Sea Blue bikini bottom',
  '../../images/blueBottom.jpeg',
  'item5',
  'bottom'
);
let item6 = new itemDescription(
  'Emarald Bottoms',
  'XS, S, M, L, XL, XXL',
  80,
  'A pretty black bikini set',
  '../../images/greenBottom.jpeg',
  'item6',
  'bottom'
);
let item7 = new itemDescription(
  'Reversable Set',
  'XS, S, M, L, XL, XXL',
  120,
  'A gorgeaous 2-for-1 reversable set',
  '../../images/reversableSet.jpeg',
  'item7',
  'set'
);
let item8 = new itemDescription(
  'Emarald Luna One piece',
  'XS, S, M, L, XL, XXL',
  100,
  'A pretty Emarald Luna One piece',
  '../../images/emaraldOnepiece.jpeg',
  'item8',
  'onePiece'
);
let item9 = new itemDescription(
  'Brown Set',
  'XS, S, M, L, XL, XXL',
  60,
  'A pretty brown bikini set',
  '../../images/lightBrownSet.jpeg',
  'item9',
  'set'
);
let item10 = new itemDescription(
  'Orange Top',
  'XS, S, M, L, XL, XXL',
  70,
  'A pretty Orange bikini Top',
  '../../images/orangeTop.jpeg',
  'item10',
  'top'
);
let item11 = new itemDescription(
  'Purpple Set',
  'XS, S, M, L, XL, XXL',
  100,
  'A pretty Purple bikini set',
  '../../images/purpleSet.jpg',
  'item11',
  'set'
);
let item12 = new itemDescription(
  'Beach Necklace',
  'XS, S, M, L, XL, XXL',
  30,
  'Beach jewelry is a must! <br><br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ipsa blanditiis reiciendis perferendis repellat, facere modi quasi soluta! Vitae, porro?',
  '../../images/necklace.jpg',
  'item12',
  'accessory'
);

// =====
// =====
// =====>

// STEP 4: Store the newly created objects with in the catalogue array.
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

// =====
// =====
// =====>

// STEP 5: Check to see if the user has any items in their cart and display this number
const cartAmount = () => {
  // I mentioned above that we will return lineItemsArray at the end of the checkStorage() function and my reason was; 'in functions further down this file, we'll store that returned value within a newly declared variable', below is an example of that in action:
  // We will use this information to display the amount of items in the cart
  let lineItemsArray = checkStorage();
  let numItems = lineItemsArray.reduce(
    (acc, lineItem) => acc + lineItem.quantity,
    0
  );
  let cartAmount = document.getElementById('cartAmount'); // This connects to the DOM, and returns the element that displays the cart
  cartAmount.innerHTML = numItems; // The inner HTML of the cart element now displays the amount of items in the LineItemsArray
};

// =====
// =====
// =====>

// STEP 6: Create a card for each object in the catalogue array and display each card when the webpage loads up.
// This will be our onload function
const buildCatalogue = () => {
  // display the items in cart:
  cartAmount();

  // Once the cart items are display, we can build our catalogue page:

  // Step 1: create card containers for each object
  catalogue.forEach(function (item) {
    // connect to the DOM row
    let row = document.getElementById('catalogueRow');

    // build the div with class: col-lg-4 col-md-6 col-sm-12
    // This particular container will house the card
    let outerContainer = document.createElement('div');
    outerContainer.id = item.id;
    outerContainer.setAttribute('name', item.type);
    outerContainer.classList = 'col-lg-4 col-md-6 col-sm-12';

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
    cardText.innerHTML = `Available sizes: ${item.size} <br> Price: ${item.price}`;

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
    addToCartButton.addEventListener('click', function (e) {
      item.addToCart();
      // To display teh cart total in an alert, we will use functions created further down the file
      let priceList = uniqueLineItemsArrayPrice(lineItemsArray); // this function stores all the prices of the main array
      let cartTotal = cartPriceTotal(priceList); // This function stores the sum of the above price list
      // The following is the alert
      // alert(`Your cart total is R ${cartTotal}.00`);
    });

    // Step 2: append all the children to their parents
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
};

// =====
// =====
// =====>

// STEP 7: Create a mini display section for a quick view of the items in the users cart

// Step 7.1:
// we need to calculate the total of all the prices in teh lineItemsArray
// The following is a function to do that, we will use it further down
const cartPriceTotal = (mainArray) => {
  const sum = mainArray.reduce((acc, x) => acc + x.price * x.quantity, 0);

  return sum;
};

// Step 7.2: display everything
const displayCartItems = () => {
  // Step 1: Create all the containers
  // the overlay will cover the entire screen with a dark transparent background
  let overlay = document.getElementById('itemOverlay');
  overlay.classList.remove('hidden');
  overlay.classList.add('overlay');
  overlay.innerHTML = '';

  // add a close container to the overlay
  let closeOverlayButton = document.createElement('div');
  closeOverlayButton.classList.add('closeOverlayButton');
  closeOverlayButton.innerHTML = 'Close Cart  X';

  // create a div the will house all of the item content
  let container = document.createElement('div');
  container.classList.add('cartItemContainer');

  // create the container heading: "Your Cart"
  let containerHeading = document.createElement('div');
  containerHeading.classList.add('cartContainerHeading');

  // creating the contents of the heading container
  let innerHeading = document.createElement('h3');
  innerHeading.innerHTML = 'Your cart: ';
  innerHeading.classList.add('cartInnerHeading');
  // creating a link to the checkout page
  let checkOutLink = document.createElement('a');
  checkOutLink.id = 'checkOutPage';
  checkOutLink.innerHTML = 'Head to check out page';
  checkOutLink.classList = 'btn btn-outline-info cartCheckOutLink';
  checkOutLink.href = '../shipping/index.html';

  // append the information to the heading container
  containerHeading.appendChild(innerHeading);
  containerHeading.appendChild(checkOutLink);

  // append inner child to container
  container.appendChild(containerHeading);

  // =====>

  // Step 2: we are going to use the function we create above to store the value for the total of all items
  let lineItemsArray = checkStorage(); // array in the storage location
  let cartTotal = cartPriceTotal(lineItemsArray); // a cart total of all items

  // Display the total price so that the user knows before heading to the checkout page
  let totalPriceContainer = document.createElement('div');
  totalPriceContainer.classList.add('cartProductPrice');
  totalPriceContainer.innerHTML = `The total for your order is <strong>R ${cartTotal}.00</strong> before tax. Head to the checkout page to finalise your order.`;

  container.appendChild(totalPriceContainer);

  // if there are no items in the cart, display a message saying the cart is empty
  if (lineItemsArray.length === 0) {
    let emptyContainer = document.createElement('div');
    emptyContainer.classList.add('emptyContainer');
    emptyContainer.innerHTML = '<h3>Your cart is empty</h3>';

    // hide the link to the check out page
    checkOutLink.style.display = 'none';
    totalPriceContainer.style.display = 'none';

    // append to the main container
    container.appendChild(emptyContainer);
  }

  // Step 2: Using the lineItemsArray, we will build the mini page
  lineItemsArray.forEach(function (item) {
    // create the container and some styles
    let itemContainer = document.createElement('div');
    itemContainer.classList.add('cartProductContainer');

    // create the image and some styles
    let itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemImage.alt = item.name;
    itemImage.classList.add('cartProductImage');

    // create a body that will house the information about the item
    let itemBody = document.createElement('div');
    itemBody.classList.add('cartProductInformation');
    itemBody.innerHTML = `<strong><u>Product</u></strong>: ${
      item.name
    }<br> <strong><u>Size</u></strong>: ${
      item.size
    } <br> <strong><u>Price</u></strong>: R ${
      item.price
    }.00 <br> <strong><u>Quantity</u></strong> x${
      item.quantity
    } <br> <strong><u>Total</u></strong>: R ${
      item.quantity * item.price
    }.00 <br><br>`;

    // add a button to remove item from cart
    let removeItemButton = document.createElement('button');
    removeItemButton.classList =
      'btn btn-outline-danger cartRemoveItemButton remove';
    removeItemButton.innerHTML = 'Remove item from your cart';
    // The button will have a call back funtion further down
    // I used this same process in one of my previous tasks

    // add button to the item body
    itemBody.appendChild(removeItemButton);

    // add the image and the information to the container
    itemContainer.appendChild(itemImage);
    itemContainer.appendChild(itemBody);

    container.appendChild(itemContainer);
  });

  // append the container and close button to the overlay
  overlay.appendChild(closeOverlayButton);
  overlay.appendChild(container);

  // the function to delete items from the storage
  // We are storing buttons in an arary and then using the buttons index to delete the index in the lineItemsArray
  let delButtons = document.getElementsByClassName('remove');

  // used that array to execute the following code
  for (let i = 0; i < delButtons.length; i++) {
    delButtons[i].addEventListener('click', function (e) {
      // getting the array using the function we wrote above
      let lineItemsArray = checkStorage();

      // check the quantities of the items
      if (lineItemsArray[i].quantity > 1) {
        lineItemsArray[i].quantity--;
        // if the item is = 1, delete the index completely using the splice method
      } else if (lineItemsArray[i].quantity <= 1) {
        lineItemsArray.splice(i, 1);
      }

      // sending the array back to the storage location
      localStorage.setItem('lineItemsArray', JSON.stringify(lineItemsArray));

      // displaying the content
      cartAmount();
      displayCartItems();
    });
  }

  // add an event listener so that when the close button on the overlay is clicked, it is closed and cleared
  closeOverlayButton.addEventListener('click', function () {
    overlay.classList.add('hidden');
    overlay.classList.remove('overlay');
  });
};

// =====
// =====
// =====>

// now that our items are displaying in the cart quick view, when the user clicks on the link and heads over to the check out page, we need to give them a warm welcome
// STEP 1: The onload function
// We know that sometimes users are curious and they might click on the check out page with no items in their cart, if they do this, we'll have a message waiting for them to let them know that their cart is empty and also provided a quick link to the catalogue
//  I hardcoded this information. The main purpose of the onload function is to check whether or not the storage location is empty, and then make visible what ever should be visible
const checkOutPageOnload = () => {
  // start off like we always do, store the local storage array in our variable
  let lineItemsArray = checkStorage();
  // clearing the delivery amount
  localStorage.setItem('deliveryPrice', JSON.stringify(0));

  // simple if statement to check length of the array
  if (lineItemsArray.length == 0) {
    hideFormShowMessage();
  } else {
    showFormHideMessage();
    displayCheckOutInformation();
  }
};

// =====
// =====
// =====>

// STEP 2: hiding the form and showing the empty cart message
const hideFormShowMessage = () => {
  let hiddenForm = document.getElementById('checkOutForm');
  let hiddenCheckOutSummary = document.getElementById('checkOutSummary');
  let showMessage = document.getElementById('emptyCartMessage');

  // add classes
  hiddenForm.classList.add('hidden');
  hiddenCheckOutSummary.classList.add('hidden');
  showMessage.classList.remove('hidden');
};

// =====
// =====
// =====>

// STEP 3: hiding the empty cart message and showing the form
const showFormHideMessage = () => {
  let hiddenForm = document.getElementById('checkOutForm');
  let hiddenCheckOutSummary = document.getElementById('checkOutSummary');
  let showMessage = document.getElementById('emptyCartMessage');

  // add classes
  hiddenForm.classList.remove('hidden');
  hiddenCheckOutSummary.classList.remove('hidden');
  showMessage.classList.add('hidden');
};

// =====
// =====
// =====>

// STEP 4: add classLists to buttons
let deliverButton = document.getElementById('deliverCheck');
let pickUpButton = document.getElementById('pickUp');

// add functionality to those buttons
if (deliverButton) {
  deliverButton.addEventListener('click', function (e) {
    deliverButton.classList.add('active');
    pickUpButton.classList.remove('active');
    // I used local storage to store the delivery amount
    localStorage.setItem('deliveryPrice', JSON.stringify(40));
    displayCheckOutInformation();
  });
}

if (pickUpButton) {
  pickUpButton.addEventListener('click', function (e) {
    deliverButton.classList.remove('active');
    pickUpButton.classList.add('active');

    localStorage.setItem('deliveryPrice', JSON.stringify(0));
    displayCheckOutInformation();
  });
}

// I'm using the local storage to do a delivery check
const calculateDelivery = () => {
  let amount = localStorage.getItem('deliveryPrice', JSON.stringify());
  // fetch and return the amount in the local storage
  return amount;
};

// =====
// =====
// =====>

// Step 5: Calculate discount
const calculateDiscount = () => {
  let couponCode = document.getElementById('couponCode');
  let couponCodeValue = couponCode.value;

  let discountValue = 0;

  // checking to see if the coupon code inserted by the user matches one of the coupons in my array
  if (couponCodeValue == couponCodes[0]) {
    discountValue = 20;
  } else if (couponCodeValue == couponCodes[1]) {
    discountValue = 30;
  } else if (couponCodeValue == couponCodes[2]) {
    discountValue = 50;
  }

  // returns the value
  return discountValue;
};

// create an array of coupon code values
let couponCodes = ['discount20', 'discount30', 'discount50'];

// discount button
let discountButton = document.getElementById('discountApplyButton');
if (discountButton) {
  discountButton.addEventListener('click', function (e) {
    e.preventDefault();
    let couponCode = document.getElementById('couponCode');
    let couponCodeValue = couponCode.value;

    totalDiscountSummary.innerHTML = '';

    // checking the value of the coupon that user inserted against the values in my coupon array
    // Depending on the result, it will display a certain message
    if (couponCodeValue == couponCodes[0]) {
      totalDiscountSummary.innerHTML = 'Your discount is <u>20%</u> off';
      totalDiscountSummary.classList.add('acceptedDiscount');
      totalDiscountSummary.classList.remove('rejectedDiscount');
    } else if (couponCodeValue == couponCodes[1]) {
      totalDiscountSummary.innerHTML = 'Your discount is <u>30%</u> off';
      totalDiscountSummary.classList.add('acceptedDiscount');
      totalDiscountSummary.classList.remove('rejectedDiscount');
    } else if (couponCodeValue == couponCodes[2]) {
      totalDiscountSummary.innerHTML = 'Your discount is <u>50%</u> off';
      totalDiscountSummary.classList.add('acceptedDiscount');
      totalDiscountSummary.classList.remove('rejectedDiscount');
    } else {
      totalDiscountSummary.innerHTML = 'That discount code does not exist';
      totalDiscountSummary.classList.add('rejectedDiscount');
      totalDiscountSummary.classList.remove('acceptedDiscount');
    }

    // running other functions
    calculateDiscount();
    displayCheckOutInformation();
  });
}

// =====
// =====
// =====>

// Step 6: Display the information on the check out page
const displayCheckOutInformation = () => {
  // store all my variables
  let lineItemsArray = checkStorage();
  let cartTotal = cartPriceTotal(lineItemsArray);
  let discountTotal = calculateDiscount();
  let deliveryTotal = calculateDelivery();

  // connect the the html elements
  let orderSummary = document.getElementById('orderSummary');
  orderSummary.innerHTML = '';
  let delivery = document.getElementById('delivery');
  let discount = document.getElementById('discount');
  let total = document.getElementById('total');
  let tax = document.getElementById('tax');
  let orderTotal = document.getElementById('orderTotal');

  // using the lineItemsArray, construct order summary information
  for (let item of lineItemsArray) {
    // create a div conttainer
    let container = document.createElement('div');
    container.classList.add('orderSumContainer');
    // create elements
    let tally = document.createElement('span');
    tally.classList.add('tally');

    let description = document.createElement('span');
    description.classList.add('description');

    let tallyTotal = document.createElement('span');
    tallyTotal.classList.add('tallyTotal');

    let removeIcon = document.createElement('a');
    removeIcon.classList.add('removeSummary');
    removeIcon.classList.add('removeIcon');

    // input information
    tally.innerHTML = `x${item.quantity}`;
    description.innerHTML = item.name;
    tallyTotal.innerHTML = `R ${item.price * item.quantity}.00`;
    removeIcon.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    // Append children to their parent
    container.appendChild(tally);
    container.appendChild(description);
    container.appendChild(tallyTotal);
    container.appendChild(removeIcon);

    orderSummary.appendChild(container);
  }

  // calculate totals
  let deliveryAmount = parseInt(deliveryTotal);
  let dicountedAmount = cartTotal * (discountTotal / 100);
  let totalBeforeTax = cartTotal - dicountedAmount + deliveryAmount;
  let taxAmount = Math.round(totalBeforeTax * (14 / 100));
  let orderTotalAmount = totalBeforeTax + taxAmount;
  // next section: discount and delivery
  delivery.innerHTML = `R ${deliveryAmount}.00`;
  discount.innerHTML = `- R ${dicountedAmount}.00`;
  total.innerHTML = `R ${totalBeforeTax}.00`;
  tax.innerHTML = `R ${taxAmount}.00`;
  orderTotal.innerHTML = `R ${orderTotalAmount}.00`;

  // the function to delete items from the storage
  let delButtons = document.getElementsByClassName('removeSummary');

  // used that array to execute the following code
  for (let i = 0; i < delButtons.length; i++) {
    delButtons[i].addEventListener('click', function (e) {
      // getting the array using the function we wrote above
      let lineItemsArray = checkStorage();

      // check the quantities of the items
      if (lineItemsArray[i].quantity > 1) {
        lineItemsArray[i].quantity--;
        // if the item is = 1, delete the index completely using the splice method
      } else if (lineItemsArray[i].quantity <= 1) {
        lineItemsArray.splice(i, 1);
      }

      // sending the array back to the storage location
      localStorage.setItem('lineItemsArray', JSON.stringify(lineItemsArray));

      // displaying the content
      checkOutPageOnload();
    });
  }
};

// STEP 7: Finally, submit the order

const submitFinalOrder = () => {
  let refereceCode = generateReferenceCode(7);

  alert(`Your order has been succesfully placed.
  Your order will be processed.
  Your order number is: ${refereceCode}`);
};

// generate random referece
const generateReferenceCode = (stringLength) => {
  let randomString = '';
  let characters = '0123456789';

  for (let i = 0; i < stringLength; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * stringLength));
  }

  return randomString;
};

//

// ==== // ===== //

// The following is jQuery functions
$(document).ready(function () {
  // fucntion that hides or shows
  // first one is choosing a delivery option
  $('.deliveryOptionChosen').hide();
  $('.pickUpOptionChosen').hide();

  $('#deliverCheck').click(function () {
    $('.deliveryOptionChosen').show();
    $('.pickUpOptionChosen').hide();
  });

  $('#pickUp').click(function () {
    $('.deliveryOptionChosen').hide();
    $('.pickUpOptionChosen').show();
  });

  // second one is choosing a payment option
  $('#cardPayment').hide();
  $('#cashPayment').hide();

  $('#mastercard').click(function () {
    $('#cardPayment').show();
    $('#cashPayment').hide();
  });

  $('#paypal').click(function () {
    $('#cardPayment').hide();
    $('#cashPayment').show();
  });

  // Drop-down menu (accordion)
  // This is to start the accordion in the hidden position
  $('.container1').slideUp();
  $('.container2').slideUp();
  // add some css to when hovering
  $('.accordionHeading1').hover().css('cursor', 'pointer');
  $('.accordionHeading2').hover().css('cursor', 'pointer');
  // the actual function
  $('.accordionHeading1').click(function () {
    //   Since they have been hidden by the slideUp() functions above, they all are _hidden_ so the following statement is true
    if ($('.container1').is(':hidden')) {
      // on hover, the container will slideDown()
      $('.container1').slideDown();
    } else {
      // off hover, the container will slideUp()
      $('.container1').slideUp();
    }
  });

  // The following is a repeat of the above hover() function.
  // I could not figure out how to combine these 2 functions so I used seperate classNames to target the seperate containers

  $('.accordionHeading2').click(function () {
    if ($('.container2').is(':hidden')) {
      $('.container2').slideDown();
    } else {
      $('.container2').slideUp();
    }
  });

  // jquery animation and chained effects
  $('#mastercard').click(function () {
    $('#mastercard')
      .animate({ height: '100px', width: '100px' })
      .addClass('active');
    $('#paypal')
      .animate({ height: '80px', width: '80px' })
      .removeClass('active');
  });

  $('#paypal').click(function () {
    $('#mastercard')
      .animate({ height: '80px', width: '80px' })
      .removeClass('active');
    $('#paypal')
      .animate({ height: '100px', width: '100px' })
      .addClass('active');
  });
});

// get the types from the above array
function getTypes(catalogue) {
  const map = new Map();
  let types = [];

  for (const item of catalogue) {
    if (map.has(item.type)) continue;

    map.set(item.type, true);
    types.push(item.type);
  }

  return types;
}

const types = getTypes(catalogue);
// events for the filter buttons
// create a function for true events
function show(filterType) {
  for (let type of types) {
    if (type !== filterType && filterType !== 'all') {
      $(`[name=${type}]`).hide();
    } else {
      $(`[name=${type}]`).show();
    }
  }
}

function showAll() {
  show('all');
}

function showSets() {
  show('set');
}

function showTops() {
  show('top');
}

function showBottoms() {
  show('bottom');
}

function showAccessories() {
  show('accessory');
}

function showOnePiece() {
  show('onePiece');
}

document.getElementById('showAll').addEventListener('click', function (e) {
  showAll();
});
document.getElementById('showSets').addEventListener('click', function (e) {
  showSets();
});
document.getElementById('showTops').addEventListener('click', function (e) {
  showTops();
});
document.getElementById('showBottoms').addEventListener('click', function (e) {
  showBottoms();
});
document.getElementById('showAcc').addEventListener('click', function (e) {
  showAccessories();
});
document.getElementById('showOneP').addEventListener('click', function (e) {
  showOnePiece();
});
