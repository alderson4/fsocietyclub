function search() {
  const query = document.getElementById("searchBox").value.toLowerCase().trim();

  if (/کالی|kali/.test(query)) {
    window.location.href = "kali.html";
  } else if (/امنیت|nmap|انمپ/.test(query)) {
    window.location.href = "security.html";
  } else if (/فیشینگ|phishing/.test(query)) {
    window.location.href = "phishing.html";
  } else {
    alert("نتیجه‌ای یافت نشد. لطفاً دوباره تلاش کنید.");
  }
}

function delayedNav(event) {
  event.preventDefault();
  const link = event.currentTarget.getAttribute('href');
  setTimeout(() => {
    window.location.href = link;
  }, 1000);
}

function filterCards() {
  const input = document.getElementById("searchBox").value.toLowerCase().trim();
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
