function show1() {
  let a1 = document.getElementById("asao");
  let a2 = document.getElementById("azhang");
  let s1 = document.getElementById("box1");
  let s2 = document.getElementById("box2");
  if (s1.style.display != "block") {
    s1.style.display = "block";
    s2.style.display = "none";
    a1.style.color = "#e4393c";
    a1.style.fontWeight = "bold";
    a2.style.color = "#666";
    a2.style.fontWeight = "normal";
  }
}
function show2() {
  let a1 = document.getElementById("asao");
  let a2 = document.getElementById("azhang");
  let s1 = document.getElementById("box1");
  let s2 = document.getElementById("box2");
  if (s2.style.display != "block") {
    s2.style.display = "block";
    s1.style.display = "none";
    a2.style.color = "#e4393c";
    a2.style.fontWeight = "bold";
    a1.style.color = "#666";
    a1.style.fontWeight = "normal";
  }
}
