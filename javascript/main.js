$(function () {

    // nav menu toggle:
    $('#menu-anchor')
        .click(function (e) {
            e.preventDefault();
            var $this = $(this);
            var target = $this.attr('href')
            if ($this.hasClass('active')) {
                $this.removeClass('active');
                $(target).hide();
            } else {
                $this.addClass('active');
                $(target).show();
            }
        })
});
