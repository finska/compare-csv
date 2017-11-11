$(document).ready(function () {
    $("#choose_parameter_old").click(function (e) {
        e.preventDefault();
        var address = $("input[name='csv_file_old']").val();
        $.ajax({
            method: "POST",
            url: "/ajax/headers_old",
            data: {csv_file_old: address},
            success: function (data) {
                $("#div-choose-old").html(`<select class="form-control" name="select_header_old" id="select-old"></select>`);
                $.each(data.headers_old,function (index,val) {
                    $("#select-old").append(`<option value="${val}">${val}</option>`);
                });

            }
        });
    });
    $("#choose_parameter_new").click(function (e) {
        e.preventDefault();
        var address = $("input[name='csv_file_new']").val();
        $.ajax({
            method: "POST",
            url: "/ajax/headers_new",
            data: {csv_file_new: address},
            success: function (data) {
                $("#div-choose-new").html(`<select class="form-control" name="select_header_new" id="select-new"></select>`);
                $.each(data.headers_new,function (index,val) {
                    $("#select-new").append(`<option value="${val}">${val}</option>`);
                });
            }
        });
    });
});
