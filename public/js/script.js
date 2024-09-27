const previewImgBox = document.getElementById("listing-image-box");
const listingImageInput = document.getElementById("listing-image");
const listingImagePreview = document.getElementById("listing-image-preview");
const editForm = document.getElementById("edit-form");
// const btnSubmitReview = document.getElementById('btn-submit-review');
// const validationTextarea = document.getElementById('validationTextarea');

console.log("i am from frontend");

listingImageInput.addEventListener("change", (e) => {
  listingImagePreview.src = e.target.value;
});

setInterval(() => {
  if (window.innerWidth < 800) {
    document.getElementById("listing-image-box").classList.remove("col-4");
    document.getElementById("edit-form").classList.add("offset-2");
    console.dir(document);
  } else {
    document.getElementById("listing-image-box").classList.add("col-4");
    document.getElementById("edit-form").classList.remove("offset-2");
  }
}, 1000);

// Form validation - Bootstrap 
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
// -----------
// Flash message logic
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
};

const alertTrigger = document.getElementById("liveAlertBtn");
if (alertTrigger) {
  alertTrigger.addEventListener("click", () => {
    appendAlert("Nice, you triggered this alert message!", "success");
  });
}
// ---------------
