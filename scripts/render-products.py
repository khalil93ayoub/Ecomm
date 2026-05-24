from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

PRODUCTS = {
    "vacuum": {
        "folder": "vacuum",
        "title": "Wireless High-Power Car Vacuum Cleaner",
        "variant": "Cordless / Wet & Dry",
        "category": "Car Care",
        "price": "24,99 EUR",
        "stripe": "https://buy.stripe.com/8x2bJ13E0ehYb5N6hxcIE00",
        "video": "../assets/product-video.mp4",
        "images": ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"],
        "hero": "image1.jpg",
        "summary": "Compact cordless cleaning for cars, office, and home with strong suction, reusable HEPA filtration, and USB charging.",
        "features": [
            ("High-Power Suction", "Built for quick everyday cleaning."),
            ("Wet & Dry Use", "Handles dust, crumbs, and small spills."),
            ("Portable Design", "Easy to store in the car or home."),
            ("Reusable Filter", "Washable HEPA filter for repeated use."),
        ],
        "options": ["Black"],
        "details": "A practical handheld vacuum designed for fast cleaning in tight spaces. It is compact enough for the car and useful enough for desks, shelves, and home corners.",
        "specs": ["Charging time: about 2 hours", "Power: 120W", "Usage: wet and dry", "Filter: washable HEPA", "Design: cordless handheld"],
        "box": ["Vacuum cleaner", "Nozzle accessories", "USB charging cable", "Washable HEPA filter"],
    },
    "magnetic-charger": {
        "folder": "magnetic-charger",
        "title": "3 in 1 Magnetic Wireless Charger",
        "variant": "Foldable / Apple Devices",
        "category": "Tech Accessories",
        "price": "19,99 EUR",
        "stripe": "https://buy.stripe.com/28E3cv4I45Ls8XF0XdcIE01",
        "video": "../assets/magnetic-charger-video.mp4",
        "images": ["magnetic-charger-1.jpg", "magnetic-charger-2.jpg", "magnetic-charger-3.jpg", "magnetic-charger-4.jpg"],
        "hero": "magnetic-charger-1.jpg",
        "summary": "A compact magnetic charging station for iPhone, Apple Watch, and AirPods with a clean foldable travel design.",
        "features": [
            ("3-in-1 Charging", "Charge phone, watch, and earbuds together."),
            ("Magnetic Alignment", "Easy placement for compatible devices."),
            ("Foldable Design", "Built for desks, travel, and bedside use."),
            ("USB-C Input", "Simple modern cable connection."),
        ],
        "options": ["White", "Travel Fold"],
        "details": "This charger keeps daily devices organized in one place while staying compact enough for travel. It is best for clean desk setups and overnight charging.",
        "specs": ["Charging power: up to 15W", "Compatibility: phone, watch, earbuds", "Design: foldable dock", "Material: ABS and aluminum alloy", "Port: USB-C"],
        "box": ["Magnetic charging station", "USB-C cable", "User guide"],
    },
    "cable": {
        "folder": "cable",
        "title": "240W Fast Charging Cable",
        "variant": "USB-C / LED Display",
        "category": "Cables & Chargers",
        "price": "8,99 EUR",
        "stripe": "https://buy.stripe.com/6oU4gzgqM1vc0r95dtcIE02",
        "video": "../assets/cable-video.mp4",
        "images": ["cable1.jpg", "cable2.jpg", "cable3.jpg", "cable4.jpg"],
        "hero": "cable1.jpg",
        "summary": "A durable braided USB-C cable with fast charging support and a clear LED power display.",
        "features": [
            ("240W Charging", "Built for high-power compatible devices."),
            ("LED Display", "Shows charging power in real time."),
            ("Braided Build", "Durable finish for daily use."),
            ("Wide Compatibility", "Works with phones, tablets, laptops, and more."),
        ],
        "options": ["Black", "USB-C"],
        "details": "A reliable daily charging cable for users who want speed, durability, and a visible power display in one compact accessory.",
        "specs": ["Power: up to 240W", "Connector: USB-C", "Build: braided cable", "Display: LED power indicator", "Use: charging and data transfer"],
        "box": ["240W charging cable"],
    },
    "breil": {
        "folder": "breil",
        "title": "Breil Bow Shot Chronograph",
        "variant": "Gold Steel / Black Chronograph",
        "category": "Watches",
        "price": "110 EUR",
        "stripe": "https://buy.stripe.com/8x2eVd5M8b5M5LtgWbcIE03",
        "video": "",
        "images": ["breil1.jpg", "breil2.jpg", "breil3.jpg", "breil4.jpg"],
        "hero": "breil1.jpg",
        "summary": "A bold gold-tone chronograph with a black dial, stainless steel construction, and sport-luxury presence.",
        "features": [
            ("Chronograph Precision", "Quartz timing for reliable everyday use."),
            ("Gold Steel Build", "Polished stainless steel with a premium tone."),
            ("100M Water Resistance", "Designed for daily durability."),
            ("Italian Design Identity", "Sport styling with refined detailing."),
        ],
        "options": ["Gold Steel", "Black Dial"],
        "details": "The Bow Shot combines sporty chronograph functionality with a strong visual identity. It is made for everyday wear with a polished gold-tone finish.",
        "specs": ["Movement: quartz chronograph", "Case size: 43mm", "Case material: IP gold stainless steel", "Dial: black chronograph", "Water resistance: 100M"],
        "box": ["Breil Bow Shot watch", "Watch box", "User manual"],
    },
    "privateer": {
        "folder": "fossil-privateer",
        "title": "Fossil Privateer Chronograph",
        "variant": "Two-Tone Steel / Black Dial",
        "category": "Watches",
        "price": "95 EUR",
        "stripe": "https://buy.stripe.com/YOUR_STRIPE_LINK",
        "video": "",
        "images": ["fossil-privateer-hero.jpg", "privateer1.jpg", "privateer2.jpg", "privateer3.jpg", "privateer4.jpg"],
        "hero": "fossil-privateer-hero.jpg",
        "summary": "A two-tone stainless steel Fossil chronograph with a black sunray dial and strong everyday styling.",
        "features": [
            ("Quartz Chronograph", "Reliable timing for daily use."),
            ("Two-Tone Steel", "Gold and silver stainless steel finish."),
            ("5 ATM Water Resistance", "Built for splashes and daily exposure."),
            ("Black Sunray Dial", "Sport-luxury look with depth and contrast."),
        ],
        "options": ["Two-Tone Steel", "Black Dial"],
        "details": "The Privateer delivers a bold watch profile with a stainless steel case, chronograph movement, and a modern two-tone bracelet.",
        "specs": ["Movement: quartz chronograph", "Case size: 45mm", "Case material: stainless steel", "Dial: black sunray", "Water resistance: 5 ATM"],
        "box": ["Fossil Privateer watch", "Watch box", "User manual"],
    },
}


RELATED = [
    ("breil/", "assets/breil1.jpg", "Breil Bow Shot", "110 EUR"),
    ("fossil-privateer/", "assets/fossil-privateer-hero.jpg", "Fossil Privateer", "95 EUR"),
    ("magnetic-charger/", "assets/magnetic-charger-1.jpg", "3 in 1 Magnetic Charger", "19,99 EUR"),
    ("cable/", "assets/cable1.jpg", "240W Fast Charging Cable", "8,99 EUR"),
]


def thumbs(product):
    parts = []
    for index, image in enumerate(product["images"]):
        active = " active" if image == product["hero"] else ""
        parts.append(
            f'''<button class="thumb{active}" type="button" onclick="showImage(this,'../assets/{image}')">
        <img src="../assets/{image}" alt="{product['title']} thumbnail">
      </button>'''
        )
    if product["video"]:
        parts.append(
            f'''<button class="thumb" type="button" onclick="showVideo(this)">
        <video preload="metadata"><source src="{product['video']}" type="video/mp4"></video>
      </button>'''
        )
    return "\n      ".join(parts)


def features(product):
    return "\n".join(
        f'''        <div class="feature-item">
          <span class="feature-icon" aria-hidden="true"></span>
          <div><strong>{title}</strong><span>{text}</span></div>
        </div>'''
        for title, text in product["features"]
    )


def options(product):
    return "\n".join(
        f'<span class="option{" active" if index == 0 else ""}">{option}</span>'
        for index, option in enumerate(product["options"])
    )


def specs(product):
    return "\n".join(f"<li>{item}</li>" for item in product["specs"])


def box_items(product):
    return "\n".join(f"<span>{item}</span>" for item in product["box"])


def related(current_key):
    cards = []
    current_folder = PRODUCTS[current_key]["folder"] + "/"
    for href, image, title, price in RELATED:
        if href == current_folder:
            continue
        cards.append(
            f'''      <a class="related-card" href="../{href}">
        <img src="../{image}" alt="{title}">
        <div><strong>{title}</strong><span>{price}</span></div>
      </a>'''
        )
    return "\n".join(cards[:4])


def page(key, product):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>NOVARA | {product["title"]}</title>

<link rel="stylesheet" href="../css/site.css">
<link rel="stylesheet" href="../css/product.css">
</head>

<body data-product-id="{key}" data-stripe-url="{product["stripe"]}" data-video-src="{product["video"]}">

<div class="promo-bar">Free shipping on all orders over 50 EUR</div>

<header class="site-header">
  <a href="../" class="brand-link" aria-label="NOVARA home">
    <span class="brand-monogram">N</span>
    <span>NOVARA</span>
  </a>

  <nav class="header-nav" aria-label="Store sections">
    <a href="../#collections">Collections</a>
    <a href="../#watches">Watches</a>
    <a href="../#tech">Tech</a>
    <a href="../#car-care">Car Care</a>
  </nav>

  <button id="buyBtnTop" class="top-btn">Buy Now</button>
</header>

<main class="page">
  <section class="product-shell">
    <div class="gallery-shell">
      <div class="thumbs">
      {thumbs(product)}
      </div>

      <div class="media" id="mainMedia">
        <span class="badge">Bestseller</span>
        <img src="../assets/{product["hero"]}" alt="{product["title"]}">
      </div>
    </div>

    <div class="product-panel">
      <div class="breadcrumbs">Home / {product["category"]} / {product["title"]}</div>
      <h1>{product["title"]}</h1>
      <div class="variant-line">{product["variant"]}</div>
      <div class="price">{product["price"]}</div>
      <div class="rating">Rated 4.8 <span>Customer favorite</span></div>
      <p class="summary">{product["summary"]}</p>

      <div class="feature-list">
{features(product)}
      </div>

      <div class="option-label">Option</div>
      <div class="option-row">
        {options(product)}
      </div>

      <div id="stockText">Loading...</div>

      <div class="checkout-row">
        <button id="buyBtn" class="cta">Buy Now</button>
        <div class="apple-pay">Secure checkout</div>
      </div>
    </div>
  </section>

  <section class="benefits" aria-label="Store benefits">
    <div class="benefit"><strong>Free shipping</strong><span>On orders over 50 EUR</span></div>
    <div class="benefit"><strong>Easy returns</strong><span>30-day return policy</span></div>
    <div class="benefit"><strong>Quality guarantee</strong><span>Checked before shipping</span></div>
    <div class="benefit"><strong>Secure checkout</strong><span>Encrypted and safe</span></div>
  </section>

  <section class="details">
    <div>
      <h2>Description</h2>
      <p>{product["details"]}</p>
      <ul class="spec-list">
        {specs(product)}
      </ul>
    </div>
    <div>
      <h2>What's in the box</h2>
      <div class="box-list">
        {box_items(product)}
      </div>
    </div>
  </section>

  <section class="related">
    <h2>You may also like</h2>
    <div class="related-grid">
{related(key)}
    </div>
  </section>
</main>

<footer class="site-footer">(c) NOVARA - Modern Essentials</footer>

<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
<script src="../js/storefront.js?v=20260524"></script>

</body>
</html>
'''


for key, product in PRODUCTS.items():
    target = ROOT / product["folder"] / "index.html"
    target.write_text(page(key, product), encoding="utf-8")
