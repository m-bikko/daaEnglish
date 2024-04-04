const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    var planButtons = document.querySelectorAll('.plan-button');
    planButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            planButtons.forEach(function(btn) {
                btn.style.backgroundColor = '#f0f0f0';
                btn.style.fontWeight = '400';
            });
            this.style.backgroundColor = '#ddd';
            this.style.fontWeight = '600';
        });
    });

    var planInfos = document.querySelectorAll('.plan-info');
    planInfos.forEach(function(info) {
        info.style.display = 'none';
    });
});

function togglePlan(course, plan) {
    var planInfos = document.querySelectorAll('.' + course +'-plan-info');
    planInfos.forEach(function(info) {
        info.style.display = 'none';
    });
    var elemToChange = document.getElementById(course + '-' + plan + '-info');
    elemToChange.style.display = 'flex';
}