var products=[];
var cartItems=[];
var cart_n= document.getElementById('cart_n');

var panDIV= document.getElementById("panDIV");
var cakesDIV= document.getElementById("cakesDIV");
var breadDIV= document.getElementById("breadDIV");
var coffeeDIV= document.getElementById("coffeeDIV");

var panDIV=[
    {name:'Mojicones', price:1},
    {name:'Crossaint', price:1},
    {name:'Pan de sal', price:1},
    {name:'Pan de Leche', price:1},
    {name:'Cucas', price:1},
    {name:'Mantecadas', price:1},
    {name:'Pan rollo', price:1},
    {name:'Pan agridulce', price:1}
];

var cakesDIV=[
    {name:'Tortas frias', price:10},
    {name:'Postrecitos', price:11},
    {name:'Cupcakes', price:13},
    {name:'Galletas de mantequilla', price:14},
    {name:'Galletas de chocolate', price:15},
    {name:'Bizcochos', price:16},
    {name:'Cocadas', price:17}
];

var breadDIV=[
    {name:'Sandwich de pollo', price:11},
    {name:'Sandwich de champiñoes', price:12},
    {name:'Emparedados hawaianos', price:13},
    {name:'Emparedados a la mexicana', price:15},
    {name:'Sandwich de huevo', price:14},
];

var coffeeDIV=[
    {name:'Café', price:11},
    {name:'Frapuccino', price:12},
    {name:'Café Frio', price:13},
    {name:'Capuccino', price:15},
    {name:'Café con leche', price:14},
];

function HTMLpanProduct(con){
    let URL =`../img/pan/pan${con}.jpg`;
    let btn =`btnPan${con}`;
    return `
        <div class="col-md-4">
            <div class="card nb-4 shawdow-sm">
                <img class="card-img-top" style="heigth:16rem;" src="${URL}" alt="Card image cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <p class="card-text">${PAN[con-1].name}</p>
                    <p class="card-text">price:${PAN[con-1].price}.00</p>
                    <div class="d-flex justify-content-between aling-items-center">
                        <div class="btn-group">
                            <button type="button" onClick="cart2('${PAN[con-1].name}', '${PAN[con-1].price}','${URL}', '${con}', '${btn}')" class="btn btn-sm btn-outline-secondary">
                            <a style="color:inherit;" href="/cart">Buy</a></button>
                            <button id="${btn}" type="button" onClick="cart('${PAN[con-1].name}', '${PAN[con-1].price}','${URL}', '${con}', '${btn}')" class="btn btn-sm btn-outline-secondary">Add to cart</button>
                        </div>
                        <small class="text-muted">Free shiping </small>
                    </div>  
                </div>
            </div>
        </div>         
    `
}

function HTMLcakesProduct(con){
    let URL =`../img/cakes/cakes${con}.jpg`;
    let btn =`btnCakes${con}`;
    return `
        <div class="col-md-4">
            <div class="card nb-4 shawdow-sm">
                <img class="card-img-top" style="heigth:16rem;" src="${URL}" alt="Card image cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <p class="card-text">${CAKES[con-1].name}</p>
                    <p class="card-text">price:${CAKES[con-1].price}.00</p>
                    <div class="d-flex justify-content-between aling-items-center">
                        <div class="btn-group">
                            <button type="button" onClick="cart2('${CAKES[con-1].name}', '${CAKES[con-1].price}','${URL}', '${con}', '${btn}')" class="btn btn-sm btn-outline-secondary">
                            <a style="color:inherit;" href="/cart">Buy</a></button>
                            <button id="${btn}" type="button" onClick="cart('${CAKES[con-1].name}', '${CAKES[con-1].price}','${URL}', '${con}', '${btn}')" class="btn btn-sm btn-outline-secondary">Add to cart</button>
                        </div>
                        <small class="text-muted">Free shiping </small>
                    </div>  
                </div>
            </div>
        </div>         
    `
}

function HTMLbreadPrOduct(con){
    let URL =`../img/bread/bread${con}.jpg`;
    let btn =`btnBread${con}`;
    return `
        <div class="col-md-4">
            <div class="card nb-4 shawdow-sm">
                <img class="card-img-top" style="heigth:16rem;" src="${URL}" alt="Card image cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <p class="card-text">${BREAD[con-1].name}</p>
                    <p class="card-text">price:${BREAD[con-1].price}.00</p>
                    <div class="d-flex justify-content-between aling-items-center">
                        <div class="btn-group">
                            <button type="button" onClick="cart2('${BREAD[con-1].name}', '${BREAD[con-1].price}','${URL}', '${con}', '${btn}')" class="btn btn-sm btn-outline-secondary">
                            <a style="color:inherit;" href="/cart">Buy</a></button>
                            <button id="${btn}" type="button" onClick="cart('${BREAD[con-1].name}', '${BREAD[con-1].price}','${URL}', '${con}', '${btn}')" class="btn btn-sm btn-outline-secondary">Add to cart</button>
                        </div>
                        <small class="text-muted">Free shiping </small>
                    </div>  
                </div>
            </div>
        </div>         
    `
}

function HTMLcoffeePrduct(con){
    let URL =`../img/coffee/coffee${con}.jpg`;
    let btn =`btnCoffee${con}`;
    return `
        <div class="col-md-4">
            <div class="card nb-4 shawdow-sm">
                <img class="card-img-top" style="heigth:16rem;" src="${URL}" alt="Card image cap">
                <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <i style="color:orange;" class="fa fa-star"></i>
                    <p class="card-text">${COFFEE[con-1].name}</p>
                    <p class="card-text">price:${COFFEE[con-1].price}.00</p>
                    <div class="d-flex justify-content-between aling-items-center">
                        <div class="btn-group">
                            <button type="button" onClick="cart2('${COFFEE[con-1].name}', '${COFFEE[con-1].price}','${URL}', '${con}', '${btn}')" class="btn btn-sm btn-outline-secondary">
                            <a style="color:inherit;" href="/cart">Buy</a></button>
                            <button id="${btn}" type="button" onClick="cart('${COFFEE[con-1].name}', '${COFFEE[con-1].price}','${URL}', '${con}', '${btn}')" class="btn btn-sm btn-outline-secondary">Add to cart</button>
                        </div>
                        <small class="text-muted">Free shiping </small>
                    </div>  
                </div>
            </div>
        </div>         
    `
}

function animation(){
    const toast=swal.mixin({
        toast:true,
        position: 'top-end',
        showConfirnButton:false,
        timer:1000
    });
}
function cart(name,price,url,con,btncart){
    var item={
        name:name,
        price:price,
        url:url
    }
    cartItems.push(item);
    let storage= JSON.parse(localStorage.getItem("cart"));
    if(storage==null){
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
    }else{
        products= JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
    }
    products=JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML=`[${products.length}]`;
    document.getElementById(btncart).style.display="none";
    animation();
}

function cart2(name,price,url,btncart){
    var item={
        name:name,
        price:price,
        url:url
    }
    cartItems.push(item);
    let storage= JSON.parse(localStorage.getItem("cart"));
    if(storage==null){
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
    }else{
        products= JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart",JSON.stringify(products));
    }
    products=JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML=`[${products.length}]`;
    document.getElementById(btncart).style.display="none";
}


(()=>{
    for (let index = 1; index <= 6; index++){
        panDIV.innerHTML+=`${HTMLpanProduct(index)}`;
    }
    for (let index = 1; index <= 6; index++){
        cakesDIV.innerHTML+=`${HTMLpanProduct(index)}`;
        cakesDIV.innerHTML+=`${HTMLcakesProduct(index)}`;
        breadDIV.innerHTML+=`${HTMLbreadProduct(index)}`;
        coffeeDIV.innerHTML+=`${HTMLcoffeeProduct(index)}`;
    }
})();