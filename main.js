let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create'
let temp;

// get total price
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)
         - +discount.value;
         total.innerHTML = result;
         total.style.background = '#050'
    }
    else{
        total.innerHTML = '';
        total.style.background = '#560014'

    }
}
// create product

let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product);
}
else{
    datapro = [];
}
submit.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(), 
    }
    
    if(title.value != ''
        && price.value != ''
        && category.value != ''
        && newpro.count <= 100
    ){
        if(mood === 'create'){
            if(newpro.count > 1){
                for(let i = 0 ; i < newpro.count ; i++){
                    datapro.push(newpro);
                }
            }
            else{
                datapro.push(newpro);
            }
        }
        else{
            datapro[temp] = newpro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        cleardata();
    }
    
  
    
    localStorage.setItem('product' , JSON.stringify(datapro));
    readdata();

}


// clear inputs

function cleardata(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read

function readdata(){
    getTotal();
    let table = '';
    for(let i = 0 ; i < datapro.length ; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick = "updatedata(${i})" id="update">update</button></td>
            <td><button onclick = "deletedata(${i})" id="delete">delete</button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAll = document.getElementById('deleteAll');
    if(datapro.length > 0){
        deleteAll.innerHTML = `
        <button onclick = "deleteAll()">delete All (${datapro.length})</button>`;
    }
    else{
        deleteAll.innerHTML = '';
    }
}
readdata();

// delete

function deletedata(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    readdata();
}
function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    readdata();
}


// count



// update

function updatedata(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'update';
    getTotal();
    mood = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}

// searsh

let searchmood = 'Title';

function getsearchmood(id){
    let search = document.getElementById('search');

    if(id == "searchTitle"){
        searchmood = 'Title';
    }
    else{
        searchmood = 'Category';
    }
    search.focus();
    search.placeholder = 'Search By '+ searchmood;
    search.value = '';
    readdata();

}

function searchdata(value){
    let table = '';
    for(let i = 0 ; i < datapro.length ; i++){
        if(searchmood === 'Title'){
            if(datapro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick = "updatedata(${i})" id="update">update</button></td>
                    <td><button onclick = "deletedata(${i})" id="delete">delete</button></td>
                </tr>`;
            }

        }
        else{
            if(datapro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick = "updatedata(${i})" id="update">update</button></td>
                    <td><button onclick = "deletedata(${i})" id="delete">delete</button></td>
                </tr>`;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;

}
// clean data