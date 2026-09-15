import { navigationLinks } from './data/navigationLinks.js';
import { products } from './data/products.js';

/**---------------
 * Hamburger Menu 
 ----------------*/
const hamburgerMenuButton = document.getElementById('hamburger-menu-button');
const overlay = document.getElementById('overlay');
const mobileNav = document.getElementById('mobile-nav');
const closeButton = document.getElementById('close-button');

function openMenu() {
  overlay.classList.add('opacity-100');
  overlay.classList.remove('pointer-events-none');
  mobileNav.classList.add('translate-x-0');
}

function closeMenu() {
  overlay.classList.remove('opacity-100');
  overlay.classList.add('pointer-events-none');
  mobileNav.classList.remove('translate-x-0');
}

hamburgerMenuButton.addEventListener('click', openMenu);
overlay.addEventListener('click', closeMenu);
closeButton.addEventListener('click', closeMenu);

/**---------------
 * Mobile NavLinks 
 ----------------*/
const mobileNavigationLinksContainer =
  document.getElementById('mobile-nav-links');

mobileNavigationLinksContainer.innerHTML = navigationLinks
  .map(
    (link) =>
      `<li key=${link.id} class='border-b-4 border-orange/0 hover:border-orange'>
        <a
          href=${link.href}
          class='cursor-pointer font-bold'
        >
          ${link.label}
        </a>
      </li>`
  )
  .join('');

/**-----------
 * NavLinks
 ------------*/

const desktopNavigationLinksContainer =
  document.getElementById('desktop-nav-links');

desktopNavigationLinksContainer.innerHTML = navigationLinks
  .map(
    (link) =>
      `<li key=${link.id} class='border-b-4 border-orange/0 hover:border-orange pt-8 pb-6 cursor-pointer text-grayish-blue hover:text-black transition-all duration-300 ease-in-out'>
        <a
          href=${link.href}
        >
          ${link.label}
        </a>
      </li>`
  )
  .join('');

/**-----------
 * Cart
 ------------*/
const cartBox = document.getElementById('cart-box');
const cartContentContainer = document.getElementById('cart-content-container');

const cart = [];

if (cart.length <= 0) {
  cartContentContainer.innerHTML = `
  <p class='min-h-30 flex justify-center items-center font-semibold text-dark-grayish-blue w-full'>Your cart is empty</p>
  `;
}

let cartOpen = false;

function toggleCart() {
  cartBox.classList.toggle('opacity-100');
  cartBox.classList.toggle('pointer-events-none');
  cartOpen = !cartOpen;
}

document.addEventListener('click', (event) => {
  const cartIcon = event.target.closest('#cart-icon');

  if (cartIcon) {
    toggleCart();
  }

  const cartBox = event.target.closest('#cart-box');
  if (!cartBox && cartOpen && !cartIcon) {
    toggleCart();
  }
});

/**-----------
 * Product Image
 ------------*/
const activeImgContainer = document.getElementById('active-img-container');
const thumbnailCOntainer = document.getElementById('thumbnail-container');

let activeImgId = 'image1';
const selectedProduct = products.find((product) => product.id === 'product1');

console.log(selectedProduct);

activeImgContainer.innerHTML = selectedProduct.images
  .map(
    (image) =>
      `<img src=${image.imgSrc} alt=${image.altText} data-id=${image.id} class='display-image absolute inset-0 transition-opacity duration-300 ease-in-out  ${image.id === activeImgId ? 'opacity-100' : 'opacity-0'}' />`
  )
  .join('');

function setActiveImg(id = activeImgId) {
  const images = activeImgContainer.querySelectorAll('.display-image');

  images.forEach((image) => {
    image.classList.toggle('opacity-100', image.dataset.id === id);
    image.classList.toggle('opacity-0', image.dataset.id !== id);
  });
}

function renderThumbnail() {
  thumbnailCOntainer.innerHTML = selectedProduct.images
    .map(
      (image) => `
<div class="product-thumbnail hidden sm:block flex-1 rounded-lg overflow-hidden cursor-pointer ${image.id === activeImgId ? 'opacity-40' : ''}" data-id=${image.id}>
  <img src=${image.imgSrc} alt=${image.altText} />
</div>  
  `
    )
    .join('');

  const productThumbnails = document.querySelectorAll('.product-thumbnail');

  productThumbnails.forEach((thumbnail) => {
    console.log('thumbnail');
    thumbnail.addEventListener('click', () => {
      console.log('click');
      setActiveImg(thumbnail.dataset.id);
      activeImgId = thumbnail.dataset.id;
      renderThumbnail();
    });
  });
}

renderThumbnail();
setActiveImg();

/**-----------------------
 * Carousel Product Image
 ------------------------*/
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const itemContainer = document.getElementById('items-container');

let activeItemIndex = 0;

itemContainer.innerHTML = selectedProduct.images
  .map(
    (image) => `
  <div class='min-w-full'>
    <img src=${image.imgSrc} alt=${image.altText}/>
  </div>
  `
  )
  .join('');

nextButton.addEventListener('click', () => {
  prevButton.disabled = false;
  activeItemIndex++;

  itemContainer.style.transform = `translateX(-${activeItemIndex * 100}%)`;
  if (activeItemIndex >= selectedProduct.images.length - 1) {
    nextButton.disabled = true;
    return;
  }
});

prevButton.addEventListener('click', () => {
  nextButton.disabled = false;
  activeItemIndex--;

  itemContainer.style.transform = `translateX(-${activeItemIndex * 100}%)`;
  if (activeItemIndex <= 0) {
    prevButton.disabled = true;
    return;
  }
});

if (activeItemIndex <= 0) {
  prevButton.disabled = true;
} else if (activeItemIndex >= products.length - 1) {
  nextButton.disabled = true;
}

/**-----------------------
 * Product Info
 ------------------------*/
const companyNameEl = document.getElementById('company-name');
const productNameEl = document.getElementById('product-name');
const productDescriptionEl = document.getElementById('product-description');
const finalPriceEl = document.getElementById('final-price');
const discountEL = document.getElementById('discount');
const originalPriceEl = document.getElementById('original-price');
const decQuantityEl = document.getElementById('dec-quantity');
const quantityEl = document.getElementById('quantity');
const incQuantityEl = document.getElementById('inc-quantity');
const addToCartButtonEl = document.getElementById('add-to-cart-button');

const discount = selectedProduct.discount;
const originalPrice = selectedProduct.price;

let quantity = 0;

companyNameEl.innerText = selectedProduct.company;
productNameEl.innerText = selectedProduct.productName;
productDescriptionEl.innerText = selectedProduct.productDescription;
finalPriceEl.innerText = `$${(originalPrice * (discount / 100)).toFixed(2)}`;
discountEL.innerText = `${discount}%`;
originalPriceEl.innerText = `$${originalPrice.toFixed(2)}`;
quantityEl.innerText = quantity;

function quantityIncrement() {
  decQuantityEl.disabled = false;
  quantity++;
  quantityEl.innerText = quantity;
}

function quantityDecrement() {
  quantity--;
  quantityEl.innerText = quantity;
  if (quantity <= 0) {
    decQuantityEl.disabled = true;
  }
}

incQuantityEl.addEventListener('click', quantityIncrement);
decQuantityEl.addEventListener('click', quantityDecrement);
