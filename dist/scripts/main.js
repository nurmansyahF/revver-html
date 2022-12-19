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
          nItem = t.children().length,
					item = t.attr('data-items') ? parseInt(t.attr('data-items')) : 1,
          navs = t.attr('data-nav') && t.attr('data-nav') == "yes" ? true : false,
					centers = t.attr('data-center') && t.attr('data-center') == "yes" ? true : false,
					loops = t.attr('data-loop') && t.attr('data-loop') == "no" ? false : true,
          dot = t.attr('data-dot') && t.attr('data-dot') == "no" ? false : true,
          width = t.attr('data-width') && t.attr('data-width') == "no" ? false : true;

      if (nItem > 1){
        t.addClass('owl-carousel');
        t.owlCarousel({
          items: item,
          loop: loops,
          dots: dot,
          nav: navs,
          autoWidth: width,
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

    // Btn Qty
    $('.btn-number').click(function(e){
      e.preventDefault();

      var
          fieldName = $(this).attr('data-field'),
          type      = $(this).attr('data-type'),
          input = $("input[name='"+fieldName+"']"),
          currentVal = parseInt(input.val());
      if (!isNaN(currentVal)) {
          if(type == 'minus') {

              if(currentVal > input.attr('min')) {
                  input.val(currentVal - 1).change();
              }
              if(parseInt(input.val()) == input.attr('min')) {
                  $(this).attr('disabled', true);
              }

          } else if(type == 'plus') {

              if(currentVal < input.attr('max')) {
                  input.val(currentVal + 1).change();
              }
              if(parseInt(input.val()) == input.attr('max')) {
                  $(this).attr('disabled', true);
              }

          }
      } else {
          input.val(0);
      }
    });
    $('.input-number').focusin(function(){
      $(this).data('oldValue', $(this).val());
    });
    $('.input-number').change(function() {

        var minValue =  parseInt($(this).attr('min')),
        maxValue =  parseInt($(this).attr('max')),
        valueCurrent = parseInt($(this).val());

        var name = $(this).attr('name');
        if(valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
        } else {
            alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        if(valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
        } else {
            alert('Sorry, the maximum value was reached');
            $(this).val($(this).data('oldValue'));
        }
    });

    $('.btn-number').click(function(e){
      e.preventDefault();
    });


    // Check All
    $('.cart-list').each(function() {
      var t = $(this),
          check = t.find('.checkbox').find('input[type="checkbox"]'),
          cAll = t.find('#checkAll');

      var cc = t.find('input:checkbox:checked');

      function toggle() {
        var n = t.find('input:checkbox:checked').length;
        if (n == 0) {
            // act.removeClass('shown');
        } else {
            // act.addClass('shown');
        }
      }

      cAll.click(function() {
          check.not(this).prop('checked', this.checked);
      })

      check.change(function() {
        toggle();
      })
      cc.change(function(){
        if($(this).prop('checked')==false){
          cAll.prop('checked', false);
        }
      })
  })

  // Data Tables
  $('.dataTable').each(function(){
    var t = $(this);
    t.DataTable({
      paging: false,
      ordering: true,
      bInfo: false
    });
  });

  // chart colors
  var colors = ['#007bff','#28a745','#333333','#c3e6cb','#dc3545','#6c757d'];

  /* 3 donut charts */
  var donutOptions = {
    cutoutPercentage: 85,
    legend: {position:'bottom', padding:5, labels: {pointStyle:'circle', usePointStyle:true}}
  };

  var chDonutData1 = {
    labels: ['Bootstrap', 'Popper', 'Other'],
    datasets: [
      {
        backgroundColor: colors.slice(0,3),
        borderWidth: 0,
        data: [74, 11, 40]
      }
    ]
  };

  var chDonut1 = document.getElementById("goalsChart");
  if (chDonut1) {
    new Chart(chDonut1, {
        type: 'pie',
        data: chDonutData1,
        options: donutOptions
    });
  }

  }

})();


//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICBqUXVlcnkoJ2ltZy5zdmcnKS5lYWNoKGZ1bmN0aW9uKGkpIHtcclxuICAgICAgdmFyICRpbWcgPSBqUXVlcnkodGhpcyk7XHJcbiAgICAgIHZhciBpbWdJRCA9ICRpbWcuYXR0cignaWQnKTtcclxuICAgICAgdmFyIGltZ0NsYXNzID0gJGltZy5hdHRyKCdjbGFzcycpO1xyXG4gICAgICB2YXIgaW1nVVJMID0gJGltZy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgIGpRdWVyeS5nZXQoaW1nVVJMLCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgdmFyICRzdmcgPSBqUXVlcnkoZGF0YSkuZmluZCgnc3ZnJyk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbWdJRCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICRzdmcgPSAkc3ZnLmF0dHIoJ2lkJywgaW1nSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGltZ0NsYXNzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgJHN2ZyA9ICRzdmcuYXR0cignY2xhc3MnLCBpbWdDbGFzcyArICcgcmVwbGFjZWQtc3ZnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzdmcgPSAkc3ZnLnJlbW92ZUF0dHIoJ3htbG5zOmEnKTtcclxuICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKCRzdmcpO1xyXG4gICAgICB9LCAneG1sJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdib2R5JykuaGJhTG9hZEltYWdlcyh7XHJcbiAgICAgIGF0dHJpYnV0ZTogJ2ltZy1zcmMnLFxyXG4gICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHNvdXJjZSwgZWxlbWVudCkge1xyXG4gICAgICAgIGVsZW1lbnQuc3JjID0gc291cmNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmMsIDEwMCk7XHJcbiAgICBzZXRUaW1lb3V0KGJnSW1nLCAxMDApO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICQoJy5zZWxlY3QnKS5zZWxlY3RwaWNrZXIoe1xyXG4gICAgICAgIHN0eWxlOiAnc2VsZWN0LWNvbnRyb2wnLFxyXG4gICAgICAgIHNpemU6IDRcclxuICAgICAgfSk7XHJcbiAgICB9LCA4MDApO1xyXG5cclxuICB9aW5pdCgpO1xyXG5cclxuICBmdW5jdGlvbiBiZ0ltZygpIHtcclxuICAgICQoJy5iZy1pbWcnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciAkdCA9ICQodGhpcyksXHJcbiAgICAgICAgICAkZGF0YSA9ICR0LmRhdGEoJ3NyYycpO1xyXG4gICAgICAkdC5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAndXJsKCcrJGRhdGErJyknKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmdW5jKCkge1xyXG4gICAgJCgnYm9keScpLmFkZENsYXNzKCdyZWFkeScpXHJcblxyXG4gICAgJCgnLmJhY2stdG8tdG9wJykub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiAwIH0sJ3Nsb3cnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vU0xJREVSXHJcbiAgICAkKCcuc2xpZGVyJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgdCA9ICQodGhpcyksXHJcbiAgICAgICAgICBuSXRlbSA9IHQuY2hpbGRyZW4oKS5sZW5ndGgsXHJcblx0XHRcdFx0XHRpdGVtID0gdC5hdHRyKCdkYXRhLWl0ZW1zJykgPyBwYXJzZUludCh0LmF0dHIoJ2RhdGEtaXRlbXMnKSkgOiAxLFxyXG4gICAgICAgICAgbmF2cyA9IHQuYXR0cignZGF0YS1uYXYnKSAmJiB0LmF0dHIoJ2RhdGEtbmF2JykgPT0gXCJ5ZXNcIiA/IHRydWUgOiBmYWxzZSxcclxuXHRcdFx0XHRcdGNlbnRlcnMgPSB0LmF0dHIoJ2RhdGEtY2VudGVyJykgJiYgdC5hdHRyKCdkYXRhLWNlbnRlcicpID09IFwieWVzXCIgPyB0cnVlIDogZmFsc2UsXHJcblx0XHRcdFx0XHRsb29wcyA9IHQuYXR0cignZGF0YS1sb29wJykgJiYgdC5hdHRyKCdkYXRhLWxvb3AnKSA9PSBcIm5vXCIgPyBmYWxzZSA6IHRydWUsXHJcbiAgICAgICAgICBkb3QgPSB0LmF0dHIoJ2RhdGEtZG90JykgJiYgdC5hdHRyKCdkYXRhLWRvdCcpID09IFwibm9cIiA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICAgIHdpZHRoID0gdC5hdHRyKCdkYXRhLXdpZHRoJykgJiYgdC5hdHRyKCdkYXRhLXdpZHRoJykgPT0gXCJub1wiID8gZmFsc2UgOiB0cnVlO1xyXG5cclxuICAgICAgaWYgKG5JdGVtID4gMSl7XHJcbiAgICAgICAgdC5hZGRDbGFzcygnb3dsLWNhcm91c2VsJyk7XHJcbiAgICAgICAgdC5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICBpdGVtczogaXRlbSxcclxuICAgICAgICAgIGxvb3A6IGxvb3BzLFxyXG4gICAgICAgICAgZG90czogZG90LFxyXG4gICAgICAgICAgbmF2OiBuYXZzLFxyXG4gICAgICAgICAgYXV0b1dpZHRoOiB3aWR0aCxcclxuICAgICAgICAgIG1hcmdpbjogMjQsXHJcbiAgICAgICAgICBjZW50ZXI6IHRydWUsXHJcbiAgICAgICAgICBuYXZUZXh0OiBbXCI8c3BhbiBjbGFzcz0naWNvbi1jaGV2cm9uLWxlZnQnPjwvc3Bhbj5cIixcIjxzcGFuIGNsYXNzPSdpY29uLWNoZXZyb24tcmlnaHQnPjwvc3Bhbj5cIl0sXHJcbiAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgIGF1dG9wbGF5VGltZW91dDogODAwMCxcclxuICAgICAgICAgIGF1dG9wbGF5U3BlZWQ6IDEyMDAsXHJcbiAgICAgICAgICBhbmltYXRlSW46ICdmYWRlSW4nLFxyXG4gICAgICAgICAgYW5pbWF0ZU91dDogJ2ZhZGVPdXQnXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9TTElERVIgRVhUUkEgU01BTExcclxuICAgIGZ1bmN0aW9uIHNsaWRlclhTKCkge1xyXG4gICAgICB2YXIgc2xpZGVyUyA9ICQoJy5zbGlkZXIteHMnKTtcclxuICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgNzY3KSB7XHJcbiAgICAgICAgc2xpZGVyUy5hZGRDbGFzcygnb3dsLWNhcm91c2VsJyk7XHJcbiAgICAgICAgc2xpZGVyUy5vd2xDYXJvdXNlbCh7XHJcbiAgICAgICAgICAvLyBuYXZUZXh0OiBbXCI8aSBjbGFzcz0nZmFzIGZhLWNoZXZyb24tbGVmdCc+PC9pPlwiLFwiPGkgY2xhc3M9J2ZhcyBmYS1jaGV2cm9uLXJpZ2h0Jz48L2k+XCJdLFxyXG4gICAgICAgICAgaXRlbXM6IDEsXHJcbiAgICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgICAgbmF2OiBmYWxzZSxcclxuICAgICAgICAgIGRvdHM6IHRydWUsXHJcbiAgICAgICAgICBhdXRvcGxheTogdHJ1ZSxcclxuICAgICAgICAgIHJlc3BvbnNpdmUgOiB7XHJcbiAgICAgICAgICAgIDAgOiB7XHJcbiAgICAgICAgICAgICAgaXRlbXM6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgNDgwIDoge1xyXG4gICAgICAgICAgICAgIGl0ZW1zOiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzbGlkZXJTLnRyaWdnZXIoJ2Rlc3Ryb3kub3dsLmNhcm91c2VsJykucmVtb3ZlQ2xhc3MoJ293bC1jYXJvdXNlbCBvd2wtbG9hZGVkJyk7XHJcbiAgICAgICAgc2xpZGVyUy5maW5kKCcub3dsLXN0YWdlLW91dGVyJykuY2hpbGRyZW4oKS51bndyYXAoKTtcclxuICAgICAgfVxyXG4gICAgfXNsaWRlclhTKCk7XHJcblxyXG4gICAgJCgnLmlucHV0ZmlsZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBlID0gJCh0aGlzKSxcclxuICAgICAgICAgIGEgPSBlLnNpYmxpbmdzKFwibGFiZWxcIik7XHJcbiAgICAgIGUuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2phbGFuJyk7XHJcbiAgICAgICAgICB2YXIgdCA9ICQodGhpcykudmFsKCkuc3BsaXQoXCJcXFxcXCIpLnBvcCgpO1xyXG4gICAgICAgICAgYS5odG1sKCc8aSBjbGFzcz1cImZhIGZhLWZpbGUtbyBtcjEwXCI+PC9pPiAnICsgdCksIGUuY2xvc2VzdChcIi51cGxvYWQtZmlsZVwiKS5hZGRDbGFzcyhcImhhcy1maWxlXCIpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAkKHdpbmRvdykuaGVpZ2h0KCkvMikge1xyXG4gICAgICAgICQoJy5iYWNrLXRvLXRvcCcpLmFkZENsYXNzKCdzaG93Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJCgnLmJhY2stdG8tdG9wJykucmVtb3ZlQ2xhc3MoJ3Nob3cnKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBtYXN0UGFyYWxsYXgoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEZJWEVEIE1FTlVcclxuICAgIGZ1bmN0aW9uIGZpeGVkSGVhZGVyKCkge1xyXG4gICAgICBpZigkKCdoZWFkZXInKS5sZW5ndGggPiAwICYmICQod2luZG93KS53aWR0aCgpID4gMTAyNSl7XHJcbiAgICAgICAgdmFyICRoZWFkZXIgPSAkKCcjaGVhZGVyJyksXHJcbiAgICAgICAgICAgICR3aW5kb3dIID0gJCh3aW5kb3cpLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAkcG9zID0gJGhlYWRlci5vdXRlckhlaWdodCgpO1xyXG5cclxuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgJHRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgIGlmKCR0b3AgPiAkcG9zKSB7XHJcbiAgICAgICAgICAgICRoZWFkZXIuYWRkQ2xhc3MoJ2ZpeGVkJyk7XHJcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAkaGVhZGVyLmFkZENsYXNzKCdzdGlja3knKTtcclxuICAgICAgICAgICAgLy8gfSwgNzAwKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ3N0aWNreScpO1xyXG4gICAgICAgICAgICAvLyB9LCA3MDApXHJcbiAgICAgICAgICAgICRoZWFkZXIucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZigkdG9wID09IDApIHtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICAkKCdoZWFkZXInKS5yZW1vdmVDbGFzcygnc3RpY2t5Jyk7XHJcbiAgICAgICAgJCgnaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2ZpeGVkJyk7XHJcbiAgICAgIH1cclxuICAgIH1maXhlZEhlYWRlcigpO1xyXG5cclxuICAgICQoJy5oZWFkZXJfbWVudV9pY29uJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtZW51LW9wZW4nKTtcclxuICAgIH0pXHJcblxyXG4gICAgJCgnLmhhcy1zdWInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciAkdCA9ICQodGhpcyksXHJcbiAgICAgICAgICAkbGluayA9ICR0LmZpbmQoJy5saW5rJyk7XHJcbiAgICAgICRsaW5rLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoJHQuaGFzQ2xhc3MoJ3N1Yi1vcGVuJykpe1xyXG4gICAgICAgICAgJHQucmVtb3ZlQ2xhc3MoJ3N1Yi1vcGVuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICQoJy5oYXMtc3ViJykucmVtb3ZlQ2xhc3MoJ3N1Yi1vcGVuJyk7XHJcbiAgICAgICAgICAkdC5hZGRDbGFzcygnc3ViLW9wZW4nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGZpeGVkSGVhZGVyKCk7XHJcbiAgICAgIC8vIG1hc3RQYXJhbGxheCgpO1xyXG4gICAgICBzbGlkZXJYUygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQnRuIFF0eVxyXG4gICAgJCgnLmJ0bi1udW1iZXInKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgdmFyXHJcbiAgICAgICAgICBmaWVsZE5hbWUgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtZmllbGQnKSxcclxuICAgICAgICAgIHR5cGUgICAgICA9ICQodGhpcykuYXR0cignZGF0YS10eXBlJyksXHJcbiAgICAgICAgICBpbnB1dCA9ICQoXCJpbnB1dFtuYW1lPSdcIitmaWVsZE5hbWUrXCInXVwiKSxcclxuICAgICAgICAgIGN1cnJlbnRWYWwgPSBwYXJzZUludChpbnB1dC52YWwoKSk7XHJcbiAgICAgIGlmICghaXNOYU4oY3VycmVudFZhbCkpIHtcclxuICAgICAgICAgIGlmKHR5cGUgPT0gJ21pbnVzJykge1xyXG5cclxuICAgICAgICAgICAgICBpZihjdXJyZW50VmFsID4gaW5wdXQuYXR0cignbWluJykpIHtcclxuICAgICAgICAgICAgICAgICAgaW5wdXQudmFsKGN1cnJlbnRWYWwgLSAxKS5jaGFuZ2UoKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYocGFyc2VJbnQoaW5wdXQudmFsKCkpID09IGlucHV0LmF0dHIoJ21pbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSBlbHNlIGlmKHR5cGUgPT0gJ3BsdXMnKSB7XHJcblxyXG4gICAgICAgICAgICAgIGlmKGN1cnJlbnRWYWwgPCBpbnB1dC5hdHRyKCdtYXgnKSkge1xyXG4gICAgICAgICAgICAgICAgICBpbnB1dC52YWwoY3VycmVudFZhbCArIDEpLmNoYW5nZSgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZihwYXJzZUludChpbnB1dC52YWwoKSkgPT0gaW5wdXQuYXR0cignbWF4JykpIHtcclxuICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpbnB1dC52YWwoMCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJCgnLmlucHV0LW51bWJlcicpLmZvY3VzaW4oZnVuY3Rpb24oKXtcclxuICAgICAgJCh0aGlzKS5kYXRhKCdvbGRWYWx1ZScsICQodGhpcykudmFsKCkpO1xyXG4gICAgfSk7XHJcbiAgICAkKCcuaW5wdXQtbnVtYmVyJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgbWluVmFsdWUgPSAgcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdtaW4nKSksXHJcbiAgICAgICAgbWF4VmFsdWUgPSAgcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdtYXgnKSksXHJcbiAgICAgICAgdmFsdWVDdXJyZW50ID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSk7XHJcblxyXG4gICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKCduYW1lJyk7XHJcbiAgICAgICAgaWYodmFsdWVDdXJyZW50ID49IG1pblZhbHVlKSB7XHJcbiAgICAgICAgICAgICQoXCIuYnRuLW51bWJlcltkYXRhLXR5cGU9J21pbnVzJ11bZGF0YS1maWVsZD0nXCIrbmFtZStcIiddXCIpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydCgnU29ycnksIHRoZSBtaW5pbXVtIHZhbHVlIHdhcyByZWFjaGVkJyk7XHJcbiAgICAgICAgICAgICQodGhpcykudmFsKCQodGhpcykuZGF0YSgnb2xkVmFsdWUnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHZhbHVlQ3VycmVudCA8PSBtYXhWYWx1ZSkge1xyXG4gICAgICAgICAgICAkKFwiLmJ0bi1udW1iZXJbZGF0YS10eXBlPSdwbHVzJ11bZGF0YS1maWVsZD0nXCIrbmFtZStcIiddXCIpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydCgnU29ycnksIHRoZSBtYXhpbXVtIHZhbHVlIHdhcyByZWFjaGVkJyk7XHJcbiAgICAgICAgICAgICQodGhpcykudmFsKCQodGhpcykuZGF0YSgnb2xkVmFsdWUnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLmJ0bi1udW1iZXInKS5jbGljayhmdW5jdGlvbihlKXtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vIENoZWNrIEFsbFxyXG4gICAgJCgnLmNhcnQtbGlzdCcpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciB0ID0gJCh0aGlzKSxcclxuICAgICAgICAgIGNoZWNrID0gdC5maW5kKCcuY2hlY2tib3gnKS5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKSxcclxuICAgICAgICAgIGNBbGwgPSB0LmZpbmQoJyNjaGVja0FsbCcpO1xyXG5cclxuICAgICAgdmFyIGNjID0gdC5maW5kKCdpbnB1dDpjaGVja2JveDpjaGVja2VkJyk7XHJcblxyXG4gICAgICBmdW5jdGlvbiB0b2dnbGUoKSB7XHJcbiAgICAgICAgdmFyIG4gPSB0LmZpbmQoJ2lucHV0OmNoZWNrYm94OmNoZWNrZWQnKS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKG4gPT0gMCkge1xyXG4gICAgICAgICAgICAvLyBhY3QucmVtb3ZlQ2xhc3MoJ3Nob3duJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gYWN0LmFkZENsYXNzKCdzaG93bicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY0FsbC5jbGljayhmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGNoZWNrLm5vdCh0aGlzKS5wcm9wKCdjaGVja2VkJywgdGhpcy5jaGVja2VkKTtcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGNoZWNrLmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgICB0b2dnbGUoKTtcclxuICAgICAgfSlcclxuICAgICAgY2MuY2hhbmdlKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoJCh0aGlzKS5wcm9wKCdjaGVja2VkJyk9PWZhbHNlKXtcclxuICAgICAgICAgIGNBbGwucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgfSlcclxuXHJcbiAgLy8gRGF0YSBUYWJsZXNcclxuICAkKCcuZGF0YVRhYmxlJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHQgPSAkKHRoaXMpO1xyXG4gICAgdC5EYXRhVGFibGUoe1xyXG4gICAgICBwYWdpbmc6IGZhbHNlLFxyXG4gICAgICBvcmRlcmluZzogdHJ1ZSxcclxuICAgICAgYkluZm86IGZhbHNlXHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgLy8gY2hhcnQgY29sb3JzXHJcbiAgdmFyIGNvbG9ycyA9IFsnIzAwN2JmZicsJyMyOGE3NDUnLCcjMzMzMzMzJywnI2MzZTZjYicsJyNkYzM1NDUnLCcjNmM3NTdkJ107XHJcblxyXG4gIC8qIDMgZG9udXQgY2hhcnRzICovXHJcbiAgdmFyIGRvbnV0T3B0aW9ucyA9IHtcclxuICAgIGN1dG91dFBlcmNlbnRhZ2U6IDg1LFxyXG4gICAgbGVnZW5kOiB7cG9zaXRpb246J2JvdHRvbScsIHBhZGRpbmc6NSwgbGFiZWxzOiB7cG9pbnRTdHlsZTonY2lyY2xlJywgdXNlUG9pbnRTdHlsZTp0cnVlfX1cclxuICB9O1xyXG5cclxuICB2YXIgY2hEb251dERhdGExID0ge1xyXG4gICAgbGFiZWxzOiBbJ0Jvb3RzdHJhcCcsICdQb3BwZXInLCAnT3RoZXInXSxcclxuICAgIGRhdGFzZXRzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ycy5zbGljZSgwLDMpLFxyXG4gICAgICAgIGJvcmRlcldpZHRoOiAwLFxyXG4gICAgICAgIGRhdGE6IFs3NCwgMTEsIDQwXVxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfTtcclxuXHJcbiAgdmFyIGNoRG9udXQxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnb2Fsc0NoYXJ0XCIpO1xyXG4gIGlmIChjaERvbnV0MSkge1xyXG4gICAgbmV3IENoYXJ0KGNoRG9udXQxLCB7XHJcbiAgICAgICAgdHlwZTogJ3BpZScsXHJcbiAgICAgICAgZGF0YTogY2hEb251dERhdGExLFxyXG4gICAgICAgIG9wdGlvbnM6IGRvbnV0T3B0aW9uc1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB9XHJcblxyXG59KSgpO1xyXG5cclxuIl0sImZpbGUiOiJtYWluLmpzIn0=

//# sourceMappingURL=main.js.map
