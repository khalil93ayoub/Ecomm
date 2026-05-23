(function(){
  const firebaseConfig = {
    apiKey: "AIzaSyDBYtMrRsnfHS8QMz8UgMjVmrBJ92siSbU",
    authDomain: "vacuum-cleaner-e8857.firebaseapp.com",
    projectId: "vacuum-cleaner-e8857"
  };

  const productId = document.body.dataset.productId;
  const stripeUrl = document.body.dataset.stripeUrl;
  const videoSrc = document.body.dataset.videoSrc;
  const stockTargets = Array.from(document.querySelectorAll("[data-stock-text]"));

  if(!productId && stockTargets.length === 0){
    return;
  }

  const buyButtons = [
    document.getElementById("buyBtn"),
    document.getElementById("buyBtnTop")
  ].filter(Boolean);

  function setActive(el){
    document
      .querySelectorAll(".thumb")
      .forEach(thumb => thumb.classList.remove("active"));

    if(el){
      el.classList.add("active");
    }
  }

  window.showImage = function(el, src){
    setActive(el);

    const mainMedia = document.getElementById("mainMedia");

    if(!mainMedia){
      return;
    }

    mainMedia.innerHTML = `
      <img class="gallery-media" src="${src}">
    `;
  };

  window.showVideo = function(el){
    setActive(el);

    const mainMedia = document.getElementById("mainMedia");

    if(!mainMedia || !videoSrc){
      return;
    }

    mainMedia.innerHTML = `
      <video class="gallery-media" controls autoplay>
        <source src="${videoSrc}" type="video/mp4">
      </video>
    `;
  };

  if(!window.firebase){
    stockTargets.forEach(target => {
      target.innerText = "Stock unavailable";
      target.classList.add("stock-error");
    });
    return;
  }

  const app = firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig);

  const db = app.firestore();
  const productRef = productId
    ? db.collection("product").doc(productId)
    : null;

  function readStock(data){
    if(!data){
      return null;
    }

    const value = data.stock ?? data.quantity ?? data.qty;
    const stock = Number(value);

    return Number.isFinite(stock) ? stock : null;
  }

  function renderStock(target, stock){
    target.classList.remove("stock-in", "stock-low", "stock-out", "stock-error");

    if(stock === null){
      target.innerText = "Stock not set";
      target.classList.add("stock-error");
      return;
    }

    if(stock <= 0){
      target.innerText = "Out of stock";
      target.classList.add("stock-out");
      return;
    }

    target.innerText = `In stock: ${stock}`;
    target.classList.add(stock <= 3 ? "stock-low" : "stock-in");
  }

  function setBuyButtonState(stock){
    buyButtons.forEach(button => {
      if(stock !== null && stock <= 0){
        button.disabled = true;
        button.innerText = "Sold Out";
      }else{
        button.disabled = false;
        button.innerText = "Buy Now";
      }
    });
  }

  function bindStockTarget(target){
    const id = target.dataset.productId || productId;

    if(!id){
      return;
    }

    target.innerText = "Checking stock...";

    db.collection("product").doc(id).onSnapshot(doc => {
      if(!doc.exists){
        renderStock(target, null);
        return;
      }

      renderStock(target, readStock(doc.data()));
    }, () => {
      target.innerText = "Stock unavailable";
      target.classList.add("stock-error");
    });
  }

  async function handleBuy(){
    try{
      if(!stripeUrl || stripeUrl.includes("YOUR_STRIPE_LINK")){
        alert("Checkout link is not configured.");
        return;
      }

      if(!productRef){
        alert("Product stock is not configured.");
        return;
      }

      const doc = await productRef.get();
      const stock = doc.exists ? readStock(doc.data()) : null;

      if(stock === null){
        alert("Stock is not configured.");
        return;
      }

      if(stock <= 0){
        alert("Sold Out");
        return;
      }

      window.location.href = stripeUrl;
    }catch(error){
      alert("Error");
    }
  }

  buyButtons.forEach(button => {
    button.addEventListener("click", handleBuy);
  });

  if(productRef){
    productRef.onSnapshot(doc => {
      const stock = doc.exists ? readStock(doc.data()) : null;
      const stockText = document.getElementById("stockText");

      if(stockText && !stockText.dataset.stockText){
        renderStock(stockText, stock);
      }

      setBuyButtonState(stock);
    });
  }

  stockTargets.forEach(bindStockTarget);

})();
