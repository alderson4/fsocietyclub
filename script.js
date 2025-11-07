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

function toggleDropdown() {
  const dropdown = document.getElementById("dropdown-content");
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function loadUserInfo() {
  const user = JSON.parse(localStorage.getItem("fsociety_user"));
  if (user && user.username && user.email && user.password) {
    document.getElementById("userDropdown").style.display = "block";
    document.getElementById("dropdown-content").innerHTML = `
      <p>نام کاربری: ${user.username}</p>
      <p>ایمیل: ${user.email}</p>
      <p>رمز عبور: ${user.password}</p>
    `;
  }
}

window.onload = loadUserInfo;
