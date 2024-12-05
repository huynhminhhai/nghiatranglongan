$(document).ready(function () {

    flatpickr("#input-datetime", {
        enableTime: true,
        dateFormat: "d-m-Y H:i",
    });

    $("#input-datetime").removeAttr('readonly')

    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })

    var selectedFiles = [];  // Mảng để lưu trữ các file đã chọn

    // Khi nhấn vào nút "Thêm hình ảnh mới"
    $('#addImageBtn').click(function () {
        $('#input-img').click();
    });

    // Khi người dùng chọn file
    $('#input-img').change(function (event) {
        var files = event.target.files;
        var imagePreviewContainer = $('#imagePreviewContainer');

        // Lặp qua các file đã chọn và hiển thị ảnh
        $.each(files, function (index, file) {
            // Thêm file vào mảng
            selectedFiles.push(file);

            var reader = new FileReader();
            reader.onload = function (e) {
                var imgWrapper = $('<div></div>').addClass('image-wrapper');
                var imgElement = $('<img>').attr('src', e.target.result).addClass('image-preview');
                var removeBtn = $('<div><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path fill="#fff" fill-rule="evenodd" d="M6.793 6.793a1 1 0 0 1 1.414 0L12 10.586l3.793-3.793a1 1 0 1 1 1.414 1.414L13.414 12l3.793 3.793a1 1 0 0 1-1.414 1.414L12 13.414l-3.793 3.793a1 1 0 0 1-1.414-1.414L10.586 12L6.793 8.207a1 1 0 0 1 0-1.414" clip-rule="evenodd"/></svg></div>').addClass('remove-btn');

                // Khi nhấn vào nút xóa
                removeBtn.click(function () {
                    // Loại bỏ file khỏi mảng
                    var fileIndex = selectedFiles.indexOf(file);
                    if (fileIndex !== -1) {
                        selectedFiles.splice(fileIndex, 1);
                    }

                    // Xóa hình ảnh khỏi giao diện
                    imgWrapper.remove();

                    console.log('File sau khi xóa:', selectedFiles);  // Kiểm tra lại các file còn lại
                });

                imgWrapper.append(imgElement);
                imgWrapper.append(removeBtn);

                // Thêm ảnh vào container
                imagePreviewContainer.prepend(imgWrapper);
            };

            reader.readAsDataURL(file);
        });

        console.log('Danh sách file đã chọn:', selectedFiles);  // In ra danh sách các file đã chọn
    });

    $('.btn-register').click(function () {
        $('.popup.register').addClass('active')
        $('.popup-blur').addClass('active')
    });

    $('.popup .close').click(function () {
        $('.popup.register').removeClass('active')
        $('.popup-blur').removeClass('active')
    });
});
