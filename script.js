function showNotification(message) {
  const box = document.getElementById("notification");
  if (!box) return;
  box.innerText = message;
  box.style.display = "block";
  box.style.opacity = "1";
  setTimeout(() => {
    box.style.opacity = "0";
    setTimeout(() => {
      box.style.display = "none";
    }, 400);
  }, 3000);
}

function loadUserInfo() {
  const user = JSON.parse(localStorage.getItem("fsociety_user"));
  const authBar = document.getElementById("authBar");
  const userDropdown = document.getElementById("userDropdown");
  const dropdownContent = document.getElementById("dropdown-content");

  if (user && user.username && user.email && user.password) {
    if (authBar) authBar.style.display = "none";
    if (userDropdown) userDropdown.style.display = "block";
    if (dropdownContent) {
      dropdownContent.innerHTML = `
        <p>نام کاربری: ${user.username}</p>
        <p>ایمیل: ${user.email}</p>
        <p>رمز عبور: ${user.password}</p>
        <div class="favorites-button">
          <a href="favorites.html">رفتن به علاقه‌مندی‌ها</a>
        </div>
        <div class="logout-button">
          <button onclick="logoutUser()">🚪 خروج از حساب کاربری</button>
        </div>
      `;
    }
  }
}

function toggleDropdown() {
  const dropdown = document.getElementById("dropdown-content");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function filterCards() {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    const keywords = card.getAttribute("data-keywords")?.toLowerCase() || "";
    card.style.display = (text.includes(input) || keywords.includes(input)) ? "block" : "none";
  });
}

function addToFavorites(link) {
  const user = JSON.parse(localStorage.getItem("fsociety_user"));
  if (!user || !user.username || !user.email || !user.password) {
    showNotification("⚠️ برای افزودن به علاقه‌مندی‌ها ابتدا ثبت‌نام کنید.");
    return;
  }

  const card = event.target.closest(".card");
  const title = card.querySelector(".card-text").innerText;
  const image = card.querySelector(".card-image").getAttribute("src");
  const date = card.querySelector(".card-date")?.innerText.split(": ")[1] || "نامشخص";

  let favorites = JSON.parse(localStorage.getItem("fsociety_favorites")) || [];

  if (!favorites.some(f => f.link === link)) {
    favorites.push({ link, title, image, date });
    localStorage.setItem("fsociety_favorites", JSON.stringify(favorites));
    showNotification("✅ آیتم به علاقه‌مندی‌ها افزوده شد!");
  } else {
    showNotification("⚠️ این آیتم قبلاً در علاقه‌مندی‌ها بوده.");
  }
}

function removeFavorite(link) {
  let favorites = JSON.parse(localStorage.getItem("fsociety_favorites")) || [];
  favorites = favorites.filter(f => f.link !== link);
  localStorage.setItem("fsociety_favorites", JSON.stringify(favorites));
  showNotification("❌ آیتم حذف شد");
  loadFavorites();
}

function loadFavorites() {
  const container = document.getElementById("favoritesContainer");
  if (!container) return;
  container.innerHTML = "";
  const favorites = JSON.parse(localStorage.getItem("fsociety_favorites")) || [];

  if (favorites.length === 0) {
    container.innerHTML = `
      <div class="card">
        <p class="card-text">هنوز هیچ دوره‌ای به علاقه‌مندی‌ها اضافه نشده</p>
        <p class="card-date">برای افزودن دوره، از دکمه ❤️ در صفحه دوره‌ها استفاده کنید</p>
      </div>
    `;
    return;
  }

  favorites.forEach(course => {
    const card = document.createElement("div");
    card.className = "card card-click";
    card.setAttribute("data-link", course.link);
    card.innerHTML = `
      <img src="${course.image}" alt="${course.title}" class="card-image">
      <p class="card-text">${course.title}</p>
      <p class="card-date">تاریخ انتشار: ${course.date}</p>
      <div class="card-actions">
        <a href="${course.link}" class="auth-button">مشاهده دوره</a>
        <button class="remove-btn">🗑️ حذف</button>
      </div>
    `;
    container.appendChild(card);
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const card = e.target.closest(".card");
      const link = card.getAttribute("data-link");
      removeFavorite(link);
    });
  });
}

function logoutUser() {
  localStorage.removeItem("fsociety_user");
  localStorage.removeItem("fsociety_favorites");
  window.location.href = "index.html";
}

window.onload = function () {
  loadUserInfo();
  if (document.getElementById("favoritesContainer")) {
    loadFavorites();
  }
};
