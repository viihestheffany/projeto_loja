let modalQt = 1;
let cart = [];
let modalkey = 0;

const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

//Listagem dos modelos
modeloJson.map((item, index) => {
    let modeloItem = c('.models .modelo-item').cloneNode(true);

    modeloItem.setAttribute('data-key', index);

    modeloItem.querySelector('.modelo-item-img img').src = item.img;
    modeloItem.querySelector('.modelo-item-name').innerHTML = item.name;
    modeloItem.querySelector('.modelo-item-desc').innerHTML = item.description;
    modeloItem.querySelector('.modelo-item-price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    modeloItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        let key = e.target.closest('.modelo-item').getAttribute('data-key');
        modalQt = 1;
        modalQt = key;
        
        c('.modeloBig img').src = modeloJson[key].img;
        c('.modeloInfo h1').innerHTML = modeloJson[key].name;
        c('.modeloInfo-desc').innerHTML = modeloJson[key].description;
        c('.modeloInfo-actualPrice').innerHTML = `R$ ${modeloJson[key].price.toFixed(2)}`;
        c('.modeloInfo-size.selected').classList.remove('selected');

        cs('.modeloInfo-size').forEach((size, sizeIndex) => {
            if (sizeIndex == 0){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = modeloJson[key].sizes[sizeIndex];
        });

        c('.modeloInfo-qt').innerHTML = modalQt;
        c('.modeloWindowArea').style.opacity = 0;
        c('.modeloWindowArea').style.display = 'flex';

        setTimeout(() =>{
            c('.modeloWindowArea').style.opacity = 1;
        }, 500);
    });

    c('.modelo-area').append(modeloItem);
});

//eventos Modal
function closeModal(){
    c('.modeloWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.modeloWindowArea').style.display = 'none';
    }, 500);
}

cs('.modeloInfo-cancelButton, .modeloInfo-cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

//botão qt menos
c('.modeloInfo-qtmenos').addEventListener('click', () =>{
    if(modalQt > 1){
        modalQt--;
        c('.modeloInfo-qt').innerHTML = modalQt;
    }
});

//botão qt mais
c('.modeloInfo-qtmais').addEventListener('click', () =>{
    modalQt++;
    //atualizo o valor no html
    c('.modeloInfo-qt').innerHTML = modalQt;
});

//tamanhos
cs('.modeloInfo-size').forEach((size, sizeIndex) =>{
    //ao clicar em um item
    size.addEventListener('click', () =>{
        //desmarca tudo
        c('.modeloInfo-size.selected').classList.remove('selected');
        //adiciono a maarcação
        size.classList.add('selected');
    });
});

//adicionar ao carrinho
c('.modeloInfo-addButton').addEventListener('click', () => {
    //reunir as informações: modelo, tamanho, qtd
    let size = c('.modeloInfo-size.selected').getAttribute('data-key');
    
    //juntar id e tamanho
    let identifier = modeloJson[modalkey].id + '/' + size;

    //verificar se já está no carrinho
    let key = cart.findIndex((item) => {
        return item.identifier == identifier;
    })

    //verificar se é igual ou não 
    if(key > -1){
        cart[key].qt += modalQt;
    }else
    //adicionar ao carrinho
    cart.push({
        identifier,
        id: modeloJson[modalkey].id,
        size,
        qt: modalQt,
    });


    updateCart();
    closeModal();
});

//atualizar carrinho 
function updateCart(){
    if(cart.length > 0){
        c('aside').classList.add('show');
    }else{
        c('aside').classList.remove('show');
    }

}