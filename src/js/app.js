const app = {
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector("#pages").children;
    thisApp.navLinks = document.querySelectorAll(".nav a");

    const idFromHash = window.location.hash.replace("#/", "");

    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener("click", function (event) {
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute("href").replace("#", "");

        thisApp.activatePage(id);

        window.location.hash = "#/" + id;

        window.scrollTo({
          top: 0,
        });
      });
    }
  },
  activatePage: function (pageId) {
    const thisApp = this;

    for (let page of thisApp.pages) {
      page.classList.toggle("active", page.id == pageId);
    }

    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        "active",
        link.getAttribute("href") == "#" + pageId
      );
    }
  },
  initMenu: function () {
    const thisApp = this;

    thisApp.menu = document.querySelector(".burger");
    thisApp.navigation = document.querySelector(".navigation");
    thisApp.navLinks = document.querySelectorAll(".nav__link");

    thisApp.menu.addEventListener("click", function (event) {
      event.preventDefault();

      thisApp.navigation.classList.toggle("active");
    });

    for (let link of thisApp.navLinks) {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        thisApp.navigation.classList.remove("active");
      });
    }
  },
  initAppearEffect: function () {
    const thisApp = this;
    thisApp.firstWord = document.querySelector(".first-word");
    thisApp.secondWord = document.querySelector(".second-word");

    function toggleSpans() {
      thisApp.firstWord.classList.toggle("hidden");
      thisApp.secondWord.classList.toggle("hidden");
    }

    toggleSpans();
  },
  initReviews: function () {
    const stargetter = function (starso) {
      if (starso === 5) {
        return "<span>&#9733;</span>&nbsp;<span>&#9733;</span>&nbsp;<span>&#9733;</span>&nbsp;<span>&#9733;</span>&nbsp;<span>&#9733;</span>";
      } else if (starso === 4) {
        return "<span>&#9733;</span>&nbsp;<span>&#9733;</span>&nbsp;<span>&#9733;</span>&nbsp;<span>&#9733;</span>";
      } else if (starso === 3) {
        return "<span>&#9733;</span>&nbsp;<span>&#9733;</span>&nbsp;<span>&#9733;</span>";
      } else if (starso === 2) {
        return "<span>&#9733;</span>&nbsp;<span>&#9733;</span>";
      } else if (starso === 1) {
        return "&#9734";
      } else if (starso === 0) {
        return "&nbsp;";
      } else {
        return;
      }
    };
    const reviewbox = document.getElementById("reviews");
    // eslint-disable-next-line
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -33.866, lng: 151.196 },
      zoom: 15,
    });

    const request = {
      placeId: "ChIJo_Ixgw4fv0cRJtOA6zsP09Y",
      fields: [
        "name",
        "formatted_address",
        "place_id",
        "geometry",
        "reviews",
        "icon",
      ],
    };

    // eslint-disable-next-line
    var service = new google.maps.places.PlacesService(map);

    service.getDetails(request, function (place) {
      let i;
      for (i = 0; i < place.reviews.length; i++) {
        reviewbox.innerHTML += `
        <div class="column swiper-slide">
        <div class="reviewauthor">

            <div class="profile">
              <a class="author" target="_blank" href="${
  place.reviews[i].author_url
}">
                  <img class="photo" src="${
  place.reviews[i].profile_photo_url
}" alt="Profile Photo">
                  <p class="authortitle">${place.reviews[i].author_name}</p>
              </a>
  
              <a class="tag" target="_blank" href="${
  place.reviews[i].author_url
}">
                  <img class="google-ico" src="../images/google.svg" alt="Google Logo">
              </a>
            </div>

            <div class="rating">
               <div class="stars">
                    ${stargetter(place.reviews[i].rating)}
                </div>
                <div class="time-descr">${
  place.reviews[i].relative_time_description
}</div>
            </div>

            

        </div>
        <div class="reviewtext matchy">
            ${place.reviews[i].text}
        </div>

    </div>`;
      }
    });
  },
  initSwiper: function () {
    //eslint-disable-next-line
    const swiper = new Swiper(".swiper", {
      // Optional parameters
      spaceBetween: 5,
      loop: true,

      pagination: {
        el: ".swiper-pagination",
      },
      autoplay: {
        delay: 3000,
      },
      slidesPerView: 1,

      breakpoints: {
        700: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1020: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
    });
  },
  initContactForms: function () {
    const thisApp = this;

    thisApp.mainContactForm = document.getElementById("mainContactForm");
    thisApp.detailsContactForm = document.getElementById("detailsContactForm");

    thisApp.mainFormContainer = document.querySelector(".about-content__form");
    thisApp.detaildFormContainer = document.querySelector(".contact-form");

    const successAlert =
      "<div class=\"success-alert\">Vielen Dank für Ihr Formular! Wir haben es erhalten und melden uns bald bei Ihnen.</div>";
    const errorAlert =
      "<div class=\"error-alert\">Es tut uns leid, aber ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.</div>";

    const sendForm = async (form, endpoint) => {
      try {
        let formData = new FormData(form);
        let response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Fehler beim Senden des Formulars");
        }
        const container =
          form === thisApp.mainContactForm
            ? thisApp.mainFormContainer
            : thisApp.detaildFormContainer;

        container.classList.add("sended");
        container.innerHTML = successAlert;
        form.reset();
      } catch (error) {
        console.error(error);

        const container =
          form === thisApp.mainContactForm
            ? thisApp.mainFormContainer
            : thisApp.detaildFormContainer;

        container.classList.add("sended");
        container.innerHTML = errorAlert;
      }
    };

    // Post main contact form to /php/send-main-contact-form.php on submit
    thisApp.mainContactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await sendForm(
        thisApp.mainContactForm,
        "/php/send-main-contact-form.php"
      );
    });

    // Post details contact form to /php/send-details-contact-form.php on submit
    thisApp.detailsContactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await sendForm(
        thisApp.detailsContactForm,
        "/php/send-details-contact-form.php"
      );
    });
  },
  initUpdateNumbers: function () {
    function updateNumbers() {
      const scrollPosition = window.scrollY || window.pageYOffset;
      const sectionPosition =
        document.querySelector(".statistics").offsetTop - 600;

      if (scrollPosition >= sectionPosition) {
        const counters = document.querySelectorAll(".value");
        const speed = 200;

        counters.forEach((counter) => {
          const animate = () => {
            const value = +counter.getAttribute("akhi");
            const data = +counter.innerText;

            const time = value / speed;
            if (data < value) {
              counter.innerText = Math.ceil(data + time);
              setTimeout(animate, 75);
            } else {
              counter.innerText = value;
            }
          };

          animate();
        });
      }
    }

    window.addEventListener("scroll", updateNumbers);
  },
  initCookiesPermit: function () {
    const thisApp = this;
    thisApp.banner = document.getElementById("cookie-banner");

    let cookiesPermited =
      localStorage.getItem("cookiesPermited") === "true" || false;

    function acceptCookies() {
      cookiesPermited = true;
      localStorage.setItem("cookiesPermited", cookiesPermited);
      thisApp.banner.style.display = "none";
    }

    const acceptButton = document.getElementById("cookie-button");
    acceptButton.addEventListener("click", acceptCookies);
  },
  init: function () {
    const thisApp = this;

    document.addEventListener("DOMContentLoaded", function () {
      thisApp.initPages();
      thisApp.initMenu();
      thisApp.initContactForms();
      setInterval(() => thisApp.initAppearEffect(), 3000);
      setTimeout(() => {
        thisApp.initSwiper();
      }, 1000);
      thisApp.initUpdateNumbers();
      thisApp.initCookiesPermit();
    });
  },
};

// eslint-disable-next-line
function initGoogleMaps() {
  app.initReviews();
}

app.init();
