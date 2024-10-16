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
  const space = document.querySelector(".js-fv__bg");
  const mv = document.querySelector(".js-fv__img");

  // 画面の対角線の長さを取得
  const getDiagonal = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const sum = Math.sqrt( width ** 2 + height ** 2 );
    return sum;
  };

  // イラストの位置を取得
  const getPosition = (position) => {
    const rect = mv.getBoundingClientRect();

    // スクロール量を取得
    const scrollTop = window.scrollY;

    // 左上からイラストの中心までの長さ
    const left = rect.left + rect.width / 2;
    const top = rect.top + scrollTop + rect.height / 2;

    return position === 'left' ? left : top;
  };

  // クリップパスの半径を取得
  const getRadius = () => {
    const clipPath = window.getComputedStyle(space).clipPath;
    const radius = clipPath.match(/(?<=circle\()\d*(?=px)/);
    return radius;
  };

  // クリップパスの位置をイラストの中心に指定
  const setPosition = () => {
    space.style.clipPath = `circle( ${getRadius()}px at ${getPosition('left')}px ${getPosition('top')}px)`;
  };

  // アニメーション
  const initScrollTrigger = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".js-fv",
        start: 'bottom bottom',
        end: '+=8000',
        scrub: 0.5,
        pin: true,
        invalidateOnRefresh: true,
      }
    });

    tl.add(() => {
      document.querySelector(".js-number").classList.add('is-animated');
    })
      .to(space, {
        clipPath: () => `circle( ${getDiagonal()}px at ${getPosition('left')}px ${getPosition('top')}px )`,
      })
      .to(".js-planet", {
        scale: 4,
      }, '<')
      .to(".js-boy", {
        scale: 0,
        transformOrigin: 'top right',
        animation: 'unset',
      }, '<')
      .to(".js-planet", {
      scale: 100,
      });

    gsap.to(".js-space", {
      scale: 2,
      scrollTrigger: {
        trigger: ".js-fv",
        start: 'bottom bottom',
        end: '+=8000',
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });
  };

  // リサイズ時に再代入
  const resizeEvent = () => {
    setPosition();
    ScrollTrigger.refresh();
  };

  // 読み込まれた時に実行
  //クリップパス指定
  space.style.clipPath = `circle( 10px at ${getPosition('left')}px ${getPosition('top')}px)`;
  // アニメーション実行
  initScrollTrigger();

  window.addEventListener('resize', resizeEvent);


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
}
