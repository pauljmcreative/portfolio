$(document).ready(function () {

  // MODAL
  var modalText = {
    exchangagram: {
      title: 'Exchangagram',
      tag: 'A Social Media Experiment.',
      detail: 'Exchangagram, an instagram clone takes a closer look at component relationships within REACT. What better way than exploring one of todays most popular social media apps, showcasing many complex relationships.',
      Technologies: 'REACT | Node.js | JWT Authorization | Bcrypt | Multer | Deployed on Github.io and Netlify',
      link: 'https://pauljmcreative.github.io/exchangagram-frontend/'
    },
    devconnect: {
      title: 'Dev Connect',
      tag: 'the best way for employers to connect with web development students.',
      detail: 'A full-stack app prioritizing the whole student so employers can get a well-rounded perspective of potential talent by viewing an detailed profile and a projects section where work can be viewed quickly and easily.',
      Technologies: 'Django | Python | Deployed on Heroku',
      link: 'https://devconnect3.herokuapp.com/'
    },
  };

  $('#gallery .button').on('click', function () {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function () {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function () {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function () { shiftSlide(-1) })
  $('#prev').click(function () { shiftSlide(1) })

  carousel.on('mousedown', function () {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function () {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function () {
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + (direction * slideWidth) + 'px)');
    setTimeout(function () {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform', 'translateX(0px)');
    }, 700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
      .parent()
      .attr('href', modalText[id].link)

    $.each($('#modal li'), function (index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function (index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });

    });
  }
})
