
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("arzsContactForm");
  const successMsg = document.getElementById("successMsg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      if (data[key]) {
        data[key] += ", " + value;
      } else {
        data[key] = value;
      }
    });

    const fileInput = document.getElementById("uploadFile");
    if (fileInput && fileInput.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = function () {
        data.uploadFile = reader.result;
        sendForm(data);
      };
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      sendForm(data);
    }

    function sendForm(data) {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }

  console.log("🟢 正在發送 FormData 至 Apps Script...");

  fetch("https://script.google.com/macros/s/AKfycbx-7cBRkusyT0y0X4fpZ2QxJCFAcdTjxZZf5XODmPYxQdHXIN6JtsrW5hDjlA81UD6YzQ/exec", {
    method: "POST",
    mode: "no-cors", // 必須啟用，避免 CORS
    body: formData
  });

  console.log("✅ 表單已送出（no-cors 無法顯示回應）");
  form.reset();
  successMsg.style.display = "block";
}
  });
});
