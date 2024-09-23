'use strict';

$(function() {
  /* ---------- ハンバーガーメニュー ---------- */
  $(".js-hamburgerBtn").on('click', function() {
    $(this).toggleClass('is-open');
    $(".js-nav").toggleClass('is-open');
    $("body").toggleClass('is-open');
    $(".c-cover").toggleClass('is-open');

    if ($(this).text() === 'メニューを開く') {
      $(".js-menu").text('メニューを閉じる');
      $(".js-hamburgerBtn").attr('aria-expanded', 'true');
    } else {
      $(".js-menu").text('メニューを開く');
      $(".js-hamburgerBtn").attr('aria-expanded', 'false');
    }
  });

  // 最後の項目の後ハンバーガーボタンに戻る
  $(".js-focusTrap").on('focus', function() {
    if ( $(".js-hamburgerBtn").hasClass('is-open') ) {
    $(".js-hamburgerBtn").focus();
    }
  });
  
  // Escキーでメニュー閉じる
  $(document).keydown( function(e) {
    if ( e.which === 27 && $(".js-hamburgerBtn").hasClass('is-open') ) {
      e.preventDefault();
      $(".js-hamburgerBtn").removeClass('is-open').attr('aria-expanded', 'false');
      $(".js-nav").removeClass('is-open');
      $("body").removeClass('is-open');
      $(".c-cover").removeClass('is-open');
      $(".js-menu").text('メニューを開く');
    }
  });
  
  // リサイズでメニュー閉じる
  $(window).on('resize', function() {
    if ( $(".js-hamburgerBtn").hasClass('is-open') ) {
      $(".js-hamburgerBtn").removeClass('is-open').attr('aria-expanded', 'false');
      $(".js-nav").removeClass('is-open');
      $("body").removeClass('is-open');
      $(".c-cover").removeClass('is-open');
      $(".js-menu").text('メニューを開く');
    }
  });
  
  // ページ内リンクでメニューを閉じる
  $(".js-nav a").on('click', function() {
    if ( $(".js-hamburgerBtn").hasClass('is-open') ) {
      $(".js-hamburgerBtn").removeClass('is-open').attr('aria-expanded', 'false');
      $(".js-nav").removeClass('is-open');
      $("body").removeClass('is-open');
      $(".c-cover").removeClass('is-open');
      $(".js-menu").text('メニューを開く');
    }
  });
});


{
  /* ---------- ホバーアニメーション ---------- */
  const links = document.querySelectorAll(".js-link");
  // テキストを生成
  links.forEach((link) => {
    if( !link.classList.contains('is-current') ) {

      const text = link.innerHTML;
      const textBefore = '<span class="p-text__before">' + text + '</span>';
      const textAfter = '<span class="p-text__after">' + text + '</span>';
      const newText = '<div class=p-text>' + textBefore + textAfter + '</div>';
      link.innerHTML = newText;
    }
  });

  // アニメーション
  links.forEach((link) => {
    if( !link.classList.contains('is-current') ) {
      let mm = gsap.matchMedia();
      const target = link.querySelector(".p-text");
      const hover = () => {
        gsap.to(target, {yPercent:-100, ease:'bounce.out'});
      };
      const leave = () => {
        gsap.to(target, {yPercent:0, ease:'bounce.out'});
      };

      // breakpoint 以上で実行
      mm.add('(min-width: 768px)', () => {
        link.addEventListener('mouseenter', hover);
        link.addEventListener('mouseleave', leave);

        return() => {
          link.removeEventListener('mouseenter', hover);
          link.removeEventListener('mouseleave', leave);
        }
      });
    }
  });
}
