// const ready = (callback) => {
//     if (document.readyState != "loading") callback();
//     else document.addEventListener("DOMContentLoaded", callback);
// }
// ready(() => {
//     document.querySelector(".header").style.height = window.innerHeight + "px";
// })

document.querySelectorAll('.btn').forEach(buttonElement => {
    const button = bootstrap.Button.getOrCreateInstance(buttonElement)
    button.toggle()
  })