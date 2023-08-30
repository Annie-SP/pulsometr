// скрипт для slick
$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1000,
        //adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left-arrow.png"> </button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right-arrow.png"> </button>',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                //dots: true,
                arrows: false
              }
            },
            {
              breakpoint: 400,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
              }
            },
        ]
    });


  //переключение между табами , с помощью джквері
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });




//переключение вперед/назад
function toggleSlider (item) {
  $(item).each(function(i) {
    $(this).on('click', function(e){
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    })
  });
}

toggleSlider('.catalog-item__link');
toggleSlider('.catalog-item__backlink');


//modal-windows
$('[data-modal=consultation]').on('click', function(){
  $('.overflow, #consultation').fadeIn('slow');
});
$('.modal__close').on('click', function(){
  $('.overflow, #consultation, #order, #thanks').fadeOut('slow');
});
$('.button_catalog').each(function(i){
  $(this).on('click', function(){
    $('#order .modal__descr_order').text($('.catalog-item__subtitle').eq(i).text());
    $('.overflow, #order').fadeIn('slow');
  });
});

//plagin-validation

  function validateForm(form){
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages:{
        name:"Введите ваше имя",
        phone: "Введите номер телефона",
        email: {
          required: "Введите вашу пошту",
          email: "Ваша пошта должна быть в формате: name@domain.com"
        }
      }
    });
  };

      validateForm('#consultation form');
      validateForm('#consultation-form');
      validateForm('#order form');

 //plagin mask for number-phone
  $('input[name=phone]').mask("+38 (999) 999-99-99");

   // skript for mail
   $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overflow, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});

//skript for scroll
  $(window).scroll(function(){
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });
  
  $("a[href=#up]").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});

  new WOW().init();


});
// skript for tiny

// window.addEventListener('DOMContentLoaded', () => {
//   const catalogContent = document.querySelector('.catalog__content'),
//         catalogItem = document.querySelectorAll('.catalog-item'),
//         catalogLink = document.querySelector('.catalog-item__link');

//   catalogLink.addEventListener('click', () => {
//       catalogLink.classList.toggle('catalog-item__link-active');
//       catalogContent.classList.toggle('catalog__content_active');
//   });

//   catalogItem.forEach(item => {
//       item.addEventListener('click', () => {
//           catalogLink.classList.toggle('catalog-item__link-active');
//           catalogContent.classList.toggle('catalog__content_active');
//       });
//   });
// });


// const catalogContent = document.querySelector('.catalog-item__content');
// const catalogList = document.querySelector('.catalog-item__list');
// const catalogLink = document.querySelector('.catalog-item__link');

// catalogLink.addEventListener('click', () => {
//   if (catalogContent.classList.contains('catalog-item__content_active'))
//    {
//       catalogContent.classList.remove('catalog-item__content_active');
//       catalogList.classList.add('catalog-item__list_active');
//   }
//   else {
//     catalogContent.classList.add('catalog-item__content_active');
//     catalogList.classList.remove('catalog-item__list_active');  
// }
// });