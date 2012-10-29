Controller = {
  
  controls: $('.controls').find('li'),
  
  dog: {
    self: $('#dog'),
    left: $('.left'),
    walking: $('.walking'),
    up: $('.up'),
    sniff: $('.sniff'),
    movementSpeed: 10
  },
  
  init: function() {
    Listeners.keyPressed();
    Listeners.controls();
  }
};

Listeners = {
  keyPressed: function() {
    
    $('body').keydown(function(e){
      var k = e.keyCode;
      var keyPressed = k;
 
      switch (keyPressed)
       {
         case 39:
           // console.log('right');
           Controller.dog.self.removeClass('left');
           Utility.walkDog();
           Utility.moveDog(true);
           
           break;
       
         case 37:
           // console.log('left');
           Controller.dog.self.addClass('left');
           Utility.walkDog();
           Utility.moveDog(false);
           break;
         
         case 38:
          Controller.dog.self.removeClass('walking');
          Controller.dog.self.addClass('up');
             // console.log('up');
           break;

         // case 40:
         //   // console.log('down');
         //   Utility.getDogLocation();
         //   $('#dog.walking').removeClass('walking');
         //   $('#dog.up').removeClass('up');
         //   $('#dog').addClass('down');
         //   break;
         
         default:
           // console.log('unused');
       }
       
       // keycheck
       Utility.keyChecker(k);
       Utility.getDogLocation();
      
    });
    
    $('body').keyup(function(e){
      Utility.idleDog();
      
    });
  },
  
  controls: function() {
    Controller.controls.click(function(){
       var self = $(this),
           control = self.attr('class');
           
    });
  }
};

Utility = {
  
  getDogLocation: function() {
    var loc = Controller.dog.self.position().left;
    Utility.locationChecker(loc);
  },
  
  idleDog: function() {
    Controller.dog.walking.css('-webkit-animation-play-state', 'paused');
    Controller.dog.self.css('-webkit-animation-play-state', 'paused');
    Controller.dog.self.removeClass('walking').removeClass('up');
    Controller.dog.self.addClass('idle');
    if(Controller.dog.self.hasClass('up') == true) {
      Controller.dog.sniff.css('-webkit-animation-play-state', 'paused');
    }
  },
  
  walkDog: function() {
    Controller.dog.self.removeClass('idle').removeClass('up');
    Controller.dog.self.addClass('walking');

  },
  
  keyChecker: function(k) {
    if(k == 37 || k == 39) {
       Controller.dog.walking.css('-webkit-animation-play-state', 'running');
     }
  },
  
  locationChecker: function(loc) {
    
    if(loc < -55) {
      Controller.dog.self.css('left', '954px');
    } else if( loc > 955) {
      Controller.dog.self.css('left', '-54px');
    } else {
      Controller.dog.self.css('left', loc);
    }
  },
  
  moveDog: function(isRight) {
    if(isRight == true) {
      Controller.dog.self.css({
        '-webkit-animation': 'moveRight '+Controller.dog.movementSpeed+'s infinite',
        '-webkit-animation-timing-function':'linear',
        '-webkit-animation-play-state':'running'
      });
    } else {
      Controller.dog.self.css({
        '-webkit-animation': 'moveLeft '+Controller.dog.movementSpeed+'s infinite',
        '-webkit-animation-timing-function':'linear',
        '-webkit-animation-play-state':'running'
      });
    }
  },
  
};
