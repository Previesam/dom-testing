var content = document.querySelector(".content");
window.onload = () => {
  showDashboard();
};

var handleChange = (e) => {
    console.log(e.target.checked)
    if (e.target.checked) {
        alert("checked");
        return
    }

    alert("not checked")
    
}
