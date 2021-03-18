var showDashboard = async (e) => {
  var activeLink = document.querySelectorAll(".active");
  activeLink.forEach((el) => {
    el.classList.remove("active");
  });
  classList = e.target.classList;
  classList.toggle("active");
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      content.innerHTML = xhr.response;
      window.history.replaceState("Dashboard", "Dashboard", "/");
    }
  };
  await xhr.open("GET", "dashboard/index.html", true);
  xhr.responseText = "document";
  await xhr.send();
};
