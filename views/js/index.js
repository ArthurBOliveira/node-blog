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
                fireSequence += 4;
                console.log(fireSequence);
                
                $.ajax({
                    type: 'GET',
                    url: '/posts/' + fireSequence,
                    success: function (result) {
                        let template = $('#post-template').html();
                        let modalTemplate = $('#modal-template').html();

                        isEmpty = result.posts.length === 0 ? true : false;

                        for (let i = 0; i < result.posts.length; i++) {
                            let formattedTime = moment(result.posts[i].date).format('D/MMM/YY - h:mm a');

                            let html = Mustache.render(template, {
                                _id: result.posts[i]._id,
                                title: result.posts[i].title,
                                subTitle: result.posts[i].subTitle,
                                img: result.posts[i].img,
                                date: formattedTime
                            });

                            let html1 = Mustache.render(modalTemplate, {
                                _id: result.posts[i]._id,
                                title: result.posts[i].title,
                                subTitle: result.posts[i].subTitle,
                                img: result.posts[i].img,
                                date: formattedTime
                            });

                            $('#posts-container').append(html);
                            $('#Modals').append(html1);
                        }

                        return 0;
                    }
                });
            }
        }
    });
});