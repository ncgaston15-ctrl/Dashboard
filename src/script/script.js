function setDate(){
    let dashboardDate = new Date().toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    document.getElementById("dateDisplay").textContent = dashboardDate;
}

const menuToggle = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

menuToggle.addEventListener('click', function () {
    navList.classList.toggle('active');
});

setDate();
setInterval(setDate, 60000)