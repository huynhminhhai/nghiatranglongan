$(document).ready(function () {

    flatpickr("#input-datetime", {
        enableTime: true,
        dateFormat: "d-m-Y H:i",
        minDate: "today"
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

    $('.popup-success .close').click(function () {
        $('.popup-success').removeClass('active')
        $('.popup-blur').removeClass('active')
    });

    $('.popup-blur').click(function () {
        $('.popup.register').removeClass('active')
        $('.popup-memos').removeClass('active')
        $('.popup-blur').removeClass('active')
        $('.popup-success').removeClass('active')
    });

    // PAGINATION

    function createPagination(totalPages, currentPage, container) {
        let str = '<ul>';
        let active;
        let pageCutLow = currentPage - 1;
        let pageCutHigh = currentPage + 1;

        // Show the Previous button and disable it if on the first page
        str += `<li class="page-item previous ${currentPage === 1 ? 'disabled' : ''}">
                    <a href="#" data-page="${currentPage - 1}" ${currentPage === 1 ? 'tabindex="-1" aria-disabled="true"' : ''}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M15.3398 18L9.33984 12L15.3398 6" stroke="#313131" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </a>
                </li>`;

        // Show all the pagination elements if there are less than 6 pages total
        if (totalPages < 6) {
            for (let p = 1; p <= totalPages; p++) {
                active = currentPage === p ? "active" : "inactive";
                str += `<li class="page-item ${active}"><a href="#" data-page="${p}">${p}</a></li>`;
            }
        }
        // Use "..." to collapse pages outside of a certain range
        else {
            // Show the very first page followed by a "..." at the beginning of the pagination section
            if (currentPage > 2) {
                str += `<li class="inactive page-item"><a href="#" data-page="1">1</a></li>`;
                if (currentPage > 3) {
                    str += `<li class="out-of-range"><a href="#" data-page="${currentPage - 2}">...</a></li>`;
                }
            }

            // Adjust page range to show before and after the current page
            if (currentPage === 1) {
                pageCutHigh += 2;
            } else if (currentPage === 2) {
                pageCutHigh += 1;
            }
            if (currentPage === totalPages) {
                pageCutLow -= 2;
            } else if (currentPage === totalPages - 1) {
                pageCutLow -= 1;
            }

            // Output the indexes for pages that fall inside the range
            for (let p = pageCutLow; p <= pageCutHigh; p++) {
                if (p <= 0) p = 1; // Prevent negative page numbers
                if (p > totalPages) continue; // Skip pages that don't exist

                active = currentPage === p ? "active" : "inactive";
                str += `<li class="page-item ${active}"><a href="#" data-page="${p}">${p}</a></li>`;
            }

            // Show the very last page preceded by a "..." at the end of the pagination
            if (currentPage < totalPages - 1) {
                if (currentPage < totalPages - 2) {
                    str += `<li class="out-of-range"><a href="#" data-page="${currentPage + 2}">...</a></li>`;
                }
                str += `<li class="page-item inactive"><a href="#" data-page="${totalPages}">${totalPages}</a></li>`;
            }
        }

        // Show the Next button and disable it if on the last page
        str += `<li class="page-item next ${currentPage === totalPages ? 'disabled' : ''}">
                    <a href="#" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'tabindex="-1" aria-disabled="true"' : ''}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M9.33984 18L15.3398 12L9.33984 6" stroke="#313131" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </a>
                </li>`;

        str += '</ul>';
        container.innerHTML = str;

        // Add event listeners for pagination links
        const pageLinks = container.querySelectorAll('a');
        pageLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();

                // Kiểm tra nếu link thuộc phần tử bị vô hiệu hóa
                const parent = link.parentElement;
                if (parent.classList.contains('disabled')) {
                    return; // Bỏ qua nếu bị disabled
                }

                const targetPage = parseInt(link.getAttribute('data-page'));
                console.log(targetPage)
                createPagination(totalPages, targetPage, container);
            });
        });

        return str;
    }

    // PAGINATION NEWS

    // Xử lý khi click vào các trang
    $('.pagi-page').on('click', function () {
        // Loại bỏ class 'active' khỏi trang hiện tại
        $('.pagi-page.active').removeClass('active');
        // Thêm class 'active' vào trang được chọn
        $(this).addClass('active');
    });

    // Xử lý nút "Prev"
    $('.pagi-prev').on('click', function () {
        const current = $('.pagi-page.active');
        const prev = current.prev('.pagi-page');
        if (prev.length) {
            current.removeClass('active');
            prev.addClass('active');
        }
    });

    // Xử lý nút "Next"
    $('.pagi-next').on('click', function () {
        const current = $('.pagi-page.active');
        const next = current.next('.pagi-page');
        if (next.length) {
            current.removeClass('active');
            next.addClass('active');
        }
    });

    // Initialize pagination for all elements with class 'pagination-custom'
    document.querySelectorAll('.pagination-custom').forEach(paginationElement => {
        const totalPages = parseInt(paginationElement.getAttribute('data-page')) || 1;  // data-page holds total number of pages
        const initialPage = 1;  // Default to page 1
        createPagination(totalPages, initialPage, paginationElement);
    });


    // update select month

    const currentMonth = new Date().getMonth() + 1;

    // Gán giá trị cho select
    $('#filter-month').val(currentMonth);

    // Cập nhật text number theo giá trị đã chọn
    const updateMonthText = () => {
        const selectedMonth = $('#filter-month').val(); // Lấy giá trị được chọn
        $('#month-value').text(selectedMonth); // Cập nhật text
    };

    // Cập nhật giá trị ngay khi trang load
    updateMonthText();

    // Lắng nghe sự kiện thay đổi giá trị của select
    $('#filter-month').on('change', function () {
        updateMonthText();
    });

    $('.memos-item').each(function () {
        const $this = $(this); // Container hiện tại
        const $slider = $this.find('.popup-memos-imgs'); // Slider trong container này
        const $prevArrow = $this.find('.btn-prev'); // Nút prev của slider này
        const $nextArrow = $this.find('.btn-next'); // Nút next của slider này

        // Khởi tạo slick slider
        $slider.slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            prevArrow: $prevArrow,
            nextArrow: $nextArrow,
        });
    });

    $('.group-popup-memos').each(function () {
        const $this = $(this); // Container hiện tại
        const $slider = $this.find('.popup-memos-imgs'); // Slider trong container này
        const $prevArrow = $this.find('.btn-prev'); // Nút prev của slider này
        const $nextArrow = $this.find('.btn-next'); // Nút next của slider này

        // Khởi tạo slick slider
        $slider.slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            prevArrow: $prevArrow,
            nextArrow: $nextArrow,
        });
    });

    $('.memos-item').click(function () {
        $(this).find('.popup-memos').addClass('active')
        $('.popup-blur').addClass('active')
    })

    $('.popup-memos .close').click(function (event) {
        event.stopPropagation()
        $('.popup-memos').removeClass('active')
        $('.popup-blur').removeClass('active')
    });

    $('.btn-popup-memos').click(function () {
        let tdElement = $(this).parent()

        $(tdElement).find('.popup-memos').addClass('active')
        $('.popup-blur').addClass('active')
    })

    // TABLE LIST

    $('.filter-container .filter-toggle').click(function () {
        $(this).toggleClass('active')
        $('.filter-container .filter-wrap').slideToggle()
    })

    // SCROLL TO TOP

    const $scrollToTop = $('.scroll-to-top');

    // Hiện hoặc ẩn nút khi cuộn trang
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 200) { // Hiện nút khi cuộn quá 200px
            $scrollToTop.fadeIn();
        } else {
            $scrollToTop.fadeOut();
        }
    });

    // Xử lý sự kiện click để cuộn lên đầu trang
    $scrollToTop.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 500); // Cuộn mượt lên top trong 500ms
    });

    // FORM

    jQuery.validator.addMethod(
        "phoneNumber",
        function (value, element) {
            if (/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value)) {
                return true;
            } else {
                return false;
            }
        },
        "Vui lòng nhập số điện thoại hợp lệ."
    );

    $("#form-register").validate({
        rules: {
            visitorName: {
                required: true,
            },
            phoneNumber: {
                required: true,
                phoneNumber: true,
            },
            datetimeRegister: {
                required: true,
            }
        },
        messages: {
            visitorName: {
                required: "Họ tên không được trống",
            },
            phoneNumber: {
                required: "SĐT không được trống",
            },
            datetimeRegister: {
                required: "Thời gian không được trống",
            }
        },
        submitHandler: function (form, e) {
            e.preventDefault();
            console.log("Form hợp lệ! Đã gửi.");
            // Xử lý logic khi form hợp lệ

            $('.popup.register').removeClass('active')
            $('.popup-success').addClass('active')

            $("input").val("");
            $("select").prop("selectedIndex", 0);
            $('#imagePreviewContainer .image-wrapper').remove()
        },
    });

});
