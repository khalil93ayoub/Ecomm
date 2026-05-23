(function(){
  const firebaseConfig = {
    apiKey: "AIzaSyDBYtMrRsnfHS8QMz8UgMjVmrBJ92siSbU",
    authDomain: "vacuum-cleaner-e8857.firebaseapp.com",
    projectId: "vacuum-cleaner-e8857"
  };

  const stockCollections = ["product", "products", "inventory", "stock"];

  const stockAliases = {
    privateer: ["fossil-privateer", "fossil_privateer", "fossilPrivateer"],
    "fossil-privateer": ["privateer", "fossil_privateer", "fossilPrivateer"],
    "magnetic-charger": ["magnetic_charger", "magneticCharger", "charger"],
    cable: ["fast-cable", "fast_cable", "charging-cable"],
    vacuum: ["vacuum-cleaner", "car-vacuum", "car_vacuum"]
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
      target.title = "Firebase scripts did not load.";
    });
    return;
  }

  const app = firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig);

  const db = app.firestore();

  function productIdsFor(id){
    return Array.from(new Set([id].concat(stockAliases[id] || []))).filter(Boolean);
  }

  function stockRefsFor(id){
    return stockCollections.flatMap(collection =>
      productIdsFor(id).map(candidate => ({
        collection,
        id: candidate,
        ref: db.collection(collection).doc(candidate)
      }))
    );
  }

  function readStock(data){
    if(!data){
      return null;
    }

    const value = data.stock ?? data.quantity ?? data.qty ?? data.available ?? data.inventory;
    const stock = Number(value);

    return Number.isFinite(stock) ? stock : null;
  }

  function renderStock(target, stock, meta){
    target.classList.remove("stock-in", "stock-low", "stock-out", "stock-error");

    if(stock === null){
      target.innerText = "Stock not set";
      target.classList.add("stock-error");
      target.title = "No readable stock value was found in Firebase.";
      return;
    }

    if(stock <= 0){
      target.innerText = "Out of stock";
      target.classList.add("stock-out");
    }else{
      target.innerText = `In stock: ${stock}`;
      target.classList.add(stock <= 3 ? "stock-low" : "stock-in");
    }

    if(meta){
      target.dataset.stockSource = `${meta.collection}/${meta.id}`;
      target.title = `Firebase: ${meta.collection}/${meta.id}`;
    }
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

    const refs = stockRefsFor(id);
    const states = new Map(refs.map(item => [`${item.collection}/${item.id}`, null]));
    const sourceByKey = new Map(refs.map(item => [`${item.collection}/${item.id}`, item]));

    target.innerText = "Checking stock...";

    function renderBestAvailable(){
      for(const item of refs){
        const key = `${item.collection}/${item.id}`;
        const stock = states.get(key);

        if(stock !== null){
          renderStock(target, stock, sourceByKey.get(key));

          if(target.id === "stockText"){
            setBuyButtonState(stock);
          }

          return;
        }
      }

      renderStock(target, null);

      if(target.id === "stockText"){
        setBuyButtonState(null);
      }
    }

    refs.forEach(item => {
      const key = `${item.collection}/${item.id}`;

      item.ref.onSnapshot(doc => {
        states.set(key, doc.exists ? readStock(doc.data()) : null);
        renderBestAvailable();
      }, error => {
        states.set(key, null);
        target.dataset.stockError = error.code || "firebase-error";
        renderBestAvailable();
      });
    });
  }

  async function getProductStock(id){
    for(const item of stockRefsFor(id)){
      const doc = await item.ref.get();

      if(doc.exists){
        return readStock(doc.data());
      }
    }

    return null;
  }

  async function handleBuy(){
    try{
      if(!stripeUrl || stripeUrl.includes("YOUR_STRIPE_LINK")){
        alert("Checkout link is not configured.");
        return;
      }

      if(!productId){
        alert("Product stock is not configured.");
        return;
      }

      const stock = await getProductStock(productId);

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

  if(productId){
    const stockText = document.getElementById("stockText");

    if(stockText && !stockText.dataset.stockText){
      stockText.dataset.stockText = "";
      stockText.dataset.productId = productId;
      stockTargets.push(stockText);
    }
  }

  stockTargets.forEach(bindStockTarget);

})();
