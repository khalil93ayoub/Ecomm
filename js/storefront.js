(function(){
  const firebaseConfig = {
    apiKey: "AIzaSyDBYtMrRsnfHS8QMz8UgMjVmrBJ92siSbU",
    authDomain: "vacuum-cleaner-e8857.firebaseapp.com",
    projectId: "vacuum-cleaner-e8857"
  };

  const stockCollections = ["product", "products", "inventory", "stock"];
  const languageStorageKey = "novara-language";

  const stockAliases = {
    privateer: ["fossil-privateer", "fossil_privateer", "fossilPrivateer"],
    "fossil-privateer": ["privateer", "fossil_privateer", "fossilPrivateer"],
    "magnetic-charger": ["magnetic_charger", "magneticCharger", "charger"],
    cable: ["fast-cable", "fast_cable", "charging-cable"],
    vacuum: ["vacuum-cleaner", "car-vacuum", "car_vacuum"]
  };
  const soldOutOverrides = new Set(["breil", "braille"]);

  const messages = {
    de: {
      checkingStock: "Bestand wird geprüft...",
      stockUnavailable: "Bestand nicht verfügbar",
      stockUnavailableTitle: "Firebase-Skripte konnten nicht geladen werden.",
      stockNotSet: "Bestand nicht hinterlegt",
      stockNotSetTitle: "In Firebase wurde kein lesbarer Bestand gefunden.",
      outOfStock: "Ausverkauft",
      inStock: "Auf Lager: {stock}",
      soldOut: "Ausverkauft",
      buyNow: "Kaufen",
      checkoutNotConfigured: "Checkout-Link ist nicht konfiguriert.",
      productStockNotConfigured: "Produktbestand ist nicht konfiguriert.",
      stockNotConfigured: "Bestand ist nicht konfiguriert.",
      error: "Fehler"
    },
    en: {
      checkingStock: "Checking stock...",
      stockUnavailable: "Stock unavailable",
      stockUnavailableTitle: "Firebase scripts did not load.",
      stockNotSet: "Stock not set",
      stockNotSetTitle: "No readable stock value was found in Firebase.",
      outOfStock: "Out of stock",
      inStock: "In stock: {stock}",
      soldOut: "Sold Out",
      buyNow: "Buy Now",
      checkoutNotConfigured: "Checkout link is not configured.",
      productStockNotConfigured: "Product stock is not configured.",
      stockNotConfigured: "Stock is not configured.",
      error: "Error"
    }
  };

  const productId = document.body.dataset.productId;
  const stripeUrl = document.body.dataset.stripeUrl;
  const videoSrc = document.body.dataset.videoSrc;
  const stockTargets = Array.from(document.querySelectorAll("[data-stock-text]"));
  const buyButtons = [
    document.getElementById("buyBtn"),
    document.getElementById("buyBtnTop")
  ].filter(Boolean);

  function readStoredLanguage(){
    try{
      return window.localStorage.getItem(languageStorageKey) === "en" ? "en" : "de";
    }catch(error){
      return "de";
    }
  }

  function storeLanguage(lang){
    try{
      window.localStorage.setItem(languageStorageKey, lang);
    }catch(error){
      return;
    }
  }

  let currentLang = readStoredLanguage();
  let currentBuyButtonStock;

  const stockStateByTarget = new WeakMap();

  function message(key, replacements){
    let value = messages[currentLang][key] || messages.de[key] || key;

    Object.entries(replacements || {}).forEach(([name, replacement]) => {
      value = value.replace(`{${name}}`, replacement);
    });

    return value;
  }

  function setLocalizedAttribute(selector, attribute){
    document.querySelectorAll(selector).forEach(element => {
      const value = element.getAttribute(`data-lang-${attribute}-${currentLang}`);

      if(value !== null){
        element.setAttribute(attribute, value);
      }
    });
  }

  function updateLanguageToggles(){
    document.querySelectorAll("[data-language-toggle]").forEach(toggle => {
      toggle.setAttribute("aria-pressed", currentLang === "en" ? "true" : "false");

      toggle.querySelectorAll("[data-lang-option]").forEach(option => {
        option.classList.toggle("is-active", option.dataset.langOption === currentLang);
      });
    });
  }

  function refreshStockLabels(){
    stockTargets.forEach(target => {
      const state = stockStateByTarget.get(target);

      if(state){
        renderStock(target, state.stock, state.meta);
      }
    });
  }

  function refreshBuyButtons(){
    if(currentBuyButtonStock !== undefined){
      setBuyButtonState(currentBuyButtonStock);
    }
  }

  function applyLanguage(lang){
    currentLang = lang === "en" ? "en" : "de";
    storeLanguage(currentLang);
    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-lang-de], [data-lang-en]").forEach(element => {
      const value = element.getAttribute(`data-lang-${currentLang}`);

      if(value !== null){
        element.textContent = value;
      }
    });

    document.querySelectorAll("[data-lang-html-de], [data-lang-html-en]").forEach(element => {
      const value = element.getAttribute(`data-lang-html-${currentLang}`);

      if(value !== null){
        element.innerHTML = value;
      }
    });

    setLocalizedAttribute(`[data-lang-aria-label-${currentLang}]`, "aria-label");
    setLocalizedAttribute(`[data-lang-title-${currentLang}]`, "title");
    setLocalizedAttribute(`[data-lang-alt-${currentLang}]`, "alt");

    updateLanguageToggles();
    refreshStockLabels();
    refreshBuyButtons();
  }

  document.querySelectorAll("[data-language-toggle]").forEach(toggle => {
    toggle.addEventListener("click", () => {
      applyLanguage(currentLang === "de" ? "en" : "de");
    });
  });

  applyLanguage(currentLang);

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
      <img class="gallery-media" src="${src}" alt="">
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

  if(!productId && stockTargets.length === 0){
    return;
  }

  if(productId){
    const stockText = document.getElementById("stockText");

    if(stockText && !stockText.dataset.stockText){
      stockText.dataset.stockText = "";
      stockText.dataset.productId = productId;
      stockTargets.push(stockText);
    }
  }

  function isSoldOutOverrideTarget(target){
    const id = target.dataset.productId || productId;
    return soldOutOverrides.has(id);
  }

  function applySoldOutOverride(target){
    const id = target.dataset.productId || productId;
    renderStock(target, 0, { collection: "manual", id });

    if(target.id === "stockText"){
      setBuyButtonState(0);
    }
  }

  stockTargets
    .filter(isSoldOutOverrideTarget)
    .forEach(applySoldOutOverride);

  const liveStockTargets = stockTargets.filter(target => !isSoldOutOverrideTarget(target));

  if(liveStockTargets.length === 0){
    return;
  }

  if(!window.firebase){
    liveStockTargets.forEach(target => {
      target.innerText = message("stockUnavailable");
      target.classList.add("stock-error");
      target.title = message("stockUnavailableTitle");
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
    stockStateByTarget.set(target, { stock, meta });
    target.classList.remove("stock-in", "stock-low", "stock-out", "stock-error");

    if(stock === null){
      target.innerText = message("stockNotSet");
      target.classList.add("stock-error");
      target.title = message("stockNotSetTitle");
      return;
    }

    if(stock <= 0){
      target.innerText = message("outOfStock");
      target.classList.add("stock-out");
    }else{
      target.innerText = message("inStock", { stock });
      target.classList.add(stock <= 3 ? "stock-low" : "stock-in");
    }

    if(meta){
      target.dataset.stockSource = `${meta.collection}/${meta.id}`;
      target.title = `Firebase: ${meta.collection}/${meta.id}`;
    }
  }

  function setBuyButtonState(stock){
    currentBuyButtonStock = stock;

    buyButtons.forEach(button => {
      if(stock !== null && stock <= 0){
        button.disabled = true;
        button.innerText = message("soldOut");
      }else{
        button.disabled = false;
        button.innerText = message("buyNow");
      }
    });
  }

  function bindStockTarget(target){
    const id = target.dataset.productId || productId;

    if(!id){
      return;
    }

    if(soldOutOverrides.has(id)){
      renderStock(target, 0, { collection: "manual", id });

      if(target.id === "stockText"){
        setBuyButtonState(0);
      }

      return;
    }

    const refs = stockRefsFor(id);
    const states = new Map(refs.map(item => [`${item.collection}/${item.id}`, null]));
    const sourceByKey = new Map(refs.map(item => [`${item.collection}/${item.id}`, item]));

    target.innerText = message("checkingStock");

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
    if(soldOutOverrides.has(id)){
      return 0;
    }

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
        alert(message("checkoutNotConfigured"));
        return;
      }

      if(!productId){
        alert(message("productStockNotConfigured"));
        return;
      }

      const stock = await getProductStock(productId);

      if(stock === null){
        alert(message("stockNotConfigured"));
        return;
      }

      if(stock <= 0){
        alert(message("soldOut"));
        return;
      }

      window.location.href = stripeUrl;
    }catch(error){
      alert(message("error"));
    }
  }

  buyButtons.forEach(button => {
    button.addEventListener("click", handleBuy);
  });

  liveStockTargets.forEach(bindStockTarget);

})();
