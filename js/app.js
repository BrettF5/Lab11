'use strict';

const staticProducts = [];
let adjustProducts = [];
let firstProductImg = null;
let rightProductImg = null;
let centerProductImg = null;
let countClick = 0;
const maxClick = 25;
const leftImg = document.querySelector('section img:first-child');
const centerImg = document.querySelector('section img:nth-child(2)');
const rightImg = document.querySelector('section img:nth-child(3)');
const viewResults = document.querySelector('button');

function Product(name, src) {
    this.name = name;
    this.src = src;
    this.views = 0;
    this.clicks = 0;
}

let bag = new Product('Bag', './images/bag.jpg');
let banana = new Product('Banana', './images/banana.jpg');
let bathroom = new Product('Bathroom', './images/bathroom.jpg');
let boots = new Product('Boots', './images/boots.jpg');
let breakfast = new Product('Breakfast', './images/breakfast.jpg');
let bubblegum = new Product('Bubblegum', './images/bubblegum.jpg');
let chair = new Product('Chair', './images/chair.jpg');
let cthulhu = new Product('Cthulhu', './images/cthulhu.jpg');

staticProducts.push(bag);
staticProducts.push(banana);
staticProducts.push(bathroom);
staticProducts.push(boots);
staticProducts.push(breakfast);
staticProducts.push(bubblegum);
staticProducts.push(chair);
staticProducts.push(cthulhu);

function renderProducts() {
    if(countClick == maxClick) {
        viewResults.addEventListener('click', handleViewResultsClick);

        // disable the L, C & R images
        leftImg.removeEventListener('click', handleLeftClick);
        centerImg.removeEventListener('click', handleCenterClick);
        rightImg.removeEventListener('click', handleRightClick);
    }

    if(adjustProducts.length <= 2) {
        adjustProducts = staticProducts.slice();
        shuffleArray(adjustProducts);
    }

    firstProductImg = adjustProducts.pop();
    leftImg.setAttribute('src', firstProductImg.src);

    centerProductImg = adjustProducts.pop();
    centerImg.setAttribute('src', centerProductImg.src);

    rightProductImg = adjustProducts.pop();
    rightImg.setAttribute('src', rightProductImg.src);

    firstProductImg.views += 1;
    centerProductImg.view += 1;
    rightProductImg.view += 1;
}


// Function for shuffling the arrary:
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap array[i] and array[j]
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function handleLeftClick(event) {
    firstProductImg.clicks +=1;
    countClick += 1;
    renderProducts();
}

function handleCenterClick(event) {
    centerProductImg.click += 1;
    countClick += 1;
    renderProducts();
}

function handleRightClick(event) {
    rightProductImg.click += 1;
    countClick += 1;
    renderProducts();
}

function handleViewResultsClick() {
    renderResults();
  }

leftImg.addEventListener('click', handleLeftClick);
centerImg.addEventListener('click', handleCenterClick);
rightImg.addEventListener('click', handleRightClick);

renderProducts();

// function for rendering results

function renderResults() {
    for(let i=0; i<staticProducts.length; i++) {
        const currentProduct = staticProducts[i];
        const allResults = `${currentProduct.name} had ${currentProduct.views} views and was clicked ${currentProduct.clicks} times.`;
        console.log(allResults);
    }
}