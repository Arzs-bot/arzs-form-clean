
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
      fetch("https://script.google.com/macros/s/AKfycbx-7cBRkusyT0y0X4fpZ2QxJCFAcdTjxZZf5XODmPYxQdHXIN6JtsrW5hDjlA81UD6YzQ/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      form.reset();
      successMsg.style.display = "block";
    }
  });
});
