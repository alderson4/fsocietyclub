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
        <p><a href="favorites.html" style="color:#0f0;">رفتن به علاقه‌مندی‌ها</a></p>
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
    if (text.includes(input) || keywords.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function addToFavorites(link) {
  const user = JSON.parse(localStorage.getItem("fsociety_user"));
  if (!user || !user.username || !user.email || !user.password) {
    alert("برای افزودن به علاقه‌مندی‌ها ابتدا ثبت‌نام کنید.");
    return;
  }

  let favorites = JSON.parse(localStorage.getItem("fsociety_favorites")) || [];
  if (!favorites.includes(link)) {
    favorites.push(link);
    localStorage.setItem("fsociety_favorites", JSON.stringify(favorites));
    alert("آیتم به علاقه‌مندی‌ها افزوده شد!");
  } else {
    alert("این آیتم قبلاً در علاقه‌مندی‌ها بوده.");
  }
}

window.onload = loadUserInfo;
