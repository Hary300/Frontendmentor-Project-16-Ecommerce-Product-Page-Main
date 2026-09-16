import { navigationLinks } from './data/navigationLinks.js';
import { products } from './data/products.js';
import { nextButtonSvg } from './data/nextButtonSvg.js';
import { prevButtonSvg } from './data/prevButtonSvg.js';
import { closeButtonSvg } from './data/closeButtonSvg.js';

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
      `<li class='border-b-4 border-orange/0 hover:border-orange'>
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
      `<li class='border-b-4 border-orange/0 hover:border-orange pt-8 pb-6 cursor-pointer text-grayish-blue hover:text-black transition-all duration-300 ease-in-out'>
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

let cart = [];

function renderCart() {
  const totalItemCart = document.getElementById('total-item-cart');
  if (totalItemCart) totalItemCart.remove();
  if (cart.length <= 0) {
    cartContentContainer.innerHTML = `
  <p class='min-h-30 flex justify-center items-center font-semibold text-dark-grayish-blue w-full'>Your cart is empty</p>
  `;
  } else {
    const totalItems = `
<div
  id="total-item-cart"
  class="absolute -top-2 -right-2 size-5 rounded-full bg-red-500 text-white flex justify-center items-center shrink-0 text-xs font-semibold"
>
  ${cart.length}
</div>
`;
    const cartContainer = document.getElementById('cart-container');
    cartContainer.insertAdjacentHTML('beforeend', totalItems);
    cartContentContainer.innerHTML = cart
      .toReversed()
      .map(
        (item) =>
          `
<div class="flex flex-col gap-6 w-full" data-id=${item.id}>
  <div class="flex justify-between items-center">
      <div class="flex gap-4 items-center">
        <div class="rounded-lg max-w-10 overflow-hidden">
          <img src="${item.image}" alt="product image" />
        </div>
        <div class="flex flex-col">
          <p class="text-dark-grayish-blue">${item.name}</p>
          <p class="text-dark-grayish-blue">$${item.finalPrice.toFixed(2)}x${item.quantity}
            <span class="text-very-dark-blue font-bold">$${item.totalPrice.toFixed(2)}</span>
          </p>
        </div>
    </div>

    <div class='delete-item-icon cursor-pointer'>
      <img src="./assets/images/icon-delete.svg" alt="bin icon" />
    </div>
  </div>

  <button
    class="bg-orange h-10 w-full flex justify-center items-center font-semibold rounded-xl cursor-pointer hover:bg-orange/80"
  >
    Checkout
  </button>
</div>      
      `
      )
      .join('');

    /**-----------------------
 * Delete item
 ------------------------*/

    const deleteItemIcons = document.querySelectorAll('.delete-item-icon');

    deleteItemIcons.forEach((icon) => {
      icon.addEventListener('click', (event) => {
        const itemElement = event.target.closest('[data-id]');
        const itemId = itemElement ? itemElement.dataset.id : null;
        cart = cart.filter((item) => item.id !== itemId);
        renderCart();
      });
    });
  }
}

renderCart();

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
  const deleteButton = event.target.closest('.delete-item-icon');
  if (!cartBox && cartOpen && !cartIcon && !deleteButton) {
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
<div class="product-thumbnail hidden sm:block flex-1 rounded-lg overflow-hidden cursor-pointer border-3 ${image.id === activeImgId ? 'border-orange' : 'border-orange/0'}" data-id=${image.id}>
  <img src=${image.imgSrc} alt=${image.altText} class='hover:opacity-20 size-full object-cover ${image.id === activeImgId && 'opacity-20'}' />
</div>  
  `
    )
    .join('');

  const productThumbnails = document.querySelectorAll('.product-thumbnail');

  productThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      setActiveImg(thumbnail.dataset.id);
      activeImgId = thumbnail.dataset.id;
      activeItemIndex = index;
      renderLightBoxThumbnail(activeItemIndex);
      jumpCarousel(activeItemIndex);
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

const discount = selectedProduct.discount;
const originalPrice = selectedProduct.price;
const finalPrice = originalPrice * (discount / 100);

let quantity = 1;

companyNameEl.innerText = selectedProduct.company;
productNameEl.innerText = selectedProduct.productName;
productDescriptionEl.innerText = selectedProduct.productDescription;
finalPriceEl.innerText = `$${finalPrice.toFixed(2)}`;
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

/**-----------------------
 * LightBox
 ------------------------*/
const lightboxCarouselItems = document.getElementById(
  'lightbox-carousel-items'
);

lightboxCarouselItems.innerHTML = selectedProduct.images
  .map(
    (image) => `
<div class='min-w-full rounded-2xl overflow-hidden'>
    <img src=${image.imgSrc} alt=${image.altText} class='rounded-2xl'/>
</div>
`
  )
  .join('');

const lightboxNextButton = document.getElementById('lightbox-next-button');
const lightboxPrevButton = document.getElementById('lightbox-prev-button');
const lightboxCloseButton = document.getElementById('lightbox-close-button');

lightboxNextButton.innerHTML = nextButtonSvg;
lightboxPrevButton.innerHTML = prevButtonSvg;
lightboxCloseButton.innerHTML = closeButtonSvg;

function jumpCarousel(lightboxActiveItemIndex) {
  lightboxCarouselItems.style.transform = `translateX(-${lightboxActiveItemIndex * 100}%)`;
}

const lightboxImageThumbnailsContainer = document.getElementById(
  'lightbox-image-thumbnails-container'
);

lightboxImageThumbnailsContainer.innerHTML = selectedProduct.images
  .map(
    (image, index) => `
<div class="lightbox-image-thumbnail hidden sm:block flex-1 rounded-lg overflow-hidden cursor-pointer border-3 ${activeItemIndex === index ? 'border-orange' : 'border-orange/0'}" data-id=${image.id}>
  <img src=${image.imgSrc} alt=${image.altText} class='hover:opacity-70 size-full object-cover ${activeItemIndex === index && 'opacity-80'}' />
</div>  
  `
  )
  .join('');

function renderLightBoxThumbnail(lightBoxActiveIndex) {
  lightboxImageThumbnailsContainer.innerHTML = selectedProduct.images
    .map(
      (image, index) => `
<div class="lightbox-image-thumbnail hidden sm:block flex-1 rounded-lg overflow-hidden cursor-pointer border-3 ${lightBoxActiveIndex === index ? 'border-orange' : 'border-orange/0'}" data-id=${image.id}>
  <img src=${image.imgSrc} alt=${image.altText} class='hover:opacity-70 size-full object-cover ${lightBoxActiveIndex === index && 'opacity-80'}' />
</div>  
  `
    )
    .join('');

  if (activeItemIndex <= 0) {
    lightboxPrevButton.disabled = true;
  } else {
    lightboxPrevButton.disabled = false;
  }

  if (activeItemIndex >= selectedProduct.images.length - 1) {
    lightboxNextButton.disabled = true;
  } else {
    lightboxNextButton.disabled = false;
  }

  const lightboxImageThumbnails = document.querySelectorAll(
    '.lightbox-image-thumbnail'
  );

  lightboxImageThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      activeItemIndex = index;
      jumpCarousel(activeItemIndex);
      renderLightBoxThumbnail(activeItemIndex);
    });
  });
}

if (activeItemIndex <= 0) {
  lightboxPrevButton.disabled = true;
}

function prevLightBoxCarousel() {
  lightboxNextButton.disabled = false;
  activeItemIndex--;
  renderLightBoxThumbnail(activeItemIndex);

  lightboxCarouselItems.style.transform = `translateX(-${activeItemIndex * 100}%)`;
  if (activeItemIndex <= 0) {
    lightboxPrevButton.disabled = true;
    return;
  }
}

function nextLightBoxCarousel() {
  lightboxPrevButton.disabled = false;
  activeItemIndex++;
  renderLightBoxThumbnail(activeItemIndex);

  lightboxCarouselItems.style.transform = `translateX(-${activeItemIndex * 100}%)`;
  if (activeItemIndex >= selectedProduct.images.length - 1) {
    lightboxNextButton.disabled = true;
    return;
  }
}

lightboxNextButton.addEventListener('click', nextLightBoxCarousel);

lightboxPrevButton.addEventListener('click', prevLightBoxCarousel);

renderLightBoxThumbnail(activeItemIndex);

const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightbox = document.getElementById('lightbox');
activeImgContainer.addEventListener('click', () => {
  const isBigScreen = window.innerWidth > 768;
  if (!isBigScreen) return;
  lightbox.classList.add('opacity-100');
  lightbox.classList.remove('pointer-events-none');
  lightboxOverlay.classList.add('opacity-100');
  lightboxOverlay.classList.remove('pointer-events-none');
});

document.addEventListener('click', (event) => {
  const lightboxCloseButtonTarget = event.target.closest(
    '#lightbox-close-button'
  );
  const lightboxOverlayTarget = event.target.closest('#lightbox-overlay');

  if (lightboxCloseButtonTarget || lightboxOverlayTarget) {
    lightbox.classList.remove('opacity-100');
    lightbox.classList.add('pointer-events-none');
    lightboxOverlay.classList.remove('opacity-100');
    lightboxOverlay.classList.add('pointer-events-none');
  }
});

/**-----------------------
 * Add to cart
 ------------------------*/
const addToCartButtonEl = document.getElementById('add-to-cart-button');
addToCartButtonEl.addEventListener('click', () => {
  const data = {
    id: crypto.randomUUID(),
    image: selectedProduct.images[0].thumbnailImgSrc,
    name: selectedProduct.productName,
    finalPrice: finalPrice,
    quantity: quantity,
    totalPrice: finalPrice * quantity,
  };
  cart.push(data);
  renderCart();
});

window.addEventListener('load', () => {
  document.body.classList.add('ready');
});
