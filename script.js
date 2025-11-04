function search() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  if (query.includes("کالی")) {
    window.location.href = "kali.html";
  } else if (query.includes("امنیت")) {
    window.location.href = "security.html";
  } else if (query.includes("فیشینگ")) {
    window.location.href = "phishing.html";
  } else {
    alert("نتیجه‌ای یافت نشد!");
  }
}
