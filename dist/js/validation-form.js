
$(document).ready(function() {
    $(".calculate-form").validate({
        rules: {

            plant: {
                required: true
            },

            fertility: {
                number: true,
                required: true
            },

            cost: {
                number: true,
                required: true
            },
            area: {
                number: true,
                required: true
            }
        },
        messages: {
            plant: {
                required: "Выберити сорт культуры"
            },
            fertility: {
                number: "Значение должно быть цифровым",
                required: "Укажите урожайность"
            },
            cost: {
                number: "Укажите стоимость",
                required: "Введите сайт"
            },
            area: {
                number: "Значение должно быть цифровым",
                required: "Укажите посевную площадь"
            }
        }
    });
});