
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
      console.log("🟢 正在發送 POST 資料至 Apps Script：", data);
      fetch("https://script.google.com/macros/s/AKfycbx-xxxx/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      console.log("✅ POST 已送出（no-cors 無回應）");
      form.reset();
      successMsg.style.display = "block";
    }
  });
});
