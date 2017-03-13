$(document).ready(function() {

    $('.calculate-form').validate({
        highlight: function(element, errorClass) {
            $(element).fadeOut(function() {
                $(element).fadeIn();
            });
        }
    });

    $("calculate-form__field").rules("add", {
        required: true,
        messages: {
            required: "Please fill in this field"
        }
    });

});