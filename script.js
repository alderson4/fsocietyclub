// نمایش نوتیفیکیشن گرافیکی بالا
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

// بارگذاری اطلاعات کاربر
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

// باز و بسته کردن منوی کاربری
function toggleDropdown() {
  const dropdown = document.getElementById("dropdown-content");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// فیلتر کارت‌ها بر اساس جستجو
function filterCards() {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    const keywords = card.getAttribute("data-keywords")?.toLowerCase() || "";
    if (text.includes(input) || keywords.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// افزودن آیتم به علاقه‌مندی‌ها با نوتیفیکیشن
function addToFavorites(link) {
  const user = JSON.parse(localStorage.getItem("fsociety_user"));
  if (!user || !user.username || !user.email || !user.password) {
    showNotification("⚠️ برای افزودن به علاقه‌مندی‌ها ابتدا ثبت‌نام کنید.");
    return;
  }

  let favorites = JSON.parse(localStorage.getItem("fsociety_favorites")) || [];
  if (!favorites.includes(link)) {
    favorites.push(link);
    localStorage.setItem("fsociety_favorites", JSON.stringify(favorites));
    showNotification("✅ آیتم به علاقه‌مندی‌ها افزوده شد!");
  } else {
    showNotification("⚠️ این آیتم قبلاً در علاقه‌مندی‌ها بوده.");
  }
}

// خروج از حساب کاربری
function logoutUser() {
  localStorage.removeItem("fsociety_user");
  localStorage.removeItem("fsociety_favorites");
  window.location.href = "index.html";
}

// اجرای بارگذاری هنگام ورود
window.onload = loadUserInfo;
