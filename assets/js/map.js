$(document).ready(function () {
    const data = {
        "center_lat": 10.562878467161077,
        "center_lng": 106.41832828251137,
        "zoom": 21,
        "listKhu": [
            { "name": "B1", "lat": 10.5624051196387, "lng": 106.418150737882 },
            { "name": "B2", "lat": 10.5626920634716, "lng": 106.417996510863 },
            { "name": "B3", "lat": 10.5625225357682, "lng": 106.417857035995 },
            { "name": "B4", "lat": 10.5630338573036, "lng": 106.417910009623 },
            { "name": "B5", "lat": 10.5628517966225, "lng": 106.417778581381 },
            { "name": "B6", "lat": 10.5626763322408, "lng": 106.417643129826 },
            { "name": "B7", "lat": 10.5631723816626, "lng": 106.417723596096 },
            { "name": "B8", "lat": 10.5629929596237, "lng": 106.417584121227 },
            { "name": "B9", "lat": 10.5628108989184, "lng": 106.417443305254 },
            { "name": "C1", "lat": 10.5631600788019, "lng": 106.418799161911 },
            { "name": "C2", "lat": 10.56329200671, "lng": 106.41843572259 },
            { "name": "C4", "lat": 10.563276175364, "lng": 106.418088376522 },
            { "name": "C5", "lat": 10.5634463622907, "lng": 106.418217122555 },
            { "name": "C6", "lat": 10.5636323804515, "lng": 106.418361961842 },
            { "name": "C7", "lat": 10.5634292116744, "lng": 106.417868435383 },
            { "name": "C8", "lat": 10.5636059949036, "lng": 106.417995840311 },
            { "name": "C9", "lat": 10.5637880551378, "lng": 106.418148726225 },
            { "name": "C3", "lat": 10.5634692743326, "lng": 106.418567529394 }
        ]
    };

    // Tạo bản đồ
    const map = L.map('map', {
        rotate: true,
        rotateControl: {
            closeOnZeroBearing: false,
            // position: 'bottomleft',
        },
        touchRotate: true,
        bearing: 54,
    }).setView([data.center_lat, data.center_lng], 19);

    // Lớp bản đồ đường xá
    const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
        maxZoom: data.zoom,
        zoom: 19
    });

    // Lớp bản đồ vệ tinh (sử dụng Esri)
    const satellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '',
        zoom: 19,
        maxZoom: data.zoom,
    });

    const whiteBackground = L.tileLayer('', {
        attribution: '',
        maxZoom: data.zoom,
        zoom: 19
    });

    // Thêm lớp bản đồ mặc định
    satellite.addTo(map);

    // Thêm Layer Control
    L.control.layers({
        "Giao thông": streets,
        "Vệ tinh": satellite,
        "Nền trắng": whiteBackground
    }).addTo(map);


    // Thêm tile layer
    L.tileLayer('', {
        attribution: '© VNPT Long An'
    }).addTo(map);


    // Bỏ tính năng double click zoom
    map.doubleClickZoom.disable();

    // Thêm marker cho từng khu vực
    data.listKhu.forEach(khu => {
        const icon = L.divIcon({
            className: 'text-label',
            html: `<div style="color: white; font-size: 14px; font-weight: bold;">${khu.name}</div>`
        });

        L.marker([khu.lat, khu.lng], { icon: icon }).addTo(map);
    });

    let markers = []; // Mảng lưu trữ các marker

    const defaultMarker = L.marker([10.562402692690446, 106.41901774627047], { icon: L.divIcon({
        className: 'text-label',
        html: `
            <div style="background-color: #fff;height: 30px;width: 30px;display: flex;align-items: center;justify-content: center;border-radius: 100%;position: relative;transform: translate(-9px, -8px);">
                <svg style="transform: rotate(-45deg) translateX(-2px) translateY(2px);" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="#a01c10" d="M20.891 2.006L20.997 2l.13.008l.09.016l.123.035l.107.046l.1.057l.09.067l.082.075l.052.059l.082.116l.052.096q.07.15.09.316l.005.106q0 .113-.024.22l-.035.123l-6.532 18.077A1.55 1.55 0 0 1 14 22.32a1.55 1.55 0 0 1-1.329-.747l-.065-.127l-3.352-6.702l-6.67-3.336a1.55 1.55 0 0 1-.898-1.259L1.68 10c0-.56.301-1.072.841-1.37l.14-.07l18.017-6.506l.106-.03l.108-.018z" />
                </svg>
            </div>    
        `
    }) }).addTo(map);

    markers.push(defaultMarker);

    // Xử lý double click để thêm điểm mới
    map.on('dblclick', function (e) {

        const icon = L.divIcon({
            className: 'text-label',
            html: `
                <div style="background-color: #fff;height: 30px;width: 30px;display: flex;align-items: center;justify-content: center;border-radius: 100%;position: relative;transform: translate(-9px, -8px);">
                    <svg style="transform: rotate(-45deg) translateX(-2px) translateY(2px);" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	                    <path fill="#a01c10" d="M20.891 2.006L20.997 2l.13.008l.09.016l.123.035l.107.046l.1.057l.09.067l.082.075l.052.059l.082.116l.052.096q.07.15.09.316l.005.106q0 .113-.024.22l-.035.123l-6.532 18.077A1.55 1.55 0 0 1 14 22.32a1.55 1.55 0 0 1-1.329-.747l-.065-.127l-3.352-6.702l-6.67-3.336a1.55 1.55 0 0 1-.898-1.259L1.68 10c0-.56.301-1.072.841-1.37l.14-.07l18.017-6.506l.106-.03l.108-.018z" />
                    </svg>
                </div>    
            `
        });

        const latlng = e.latlng; // Lấy tọa độ của điểm click

        // Xóa các marker cũ
        markers.forEach(marker => map.removeLayer(marker));
        markers = []; // Reset mảng

        // Thêm marker mới
        const newMarker = L.marker([latlng.lat, latlng.lng], { icon: icon }).addTo(map);
        markers.push(newMarker); // Lưu vào mảng

        console.log(newMarker)
    });
})