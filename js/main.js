document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".header__nav");

  // Открыте и закрытие бургер-меню
  burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    nav.classList.toggle("open");
    document.body.classList.toggle("body-hidden");
  });

  // Скрытие меню при нажатии на пункт меню
  nav.addEventListener("click", function (event) {
    if (event.target) {
      burger.classList.remove("active");
      nav.classList.remove("open");
      document.body.classList.remove("body-hidden");
    }
  });

  // Модальное окно
  const modal = document.querySelector(".modal");

  function createModal(imageSrc, text) {
    const modalWindow = document.createElement("div");
    modalWindow.classList.add("modal__window");

    modal.append(modalWindow);

    document.body.classList.add("body-hidden");

    const modalImage = document.createElement("img");
    modalImage.classList.add("modal__image");
    modalImage.src = imageSrc;

    const modalText = document.createElement("p");
    modalText.classList.add("modal__text");
    modalText.textContent = text;

    const modalButton = document.createElement("button");
    modalButton.classList.add("modal__btn", "btn", "btn-reset");
    modalButton.textContent = "Ок";
    modalButton.addEventListener("click", function () {
      document.body.classList.remove("body-hidden");
      modal.classList.remove("open");
      modalWindow.remove();
    });

    modalWindow.append(modalImage, modalText, modalButton);
    modal.classList.add("open");
  }

  // Маска для телефона
  // const element = document.querySelector("._phone");
  // const maskOptions = {
  //   mask: "+{7} (000) 000-00-00",
  // };
  // const mask = IMask(element, maskOptions);

  // Маска для телефона
  let inputsTel = document.querySelectorAll('input[type="tel"]');
  let im = new Inputmask('+7 (999) 999-99-99', { showMaskOnHover: false, clearIncomplete: true });
  im.mask(inputsTel);

  // Валидация и отправка формы на почту
  const form = document.getElementById("form");

  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    console.log(error);

    if (error === 0) {
      form.classList.add("_sending");

      let response = await fetch("./mail.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        let result = await response.json();
        console.log(result);
        // alert(result.info)
        createModal("./images/send_success.svg", "Заявка успешно отправлена");
        form.reset();
        form.classList.remove("_sending");
      } else {
        alert('Ошибка');
      }
    } else {
      // alert('Заполните правильно поля формы')
      createModal("./images/send_error.svg", "Заполните правильно поля формы");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }

    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  function checkedCheckbox() {
    const checkbox = document.querySelector(".checkbox__input");
    const formButton = document.querySelector(".form__btn");
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        formButton.removeAttribute("disabled");
      } else {
        formButton.setAttribute("disabled", "disabled");
      }
    });
  }

  checkedCheckbox();
});
