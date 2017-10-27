$(document).ready(function () {
    $(window).endlessScroll({
        inflowPixels: 300,
        callback: function () {
            // $.ajax({
            //     url: "/posts",
            //     context: document.body
            // }).done(function (result) {
            //     console.log(result);
            // });

            // $.ajax({url: "demo_test.txt", success: function(result){
            //     $("#div1").html(result);
            // }});

            $.ajax({
                type: 'GET',
                url: '/posts',
                success: function (result) {
                    console.log(result);
                }
            });

            // var $img = $('#images li:nth-last-child(5)').clone();
            // $('#images').append($img);
        }
    });
});