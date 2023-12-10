const app = {
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector('#pages').children;
    thisApp.navLinks = document.querySelectorAll('.nav a');

    const idFromHash = window.location.hash.replace('#', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },
  activatePage: function (pageId) {
    const thisApp = this;

    for (let page of thisApp.pages) {
      page.classList.toggle('active', page.id == pageId);
    }

    for (let link of thisApp.navLinks) {
      link.classList.toggle('active', link.getAttribute('href') == pageId);
    }
  },
  initMenu: function () {
    const thisApp = this;

    thisApp.menu = document.querySelector('.burger');
    thisApp.navigation = document.querySelector('.navigation');
    thisApp.navLinks = document.querySelectorAll('.nav__link');

    thisApp.menu.addEventListener('click', function (event) {
      event.preventDefault();

      thisApp.navigation.classList.toggle('active');
    });

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        event.preventDefault();

        thisApp.navigation.classList.remove('active');
      });
    }
  },
  initAppearEffect: function () {
    const thisApp = this;
    thisApp.firstWord = document.querySelector('.first-word');
    thisApp.secondWord = document.querySelector('.second-word');

    function toggleSpans() {
      thisApp.firstWord.classList.toggle('hidden');
      thisApp.secondWord.classList.toggle('hidden');
    }

    toggleSpans();
  },
  initReviews: function () {
    const stargetter = function (starso) {
      if (starso === 5) {
        return '<span>&#9733;</span>&nbsp;<span>&#9733;</span>&nbsp;<span>&#9733;</span>&nbsp;<span>&#9733;</span>&nbsp;<span>&#9733;</span>';
      } else if (starso === 4) {
        return '<span>&#9733;</span>&nbsp;<span>&#9733;</span>&nbsp;<span>&#9733;</span>&nbsp;<span>&#9733;</span>';
      } else if (starso === 3) {
        return '<span>&#9733;</span>&nbsp;<span>&#9733;</span>&nbsp;<span>&#9733;</span>';
      } else if (starso === 2) {
        return '<span>&#9733;</span>&nbsp;<span>&#9733;</span>';
      } else if (starso === 1) {
        return '&#9734';
      } else if (starso === 0) {
        return '&nbsp;';
      } else {
        return;
      }
    };
    const reviewbox = document.getElementById('reviews');
    // eslint-disable-next-line
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -33.866, lng: 151.196 },
      zoom: 15,
    });

    const request = {
      placeId: 'ChIJo_Ixgw4fv0cRJtOA6zsP09Y',
      fields: [
        'name',
        'formatted_address',
        'place_id',
        'geometry',
        'reviews',
        'icon',
      ],
    };

    // eslint-disable-next-line
    var service = new google.maps.places.PlacesService(map);

    service.getDetails(request, function (place, status) {
      console.log(place.reviews);
      console.log('status:', status);
      //
      let i;
      for (i = 0; i < place.reviews.length; i++) {
        reviewbox.innerHTML += `
        <div class="column">
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
  init: function () {
    const thisApp = this;

    thisApp.initPages();
    thisApp.initMenu();
    setInterval(() => thisApp.initAppearEffect(), 3000);
  },
};

// eslint-disable-next-line
function initGoogleMaps() {
  app.initReviews();
}

app.init();
