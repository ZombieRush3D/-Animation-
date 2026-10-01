const line = document.querySelector(".red-line");
const atmosphere = document.querySelector(".red-atmosphere");

const singleM = document.querySelector(".single-m");
const maxim = document.querySelector(".maxim");
const letters = [...document.querySelectorAll(".maxim span")];

const shine = document.querySelector(".shine");
const tinyText = document.querySelector(".tiny-text");

const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOut(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animate({
  duration,
  update,
  easing = easeInOut
}) {
  return new Promise(resolve => {

    const start = performance.now();

    function frame(now) {

      const raw = Math.min(
        (now - start) / duration,
        1
      );

      update(easing(raw));

      if (raw < 1) {
        requestAnimationFrame(frame);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(frame);
  });
}

/* -------------------------------- */
/* RESET */
/* -------------------------------- */

function reset() {

  line.style.left = "-25%";
  line.style.width = "0";

  atmosphere.style.opacity = "0";

  singleM.style.opacity = "0";
  singleM.style.transform =
    "translate(-50%, -50%) scale(.72)";

  maxim.style.opacity = "0";
  maxim.style.transform =
    "translate(-50%, -50%) scale(.88)";

  letters.forEach(letter => {
    letter.style.opacity = "0";
    letter.style.transform =
      "translateY(24px)";
  });

  shine.style.opacity = "0";
  shine.style.left = "-25%";

  tinyText.style.opacity = "0";
  tinyText.style.transform =
    "translateX(-50%) translateY(8px)";
}

/* -------------------------------- */
/* MAIN INTRO */
/* -------------------------------- */

async function intro() {

  reset();

  /*
    1. BLACK
  */

  await sleep(700);

  /*
    2. RED LINE ENTERS
  */

  atmosphere.style.opacity = "1";

  await animate({
    duration: 1050,
    easing: easeOut,

    update: p => {

      line.style.left =
        `${-25 + p * 25}%`;

      line.style.width =
        `${p * 50}%`;
    }
  });

  /*
    3. LINE BECOMES BRIGHT
  */

  await animate({
    duration: 500,

    update: p => {

      line.style.width =
        `${50 + p * 50}%`;
    }
  });

  /*
    4. M APPEARS
  */

  await animate({
    duration: 650,

    update: p => {

      singleM.style.opacity = p;

      singleM.style.transform =
        `translate(-50%, -50%)
         scale(${0.72 + p * 0.28})`;
    }
  });

  /*
    5. SHORT PAUSE
  */

  await sleep(400);

  /*
    6. RED LINE DISAPPEARS
  */

  await animate({
    duration: 450,

    update: p => {

      line.style.width =
        `${100 - p * 100}%`;

      line.style.left =
        `${-25 + p * 50}%`;
    }
  });

  /*
    7. M MORPHS INTO MAXIM
  */

  await animate({
    duration: 850,

    update: p => {

      const scale =
        1.0 - p * 0.12;

      singleM.style.opacity =
        1 - p;

      singleM.style.transform =
        `translate(-50%, -50%)
         scale(${1 - p * 0.18})`;

      maxim.style.opacity = p;

      maxim.style.transform =
        `translate(-50%, -50%)
         scale(${0.88 + p * 0.12})`;
    }
  });

  /*
    8. LETTERS ARRIVE
  */

  for (let i = 0; i < letters.length; i++) {

    const letter = letters[i];

    await animate({
      duration: 190,

      easing: easeOut,

      update: p => {

        letter.style.opacity = p;

        letter.style.transform =
          `translateY(${24 - p * 24}px)`;
      }
    });

    await sleep(35);
  }

  /*
    9. CLEAN MAXIM
  */

  await sleep(300);

  /*
    10. SHINE
  */

  shine.style.opacity = "1";

  await animate({
    duration: 950,

    easing: easeInOut,

    update: p => {

      shine.style.left =
        `${-25 + p * 150}%`;
    }
  });

  shine.style.opacity = "0";

  /*
    11. SUBTEXT
  */

  await animate({
    duration: 500,

    easing: easeOut,

    update: p => {

      tinyText.style.opacity = p;

      tinyText.style.transform =
        `translateX(-50%)
         translateY(${8 - p * 8}px)`;
    }
  });

  /*
    12. HERO HOLD
  */

  await sleep(1800);

  /*
    13. EVERYTHING FADES
  */

  await animate({
    duration: 900,

    update: p => {

      const fade = 1 - p;

      maxim.style.opacity = fade;
      tinyText.style.opacity = fade;
      atmosphere.style.opacity = fade;
    }
  });

  /*
    14. BLACK
  */

  await sleep(700);

  intro();
}

intro();