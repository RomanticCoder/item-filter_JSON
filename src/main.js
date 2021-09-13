const logo = document.querySelector(".logo")
const typeFilters = document.querySelectorAll(".typeFilter")
const colorFilters = document.querySelectorAll(".colorFilter")
const itemContainer = document.querySelector('.items');
let itemList;

initialize();

function initialize(){
    colorFilters.forEach((filter)=>{
        const color = "var(--color-" + filter.dataset.color+")";
        filter.style.backgroundColor = color;
    });

    showAllItems();
    enableFilters();

    logo.addEventListener("click",showAllItems);
}

function showAllItems(){
    fetch('./data/items.json')
        .then(response=>response.json())
        .then((data)=>{
            const items = data.items;
            itemList = items;
            showItems(items);
        })
}

function showItems(items){
    itemContainer.innerHTML = '';
    items.forEach((item)=>{
        createItem(item);
    })
}

function createItem(item){
    itemContainer.innerHTML += `
        <div class="item" id=${item.id}>
        <img src="${item.img}" alt="${item.id}">
        <span>${item.type}, ${item.size} size</span>
        </div>
    `;
}

function enableFilters(){
    typeFilters.forEach((filter)=>{
        filter.addEventListener("click",(event)=>{
            let target = event.target;
            if(event.target.nodeName == 'IMG'){
                target = event.target.parentNode;
            }
            const type = target.dataset.type;
            const filteredList = itemList.filter((item)=>item.type==type);
            showItems(filteredList)
            
        })
    });

    colorFilters.forEach((filter)=>{
        filter.addEventListener("click",(event)=>{
            let target = event.target;
            const color = target.dataset.color;
            const filteredList = itemList.filter((item)=>item.color==color);
            showItems(filteredList)
        })
    });
}
