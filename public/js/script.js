const previewImgBox = document.getElementById("listing-image-box");
const listingImageInput = document.getElementById("listing-image");
const listingImagePreview = document.getElementById("listing-image-preview");
const editForm = document.getElementById("edit-form");

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

// FORM VALIDATION LOGIC -- Bootstrap
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
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