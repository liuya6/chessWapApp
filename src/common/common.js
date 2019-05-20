export function announcement(el, initial, speed) {
  let element = document.querySelectorAll(el)[0];
  if (!element) return;
  let eleParent = element.parentNode;
  let startWidth = eleParent.offsetWidth;
  let time = function() {
    let startLeft = element.offsetLeft;
    if (startLeft < -element.offsetWidth) {
      startLeft = startWidth;
    }
    element.style.left = startLeft - initial + "px";
  };
  let timer = setInterval(time, speed);
  element.ontouchstart = function(e) {
    e = window.event || e;
    e.stopPropagation();
    let startLeft = element.offsetLeft;
    let startX = e.changedTouches[0].clientX;
    clearInterval(timer);
    element.ontouchmove = function(e) {
      e = window.event || e;
      let endX = e.changedTouches[0].clientX;
      element.style.left = startLeft + (endX - startX) + "px";
    };
    element.ontouchend = function(e) {
      e = window.event || e;
      e.stopPropagation();
      timer = setInterval(time, speed);
    };
  };
}

export function nextInput(el) {
  let InputList = document.querySelectorAll(el)[0].childNodes;
  for (let i = 0; i < InputList.length; i++) {
    let inputOne = InputList[i];
    inputOne.index = i;
    inputOne.setAttribute("readonly", true);
    let method = function(e) {
      let next = this.index + 1;
      let last = this.index - 1;
      e = window.event || e;
      this.value = this.value.replace(/\D/g, "");
      if (next > InputList.length - 1) return;
      InputList[next].removeAttribute("readonly");
      if (!this.value && InputList[last] && e.keyCode == 8) {
        InputList[last].focus();
      }
      if (this.value) {
        InputList[next].focus();
      }
    };
    inputOne.onkeyup = method;
  }
  InputList[InputList.length - 1].onkeyup = function(e) {
    e = window.event || e;
    if (e.keyCode == 8) {
      InputList[this.index - 1].focus();
    }
  };
  InputList[0].removeAttribute("readonly");
}
