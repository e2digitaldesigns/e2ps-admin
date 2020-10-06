export const theScrollto = (div) => {
  console.log(div);
  const scrollDiv = document.querySelector(div);

  scrollDiv.scrollTo({
    left: 0,
    top: scrollDiv.scrollHeight,
    behavior: "smooth",
  });
};

export function handleLeftMenuToggle() {
  document.querySelector(".wrapper").classList.toggle("toggle-left-menu-hide");
  console.log("left menu toggle");
}

export const handleRightSectionToggle = () => {
  document.querySelector(".wrapper").classList.toggle("toggle-right-menu-hide");
  console.log("right section toggle");
};

export const handleFullScreenToggle = () => {
  const elem = document.documentElement;
  const btn = document.querySelector(".full-screen-button");

  if (btn.classList.contains("fa-expand-arrows-alt")) {
    btn.classList.remove("fa-expand-arrows-alt");
    btn.classList.add("fa-compress-arrows-alt");

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else if (btn.classList.contains("fa-compress-arrows-alt")) {
    btn.classList.add("fa-expand-arrows-alt");
    btn.classList.remove("fa-compress-arrows-alt");

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
};
