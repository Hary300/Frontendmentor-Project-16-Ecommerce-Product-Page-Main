import { navigationLinks } from './data/navigationLinks.js';

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

mobileNavigationLinksContainer.innerHTML = `
  ${navigationLinks
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
    .join('')}
  `;

/**-----------
 * NavLinks
 ------------*/

const desktopNavigationLinksContainer =
  document.getElementById('desktop-nav-links');

desktopNavigationLinksContainer.innerHTML = `
  ${navigationLinks
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
    .join('')}
  `;

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
