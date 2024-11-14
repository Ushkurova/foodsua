

var categories =  [salads, firstCources, pasta, garniry, meatDishes, mangal, own, varenniki, bliny, deserts, coffee, icecoffee,
    tea, extra, juice, cold_drink, icecream,
    extra_to_icecream, sauce, shisha
];

var numberOfCategory = 0;

function nextCategory(user){
    if (numberOfCategory < categories.length-2){
    numberOfCategory++;
    loadInfoOfCategory(user);
    }
}
function prevCategory(user){
    if (numberOfCategory > 0){
    numberOfCategory--;
    loadInfoOfCategory(user);
    }
}

function changeYesNo (btn){
    var options = document.getElementsByClassName('option');
    console.log('yes no');
    console.log(options.length);
    if (btn.target.textContent == 'yes'){
    btn.target.textContent = 'no';
    for (var i = 0; i < options.length; i++)
    {
        for (var c = 0; c < options[i].children.length; c++){
            console.log(options[i].children[c]);
            if (options[i].children[c] == btn.target)
            {
                options[i].style.color = 'red';
                // записать в hideOptions
                break;
            }
        }
    }
  //  div.classList.add('cancelItem');
    }
    else{
         btn.target.textContent = 'yes';
    //    div.classList.remove('cancelItem');
    }
}

function loadInfoOfCategoryAdmin(){
    var allProducts = document.getElementsByClassName('option');
    console.log(allProducts.length);
    for (var i = 0; i < allProducts.length; ++i){
        var cancel = document.createElement('button');
        cancel.textContent = 'yes';
        cancel.classList.add('cancel');
        cancel.style.width = '10vw';
        cancel.style.height = '5vw';
        cancel.style.backgroundColor = 'white';
        allProducts[i].appendChild(cancel);
        cancel.addEventListener('click', changeYesNo, cancel);

    }

}

function loadInfoOfCategory(user){
    if (numberOfCategory > 16)
        return;
    var category = categories[numberOfCategory];
    fetch(`${category}.txt`).then(r => r.text()).then(d => {
    const menu = d.split('\n');
    let ulItems = document.getElementById('ulItems');
    ulItems.innerHTML = "";

    var itemName = document.getElementById('itemName');
    itemName.innerText = category;
    menu.forEach(item=>{

    const menuItem = document.createElement('li');
        menuItem.textContent = item;
        menuItem.classList.add('option');
        ulItems.appendChild(menuItem);
  
        const price = document.createElement('div');
        price.classList.add('price');
         fetch(`${item}.txt`).then(res => res.text()).then(data => {
        const info = data.split('\n');
        console.log(data);
        if (info[0].length > 3)
        {
        var sostav = document.createElement('div');
     
        sostav.classList.add('sostav');
        sostav.innerText = info[0];
        menuItem.appendChild(sostav);
        }
        else{
            var sostav = "";
        }
   
        price.innerText = info[1];

        menuItem.appendChild(price);
         });
        
    })

    });
    var img = document.getElementById('imgFood');
    img.src = `img/${images[numberOfCategory]}`;
    if (user == 'admin')
    {
        console.log(document.getElementsByClassName('option').length);
        setTimeout(loadInfoOfCategoryAdmin, 500);
    //loadInfoOfCategoryAdmin();
    }
}


if (document.title == 'Admin')
{
loadInfoOfCategory('admin');
console.log('admin');
}
else
{
    console.log('user');
loadInfoOfCategory('user');
}