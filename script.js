
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

  console.log("🟢 正在發送 JSON 至 Proxy API...");

fetch("https://arzs-form-proxy.vercel.app/api/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
.then(() => {
  console.log("✅ 表單已送出");
  form.reset();
  successMsg.style.display = "block";
})
.catch((err) => {
  console.error("❌ 發送錯誤：", err);
  alert("❌ 表單送出失敗，請稍後再試");
});

});
