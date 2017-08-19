/**
 * Created by aflyi on 2017/5/11.
 */
// country 国家  province 省份 city 城市

var oLocation = document.querySelector('#location');
var city = remote_ip_info['city'];
//alert(city)
oLocation.innerHTML = city;