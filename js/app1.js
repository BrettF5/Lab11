'use strict';

//////////////////////
// globals
//////////////////////

const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
const leftImg = document.getElementById('img1');
const centerImg = document.getElementById('img2');
const rightImg = document.getElementById('img3');
const showResultsButton = document.getElementById('showResults');
const viewResults = document.getElementById('resultsContainer');
let countClick = 0;
const maxClick = 25;
let leftProduct = null;
let centerProduct = null;
let rightProduct = null;

//////////////////////
// Functions
//////////////////////

function Product(name, src) {
    this.name = name;
    this.src = src;
    this.votes = 0;
    this.views = 0;
}

Product.listAllProducts = [];
Product.adjustedProducts = [];

//init is a common to intialize a function
function initProductions() {
    //for(let item of(in) array) {}
    for(let productName of productNames) {
        const productInstance = new Product(productName, `images/${productName}.jpg`);
        Product.listAllProducts.push(productInstance);
    }
}

function renderProducts() {
    if(countClick === maxClick) {
        endClicking();
        return;
    }

    if(Product.adjustedProducts.length < 3) {
        Product.adjustedProducts = Product.listAllProducts.slice();
        shuffleArray(Product.adjustedProducts);
    }

    leftProduct = Product.adjustedProducts.pop();
    centerProduct = Product.adjustedProducts.pop();
    rightProduct = Product.adjustedProducts.pop();

    leftProduct.views += 1;
    centerProduct.views += 1;
    rightProduct.views += 1;

    leftImg.setAttribute('src', leftProduct.src);
    centerImg.setAttribute('src', centerProduct.src);
    rightImg.setAttribute('src', rightProduct.src);


    countClick += 1;
}

// Fisher Yates via chat GPT
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap array[i] and array[j]
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function initEventListener() {
    leftImg.addEventListener('click', handleLeftProductClick);
    centerImg.addEventListener('click', handleCenterProductClick);
    rightImg.addEventListener('click', handleRightProductClick);
}

function handleLeftProductClick() {
    //
    leftProduct.votes += 1;
    renderProducts();
}

function handleCenterProductClick() {
    //
    centerProduct.votes += 1;
    renderProducts();
}

function handleRightProductClick() {
    //
    rightProduct.votes += 1;
    renderProducts();
}

function endClicking() {
    leftImg.removeEventListener('click', handleLeftProductClick);
    centerImg.removeEventListener('click', handleCenterProductClick);
    rightImg.removeEventListener('click', handleRightProductClick);

    // show button that is hidden
    showResultsButton.hidden = false;
    showResultsButton.addEventListener('click', handleShowResults);
}

function handleShowResults() {
    renderResults();
}

function renderResults() {
    const ul = document.createElement('ul');
    viewResults.appendChild(ul);

    for(let productInstance of Product.listAllProducts) {
        const result = `This product ${productInstance.name} had ${productInstance.votes} votes, and was seen ${productInstance.views} times.`;
        const li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = result;
    }

    addChart();

}

function addChart() {
    let productNames = [];
    let productClicks = [];
    let productViews = [];
    
    for(let i=0; i<Product.listAllProducts.length; i++) {
        productNames.push(Product.listAllProducts[i].name);
        productClicks.push(Product.listAllProducts[i].votes);
        productViews.push(Product.listAllProducts[i].views);
    }



  /* refer to Chart.js > Chart Types > Bar Chart:
  https://www.chartjs.org/docs/latest/charts/bar.html
  and refer to Chart.js > Getting Started > Getting Started:
  https://www.chartjs.org/docs/latest/getting-started/ */
  const data = {
    labels: productNames,
    datasets: [{
      label: 'Clicks',
      data: productClicks,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)'
      ],
      borderWidth: 1
    },
    {
      label: 'Views',
      data: productViews,
      backgroundColor: [
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgb(255, 159, 64)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  let canvasChart = document.getElementById('myChart');
  const myChart = new Chart(canvasChart, config);
}

// Start App
initProductions();
initEventListener();
renderProducts();




