let pens = 0;
let money = 0;
let ink = 0;
let metal = 0;
let metalClicks = 0;
let inventory = 0;
let price = 1.50;
let saleInterval;
const baseSaleInterval = 1000;
const maxDemand = 100;
const decayRate = 0.25;

const penButton = document.querySelector('#addPen');
const inventoryText = document.querySelector('#inventoryTotal');
const metalButton = document.querySelector('#addMetal');
const inkButton = document.querySelector('#addInk');
const text = document.querySelector('#text');
const penText = document.querySelector('#penTotal');
const metalText = document.querySelector('#metalTotal');
const inkText = document.querySelector('#inkTotal');
const moneyText = document.querySelector('#moneyTotal');
const demandText = document.querySelector('#demand');
const raiseButton = document.querySelector('#raisePrice');
const lowerButton = document.querySelector('#lowerPrice');
const priceText = document.querySelector('#priceTotal');




// ================================BUTTONS==========================================
// add pen after clicking button. also checks if user has enough materials.
penButton.addEventListener('click', () => {
	if (metal >= 1 && ink >= 3) {
		pens++;
		ink -= 3;
		metal -= 1;
		inventory++;
    	penText.innerText = pens;
		inkText.innerText = ink;
		metalText.innerText = metal;
		inventoryText.innerText = inventory;
	} else {
		text.innerText = "You do not have enough materials to make a pen! Pens require 3 ink and 1 metal.";
	}
})

// add ink after clicking button.
inkButton.addEventListener('click', () => {
	ink++;
	inkText.innerText = ink;
})

//  add metal after 5 clicks. might change amount.
metalButton.addEventListener('click', () => {
	metalClicks++;
	if (metalClicks >= 5) {
		metal++;
		metalClicks = 0;
		metalText.innerText = metal;
	}
})

// price buttons
raiseButton.addEventListener('click', () => {
	price += 0.10;
	updatePriceAndDemand();
})

lowerButton.addEventListener('click', () => {
	if (price <= 0.10) {
		text.innerText = "You can't make your pens free!!! That's bad business";
	} else {
		price -= 0.10;
		updatePriceAndDemand();
	}
})
// ===================================================================================


//============================================MARKET==================================
// function to calculate the demand
function calculateExponentialDemand(price) {
	const demand = maxDemand * Math.exp(-decayRate * price);
	return Math.max(demand, 0); // Ensure demand doesn't go below 0
}

function updatePriceAndDemand() {
	priceText.innerText = `${price.toFixed(2)}`;
	const demand = calculateExponentialDemand(price);
	demandText.innerText = demand.toFixed(2);

	adjustSaleInterval(demand);
}



// Selling pens
function adjustSaleInterval(demand) {
	// Clear existing interval if any
    if (saleInterval) {
        clearInterval(saleInterval);
    }

    // Calculate new interval based on demand
    const interval = baseSaleInterval / (demand / maxDemand);

    // Set new interval
    saleInterval = setInterval(sellPens, interval);
}

function sellPens() {
	if (inventory > 0) {
		inventory--;
		money += price;
		inventoryText.innerText = inventory;
		moneyText.innerText = money.toFixed(2);
	}
}

updatePriceAndDemand();
//=========================================================================================
