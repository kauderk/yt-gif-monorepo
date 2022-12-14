/* Theme Name: Borial | Responsive Bootstrap Template
   Author: Themesdesign
   Version: 1.0.0
   File Description: Main JS file of the template
*/

$(window).on('load', function () {
  $('.owl-carousel').owlCarousel({
    items: 1,
    autoPlay: true,
    autoPlaySpeed: 5000,
    autoPlayTimeout: 5000,
    autoplayHoverPause: true,
  });
});

!(function ($) {
  const Borial = function () {};

  (Borial.prototype.initStickyMenu = function () {
    // Add scroll class
    $(window).scroll(function () {
      const scroll = $(window).scrollTop();

      if (scroll >= 50) {
        $('.sticky').addClass('nav-sticky');
      } else {
        $('.sticky').removeClass('nav-sticky');
      }
    });
  }),
    (Borial.prototype.initSmoothLink = function () {
      // Smooth scroll
      $('.navbar-nav a').on('click', function (event) {
        const $anchor = $(this);
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop: $($anchor.attr('href')).offset().top - 0,
            },
            1500,
            'easeInOutExpo'
          );
        event.preventDefault();
      });
    }),
    (Borial.prototype.initTestimonials = function () {
      // Owl Carousel
      $('.owl-carousel').owlCarousel({
        stopOnHover: true,
        navigation: false,
        paginationSpeed: 1000,
        goToFirstSpeed: 2000,
        singleItem: true,
        autoHeight: true,
      });
    }),
    (Borial.prototype.initScrollspy = function () {
      // Scrollspy
      $('.navbar-nav').scrollspy({
        offset: 50,
      });
    }),
    (Borial.prototype.initPortfolioFilter = function () {
      // Portfolio filter
      $(window).on('load', function () {
        const $container = $('.projects-wrapper');
        const $filter = $('#filter');
        // Initialize isotope
        $container.isotope({
          filter: '*',
          layoutMode: 'masonry',
          animationOptions: {
            duration: 750,
            easing: 'linear',
          },
        });

        // Filter items when filter link is clicked
        $filter.find('a').on('click', function () {
          const selector = $(this).attr('data-filter');
          $filter.find('a').removeClass('active');
          $(this).addClass('active');
          $container.isotope({
            filter: selector,
            animationOptions: {
              animationDuration: 750,
              easing: 'linear',
              queue: false,
            },
          });
          return false;
        });
      });
    }),
    (Borial.prototype.initMagnificPopup = function () {
      // Magnific Popup
      $('.mfp-image').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-fade',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1],
        },
      });
    }),
    (Borial.prototype.initContact = function () {
      // Contact Form
      $('#contact-form').submit(function () {
        const action = $(this).attr('action');

        $('#message').slideUp(750, function () {
          $('#message').hide();

          $('#submit').before('').attr('disabled', 'disabled');

          $.post(
            action,
            {
              name: $('#name').val(),
              email: $('#email').val(),
              comments: $('#comments').val(),
            },
            function (data) {
              document.getElementById('message').innerHTML = data;
              $('#message').slideDown('slow');
              $('#cform img.contact-loader').fadeOut('slow', function () {
                $(this).remove();
              });
              $('#submit').removeAttr('disabled');
              if (data.match('success') != null) $('#cform').slideUp('slow');
            }
          );
        });

        return false;
      });
    }),
    (Borial.prototype.init = function () {
      this.initStickyMenu();
      this.initSmoothLink();
      this.initTestimonials();
      this.initScrollspy();
      this.initPortfolioFilter();
      this.initMagnificPopup();
      this.initContact();
    }),
    // init
    ($.Borial = new Borial()),
    ($.Borial.Constructor = Borial);
})(window.jQuery),
  // initializing
  (function ($) {
    $.Borial.init();
  })(window.jQuery);
