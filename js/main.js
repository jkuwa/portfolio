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
  // ナビリンク
  const links = document.querySelectorAll(".js-link");

  // テキストを生成
  links.forEach((link) => {
    const text = link.innerHTML;
    const textBefore = '<span class="p-navLink__before js-before">' + text + '</span>';
    const textAfter = '<span class="p-navLink__after js-after">' + text + '</span>';
    const newText = '<div class=p-navLink>' + textBefore + textAfter + '</div>';
    link.innerHTML = newText;
  });

  // アニメーション
  links.forEach((link) => {
    let mm = gsap.matchMedia();
    const before = link.querySelector(".js-before");
    const after = link.querySelector(".js-after");

    const hover = () => {
      gsap.to( before, {
        yPercent: -100,
        ease: 'bounce.out',
      });
      gsap.to( after, {
        yPercent: -100,
        ease: 'bounce.out',
      });
    };
    const leave = () => {
      gsap.to( before, {
        yPercent: 0,
        ease: 'bounce.out',
      });
      gsap.to( after, {
        yPercent: 0,
        ease: 'bounce.out',
      });
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
  });


  // ボタン
  const btns = document.querySelectorAll(".js-btn");

  // テキストを生成
  btns.forEach((btn) => {
    const text = btn.innerHTML;
    const textBefore = '<span class="p-btn__before js-before">' + text + '</span>';
    const textAfter = '<span class="p-btn__after js-after">' + text + '</span>';
    const newText = '<div class=p-btn>' + textBefore + textAfter + '</div>';
    btn.innerHTML = newText;
  });

  // アニメーション
  btns.forEach((btn) => {
    const before = btn.querySelector(".js-before");
    const after = btn.querySelector(".js-after");

    const hover = () => {
      gsap.to( btn, {
        backgroundColor: "#fff",
        duration: 0.3,
      });
      gsap.to( before, {
        yPercent: -170,
        ease: "bounce.out",
        duration: 0.4,
      });
      gsap.to( after, {
        yPercent: -170,
        ease: "bounce.out",
        duration: 0.4,
      });
    };
    const leave = () => {
      gsap.to( btn, {
        backgroundColor: "#000",
        duration: 0.3,
      });
      gsap.to( before, {
        yPercent: 0,
        ease: 'bounce.out',
        duration: 0.4,
      });
      gsap.to( after, {
        yPercent: 0,
        ease: 'bounce.out',
        duration: 0.4,
      });
    };

    btn.addEventListener('mouseenter', hover);
    btn.addEventListener('mouseleave', leave);
  });


  /* ---------- ファーストビューアニメーション ---------- */
  const tl = gsap.timeline();
  tl.to(".js-boy", {
    x: 0,
    duration: 2,
    ease: 'steps(4)',
  })
    .to(".js-title", {
    scale: 1,
    duration: 1,
    ease: 'bounce.out',
    })
    .to(".js-space", {
      scale: 1,
      duration: 0.8,
      ease: 'bounce.out',
    }, '<')
    .to(".js-planet", {
      scale: 1,
      duration: 1,
      ease: 'bounce.out',
    }, '<0.1')
    .to(".js-number", {
      opacity: 1,
      duration: 0.3,
      ease: 'none',
    }, '<0.2')
    .to(".js-number", {
      yPercent: 20,
      duration: 0.6,
      ease: 'bounce.out',
    }, '<')
    .add(() => {
      document.querySelector(".js-boy").classList.add('is-animated');
    });
      

  /* ---------- セクションタイトル アニメーション ---------- */
  const targets = document.querySelectorAll(".js-target");

  // スクロールイベント
  targets.forEach((target) => {
    ScrollTrigger.create({
      trigger: target,
      start: "top 90%",
      toggleClass: {
        targets: target,
        className: "is-animated",
      },
      once: true,
    });
  });


  /* ---------- UFOスクロールアニメーション ---------- */
  const ufo = document.querySelector(".js-ufo");

  // skills section
  const initScrollTriggerSkills = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".js-skills",
        start: 'top 20%',
        end: 'bottom 20%',
        scrub: 1,
      }
    });

    tl.to( ufo, {
      left: '-20%',
    })
      .to( ufo, {
        scaleX: -1,
      })
      .to( ufo, {
        left: '100%',
      })
      .to( ufo, {
        scaleX: 1,
      });
  }

  // works section
  const initScrollTriggerWorks = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".js-works",
        start: 'top 20%',
        end: 'top top',
        scrub: 1,
      }
    });

    tl.add(() => {
      ufo.classList.add('is-animated');
    })
      .to( ufo, {
        left: '80%',
        rotation: 20,
      });
  }

  // contact section
  const initScrollTriggerContact = () => {
    gsap.to( ufo, {
      position: 'absolute',
      scrollTrigger: {
        trigger: ".js-contact",
        start: 'top top',
        endTrigger: ".js-footer",
        end: 'bottom bottom',
        scrub: true,
      }
    });
  }

  initScrollTriggerSkills();
  initScrollTriggerWorks();
  initScrollTriggerContact();


  /* ---------- skills section グリッドレイアウト ---------- */
  const magicGrid = new MagicGrid({
    container: ".js-grid",
    static: true,
    gutter: 35,
  });

  magicGrid.listen();
}
