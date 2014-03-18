var TapHold = function(options) {
  this.timers = {};
  this.urlObject = {};
  this.debug = options['debug'];
  return this;
};
TapHold.prototype = {
  start: function(identifier, urlObject){
    this.urlObject = urlObject;
    var self = this;
    this.timers[identifier] = setTimeout(function(){
      self.finish(identifier);
    }, 750);
  },
  cancel: function(identifier){
    if (!!this.timers[identifier]) {
      clearTimeout(this.timers[identifier]);
      delete this.timers[identifier];
    }
  },
  cancelAll: function(){
    for (var identifier in this.timers) {
      this.cancel(identifier);
    }
  },
  finish: function(identifier){
    this.cancelAll();
    // {href: "http://examle.com/", src: "http://example.com/foo.jpg"}
    if (this.debug) {
      console.log(JSON.stringify(this.urlObject));
    } else {
      taphold_url = "taphold://" + JSON.stringify(this.urlObject);
      document.location = taphold_url;
    }
  },
  activate: function(){
    var elements = document.querySelectorAll('a, img');
    for (var i = 0, l = elements.length; i < l; i++) {
      var item = elements[i];
      var obj = {};
      if (item.tagName === 'IMG') {
        obj['src'] = item.src;
        var parent = item.parentNode;
        if (parent && parent.tagName == 'A') {
          obj['href'] = parent.href;
        }
      } else if (item.tagName === 'A') {
        obj['href'] = item.href;
        var img = item.querySelector('img');
        if (img) {
          obj['src'] = img.src;
        }
      }
      var self = this;
      (function (node, identifier, urlObject) {
        node.addEventListener('touchstart', function(event){
          self.start(identifier, urlObject);
        });
        node.addEventListener('touchcancel', function(event){
          self.cancel(identifier);
        });
        node.addEventListener('touchend', function(event){
          self.cancel(identifier);
        });
        node.addEventListener('touchmove', function(event){
          self.cancel(identifier);
        });
      })(item, i, obj);
    }
  }
};
