$(function () {
    $(window).endlessScroll({
        inflowPixels: 100,
        fireOnce: false,
        fireDelay: false,
        ceaseFireOnEmpty: false,
        loader: '<div class="loading"><div>',
        callback: function (fireSequence, pageSequence) {
            if (pageSequence > 0) {
                console.log(pageSequence);
                
                $.ajax({
                    type: 'GET',
                    url: '/posts/' + fireSequence,
                    success: function (result) {
                        let template = $('#post-template').html();

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