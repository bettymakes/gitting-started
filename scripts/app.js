'use strict';
var app = app || {};
(function($) {

    var _events = {};
    _events = $(_events);

    app.App = function(){
        this.url = "../data/playlist.json";
        this.$video = $('#video-container');
        this.$playlist = $('#playlist');

        this.event = _events;

        this.data = false;
        
        this.fetch = function(){
            var self = this;

            $.ajax({
                url: self.url,
                success: function(data) {
                    self.event.trigger('success', data);
                }
            })
        };

        this.appendVideoItem = function(){
            var self = this;

            _.forEach(self.data, function(val){
                self.event.trigger('video:added', val);
            });
        };


        this.renderVideoPlayer = function(video){
            var self = this,
                video = video.data.video,
                template = _.template($('#player-template').html()),
                playerHTML = template(video);

            self.$video.html(playerHTML);
        };

        this.addVideo = function(data){
            var self = this,
                video = new app.Video(data);

            this.videoCollection.push(video);

            video.render();

            self.$playlist.append(video.el);
        };

        this.createPlaylist = function(data) {
            var playlist = new app.Playlist(data);

            this.playlist = playlist;
        };

        this.initialize = function() {
            var self = this;
            this.fetch();

            this.event.on('success', function(event, data) {
                // On success, create playlist and render videoplayer
                self.createPlaylist(data);
                self.renderVideoPlayer(self.playlist.videoCollection[0]);
            });

            this.event.on('video:added', function(event, data) {
                self.addVideo(data);
            });

            this.event.on('player:loadVideo', function(event, video) {
                self.renderVideoPlayer(video);
            });

        };
    };

    
})(jQuery);