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

    // // Tạo bản đồ
    // const map = L.map('map').setView([data.center_lat, data.center_lng], data.zoom);

    // // Lớp bản đồ đường xá
    // const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: ''
    // });

    // // Lớp bản đồ vệ tinh (sử dụng Esri)
    // const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    //     attribution: '',
    // });

    // // Thêm lớp bản đồ mặc định
    // satellite.addTo(map);

    // // Thêm Layer Control
    // L.control.layers({
    //     "Giao thông": streets,
    //     "Vệ tinh": satellite
    // }).addTo(map);


    // // Thêm tile layer
    // L.tileLayer('', {
    //     attribution: '© VNPT Long An'
    // }).addTo(map);



    // // Thêm marker cho từng khu vực
    // data.listKhu.forEach(khu => {
    //     const icon = L.divIcon({
    //         className: 'text-label',
    //         html: `<div style="color: white; font-size: 14px; font-weight: bold;">${khu.name}</div>`
    //     });

    //     L.marker([khu.lat, khu.lng], { icon: icon }).addTo(map);
    // });

    // Tạo bản đồ Leaflet
    

    // Khởi tạo bản đồ Leaflet
    const map = L.map('map').setView([data.center_lat, data.center_lng], data.zoom);

    // Thêm lớp Google Satellite
    const googleSat = L.gridLayer.googleMutant({
      type: 'satellite' // Chế độ vệ tinh
    }).addTo(map);

    // Điều khiển lớp bản đồ
    const googleRoadmap = L.gridLayer.googleMutant({
      type: 'roadmap' // Chế độ đường phố
    });

    const baseMaps = {
      "Vệ tinh": googleSat,
      "Đường phố": googleRoadmap
    };

    // Thêm tile layer
    L.tileLayer('', {
        attribution: '© VNPT Long An'
    }).addTo(map);

    // Thêm marker cho từng khu vực
    data.listKhu.forEach(khu => {
        const icon = L.divIcon({
            className: 'text-label',
            html: `<div style="color: white; font-size: 14px; font-weight: bold;">${khu.name}</div>`
        });

        L.marker([khu.lat, khu.lng], { icon: icon }).addTo(map);
    });

    // Khởi tạo tuyến đường
    L.Routing.control({
        waypoints: [
          L.latLng(10.562878467161077, 106.41832828251137), // Điểm bắt đầu
          L.latLng(10.562878467161077, 106.41832828251137)  // Điểm đích
        ],
        routeWhileDragging: true,
    }).addTo(map);

    // Thay đổi tọa độ địa điểm bắt đầu khi người dùng double-click vào bản đồ
    map.on('dblclick', function(e) {
        e.originalEvent.preventDefault(); // Ngăn zoom mặc định
        // Cập nhật điểm bắt đầu với tọa độ của điểm double-clicked
        routingControl.setWaypoints([L.latLng(e.latlng.lat, e.latlng.lng), routingControl.getWaypoints()[1]]);
      });
  
      // Điều chỉnh mức zoom khi người dùng double-click
      map.on('dblclick', function() {
        map.setZoom(map.getZoom()); // Duy trì mức zoom hiện tại
      });

    L.control.layers(baseMaps).addTo(map);
})