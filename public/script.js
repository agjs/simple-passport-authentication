$('.authenticate').submit(function (event) {
    event.preventDefault();

    let user = {
        email: $(this).find('#email').val(),
        password: $(this).find('#password').val()
    };

    $.ajax({
        url: '/auth/login',
        type: 'POST',
        data: user
    }).done(function (user) {

        $.ajax('/api/users/me').done(function(me){
            for(let hike of me.hikes) {
                console.log(hike);
            }
        });

    }).fail(function (error) {
        console.log(error);
    });

});