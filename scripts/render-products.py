from html import escape
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


PRODUCTS = {
    "vacuum": {
        "folder": "vacuum",
        "price": "24,99 EUR",
        "stripe": "https://buy.stripe.com/8x2bJ13E0ehYb5N6hxcIE00",
        "video": "../assets/product-video.mp4",
        "images": ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"],
        "hero": "image1.jpg",
        "de": {
            "title": "Kabelloser Hochleistungs-Autostaubsauger",
            "variant": "Kabellos / Nass & Trocken",
            "category": "Autopflege",
            "summary": "Kompakte kabellose Reinigung für Auto, Büro und Zuhause mit starker Saugleistung, wiederverwendbarem HEPA-Filter und USB-Ladung.",
            "features": [
                ("Starke Saugleistung", "Für schnelle Reinigung im Alltag."),
                ("Nass & trocken", "Für Staub, Krümel und kleine Flüssigkeiten."),
                ("Portables Design", "Einfach im Auto oder Zuhause zu verstauen."),
                ("Wiederverwendbarer Filter", "Waschbarer HEPA-Filter für regelmäßige Nutzung."),
            ],
            "options": ["Schwarz"],
            "details": "Ein praktischer Handstaubsauger für schnelle Reinigung auf engem Raum. Kompakt genug fürs Auto und nützlich für Schreibtisch, Regale und Ecken Zuhause.",
            "specs": ["Ladezeit: ca. 2 Stunden", "Leistung: 120W", "Nutzung: nass und trocken", "Filter: waschbarer HEPA-Filter", "Design: kabelloser Handstaubsauger"],
            "box": ["Staubsauger", "Düsenaufsätze", "USB-Ladekabel", "Waschbarer HEPA-Filter"],
        },
        "en": {
            "title": "Wireless High-Power Car Vacuum Cleaner",
            "variant": "Cordless / Wet & Dry",
            "category": "Car Care",
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
    },
    "magnetic-charger": {
        "folder": "magnetic-charger",
        "price": "19,99 EUR",
        "stripe": "https://buy.stripe.com/28E3cv4I45Ls8XF0XdcIE01",
        "video": "../assets/magnetic-charger-video.mp4",
        "images": ["magnetic-charger-1.jpg", "magnetic-charger-2.jpg", "magnetic-charger-3.jpg", "magnetic-charger-4.jpg"],
        "hero": "magnetic-charger-1.jpg",
        "de": {
            "title": "3-in-1 magnetisches kabelloses Ladegerät",
            "variant": "Faltbar / Apple-Geräte",
            "category": "Technik-Zubehör",
            "summary": "Eine kompakte magnetische Ladestation für iPhone, Apple Watch und AirPods mit sauberem faltbarem Reisedesign.",
            "features": [
                ("3-in-1 Laden", "Telefon, Watch und Earbuds gemeinsam laden."),
                ("Magnetische Ausrichtung", "Einfaches Platzieren kompatibler Geräte."),
                ("Faltbares Design", "Gemacht für Schreibtisch, Reise und Nachttisch."),
                ("USB-C Eingang", "Moderner Anschluss mit einfachem Kabel."),
            ],
            "options": ["Weiß", "Reise-Fold"],
            "details": "Diese Ladestation hält tägliche Geräte an einem Ort organisiert und bleibt kompakt genug für Reisen. Ideal für klare Schreibtisch-Setups und Laden über Nacht.",
            "specs": ["Ladeleistung: bis zu 15W", "Kompatibilität: Telefon, Watch, Earbuds", "Design: faltbare Dockingstation", "Material: ABS und Aluminiumlegierung", "Anschluss: USB-C"],
            "box": ["Magnetische Ladestation", "USB-C-Kabel", "Benutzerhinweis"],
        },
        "en": {
            "title": "3 in 1 Magnetic Wireless Charger",
            "variant": "Foldable / Apple Devices",
            "category": "Tech Accessories",
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
    },
    "cable": {
        "folder": "cable",
        "price": "8,99 EUR",
        "stripe": "https://buy.stripe.com/6oU4gzgqM1vc0r95dtcIE02",
        "video": "../assets/cable-video.mp4",
        "images": ["cable1.jpg", "cable2.jpg", "cable3.jpg", "cable4.jpg"],
        "hero": "cable1.jpg",
        "de": {
            "title": "240W Schnellladekabel",
            "variant": "USB-C / LED-Anzeige",
            "category": "Kabel & Ladegeräte",
            "summary": "Ein robustes geflochtenes USB-C-Kabel mit Schnelllade-Support und klarer LED-Leistungsanzeige.",
            "features": [
                ("240W Laden", "Für kompatible Hochleistungsgeräte gemacht."),
                ("LED-Anzeige", "Zeigt die Ladeleistung in Echtzeit."),
                ("Geflochtene Verarbeitung", "Robuste Haptik für den Alltag."),
                ("Breite Kompatibilität", "Funktioniert mit Smartphones, Tablets, Laptops und mehr."),
            ],
            "options": ["Schwarz", "USB-C"],
            "details": "Ein zuverlässiges Ladekabel für den Alltag, wenn Geschwindigkeit, Haltbarkeit und eine sichtbare Leistungsanzeige in einem kompakten Zubehör wichtig sind.",
            "specs": ["Leistung: bis zu 240W", "Anschluss: USB-C", "Aufbau: geflochtenes Kabel", "Anzeige: LED-Leistungsanzeige", "Nutzung: Laden und Datenübertragung"],
            "box": ["240W Ladekabel"],
        },
        "en": {
            "title": "240W Fast Charging Cable",
            "variant": "USB-C / LED Display",
            "category": "Cables & Chargers",
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
    },
    "breil": {
        "folder": "breil",
        "price": "110 EUR",
        "stripe": "https://buy.stripe.com/8x2eVd5M8b5M5LtgWbcIE03",
        "video": "",
        "images": ["breil1.jpg", "breil2.jpg", "breil3.jpg", "breil4.jpg"],
        "hero": "breil1.jpg",
        "de": {
            "title": "Breil Bow Shot Chronograph",
            "variant": "Gold-Stahl / Schwarzer Chronograph",
            "category": "Uhren",
            "summary": "Ein markanter goldfarbener Chronograph mit schwarzem Zifferblatt, Edelstahlgehäuse und sportlich-luxuriöser Präsenz.",
            "features": [
                ("Chronograph-Präzision", "Quarz-Zeitmessung für zuverlässigen Alltagseinsatz."),
                ("Goldfarbener Stahl", "Polierter Edelstahl mit hochwertigem Ton."),
                ("100M Wasserdichtigkeit", "Für tägliche Belastbarkeit entwickelt."),
                ("Italienische Designidentität", "Sportlicher Stil mit feinen Details."),
            ],
            "options": ["Gold-Stahl", "Schwarzes Zifferblatt"],
            "details": "Der Bow Shot verbindet sportliche Chronograph-Funktion mit starker visueller Identität. Gemacht für den Alltag mit poliertem goldfarbenem Finish.",
            "specs": ["Werk: Quarz-Chronograph", "Gehäusegröße: 43mm", "Gehäusematerial: IP-goldfarbener Edelstahl", "Zifferblatt: schwarzer Chronograph", "Wasserdichtigkeit: 100M"],
            "box": ["Breil Bow Shot Uhr", "Uhrenbox", "Benutzerhandbuch"],
        },
        "en": {
            "title": "Breil Bow Shot Chronograph",
            "variant": "Gold Steel / Black Chronograph",
            "category": "Watches",
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
    },
    "privateer": {
        "folder": "fossil-privateer",
        "price": "95 EUR",
        "stripe": "",
        "video": "",
        "images": ["fossil-privateer-hero.jpg", "privateer1.jpg", "privateer2.jpg", "privateer3.jpg", "privateer4.jpg"],
        "hero": "fossil-privateer-hero.jpg",
        "de": {
            "title": "Fossil Privateer Chronograph",
            "variant": "Zweifarbiger Stahl / Schwarzes Zifferblatt",
            "category": "Uhren",
            "summary": "Ein zweifarbiger Fossil Chronograph aus Edelstahl mit schwarzem Sunray-Zifferblatt und starkem Alltagsstil.",
            "features": [
                ("Quarz-Chronograph", "Zuverlässige Zeitmessung für den Alltag."),
                ("Zweifarbiger Stahl", "Gold- und silberfarbener Edelstahl-Look."),
                ("5 ATM Wasserdichtigkeit", "Gemacht für Spritzwasser und Alltag."),
                ("Schwarzes Sunray-Zifferblatt", "Sportlich-luxuriöser Look mit Tiefe und Kontrast."),
            ],
            "options": ["Zweifarbiger Stahl", "Schwarzes Zifferblatt"],
            "details": "Der Privateer bietet ein markantes Uhrenprofil mit Edelstahlgehäuse, Chronographenwerk und modernem zweifarbigem Armband.",
            "specs": ["Werk: Quarz-Chronograph", "Gehäusegröße: 45mm", "Gehäusematerial: Edelstahl", "Zifferblatt: schwarzer Sunray", "Wasserdichtigkeit: 5 ATM"],
            "box": ["Fossil Privateer Uhr", "Uhrenbox", "Benutzerhandbuch"],
        },
        "en": {
            "title": "Fossil Privateer Chronograph",
            "variant": "Two-Tone Steel / Black Dial",
            "category": "Watches",
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
    },
}


RELATED = ["breil", "privateer", "magnetic-charger", "cable"]


def esc(value):
    return escape(str(value), quote=True)


def lang_attrs(de, en):
    return f'data-lang-de="{esc(de)}" data-lang-en="{esc(en)}"'


def lang_html_attrs(de, en):
    return f'data-lang-html-de="{esc(de)}" data-lang-html-en="{esc(en)}"'


def lang_attr(name, de, en):
    return f'data-lang-{name}-de="{esc(de)}" data-lang-{name}-en="{esc(en)}"'


def language_toggle():
    return '''<button class="language-toggle" type="button" data-language-toggle aria-label="Sprache wechseln" title="Sprache wechseln" data-lang-aria-label-de="Sprache wechseln" data-lang-aria-label-en="Switch language" data-lang-title-de="Sprache wechseln" data-lang-title-en="Switch language">
      <span data-lang-option="de">DE</span>
      <span class="language-divider" aria-hidden="true">/</span>
      <span data-lang-option="en">EN</span>
    </button>'''


def thumbs(product):
    parts = []
    de_title = product["de"]["title"]
    en_title = product["en"]["title"]

    for image in product["images"]:
        active = " active" if image == product["hero"] else ""
        parts.append(
            f'''<button class="thumb{active}" type="button" onclick="showImage(this,'../assets/{image}')">
        <img src="../assets/{image}" alt="{esc(de_title)} Vorschau" {lang_attr("alt", f"{de_title} Vorschau", f"{en_title} thumbnail")}>
      </button>'''
        )

    if product["video"]:
        parts.append(
            f'''<button class="thumb" type="button" onclick="showVideo(this)" aria-label="Produktvideo" {lang_attr("aria-label", "Produktvideo", "Product video")}>
        <video preload="metadata"><source src="{product['video']}" type="video/mp4"></video>
      </button>'''
        )

    return "\n      ".join(parts)


def features(product):
    return "\n".join(
        f'''        <div class="feature-item">
          <span class="feature-icon" aria-hidden="true"></span>
          <div>
            <strong {lang_attrs(de_title, en_title)}>{de_title}</strong>
            <span {lang_attrs(de_text, en_text)}>{de_text}</span>
          </div>
        </div>'''
        for (de_title, de_text), (en_title, en_text) in zip(product["de"]["features"], product["en"]["features"])
    )


def options(product):
    return "\n".join(
        f'<span class="option{" active" if index == 0 else ""}" {lang_attrs(de_option, en_option)}>{de_option}</span>'
        for index, (de_option, en_option) in enumerate(zip(product["de"]["options"], product["en"]["options"]))
    )


def specs(product):
    return "\n".join(
        f'<li {lang_attrs(de_item, en_item)}>{de_item}</li>'
        for de_item, en_item in zip(product["de"]["specs"], product["en"]["specs"])
    )


def box_items(product):
    return "\n".join(
        f'<span {lang_attrs(de_item, en_item)}>{de_item}</span>'
        for de_item, en_item in zip(product["de"]["box"], product["en"]["box"])
    )


def related(current_key):
    cards = []

    for related_key in RELATED:
        if related_key == current_key:
            continue

        product = PRODUCTS[related_key]
        de_title = product["de"]["title"]
        en_title = product["en"]["title"]

        cards.append(
            f'''      <a class="related-card" href="../{product["folder"]}/">
        <img src="../assets/{product["hero"]}" alt="{esc(de_title)}" {lang_attr("alt", de_title, en_title)}>
        <div><strong {lang_attrs(de_title, en_title)}>{de_title}</strong><span>{product["price"]}</span></div>
      </a>'''
        )

    return "\n".join(cards[:4])


def page(key, product):
    de = product["de"]
    en = product["en"]
    de_breadcrumbs = f'Start / {de["category"]} / {de["title"]}'
    en_breadcrumbs = f'Home / {en["category"]} / {en["title"]}'

    return f'''<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title {lang_attrs(f'NOVARA | {de["title"]}', f'NOVARA | {en["title"]}')}>NOVARA | {de["title"]}</title>

<link rel="stylesheet" href="../css/site.css">
<link rel="stylesheet" href="../css/product.css">
</head>

<body data-product-id="{key}" data-stripe-url="{product["stripe"]}" data-video-src="{product["video"]}">

<div class="promo-bar" {lang_attrs("Kostenloser Versand ab 50 EUR", "Free shipping on all orders over 50 EUR")}>Kostenloser Versand ab 50 EUR</div>

<header class="site-header">
  <a href="../" class="brand-link" aria-label="NOVARA Startseite" {lang_attr("aria-label", "NOVARA Startseite", "NOVARA home")}>
    <picture>
      <source media="(max-width: 640px)" srcset="../assets/novara-logo-mobile.jpg">
      <img class="brand-logo" src="../assets/novara-logo-desktop.jpg" alt="NOVARA">
    </picture>
  </a>

  <nav class="header-nav" aria-label="Shop-Bereiche" {lang_attr("aria-label", "Shop-Bereiche", "Store sections")}>
    <a href="../#collections" {lang_attrs("Kollektionen", "Collections")}>Kollektionen</a>
    <a href="../#watches" {lang_attrs("Uhren", "Watches")}>Uhren</a>
    <a href="../#tech" {lang_attrs("Technik", "Tech")}>Technik</a>
    <a href="../#car-care" {lang_attrs("Autopflege", "Car Care")}>Autopflege</a>
  </nav>

  <div class="header-tools">
    {language_toggle()}
    <button id="buyBtnTop" class="top-btn" {lang_attrs("Kaufen", "Buy Now")}>Kaufen</button>
  </div>
</header>

<main class="page">
  <section class="product-shell">
    <div class="gallery-shell">
      <div class="thumbs">
      {thumbs(product)}
      </div>

      <div class="media" id="mainMedia">
        <span class="badge" {lang_attrs("Bestseller", "Bestseller")}>Bestseller</span>
        <img src="../assets/{product["hero"]}" alt="{esc(de["title"])}" {lang_attr("alt", de["title"], en["title"])}>
      </div>
    </div>

    <div class="product-panel">
      <div class="breadcrumbs" {lang_attrs(de_breadcrumbs, en_breadcrumbs)}>{de_breadcrumbs}</div>
      <h1 {lang_attrs(de["title"], en["title"])}>{de["title"]}</h1>
      <div class="variant-line" {lang_attrs(de["variant"], en["variant"])}>{de["variant"]}</div>
      <div class="price">{product["price"]}</div>
      <div class="rating"><span {lang_attrs("Bewertet mit 4,8", "Rated 4.8")}>Bewertet mit 4,8</span> <span {lang_attrs("Kundenfavorit", "Customer favorite")}>Kundenfavorit</span></div>
      <p class="summary" {lang_attrs(de["summary"], en["summary"])}>{de["summary"]}</p>

      <div class="feature-list">
{features(product)}
      </div>

      <div class="option-label" {lang_attrs("Option", "Option")}>Option</div>
      <div class="option-row">
        {options(product)}
      </div>

      <div id="stockText">Bestand wird geprüft...</div>

      <div class="checkout-row">
        <button id="buyBtn" class="cta" {lang_attrs("Kaufen", "Buy Now")}>Kaufen</button>
        <div class="apple-pay" {lang_attrs("Sicherer Checkout", "Secure checkout")}>Sicherer Checkout</div>
      </div>
    </div>
  </section>

  <section class="benefits" aria-label="Shop-Vorteile" {lang_attr("aria-label", "Shop-Vorteile", "Store benefits")}>
    <div class="benefit"><strong {lang_attrs("Kostenloser Versand", "Free shipping")}>Kostenloser Versand</strong><span {lang_attrs("Ab 50 EUR Bestellwert", "On orders over 50 EUR")}>Ab 50 EUR Bestellwert</span></div>
    <div class="benefit"><strong {lang_attrs("Einfache Rückgabe", "Easy returns")}>Einfache Rückgabe</strong><span {lang_attrs("30 Tage Rückgaberecht", "30-day return policy")}>30 Tage Rückgaberecht</span></div>
    <div class="benefit"><strong {lang_attrs("Qualitätsgarantie", "Quality guarantee")}>Qualitätsgarantie</strong><span {lang_attrs("Geprüfte Qualität", "Checked before shipping")}>Geprüfte Qualität</span></div>
    <div class="benefit"><strong {lang_attrs("Sicherer Checkout", "Secure checkout")}>Sicherer Checkout</strong><span {lang_attrs("Verschlüsselt und sicher", "Encrypted and safe")}>Verschlüsselt und sicher</span></div>
  </section>

  <section class="details">
    <div>
      <h2 {lang_attrs("Beschreibung", "Description")}>Beschreibung</h2>
      <p {lang_attrs(de["details"], en["details"])}>{de["details"]}</p>
      <ul class="spec-list">
        {specs(product)}
      </ul>
    </div>
    <div>
      <h2 {lang_attrs("Lieferumfang", "What's in the box")}>Lieferumfang</h2>
      <div class="box-list">
        {box_items(product)}
      </div>
    </div>
  </section>

  <section class="related">
    <h2 {lang_attrs("Das könnte dir auch gefallen", "You may also like")}>Das könnte dir auch gefallen</h2>
    <div class="related-grid">
{related(key)}
    </div>
  </section>
</main>

<footer class="site-footer" {lang_attrs("(c) NOVARA - Moderne Essentials", "(c) NOVARA - Modern Essentials")}>(c) NOVARA - Moderne Essentials</footer>

<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
<script src="../js/storefront.js?v=20260524-de-en"></script>

</body>
</html>
'''


for key, product in PRODUCTS.items():
    target = ROOT / product["folder"] / "index.html"
    target.write_text(page(key, product), encoding="utf-8")
