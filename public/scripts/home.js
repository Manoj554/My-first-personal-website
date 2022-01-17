function run(data) {
    console.log('I am Working');
    setTimeout(() => {
        window.location.href = window.location.href + '#sendmessage';
    }, data);
}

function log() {
    window.location.href = window.location.href + 'login';
}

function ShowMenu(){
    var x = document.getElementById("mynav");
    let z=x.querySelector('.fa');
    if (x.className === "nav") {
       x.className += " responsive";
       z.classList.remove('fa-bars');
       z.classList.add('fa-close');
    }else{
       x.className = "nav";
       z.classList.remove('fa-close');
       z.classList.add('fa-bars');
  }
}
var mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 23 || document.documentElement.scrollTop > 23) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

//Text Animation
var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 100 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

function text() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #0000ff}";
    document.body.appendChild(css);
};