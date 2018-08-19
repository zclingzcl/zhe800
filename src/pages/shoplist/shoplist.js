/* eslint-disable */

import '../../common/css/com.less';
import './shoplist.scss';
import 'jquery.cookie';
import '../home/index.scss';
// import './goods.json';
import authService from './../../common/js/common';

authService.isLogin();
authService.watchLogin();

$("#login-out").click(function () {
  alert('退出登录！');
  authService.loginOut();
});


onscroll = function () {
  var junavFix = document.querySelector(".junav_fix");
  var scrollT = document.documentElement.scrollTop;
  var toTop = document.querySelector(".totop");

  if (scrollT > 0) {
    toTop.style.display = "block";
  } else {
    toTop.style.display = "none";
  }

  if (scrollT > 100) {
    junavFix.style.display = "block";
  } else {
    junavFix.style.display = "none";
  }
};


$(".totop").click(function () {
  $("body,html").animate({scrollTop: 0}, 500);
  return false;
});


//请求shop_list数据
$.getJSON('mock/shop_list.json', function (data) {
  let json = data.list;

  function Page(options) {
    this.shopList = options.shopList;
    this.pageNum = options.pageNum;
    this.left = options.left;
    this.right = options.right;
    this.page = options.page;

    this.index = 0;
    this.n = 0;

    this.load()
  }

  Page.prototype.load = function () {
    this.display();
    this.createPage();
    this.addToCart()
  }

  Page.prototype.display = function () {
    var str = "";
    for (var i = this.index * this.pageNum; i < this.index * this.pageNum + this.pageNum; i++) {
      this.goodsName = json[i].name;
      if (json[i]) {
        str += `<div class="list_shop">
                    <a href=${json[i].href}>
                        <img src=${json[i].src} />
                    </a>
                    <div class="shop_tit clear">
                        <a href="#" title=${json[i].title}>${json[i].name}</a>
                        <span></span>
                    </div>
                    <div class="coupon_collect clear">
                        <span>￥${json[i].price}<i class="list_price">${json[i].list_price}</i></span>
                        <em class="car_img" data-shopName=` + json[i].id + `>加入购物车</em>
                    </div>
                </div>`
      }

    }
    this.shopList.innerHTML = str;
  }


  Page.prototype.createPage = function () {
    this.maxNum = Math.ceil(json.length / this.pageNum);

    this.page.innerHTML = "";

    for (var i = 0; i < this.maxNum; i++) {
      var li = document.createElement("li");
      li.innerHTML = i + 1;
      this.page.appendChild(li);
    }
    this.page.children[0].className = "page_active";

    this.init()
  }
  Page.prototype.init = function () {
    var that = this;
    this.left.onclick = function () {
      that.changeIndex("left");
    }
    this.right.onclick = function () {
      that.changeIndex("right");
    };
    var aLi = this.page.children;
    for (var i = 0; i < aLi.length; i++) {
      aLi[i].index = i;
      aLi[i].onclick = function () {
        that.n = this.index;
        that.changeIndex("index")
      }
    }
  }
  Page.prototype.changeIndex = function (type) {
    if (type == "left") {
      if (this.index == 0) {
        this.index = this.maxNum - 1;
      } else {
        this.index--;
      }
    }
    if (type == "right") {
      if (this.index == this.maxNum - 1) {
        this.index = 0
      } else {
        this.index++
      }
    }
    if (type == "index") {
      this.index = this.n;
    }
    this.display();
    this.pageStyle();
  }
  Page.prototype.pageStyle = function () {
    var aLi = this.page.children;
    var that = this;
    for (var i = 0; i < aLi.length; i++) {
      aLi[i].className = "";

    }
    aLi[this.index].className = "page_active";
  }
  Page.prototype.addToCart = function () {

    var that = this;

    this.shopList.onclick = function (eve) {
      var e = eve || window.event;
      var target = e.target || e.srcElement;

      if (target.nodeName.toLowerCase() == "em") {
        let data = JSON.parse(localStorage.cartList || '[]');
        /*
        * {"src":"//z8.tuanimg.com/imagev2/trade/800x800.6fe57ea09d1651552ca5cdd5c45aa583.380x380.jpg","href":"//out.zhe800.com/ju/deal/fansilanen_46686826","name":"范思蓝恩波点雪纺连衣裙女夏2018新款复古吊带网纱两件套裙子X21","title":"范思蓝恩波点雪纺连衣裙女夏2018新款复古吊带网纱两件套裙子X21","price":"139","list_price":"￥394"}
        * */
        let shopName = {};
        json.map(item => {
          if (item.id == target.getAttribute("data-shopName")) {
            shopName = item;
          }
        });
        if ((localStorage.cartList || []).indexOf(target.getAttribute("data-shopName")) === -1) {
          data.push({
            "src": shopName.src,
            "href": "",
            "name": shopName.name,
            "id": shopName.id,
            "price": shopName.price,
            "num": 1
          });
        } else {
          data = data.map(item => {
            if (item.id == target.getAttribute("data-shopName")) {
              item.num = item.num + 1;
            }
            return item;
          })
        }
        localStorage.setItem("cartList", JSON.stringify(data));
        // console.log(target.getAttribute("data-shopName"));

        // that.setCookie(that.goodsName);
      }
    }
  };
  // Page.prototype.setCookie=function(name){
  //     this.cookies=document.cookie;
  //     this.goods=JSON.parse(this.cookies("goods")) || [];
  //
  //     if(this.goods.length<1){
  //         this.goods.push({
  //             name:name,
  //             num:1
  //         })
  //     }else{
  //         var onOff = true;
  //         for(var i=0;i<this.goods.length;i++){
  //             if(this.goods[i].name == name){
  //                 this.goods[i].num++;
  //                 onOff = false;
  //             }
  //         }
  //         if(onOff){
  //             this.goods.push({
  //                 name:name,
  //                 num:1
  //             })
  //         }
  //     }
  //     this.cookies("goods",JSON.stringify(this.goods))
  // }


  var options = {
    shopList: document.querySelector(".goodlist"),
    pageNum: 32,
    left: document.getElementById("btn_l"),
    right: document.getElementById("btn_r"),
    page: document.getElementById("page_num")
  };

  new Page(options);

});


function getData(url, name) {
  return $.ajax({
    url: '/api/' + url,
    type: 'get',
    // async: false,
    dataType: 'json',
    hearders: {
      "content-type": "application/json;"
    },
    success: function (data, status) {
      switch (name) {

        case 'get_html':
          $(".hot_bottom").append(data.html.replace(/src="/g, 'src_o="').replace(/src_n/g, 'src'));
      }
    },
    fail: function (err, status) {
      console.log(err)
    },
    complete(xhr, status) {
      if (xhr.status === 404) {
        $.getJSON('mock/' + name + '.json', function (data) {
          switch (name) {

            case 'get_html':
              $(".hot_bottom").append(data.html.replace(/src="/g, 'src_o="').replace(/src_n/g, 'src'));
          }
        })
      }
    }
  });
}


getData('cn/list/hotSale/get_html?isNewCus=0', 'get_html');