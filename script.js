// Cardápio fictício (pode editar!)
const menuItems = [
    {
        name:'Temaki Salmão',
        desc:'Cone de alga recheado com arroz e salmão fresco.',
        price:'22.90',
        img:'https://images.unsplash.com/photo-1553621042-f6e147245754?w=900&auto=format&fit=crop&q=80'
    },
    {
        name:'Uramaki Califórnia',
        desc:'Arroz por fora com kani kama, pepino e manga.',
        price:'19.90',
        img:'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=900&auto=format&fit=crop&q=80'
    },
    {
        name:'Yakisoba Especial',
        desc:'Macarrão oriental com legumes e carne ao molho shoyu.',
        price:'27.90',
        img:'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800'
    },
];

// Renderiza o cardápio na página
const menuGrid = document.getElementById('menuGrid');
menuItems.forEach((item,i)=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <strong style="color:#ffb703;font-size:1.15em;">R$ ${item.price}</strong><br/>
        <button class="btn btn-add" data-index="${i}"><i class="fas fa-cart-plus"></i> Adicionar ao carrinho</button>`;
    menuGrid.appendChild(card);
});

// Carrinho de compras (simples)
let cart = [];
const cartCount = document.getElementById('cartCount');
const cartModalBg = document.getElementById('cartModalBg');
const cartList = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');
const openCart = document.getElementById('openCart');
const closeCart = document.getElementById('closeCart');

// Adiciona ao carrinho
document.querySelectorAll('.btn-add').forEach(btn=>{
    btn.addEventListener('click',function(){
        const idx = this.dataset.index;
        // Efeito de clique animado no botão!
        this.classList.add('clicked');
        setTimeout(()=>this.classList.remove('clicked'),120);
        // Adiciona ou incrementa item no carrinho
        const found = cart.find(i=>i.idx==idx);
        if(found){
            found.qty++;
        }else{
            cart.push({idx,qty:1});
        }
        updateCartCount();
    });
});

// Atualiza contador do carrinho no topo
function updateCartCount(){
    let total = cart.reduce((sum,i)=>sum+i.qty,0);
    cartCount.textContent = total;
    // Atualiza lista do modal se estiver aberto!
    if(cartModalBg.classList.contains('active')) renderCart();
}

// Renderiza o carrinho no modal
function renderCart(){
    cartList.innerHTML = '';
    let total = 0;
    if(cart.length===0){
        cartList.innerHTML = '<li><span style="color:#888;">Seu carrinho está vazio.</span></li>';
    }else{
        cart.forEach((item,i)=>{
            const prod = menuItems[item.idx];
            const subtotal = (prod.price*item.qty).toFixed(2);
            total += parseFloat(subtotal);
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${prod.name} x${item.qty}</span>
                <span>R$ ${subtotal} 
                    <button class='remove-btn' data-i='${i}' title='Remover'><i class='fas fa-trash'></i></button> 
                </span>`;
            cartList.appendChild(li);
        });
    }
    cartTotal.textContent = 'Total R$ '+total.toFixed(2);
    // Botão remover item do carrinho
    document.querySelectorAll('.remove-btn').forEach(btn=>{
        btn.onclick=function(){
            const i = this.dataset.i;
            cart.splice(i,1);
            updateCartCount();
            renderCart();
        };
    });
}

// Abre/fecha modal do carrinho
openCart.onclick=function(){
    renderCart();
    cartModalBg.classList.add('active');
};
closeCart.onclick=function(){
    cartModalBg.classList.remove('active');
};
cartModalBg.onclick=function(e){
    if(e.target===this) cartModalBg.classList.remove('active');
};

// Destaca link ativo do menu ao rolar/passar seções (opcional)
const sections = ['menu','galeria','contato'];
window.addEventListener('scroll',()=>{
    let scrollPos = window.scrollY+80;
    sections.forEach(id=>{
        const sec = document.getElementById(id);
        const link = document.querySelector(`.nav a[href="#${id}"]`);
        if(sec && link){
            if(scrollPos>=sec.offsetTop && scrollPos<sec.offsetTop+sec.offsetHeight){
                link.classList.add('active');
            }else{
                link.classList.remove('active');
            }
        }
    });
});