'use strict';

var app = app || {};

app.Video = function(data) {

  this.event = $({});
  this.data;
  this.el;
  this.template = _.template($('#video-item-template').html());



  this.render = function() {
    this.el = $(this.template(this.data));

    this.event.trigger('video:rendered');
    app.VideoApp.event.trigger('video:rendered');
  };


  this.registerEvents = function() {
    var self = this;
    this.el.on('click', function() {
      app.VideoApp.event.trigger('player:loadVideo', self);
      app.VideoApp.event.trigger('playlist:selectVideo', self);
    });
  };

  this.initialize = function(data) {
    if(!data) return false;

    var self = this;

    this.data = data;

    this.event.on('video:rendered', function() {
      self.registerEvents();
    });

  };
  this.initialize(data);
};