let pens = 0;
let money = 500;
let ink = 0;
let metal = 0;
let metalClicks = 0;
let inventory = 0;
let price = 1.50;
let saleInterval;
let metalDrillPrice = 200;
let inkHarvesterPrice = 100;
let metalDrills = 0;
let inkHarvesters = 0;
let marketingLevel = 1;
let upgradePrice = 100;
let metalInterval;
let inkInterval;
let metalDrillLevel = 0;
let drillUpgradePrice = 500;
const baseSaleInterval = 1000;
const maxDemand = 100;
const decayRate = 0.25;
const minInterval = 100;

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
const raiseButtonTen = document.querySelector('#raisePriceTen');
const lowerButtonTen = document.querySelector('#lowerPriceTen');
const raiseButtonOne = document.querySelector('#raisePriceOne');
const lowerButtonOne = document.querySelector('#lowerPriceOne');
const priceText = document.querySelector('#priceTotal');
const upgradeButton = document.querySelector('#marketUpgrade');
const levelText = document.querySelector('#marketingLevel');

const metalHarvestText = document.querySelector('#matalDrills');
const inkHarvestText = document.querySelector('#inkHarvesters');
const metalHarvestButton = document.querySelector('#metalPrice');
const inkHarvestButton = document.querySelector('#inkPrice');
const metalUpgradeButton = document.querySelector('#metalUpgrade');
const inkUpgradeButton = document.querySelector('#inkUpgrade');
const drillLevel = document.querySelector('#metalDrillLevel');

upgradeButton.onclick = upgradeMarket;



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
});

// add ink after clicking button.
inkButton.addEventListener('click', () => {
	ink++;
	inkText.innerText = ink;
});

//  add metal after 5 clicks. might change amount.
metalButton.addEventListener('click', () => {
	metalClicks++;
	if (metalClicks >= 5) {
		metal++;
		metalClicks = 0;
		metalText.innerText = metal;
	}
});

// price buttons
raiseButtonTen.addEventListener('click', () => {
	price += 0.10;
	updatePriceAndDemand();
});

lowerButtonTen.addEventListener('click', () => {
	if (price <= 0.10) {
		text.innerText = "You can't make your pens free!!! That's bad business";
	} else {
		price -= 0.10;
		updatePriceAndDemand();
	}
});

raiseButtonOne.addEventListener('click', () => {
	price += 0.01;
	updatePriceAndDemand();
});

lowerButtonOne.addEventListener('click', () => {
	if (price <= 0.01) {
		text.innerText = "You can't make your pens free!!! That's bad business";
	} else {
		price -= 0.01;
		updatePriceAndDemand();
	}
});
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
    const interval = (baseSaleInterval / (demand / maxDemand)) / marketingLevel;

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

function upgradeMarket() {
	if (money >= upgradePrice) {
		money -= upgradePrice;
		marketingLevel++;
		upgradePrice *= 1.25;
		upgradeButton.innerText = `$${upgradePrice.toFixed(2)}`;
		levelText.innerText = marketingLevel;
		moneyText.innerText = money.toFixed(2);

		// Recalculate and update the interval with the new marketing level
		const demand = calculateExponentialDemand(price);
		adjustSaleInterval(demand);
	} else {
		text.innerText = "You do not have enough money to upgrade marketing!";
	}
}





//=========================================================================================


//===========================================AUTOMATION====================================
metalHarvestButton.addEventListener('click', () => {
	if (money >= metalDrillPrice) {
		money -= metalDrillPrice;
		metalDrillPrice *= 1.25;
		metalDrills++;
		metalHarvestText.innerText = metalDrills;
		metalHarvestButton.innerText = `$${metalDrillPrice.toFixed(2)}`;
		moneyText.innerText = money.toFixed(2);
		adjustMetalHarvestInterval();
	}
});

inkHarvestButton.addEventListener('click', () => {
	if (money >= inkHarvesterPrice) {
		money -= inkHarvesterPrice;
		inkHarvesterPrice *= 1.25;
		inkHarvesters++;
		inkHarvestText.innerText = inkHarvesters;
		inkHarvestButton.innerText = `$${inkHarvesterPrice.toFixed(2)}`;
		moneyText.innerText = money.toFixed(2);
		adjustInkHarvestInterval();
	}
});

function adjustMetalHarvestInterval() {
	// Clear existing interval if any
	if (metalInterval) {
		clearInterval(metalInterval);
	}

	// Set new interval
	metalInterval = setInterval(() => {
		metal += metalDrills;
		metalText.innerText = metal;
	}, 5000); // Adjust this interval as needed for balance
}

// Adjust ink harvesting interval
function adjustInkHarvestInterval() {
	// Clear existing interval if any
	if (inkInterval) {
		clearInterval(inkInterval);
	}

	// Set new interval
	inkInterval = setInterval(() => {
		ink += inkHarvesters;
		inkText.innerText = ink;
	}, 1000); // Adjust this interval as needed for balance
}

metalUpgradeButton.addEventListener('click', () => {
	if (money >= metalDrillPrice) {
		metalDrillLevel++; 
		drillLevel.innerText = metalDrillLevel;
		metalDrillPrice *= 2;
	} 
});



updatePriceAndDemand();