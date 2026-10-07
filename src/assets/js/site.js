import { profiles } from "./profiles.js";
const keys = Object.keys(profiles);
const tabs = [...document.querySelectorAll('[role="tab"]')];
const portrait = document.getElementById("hero-portrait");
const panel = document.getElementById("profile-panel");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
let request = 0;
const fallback =
  "img/profile/profile-erika-queiroz-fisioterapeuta-ortopedista-1x1.jpg";
const contact = (key) =>
  `https://wa.me/5511977895608?text=${encodeURIComponent(profiles[key].message)}`;
async function loadPortrait(src) {
  const image = new Image();
  image.src = src;
  let timer;
  try {
    await Promise.race([
      image.decode(),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error("Portrait timeout")), 5000);
      }),
    ]);
    return image.src;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
function animateContent() {
  if (reducedMotion.matches) return;
  for (const element of [
    portrait,
    document.querySelector(".hero-text"),
    document.querySelector(".about-copy"),
  ]) {
    element.getAnimations().forEach((animation) => animation.cancel());
    element.animate(
      [
        { opacity: 0.35, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 450, easing: "ease-out" },
    );
  }
}
const setHeading = (id, first, emphasis) => {
  const element = document.getElementById(id);
  const em = document.createElement("em");
  em.textContent = emphasis;
  element.replaceChildren(
    document.createTextNode(first),
    document.createElement("br"),
    em,
  );
};
function updateProfileSections(key) {
  const clinical = key === "fisioterapia";
  document
    .querySelectorAll("[data-clinical]")
    .forEach((element) => (element.hidden = !clinical));
  document
    .querySelectorAll("[data-personal]")
    .forEach((element) => (element.hidden = clinical));
  document.getElementById("header-role").textContent = clinical
    ? "Fisioterapeuta · Especialista em Ortopedia"
    : "Fisioterapeuta & empresária";
  setHeading(
    "about-heading",
    clinical ? "Conheça sua" : "Diferentes caminhos.",
    clinical ? "fisioterapeuta." : "A mesma Erika.",
  );
  const values = document.getElementById("profile-values");
  values.replaceChildren();
  const labels = clinical
    ? ["Ortopedia", "Terapia manual", "Pilates"]
    : ["Fisioterapia", "Empreendedorismo", "Conexões"];
  labels.forEach((label, index) => {
    if (index) {
      const star = document.createElement("span");
      star.className = "asterisk";
      star.textContent = "✳";
      values.append(star);
    }
    const span = document.createElement("span");
    span.textContent = label;
    values.append(span);
  });
  document.getElementById("social-introduction").textContent = clinical
    ? "Meus canais para acompanhar o cuidado e conversar sobre seu atendimento."
    : "Meu dia a dia, minha trajetória e um canal direto com você.";
  document.getElementById("contact-kicker").textContent = clinical
    ? "SEU CUIDADO COMEÇA PELA ESCUTA."
    : "BOAS CONEXÕES COMEÇAM COM UM OLÁ.";
  setHeading(
    "contact-heading",
    clinical ? "Vamos cuidar" : "Qual caminho trouxe",
    clinical ? "de você?" : "você até aqui?",
  );
  document.getElementById("contact-description").textContent = clinical
    ? "Converse comigo sobre sua necessidade e a disponibilidade de atendimento domiciliar em Guarulhos e região."
    : "Para cuidar da saúde, conversar sobre negócios ou simplesmente se conectar: vamos conversar.";
  document.getElementById("footer-description").textContent = clinical
    ? "Fisioterapia · CREFITO 376404-F"
    : "Feito de cuidado e novas possibilidades.";
  document.title = clinical
    ? "Dra. Erika Queiroz | Fisioterapia em Guarulhos"
    : "Erika Queiroz | Cuidado, negócios e conexões";
  document.getElementById("social-kicker").textContent = clinical
    ? "06 / POR PERTO"
    : "03 / POR PERTO";
  const description = clinical
    ? "Dra. Erika Queiroz, fisioterapeuta especialista em Ortopedia. CREFITO 376404-F. Conheça as áreas de atuação e os recursos para atendimento domiciliar em Guarulhos e região."
    : "Conheça Erika Queiroz, sua atuação na fisioterapia e no e-commerce. Explore sua trajetória, conecte-se nas redes e converse pelo WhatsApp.";
  for (const selector of [
    'meta[name="description"]',
    'meta[property="og:description"]',
    'meta[name="twitter:description"]',
  ])
    document.querySelector(selector).content = description;
  for (const selector of [
    'meta[property="og:title"]',
    'meta[name="twitter:title"]',
  ])
    document.querySelector(selector).content = document.title;
  const image = new URL(
    "img/social/erika-queiroz-preview-2026.jpg",
    "https://fisioerikaqueiroz.vercel.app/",
  ).href;
  for (const selector of [
    'meta[property="og:image"]',
    'meta[name="twitter:image"]',
  ])
    document.querySelector(selector).content = image;
  const schemaElement = document.getElementById("person-schema");
  const schema = JSON.parse(schemaElement.textContent);
  const person = schema["@graph"].find((item) => item["@type"] === "Person");
  person.jobTitle = clinical
    ? "Fisioterapeuta especialista em Ortopedia"
    : ["Fisioterapeuta", "Empresária"];
  schema["@graph"].find((item) => item["@type"] === "ProfilePage").name = document.title;
  schemaElement.textContent = JSON.stringify(schema);
  const url = new URL(location.href);
  url.searchParams.set("perfil", key);
  const anchor = document.getElementById(url.hash.slice(1));
  if (anchor?.hidden) url.hash = "inicio";
  history.replaceState(null, "", url);
}

async function selectProfile(key) {
  if (!profiles[key]) return;
  const id = ++request;
  panel.setAttribute("aria-busy", "true");
  let src = await loadPortrait(`img/portraits/erika-${key}.webp`);
  if (id !== request) return;
  if (!src) src = await loadPortrait(fallback);
  if (id !== request) return;
  const p = profiles[key];
  document.querySelector(".portfolio").dataset.profile = key;
  tabs.forEach((tab) => {
    const selected = tab.id === `tab-${key}`;
    tab.tabIndex = selected ? 0 : -1;
    tab.classList.toggle("selected", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  panel.setAttribute("aria-labelledby", `tab-${key}`);
  document.getElementById("hero-title").textContent = p.title;
  document.getElementById("hero-emphasis").textContent = p.emphasis;
  document.getElementById("hero-mobile-name").textContent = p.mobileName;
  document.querySelector(".hero-description-full").textContent = p.description;
  document.querySelector(".hero-description-short").textContent = p.mobileDescription;
  const kicker = document.getElementById("hero-kicker");
  kicker.replaceChildren();
  const dot = document.createElement("span");
  dot.className = "status-dot";
  kicker.append(dot, document.createTextNode(p.kicker));
  document.getElementById("hero-cta").textContent = p.cta;
  document.getElementById("about-title").textContent = p.detail;
  document.getElementById("about-description").textContent = p.about;
  document
    .querySelectorAll("[data-contact]")
    .forEach(
      (a) =>
        (a.href = contact(
          a.dataset.contact === "active" ? key : a.dataset.contact,
        )),
    );
  if (src) {
    portrait.src = src;
    portrait.hidden = false;
  } else {
    // Keep an already loaded Erika portrait if both files are unavailable.
    portrait.hidden = !portrait.complete || !portrait.naturalWidth;
  }
  portrait.alt = `Erika Queiroz — ${p.label}`;
  updateProfileSections(key);
  panel.setAttribute("aria-busy", "false");
  animateContent();
}
portrait.addEventListener("error", () => {
  if (!portrait.src.endsWith(fallback)) portrait.src = fallback;
  else portrait.hidden = true;
});
portrait.addEventListener("load", () => (portrait.hidden = false));
for (const tab of tabs) {
  const key = tab.id.replace("tab-", "");
  tab.addEventListener("click", () => selectProfile(key));
  tab.addEventListener("keydown", (event) => {
    const index = keys.indexOf(key);
    const next =
      event.key === "ArrowRight"
        ? keys[(index + 1) % keys.length]
        : event.key === "ArrowLeft"
          ? keys[(index + keys.length - 1) % keys.length]
          : event.key === "Home"
            ? keys[0]
            : event.key === "End"
              ? keys.at(-1)
              : null;
    if (next) {
      event.preventDefault();
      document.getElementById(`tab-${next}`).focus();
      selectProfile(next);
    }
  });
}
for (const key of keys) {
  const image = new Image();
  image.src = `img/portraits/erika-${key}.webp`;
}
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((element) => observer.observe(element));
  document.querySelector(".portfolio").classList.add("is-ready");
}

const initialProfile = new URL(location.href).searchParams.get("perfil");
const initialSelection = initialProfile === "fisioterapia"
  ? selectProfile(initialProfile)
  : loadPortrait(portrait.src);

// Vertical movement keeps scrolling the page; only a clear horizontal gesture switches.
const scene = document.querySelector(".portrait-scene");
let gesture;
scene.addEventListener("pointerdown", (event) => {
  if (!event.isPrimary || event.button !== 0) return;
  gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
  scene.setPointerCapture(event.pointerId);
});
scene.addEventListener("pointerup", (event) => {
  if (!gesture || gesture.id !== event.pointerId) return;
  const dx = event.clientX - gesture.x;
  const dy = event.clientY - gesture.y;
  gesture = null;
  if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
  const current = document.querySelector(".portfolio").dataset.profile;
  const next = (keys.indexOf(current) + (dx < 0 ? 1 : -1) + keys.length) % keys.length;
  selectProfile(keys[next]);
});
scene.addEventListener("pointercancel", () => (gesture = null));
scene.addEventListener("lostpointercapture", () => (gesture = null));

async function enterPage() {
  const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await Promise.all([
    Promise.race([initialSelection, pause(1400)]),
    pause(reducedMotion.matches ? 0 : 700),
  ]);
  document.documentElement.classList.remove("booting");
  document.documentElement.classList.add("page-entered");
}
enterPage();
