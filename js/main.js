//===================================
let body = document.body;
let land = document.querySelector( '.land' );
let header = document.querySelector( 'header' );
let about = document.getElementById( 'about' );
//===================================


//===================================
//change background
//===================================
let imgs = [ 'images/img1.jpg','images/img2.jpg','images/img3.jpg','images/img4.jpg','images/img5.jpg' ];
let changeImg = setInterval(change, 5000 );
function change() {
  let rand = Math.floor( Math.random() * 3 + 2 );
  land.style.cssText = `background-image:url(../images/img${ rand }.jpg)`;
}
clearInterval(changeImg)


//===================================
// class active to links
//===================================
let links = document.querySelectorAll( 'header .links li' );
links.forEach( element => {
  // on click add class active
  element.onclick = function () {
    for ( li of links ) {
      li.classList.remove('active')
    }
    this.classList.add('active')
  }
} );


//===================================
// toggle menu
//===================================
let toggleMenu = document.getElementById( 'toggle-menu' );
let menu = document.querySelector('.links')
toggleMenu.onclick = function (e) {
  menu.classList.toggle( 'open' );
  e.stopPropagation()
}
  //remove class open on resize window
window.onresize = function () {
  if ( window.innerWidth > 991 ) {
    if ( menu.classList.contains( 'open' ) ) {
      menu.classList.remove( 'open' );
    }
  }
}
//   // close menu on click anywhere
document.addEventListener( 'click', function ( e ) {
  if(e.target != toggleMenu && e.target != menu.querySelector('ul'))
  if ( menu.classList.contains( 'open' ) ) {
    menu.classList.remove( 'open' );
  }
})







//================================================================================
//                                   settings
//===============================================================================
  //============================
  // icon
  //============================
let settings = document.querySelector( '.settings .icon' );
settings.onclick = function () {
  document.querySelector( '.settings ').classList.toggle( 'move' );
  document.querySelector( '.fa-cog' ).classList.toggle('fa-spin');
  document.querySelector( '.settings ').classList.contains( 'move' ) ? body.style.paddingLeft = (document.querySelector('.settings.move').offsetWidth +'px') : body.style.paddingLeft = 0;
};

  // =====================
  // range
  // =====================
let range = document.querySelectorAll( '.settings .background .box input' );
let rangeNumber = document.querySelectorAll('.settings label .range-number')
let con, hue, brightness;
range.forEach(inp => {
  inp.oninput = function () {
    this.previousElementSibling.children[1].innerHTML = this.value;
    let name = this.id;
    switch ( name ) {
      case 'contrast':
        con = this.value;
        break;
      case 'hue-rotate':
        hue = this.value;
        break;
      case 'brightness':
        brightness = this.value;
        break;
    }
    land.style.cssText = `filter: contrast(${ con || 100 }%) hue-rotate(${ hue || 0 }deg) brightness(${ brightness || 100 }%) `;
  }
});

document.getElementById( 'reset-inputs' ).onclick = function () {
  range.forEach(inp => {
    inp.value = inp.defualtValue;
  } );
  land.style.cssText = 'filter: none';
  rangeNumber.forEach(element => {
    element.innerHTML = element.getAttribute( 'data-range' );
  }); 
}


  //============================
  // colors
  //============================
let colors = document.querySelectorAll( '.settings .colors-list li' );
colors.forEach( el => {
  el.addEventListener('click', function ( e ) {
    // get color
    let color = e.target.dataset.color;
    // set color as main-color in root
    document.documentElement.style.setProperty( '--main-color', color );
    //set color in local storage
    localStorage.setItem( 'color',color );
    // remove class Active
    e.target.parentElement.querySelectorAll( '.active' ).forEach(element => {
      element.classList.remove( 'active' );
    } );
    // add class Active
    e.target.classList.add( 'active' );
    colorInput.value = '#000'
  } );
} );


// to let user choose color
let colorInput = document.getElementById("choose-color");
colorInput.addEventListener('input', function () {
  localStorage.setItem( 'color', this.value );
  document.documentElement.style.cssText = '--main-color:' + this.value;
  //remove class active from li colors
  colors.forEach(element => {
    element.classList.remove( 'active' );
  });
} )





//============================
// random background
//============================
let randBG = document.querySelectorAll( '.option-box .rand-background span' );
randBG.forEach( element => {
  element.addEventListener( 'click',function (  ) {
    // stop || restart changeImg
    if ( this.classList.contains( 'no' ) ) {
      clearInterval(changeImg)
    } else {
      changeImg = setInterval(change, 5000 );
    }
    //remove class active
    randBG.forEach(element => {
      element.classList.remove( 'active' );
    });
    //add class active
    this.classList.add( 'active' );
    // local storage
    localStorage.setItem('rand', this.id)
  } )
} );





//============================
//show bullets
//============================
let showBullets = document.querySelectorAll( '.settings .show-bullets span' );
// get bullets
let bullets = document.querySelector( '.nav-bullets' );
showBullets.forEach(element => {
  element.onclick = function () {
    if ( this.classList.contains( 'yes' ) ) {
      // show bullets 
      bullets.classList.remove( 'hidden' );
      // remove class active from silbings
      this.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove( 'active' );
      } );
      // add class active
      this.classList.add( 'active' );
    } else {
      // hide bullets
      bullets.classList.add( 'hidden' );
      // remove class active from silbings
      this.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove( 'active' );
      } );
      // add class active
      this.classList.add( 'active' );
    }
    // save in local storage
    localStorage.setItem( 'showBullets',this.classList.item( 0 ) )
    console.log(this.classList.item(0))
  }
} );

//===========================================
// reset
//===========================================
document.getElementById( 'reset' ).onclick = function () {
  localStorage.removeItem( 'color' );
  localStorage.removeItem( 'rand' );
  localStorage.removeItem( 'showBullets' );
  window.location.reload()
}

function settingsLocalStorage() {
  //=========================
  // colors
  //=========================
  document.documentElement.style.cssText = '--main-color:' + ( localStorage.getItem( 'color' ) || '#ff055a' );
  // add class active to li which dataset.color === localStorage.getItem( 'color' )
  if ( localStorage.getItem( 'color' ) !== null ) {
    //remove class active 
    colors.forEach( el => {
      el.classList.remove( 'active' );
      if ( el.dataset.color === localStorage.getItem( 'color' ) ) {
        el.classList.add( 'active' );
      }
    } );
  }
  //=========================
  // random background
  //=========================
  if ( localStorage.getItem( 'rand' ) === 'no' ) {
    clearInterval( changeImg );
    document.getElementById( 'no' ).classList.add( 'active' );
    document.getElementById( 'yes' ).classList.remove( 'active' );
  } else if(localStorage.getItem('rand') === 'yes') {
    changeImg = setInterval( change,5000 );
    document.getElementById( 'no' ).classList.remove( 'active' );
    document.getElementById( 'yes' ).classList.add( 'active' );
  }
  //=========================
  // bullets
  //=========================
  if ( localStorage.getItem( 'showBullets' ) == 'no' ) {
    document.querySelector( '.settings .show-bullets .no' ).classList.add( 'active' );
    document.querySelector( '.settings .show-bullets .yes' ).classList.remove( 'active' );
    bullets.classList.add('hidden')
  }
}
settingsLocalStorage()
//================================================================================
//                             end settings
//================================================================================



console.log(localStorage.getItem('rand'))

// ====================================
// skills
// ====================================
let skills = document.getElementById('skills')
let progress = Array.from( document.getElementsByClassName('skill-progress') );
window.addEventListener( 'scroll',() => {
  progress.forEach( el => {
    if ( this.scrollY >= (skills.offsetTop  +skills.offsetHeight - this.innerHeight)) {
      el.style.width = el.dataset.width;
    } else {
      el.style.width = '0';
    }
    if ( this.scrollY >= ( skills.offsetTop + skills.offsetHeight ) ) {
      el.style.width = '0'
    }
  })
} );

// add class active on scroll
let sections = document.querySelectorAll('.section')
window.addEventListener( 'scroll',function () {
  sections.forEach( el => {
    if ( this.scrollY >= ( el.offsetTop - header.offsetHeight - 100) ) {
      links.forEach( element => {
        if ( element.dataset.link == el.id ) {
          element.click()
        }
      });
    }
  })
} );







//===================================
// Popup
//===================================
let gallery = document.querySelectorAll( '.gallery img' );
gallery.forEach(img => {
  img.addEventListener( 'click',function (e) {
    //create overlay Element
    let popupOverlay = document.createElement( 'div' );
    // add class
    popupOverlay.classList.add( 'popup-overlay' );
    // append
    body.append( popupOverlay );
    // popupBox
    let popupBox = document.createElement( 'div' );
    //add class
    popupBox.classList.add( 'popup-box' );
    // append
    popupOverlay.append(popupBox)
    // add img to popup
    popupBox.append( this.cloneNode() );
    // if alt exist
    if ( this.alt !== null ) {
      // Create heading
      let imgHeading = document.createElement( 'h3' );
      // text
      imgHeading.textContent = this.alt;
      // append
      popupBox.prepend( imgHeading );
    }
    // create close span
    let closeButton = document.createElement( 'span' );
    // text
    closeButton.textContent = 'X';
    // add class
    closeButton.classList.add( 'close' );
    // append
    popupBox.append( closeButton );
    // close on click
    closeButton.addEventListener( 'click',function () {
      this.parentElement.parentElement.remove();
    } )
    // on press enter remove popup
    document.onkeydown = function (e) {
      if ( e.key == 'Enter' ) {
        popupOverlay.remove()
      }
    }
  })
} );









//===================================================
// add background #fff to header on scroll 
//===================================================
let lastScrollTop = 0;
window.addEventListener( 'scroll',function () {
  if ( this.scrollY > lastScrollTop ) {
    header.classList.remove( 'fixed' );
    header.classList.add( 'hidden' );
  } else {
    header.classList.remove( 'hidden' );
    header.classList.toggle( 'fixed', this.scrollY > land.offsetHeight );
  }
  lastScrollTop = this.scrollY
} );






//======================================
//timeLine
//======================================
let timeLine = document.querySelector( '.timeline' );
let boxes = Array.from( document.querySelectorAll( '.timeLine-box' ) );
window.addEventListener( 'scroll',function () {
  // bottom = (box location) - (this.scrollY) - ( window height- box height - (200px to able to see) )
  let bottom = timeLine.parentElement.offsetTop - this.scrollY - ( this.innerHeight - timeLine.offsetHeight - boxes[ 0 ].offsetHeight );
  boxes.forEach( element => {
      if(this.scrollY > (element.offsetTop + element.parentElement.offsetTop - this.innerHeight)){
        element.classList.add( 'active' );
        document.documentElement.style.setProperty('--bottom', bottom+'px' )
      } else {
        element.classList.remove('active')
      }
    });
} );




//======================================
// testimonials mousemove
//======================================
// select testi parent
let testi = document.getElementById( 'testi' );
// select cursor
let cursor = document.querySelector( '.testi .cursor' );
testi.onmouseenter = function () {
  cursor.style.opacity = '1'
}
testi.onmouseleave = function () {
  cursor.style.opacity = '0'
}
document.addEventListener( 'mousemove',function (e) {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
} );
// user icon 
Array.from( document.querySelectorAll( '.testi-user' ) ).forEach( element => {
  // onmouseenter
  element.onmouseenter = function () {
    cursor.classList.add( 'activeUser' );
  }
  // onmouseleave
  element.onmouseleave = function () {
    cursor.classList.remove( 'activeUser' );
  }
});
// social media icons
Array.from( document.querySelectorAll( '.testi-icons i' ) ).forEach( element => {
  // onmouseenter
  element.onmouseenter = function () {
    cursor.classList.add('active')
  }
  // onmouseleave
    element.onmouseleave = function () {
    cursor.classList.remove('active')
  }
} );


//===========================
// contact us 
//===========================

  // email
document.getElementById( 'email' ).onkeyup = function () {
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if ( this.value.match( pattern ) ) {
    this.parentElement.classList.add( 'valide' );
    this.parentElement.classList.remove( 'invalide' );
  } else {
    this.parentElement.classList.remove( 'valide' );
    this.parentElement.classList.add( 'invalide' );
  }
  if ( this.value == '' ) {
    this.parentElement.classList.remove('valide')
    this.parentElement.classList.remove('invalide')
  }
};

  // message 
document.getElementById( 'message' ).oninput = function () {
  this.parentElement.dataset.message = this.value.length;
  this.parentElement.classList.add( 'count' );
};

const el = document.querySelector('img');
const observer = lozad(document.querySelectorAll('img')); // passing a `NodeList` (e.g. `document.querySelectorAll()`) is also valid
observer.observe();
