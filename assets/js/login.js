$(document).ready(function () {
    jQuery.validator.addMethod(
        "passwordCheck",
        function (value, element) {
            // In giá trị nhập để kiểm tra
            console.log("Password being validated:", value);
            // Kiểm tra xem có ít nhất 6 ký tự
            return value && value.length >= 6;
        },
        "Mật khẩu phải từ 6 ký tự" // Thông báo lỗi khi không hợp lệ
    );
    
    $("#form-login").validate({
        rules: {
            password: {
                required: true, // Bắt buộc phải nhập
                passwordCheck: true, // Áp dụng custom rule
            },
            username: {
                required: true, // Bắt buộc phải nhập
            },
        },
        messages: {
            username: {
                required: "Chưa nhập tài khoản", // Thông báo lỗi cho username
            },
            password: {
                required: "Chưa nhập mật khẩu", // Thông báo lỗi cho trường mật khẩu bỏ trống
            },
        },
        submitHandler: function (form, e) {
            e.preventDefault(); // Ngăn gửi form mặc định
            console.log("Form hợp lệ! Đã gửi.");
            // Xử lý logic khi form hợp lệ
        },
    });

    $(".toggle-pw").on("click", function () {
        const passwordInput = $("#password");
        const toggleIcon = $(this).find(".toggle-icon");

        // Toggle type giữa password và text
        if (passwordInput.attr("type") === "password") {
            passwordInput.attr("type", "text");
            toggleIcon.attr("src", "./assets/images/mdi--eye-off.svg"); // Thay đổi icon thành "mắt đóng"
        } else {
            passwordInput.attr("type", "password");
            toggleIcon.attr("src", "./assets/images/mdi--eye.svg"); // Thay đổi icon thành "mắt mở"
        }
    });
    
})