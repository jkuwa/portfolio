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
      const textBefore = '<span class="p-navLink__before">' + text + '</span>';
      const textAfter = '<span class="p-navLink__after">' + text + '</span>';
      const newText = '<div class=p-navLink>' + textBefore + textAfter + '</div>';
      link.innerHTML = newText;
    }
  });

  // アニメーション
  links.forEach((link) => {
    if( !link.classList.contains('is-current') ) {
      let mm = gsap.matchMedia();
      const target = link.querySelector(".p-navLink");
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


  /* ---------- スクロールアニメーション ---------- */
  const initScrollTrigger = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".js-fv",
        start: 'bottom bottom',
        end: '+=900%',
        scrub: 2,
        snap: {
          snapTo: 0.1,
          duration: 0.6,
          delay: 0.1,
          ease: "power4.out",
        },
        pin: true,
        invalidateOnRefresh: true,
      }
    });

    tl.add(() => {
      document.querySelector(".js-number").classList.add('is-animated');
    })
      .to(".js-planet", {
        scale: 2,
      })
      .to(".js-boy", {
        scale: 0,
        transformOrigin: 'top right',
        animation: 'unset',
      }, '<')
      .to(".js-planet", {
      scale: 100,
      });


    // 背景の切り替え
    gsap.to(".js-fv__bg", {
      maskSize: '500vw',
      scrollTrigger: {
        trigger: ".js-fv",
        start: 'bottom bottom',
        end: '+=550%',
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    gsap.to(".js-fv__shape", {
      backgroundSize: '510vw',
      scrollTrigger: {
        trigger: ".js-fv",
        start: 'bottom bottom',
        end: '+=500%',
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // rocket boy 背景の拡大
    gsap.to(".js-space", {
      scale: 2,
      scrollTrigger: {
        trigger: ".js-fv",
        start: 'bottom bottom',
        end: '+=400%',
        scrub: 1.5,
        invalidateOnRefresh: true,
      }
    });
  };

  // 読み込まれた時に実行
  initScrollTrigger();


  /* ---------- セクションタイトル アニメーション ---------- */
  const targets = document.querySelectorAll(".js-secTitle");

  // スクロールイベント
  window.addEventListener('scroll', function() {
    const scroll = window.scrollY;
    const windowHeight = window.innerHeight;

    // 画面内に入ったらアニメーションクラス付与
    targets.forEach((title) => {
      const titlePos = title.getBoundingClientRect().top + scroll;
      if (scroll > titlePos - windowHeight) {
        title.classList.add('is-animated');
      }
    });
  });


  /* ---------- skills section グリッドレイアウト ---------- */
  const magicGrid = new MagicGrid({
    container: ".js-skills",
    static: true,
    gutter: 35,
  });

  magicGrid.listen();
}
