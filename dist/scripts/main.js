(function() {
  'use strict';

  function init() {
    jQuery('img.svg').each(function(i) {
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      jQuery.get(imgURL, function(data) {
        var $svg = jQuery(data).find('svg');
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);
      }, 'xml');
    });

    $('body').hbaLoadImages({
      attribute: 'img-src',
      onSuccess: function(source, element) {
        element.src = source;
      }
    });

    setTimeout(func, 100);
    setTimeout(bgImg, 100);

    setTimeout(function() {
      $('.select').selectpicker({
        style: 'select-control',
        size: 4
      });
    }, 800);

  }init();

  function bgImg() {
    $('.bg-img').each(function(){
      var $t = $(this),
          $data = $t.data('src');
      $t.css('background-image', 'url('+$data+')');
    })
  }

  function func() {
    $('body').addClass('ready')

    $('.back-to-top').on('click',function(){
      $("html, body").animate({ scrollTop: 0 },'slow');
    });

    //SLIDER
    $('.slider').each(function(){
      var t = $(this),
          nItem = t.children().length;

      if (nItem > 1){
        t.addClass('owl-carousel');
        t.owlCarousel({
          items: 1,
          loop: true,
          dots: true,
          nav: true,
          margin: 24,
          center: true,
          navText: ["<span class='icon-chevron-left'></span>","<span class='icon-chevron-right'></span>"],
          autoplay: true,
          autoplayTimeout: 8000,
          autoplaySpeed: 1200,
          animateIn: 'fadeIn',
          animateOut: 'fadeOut'
        })
      }
    });

    //SLIDER EXTRA SMALL
    function sliderXS() {
      var sliderS = $('.slider-xs');
      if ($(window).width() < 767) {
        sliderS.addClass('owl-carousel');
        sliderS.owlCarousel({
          // navText: ["<i class='fas fa-chevron-left'></i>","<i class='fas fa-chevron-right'></i>"],
          items: 1,
          loop: true,
          nav: false,
          dots: true,
          autoplay: true,
          responsive : {
            0 : {
              items: 1
            },
            480 : {
              items: 1
            }
          }
        });
      } else {
        sliderS.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        sliderS.find('.owl-stage-outer').children().unwrap();
      }
    }sliderXS();

    $('.inputfile').each(function() {
      var e = $(this),
          a = e.siblings("label");
      e.change(function() {
          console.log('jalan');
          var t = $(this).val().split("\\").pop();
          a.html('<i class="fa fa-file-o mr10"></i> ' + t), e.closest(".upload-file").addClass("has-file")
      })
    })

    $(window).scroll(function() {
      if ($(window).scrollTop() > $(window).height()/2) {
        $('.back-to-top').addClass('show');
      } else {
        $('.back-to-top').removeClass('show');
      }
      // mastParallax();
    });

    // FIXED MENU
    function fixedHeader() {
      if($('header').length > 0 && $(window).width() > 1025){
        var $header = $('#header'),
            $windowH = $(window).height(),
            $pos = $header.outerHeight();

        $(window).scroll(function(){
          var $top = $(window).scrollTop();
          if($top > $pos) {
            $header.addClass('fixed');
            // setTimeout(function(){
              $header.addClass('sticky');
            // }, 700)
          } else {
            // setTimeout(function(){
              $header.removeClass('sticky');
            // }, 700)
            $header.removeClass('fixed');
          }
          if($top == 0) {
          }
        })
      }else{
        $('header').removeClass('sticky');
        $('header').removeClass('fixed');
      }
    }fixedHeader();

    $('.header_menu_icon').click(function(){
      $('body').toggleClass('menu-open');
    })

    $('.has-sub').each(function(){
      var $t = $(this),
          $link = $t.find('.link');
      $link.click(function(){
        if($t.hasClass('sub-open')){
          $t.removeClass('sub-open');
        } else {
          $('.has-sub').removeClass('sub-open');
          $t.addClass('sub-open');
        }
      })
    })

    $(window).resize(function() {
      fixedHeader();
      // mastParallax();
      sliderXS();
    });

  }

})();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICBqUXVlcnkoJ2ltZy5zdmcnKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuICAgICAgdmFyICRpbWcgPSBqUXVlcnkodGhpcyk7XHJcbiAgICAgIHZhciBpbWdJRCA9ICRpbWcuYXR0cignaWQnKTtcclxuICAgICAgdmFyIGltZ0NsYXNzID0gJGltZy5hdHRyKCdjbGFzcycpO1xyXG4gICAgICB2YXIgaW1nVVJMID0gJGltZy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgIGpRdWVyeS5nZXQoaW1nVVJMLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgdmFyICRzdmcgPSBqUXVlcnkoZGF0YSkuZmluZCgnc3ZnJyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbWdJRCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignY2xhc3MnLCBpbWdDbGFzcyArICcgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoJ3htbG5zOmEnKTtcclxuICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xyXG4gICAgICB9LCAneG1sJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdib2R5JykuaGJhTG9hZEltYWdlcyh7XHJcbiAgICAgIGF0dHJpYnV0ZTogJ2ltZy1zcmMnLFxyXG4gICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHNvdXJjZSwgZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuc3JjID0gc291cmNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmMsIDEwMCk7XHJcbiAgICBzZXRUaW1lb3V0KGJnSW1nLCAxMDApO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICQoJy5zZWxlY3QnKS5zZWxlY3RwaWNrZXIoe1xyXG4gICAgICAgIHN0eWxlOiAnc2VsZWN0LWNvbnRyb2wnLFxyXG4gICAgICAgIHNpemU6IDRcclxuICAgICAgfSk7XHJcbiAgICB9LCA4MDApO1xyXG5cclxuICB9aW5pdCgpO1xyXG5cclxuICBmdW5jdGlvbiBiZ0ltZygpIHtcclxuICAgICQoJy5iZy1pbWcnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciAkdCA9ICQodGhpcyksXHJcbiAgICAgICAgICAkZGF0YSA9ICR0LmRhdGEoJ3NyYycpO1xyXG4gICAgICAkdC5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAndXJsKCcrJGRhdGErJyknKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmdW5jKCkge1xyXG4gICAgJCgnYm9keScpLmFkZENsYXNzKCdyZWFkeScpXHJcblxyXG4gICAgJCgnLmJhY2stdG8tdG9wJykub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sJ3Nsb3cnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vU0xJREVSXHJcbiAgICAkKCcuc2xpZGVyJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICBuSXRlbSA9IHQuY2hpbGRyZW4oKS5sZW5ndGg7XHJcblxyXG4gICAgICBpZiAobkl0ZW0gPiAxKXtcclxuICAgICAgICB0LmFkZENsYXNzKCdvd2wtY2Fyb3VzZWwnKTtcclxuICAgICAgICB0Lm93bENhcm91c2VsKHtcclxuICAgICAgICAgIGl0ZW1zOiAxLFxyXG4gICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICBuYXY6IHRydWUsXHJcbiAgICAgICAgICBtYXJnaW46IDI0LFxyXG4gICAgICAgICAgY2VudGVyOiB0cnVlLFxyXG4gICAgICAgICAgbmF2VGV4dDogW1wiPHNwYW4gY2xhc3M9J2ljb24tY2hldnJvbi1sZWZ0Jz48L3NwYW4+XCIsXCI8c3BhbiBjbGFzcz0naWNvbi1jaGV2cm9uLXJpZ2h0Jz48L3NwYW4+XCJdLFxyXG4gICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICBhdXRvcGxheVRpbWVvdXQ6IDgwMDAsXHJcbiAgICAgICAgICBhdXRvcGxheVNwZWVkOiAxMjAwLFxyXG4gICAgICAgICAgYW5pbWF0ZUluOiAnZmFkZUluJyxcclxuICAgICAgICAgIGFuaW1hdGVPdXQ6ICdmYWRlT3V0J1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vU0xJREVSIEVYVFJBIFNNQUxMXHJcbiAgICBmdW5jdGlvbiBzbGlkZXJYUygpIHtcclxuICAgICAgdmFyIHNsaWRlclMgPSAkKCcuc2xpZGVyLXhzJyk7XHJcbiAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDc2Nykge1xyXG4gICAgICAgIHNsaWRlclMuYWRkQ2xhc3MoJ293bC1jYXJvdXNlbCcpO1xyXG4gICAgICAgIHNsaWRlclMub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgICAgLy8gbmF2VGV4dDogW1wiPGkgY2xhc3M9J2ZhcyBmYS1jaGV2cm9uLWxlZnQnPjwvaT5cIixcIjxpIGNsYXNzPSdmYXMgZmEtY2hldnJvbi1yaWdodCc+PC9pPlwiXSxcclxuICAgICAgICAgIGl0ZW1zOiAxLFxyXG4gICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgIG5hdjogZmFsc2UsXHJcbiAgICAgICAgICBkb3RzOiB0cnVlLFxyXG4gICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICByZXNwb25zaXZlIDoge1xyXG4gICAgICAgICAgICAwIDoge1xyXG4gICAgICAgICAgICAgIGl0ZW1zOiAxXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDQ4MCA6IHtcclxuICAgICAgICAgICAgICBpdGVtczogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2xpZGVyUy50cmlnZ2VyKCdkZXN0cm95Lm93bC5jYXJvdXNlbCcpLnJlbW92ZUNsYXNzKCdvd2wtY2Fyb3VzZWwgb3dsLWxvYWRlZCcpO1xyXG4gICAgICAgIHNsaWRlclMuZmluZCgnLm93bC1zdGFnZS1vdXRlcicpLmNoaWxkcmVuKCkudW53cmFwKCk7XHJcbiAgICAgIH1cclxuICAgIH1zbGlkZXJYUygpO1xyXG5cclxuICAgICQoJy5pbnB1dGZpbGUnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgZSA9ICQodGhpcyksXHJcbiAgICAgICAgICBhID0gZS5zaWJsaW5ncyhcImxhYmVsXCIpO1xyXG4gICAgICBlLmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdqYWxhbicpO1xyXG4gICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLnZhbCgpLnNwbGl0KFwiXFxcXFwiKS5wb3AoKTtcclxuICAgICAgICAgIGEuaHRtbCgnPGkgY2xhc3M9XCJmYSBmYS1maWxlLW8gbXIxMFwiPjwvaT4gJyArIHQpLCBlLmNsb3Nlc3QoXCIudXBsb2FkLWZpbGVcIikuYWRkQ2xhc3MoXCJoYXMtZmlsZVwiKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gJCh3aW5kb3cpLmhlaWdodCgpLzIpIHtcclxuICAgICAgICAkKCcuYmFjay10by10b3AnKS5hZGRDbGFzcygnc2hvdycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy5iYWNrLXRvLXRvcCcpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gbWFzdFBhcmFsbGF4KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBGSVhFRCBNRU5VXHJcbiAgICBmdW5jdGlvbiBmaXhlZEhlYWRlcigpIHtcclxuICAgICAgaWYoJCgnaGVhZGVyJykubGVuZ3RoID4gMCAmJiAkKHdpbmRvdykud2lkdGgoKSA+IDEwMjUpe1xyXG4gICAgICAgIHZhciAkaGVhZGVyID0gJCgnI2hlYWRlcicpLFxyXG4gICAgICAgICAgICAkd2luZG93SCA9ICQod2luZG93KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgJHBvcyA9ICRoZWFkZXIub3V0ZXJIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyICR0b3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICBpZigkdG9wID4gJHBvcykge1xyXG4gICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKCdmaXhlZCcpO1xyXG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgJGhlYWRlci5hZGRDbGFzcygnc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgIC8vIH0sIDcwMClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdzdGlja3knKTtcclxuICAgICAgICAgICAgLy8gfSwgNzAwKVxyXG4gICAgICAgICAgICAkaGVhZGVyLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYoJHRvcCA9PSAwKSB7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgJCgnaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICQoJ2hlYWRlcicpLnJlbW92ZUNsYXNzKCdmaXhlZCcpO1xyXG4gICAgICB9XHJcbiAgICB9Zml4ZWRIZWFkZXIoKTtcclxuXHJcbiAgICAkKCcuaGVhZGVyX21lbnVfaWNvbicpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnbWVudS1vcGVuJyk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoJy5oYXMtc3ViJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgJHQgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgJGxpbmsgPSAkdC5maW5kKCcubGluaycpO1xyXG4gICAgICAkbGluay5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCR0Lmhhc0NsYXNzKCdzdWItb3BlbicpKXtcclxuICAgICAgICAgICR0LnJlbW92ZUNsYXNzKCdzdWItb3BlbicpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAkKCcuaGFzLXN1YicpLnJlbW92ZUNsYXNzKCdzdWItb3BlbicpO1xyXG4gICAgICAgICAgJHQuYWRkQ2xhc3MoJ3N1Yi1vcGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICBmaXhlZEhlYWRlcigpO1xyXG4gICAgICAvLyBtYXN0UGFyYWxsYXgoKTtcclxuICAgICAgc2xpZGVyWFMoKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG59KSgpO1xyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=

//# sourceMappingURL=main.js.map
