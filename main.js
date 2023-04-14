let carts = document.querySelectorAll('.add-cart');

let products = [
	{
		name: 'SteelSeries Arctis 7 Czarne',
		tag: 'p1',
		price: 699.99,
		inCart: 0
	},
	{
		name: 'Słuchawki LOGITECH Gaming G Pro X',
		tag: 'p2',
		price: 429.99,
		inCart: 0
	},
	{
		name: 'Słuchawki RAZER Kraken Czarne',
		tag: 'p3',
		price: 269.00,
		inCart: 0
	},
	{
		name: 'Klawiatura STEELSERIES APEX 100',
		tag: 'p4',
		price: 229.99,
		inCart: 0
	},
	{
		name: 'SKlawiatura LOGITECH G213 Prodigy',
		tag: 'p5',
		price: 229.00,
		inCart: 0
	},
	{
		name: 'Klawiatura RAZER Blackwidow V3 Green Switch',
		tag: 'p6',
		price: 549.00,
		inCart: 0
	},
	{
		name: 'Mysz STEELSERIES Rival 710',
		tag: 'p7',
		price: 349.99,
		inCart: 0
	},
	{
		name: 'Mysz LOGITECH G403 Hero',
		tag: 'p8',
		price: 249.99,
		inCart: 0
	},
	{
		name: 'Mysz RAZER DeathAdder V2',
		tag: 'p9',
		price: 259.00,
		inCart: 0
	}
];


for (let i=0; i<carts.length;i++) {
	carts[i].addEventListener('click',() => {
		cartNumbers(products[i]);
		totalCost(products[i]);
	})
}

function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');
	if(productNumbers) {
		document.querySelector('.cart span').textContent = productNumbers;
	}
}

function cartNumbers(product) {
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	if(productNumbers) {
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.cart span').textContent = productNumbers + 1;
	} else {
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.cart span').textContent = 1;
	}
	setItems(product);
}

function setItems(product) {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	if(cartItems != null) {
		if(cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].inCart += 1;
	} else {
		product.inCart = 1;
		cartItems = {
			[product.tag]: product
		}
	}
	localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalCost(product) {
	let cartCost = localStorage.getItem('totalCost');
	if(cartCost != null) {
		cartCost = parseFloat(cartCost);
		localStorage.setItem('totalCost', cartCost + product.price);
	} else {
		localStorage.setItem('totalCost',product.price);
	}
}

function displayCart() {
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector('.products');
	let cartCost = localStorage.getItem('totalCost');
	
	console.log(cartItems);
	if(cartItems && productContainer) {
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += `
			<div class="product">
				<i class="fa fa-times-circle-o" id="cancel"></i>
				<img src="./grafika/${item.tag}.jpg">
				<span>${item.name}</span>
			</div>
			<div class="price mg">${item.price} zł</div>
			<div class="quantity mg">
				<i class="fa fa-minus-circle"></i>
				<span>${item.inCart}</span>
				<i class="fa fa-plus-circle plus"></i>
			</div>
			<div class="total mg">
				${item.inCart * item.price} zł
			</div>
			`;
		});
		
		productContainer.innerHTML += `
			<div class="cartTotalContainer">
				<h4 class="cartTotalTitle">Łącznie</h4>
				<h4 class="cartTotal">${cartCost} zł</h4>
			</div>
		`;
	}
}

onLoadCartNumbers();
displayCart();
