// Product description
const productDescription = document.querySelector('.product-detail-description');
const showMoreButton = document.querySelector('.see-more-button');
const productDescriptionHeight = productDescription.offsetHeight;

console.log("Height of product sedc: " + productDescriptionHeight);
if (productDescriptionHeight > 100) {
    productDescription.classList.add('shorten-text');
    showMoreButton.style.display = 'block';
}

function showMoreButtonClickHandler() {
    productDescription.classList.remove('shorten-text');
    showMoreButton.style.display = 'none';
}

showMoreButton.addEventListener('click', showMoreButtonClickHandler);