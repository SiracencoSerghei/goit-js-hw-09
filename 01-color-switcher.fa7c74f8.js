!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.querySelector("body"),n=null;function o(){r.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}t.addEventListener("click",(function(r){t.setAttribute("disabled",!0),e.removeAttribute("disabled"),n=setInterval(o,1e3)})),e.addEventListener("click",(function(r){clearInterval(n),t.removeAttribute("disabled"),e.setAttribute("disabled",!0)}))}();
//# sourceMappingURL=01-color-switcher.fa7c74f8.js.map
