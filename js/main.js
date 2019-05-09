$(function () {
    
    "use strict";
	 /* smooth scroll
  -------------------------------------------------------*/
	  $.scrollIt({

		easing: 'swing',      // the easing function for animation
		scrollTime: 900,       // how long (in ms) the animation takes
		activeClass: 'active', // class given to the active nav element
		onPageChange: null,    // function(pageIndex) that is called when page is changed
		topOffset: -70,
		upKey: 38,                // key code to navigate to the next section
        downKey: 40          // key code to navigate to the previous section

	  });
	
	 var win = $(window);
           
  
    win.on("scroll", function () {
      var wScrollTop  = $(window).scrollTop();    
        
        if (wScrollTop > 100) {
            $(".navbar").addClass("navbar-colored");
        } else {
            $(".navbar").removeClass("navbar-colored");
        }
    });
	
	/* close navbar-collapse when a  clicked */
    $(".navbar-nav a").not('.dropdown-toggle').on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });
	
	/* close navbar-collapse when a  clicked */
    $('.dropdown').on('click', function () {
        $(this).toggleClass("show");
    });
	
	/* scroll-top-btn */
	var  scrollButton = $('.scroll-top-btn .fa');
    win.on('scroll', function () {
        if ($(this).scrollTop() >= 700) {  
            scrollButton.show();
        } else {
            scrollButton.hide();
        }
    });
	
    /* Click On scroll-top-btn */ 
    scrollButton.on('click', function () {
        $('html,body').animate({ scrollTop : 0 }, 1200);
    });
	
	/* wow */
	new WOW().init();
	
	/* counter */
	$('.count').counterUp({
        delay: 20,
        time: 1500
    });
	
	/* tabs in price-area section */
	$('.price-area ul.tabs li').on('click', function(){
		var myID = $(this).attr('id');
		$(this).addClass('active').siblings().removeClass('active');
		$('#' + myID + '-content').fadeIn(800).siblings().hide();
	});
	
	$('.price-area-2 ul.tabs li').on('click', function(){
		var myID = $(this).attr('id');
		$(this).addClass('active').siblings().removeClass('active');
		$('#' + myID + '-content').fadeIn(800).siblings().hide();
	});
     
	/* faqs section */
    $('.faqs .box h6').on("click", function (){
		$(this).toggleClass('blue orange').siblings().removeClass('orange').addClass('blue');
        $(this).next().slideToggle(500);
		$(".faqs .box p").not($(this).next()).slideUp(500); 
    });
	
	 $('.faqs-2 .box h6').on("click", function (){
		$(this).toggleClass('blue orange').siblings().removeClass('orange').addClass('blue');
        $(this).next().slideToggle(500);
		$(".faqs-2 .box p").not($(this).next()).slideUp(500); 
    });
	
	$('.faqs-3 .box h6').on("click", function (){
		$(this).toggleClass('green blue').siblings().removeClass('blue').addClass('green');
        $(this).next().slideToggle(500);
		$(".faqs-3 .box p").not($(this).next()).slideUp(500); 
    });
 
	/* vision-area */
    $('.vision-area .owl-carousel').owlCarousel({
	    items: 1,
        loop: true,
        margin: 30,
        autoplay: false,
        autoplayTimeout: 2800,
        autoplayHoverPause: true,
        smartSpeed: 650,
	    dotsContainer: '.vision-dots'
    });
	
	/* how-work-2 */
    $('.how-work-2 .owl-carousel').owlCarousel({
	    items: 1,
        loop: true,
        margin: 30,
        autoplay: false,
        autoplayTimeout: 2800,
        autoplayHoverPause: true,
        smartSpeed: 650,
	    dotsContainer: '.how-dots'
    });
	
	/* testimonials */
	$('.testimonials .owl-carousel').owlCarousel({
	    items: 1,
        loop: true,
        margin: 0,
        autoplay: false,
        autoplayTimeout: 2800,
        autoplayHoverPause: true,
        smartSpeed: 700,
		mouseDrag: false,
		animateIn: 'fadeIn'
    });
	
	/* testimonials-2 */
	$('.testimonials-2 .owl-carousel').owlCarousel({
	    items: 1,
        loop: true,
        margin: 80,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 700,
		mouseDrag: true
    });
	
	/*  leadership-area section  */
    win.on('scroll', function () {
        $(".skills-progress span").each(function () {
            var bottom_of_object = 
            $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = 
            $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if(bottom_of_window > bottom_of_object) {
                $(this).css({
                  width : myVal
                });
            }
        });
    });
	
	/* contact-area section */
    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });
	 	 
	 
});



$(window).on("load",function (){
	
     $('.load-wrapp').fadeOut(100);
      
});

let paso1 = "Recibiras un email del Tecnológico de Monterrey invitándote a descargar la aplicación Blockcerts en tu celular y crear una cuenta como nuevo usuario."
let advertencia1 = "Importante: No usar la computadora, hacerlo desde tu celular."
let paso2 = "En tu aplicación Blockcerts tienes que crear una cuenta como nuevo usuario. Al crear un nuevo usuario, se generará una “frase de contraseña” con opciones de enviar esta frase a tu email, guardarlo en tu celular o escribirlo a mano, por razones de seguridad tienes que elegir una opción."
let advertencia2 = "Importante: La “frase de contraseña” es tu “key privada”, deberás guardarla en un lugar seguro ya que es la única forma de acceder a tus certificados."
let paso3 = "Cuando hayas creado tu cartera digital Blockcerts, el segundo paso es hacer clic en el vínculo verde del primer correo electrónico para añadir al “Tecnológico de Monterrey” como emisor en la cartera digital Blockcerts."
let advertencia3 = "Importante: No usar la computadora. No hacer clic en el vínculo sin haber completado el paso No. 1. Este link sólo puede usarse una vez."
let paso4 = "Cuando hagas clic en el vínculo de color verde en el primer correo electrónico, el emisor se añadirá a tu cartera digital automáticamente."
let advertencia4 = "Nota: Si el emisor no es añadido automáticamente, te va a enviar a una página web con instrucciones para añadir al emisor manualmente. En este caso ver el paso No. 8."
let paso5 = "Una vez concluidos los pasos anteriores, recibirás tu certificado digital en un segundo correo electrónico.\nCuando lo recibas, haz clic en el vínculo de color verde para importar tu certificado a tu cartera digital Blockcerts. Adjunto a este email encontrarás tu certificado en formato .JSON, por favor guárdalo en un lugar seguro."
let paso6 = "Ahora eres dueño de tu certificado, disfruta plenamente de la verificación independiente. Puedes compartirlo con un tercero, verificar la autenticidad instantáneamente o añadirlo a tu social media favorita."
let advertencia6 = "Nota: Certificado a modo de ejemplo."
let paso7 = "El verificador va a revisar el blockchain para comprobar la autenticidad de este documento."
let paso8 = "Si al hacer clic en el vinculo verde en el primer correo electrónico para añadir al emisor a la cartera digital, te lleva a una página de internet; en la página de internet se te indicará que copies tu URL y un código a tu cartera digital manualmente."
let advertencia8 = "Nota: Después de que añadas al Tecnológico de Monterrey como emisor en tu cartera digital, te enviaremos tu certificado en un segundo correo electrónico. Ver paso No. 5."
let index = 1

function showText(text, warning, img, v) {
    document.getElementById("texto-pasos").innerText = text
    document.getElementById("advertencia-pasos").innerText = warning
    document.getElementById("pasos-image").src = img
    if (index != v) {
        if (v == 1)
            document.getElementById("pasos-video").src = "https://www.youtube.com/embed/4z7mEolwvI4"
        else
            document.getElementById("pasos-video").src = "https://www.youtube.com/embed/tgbNymZ7vqY"
    }
}