$('#post-form').submit(function (e) {
    e.preventDefault();

    $('#submit').attr('disabled', 'disabled');  
    $("#status").empty().text("File is uploading...");    

    $(this).ajaxSubmit({
        type: 'POST',
        url: '/post/',  
        success: function (result) {
            console.log(result);
            $('#submit').removeAttr('disabled');

            let template = $('#post-template').html();            

            let html = Mustache.render(template, {
                title: result.title,
                subTitle: result.subTitle,
                img: result.img,
                date: result.date
            });

            $('#posts-container').append(html);
        }
    });

    return false;
});