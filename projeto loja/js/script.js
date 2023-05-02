const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

//Listagem dos modelos 
modeloJson.map((item, index) => {
    let modeloItem = c('.models .modelo-item').cloneNode(true);

    modeloItem.querySelector('.modelo-item-img img').src = item.img;
    modeloItem.querySelector('.modelo-item-name').innerHTML = item.name;
    modeloItem.querySelector('.modelo-item-desc').innerHTML = item.description;
    modeloItem.querySelector('.modelo-item-price').innerHTML = `R$ ${item.price.toFixed(2)}`;

    modeloItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDeFault();

        c('.modeLoWindowArea').style.display = 'flex';
    });

    c('.modelo-area').append(modeloItem);
});