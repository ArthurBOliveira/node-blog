$(function () {
    var isEmpty = false;

    $(window).endlessScroll({
        inflowPixels: 100,
        fireOnce: true,
        fireDelay: false,
        ceaseFireOnEmpty: false,
        loader: '<div class="loading"><div>',
        ceaseFire: function() { return isEmpty; }, 
        callback: function (fireSequence, pageSequence) {
            if (pageSequence > 0) {
                fireSequence += 5;
                console.log(fireSequence);
                
                $.ajax({
                    type: 'GET',
                    url: '/posts/' + fireSequence,
                    success: function (result) {
                        let template = $('#post-template').html();

                        isEmpty = result.posts.length === 0 ? true : false;

                        for (let i = 0; i < result.posts.length; i++) {
                            let html = Mustache.render(template, {
                                title: result.posts[i].title,
                                subTitle: result.posts[i].subTitle,
                                img: result.posts[i].img,
                                date: result.posts[i].date
                            });

                            $('#posts-container').append(html);
                        }

                        return 0;
                    }
                });
            }
        }
    });
});