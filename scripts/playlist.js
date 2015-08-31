'use strict';
var app = app || {};

app.Playlist = function(data) {
    this.$el = $('#playlist');
    this.videoCollection = [];
    this.data;
    this.currentVideo;

    this.appendVideoItem = function(video) {
        video.render();
        var $videoItem = video.el;

        this.$el.append($videoItem);
    };

    this.render = function() {
        var self = this;
        _.forEach(self.data, function(videoObj){
            var video = new app.Video(videoObj);
            self.appendVideoItem(video);

            // Pushing each new video that was instantiated into an array
            self.videoCollection.push(video);
        });
    };

    this.storeCurrentVideo = function(video) {
        var self = this;

        self.currentVideo = video;
    };

    this.setActiveVideo = function(selected) {
        var self = this;

        self.currentVideo.el.removeClass('active');
        selected.el.addClass('active');
    }

    this.selectActiveVideo = function(selected){
        var self = this;

        if(!self.currentVideo) {
            self.storeCurrentVideo(selected);
            self.setActiveVideo(selected);
        } else {
            self.setActiveVideo(selected);
            self.storeCurrentVideo(selected);
        }
    };

    this.initialize = function(data){
        var self = this;
        self.data = data.videos;

        app.VideoApp.event.on('playlist:selectVideo', function(event, selected) {
            self.selectActiveVideo(selected);
        });

        // Populates playlist with video items and renders to the DOM by
        // attaching  to #playlist element
        self.render();

        // Select the first video in the playlist, set it as active
        self.selectActiveVideo(self.videoCollection[0]);
    };

    this.initialize(data);
};