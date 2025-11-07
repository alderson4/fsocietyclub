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
