/* eslint-disable */
import '../../common/css/com.less';
import './index.less';
import './index.scss';
import indexSideNavData from './navData.js';

console.log(indexSideNavData);


$(function () {
    //第一张显示
    $(".img_big").eq(0).fadeIn();
    //鼠标滑过手动切换，淡入淡出
    $(".banner_list li").mouseover(function () {
        $(this).addClass('active').siblings().removeClass("active");
        var index = $(this).index();
        i = index;//不加这句有个bug，鼠标移出小圆点后，自动轮播不是小圆点的后一个
//                 $(".pic li").eq(index).show().siblings().hide();
        $(".img_big").eq(index).fadeIn(500).siblings().fadeOut(500);
    });
    //自动轮播
    var i = 0;
    var timer = setInterval(play, 2000);
    //向右切换
    var play = function () {
        i++;
        i = i > 4 ? 0 : i;
        $(".banner_list li").eq(i).addClass('active').siblings().removeClass("active");
        $(".img_big").eq(i).fadeIn(500).siblings().fadeOut(500);
    }

    //鼠标移入移出效果
    $(".banner").hover(function () {
        clearInterval(timer);
    }, function () {
        timer = setInterval(play, 2000);
    });

});

var myData = {};

function getData(url, name) {
    return $.ajax({
        url: '/api/' + url,
        type: 'get',
        async: false,
        dataType: 'json',
        hearders: {
            "content-type": "application/json;"
        },
        success: function (data, status) {
            myData[name] = data;
        },
        fail: function (err, status) {
            console.log(err)
        }
    });
}

function getmData(url, name) {
    return $.ajax({
        url: '/mapi/' + url,
        type: 'get',
        async: false,
        dataType: 'json',
        hearders: {
            "content-type": "application/json;"
        },
        success: function (data, status) {
            myData[name] = data;
        },
        fail: function (err, status) {
            console.log(err)
        }
    });
}

getData('ajax_api/get_navi_button', 'get_navi_button');
getData('zhe800_n_api/xsq/index_new', 'index_new');
getData('cn/list/hotSale/get_html', 'get_html');
getmData('list/deals/v2?user_id=&user_type=1&user_role=0&limit=60&offset=60&visit_bit=111111000000000000000000000000000000000000000000000000000000000000000000000000000000000000&cookie_id=18464771211533624800&client_type=1&image_type=si3&url_name=&order=&shop_type=&min_age=&max_age=&gender=0', 'index_deal');

console.log(myData);

var session = myData.index_new.session;
for (let i = 0; i < session.length; i++) {
    $(".flashSale_top_r").append('<li><a href="#" class="' + (session[i].current ? "active" : "") + '">' + session[i].hhmm + '</a></li>')
}

var jsons = myData.index_new.jsons;
jsons.map((item, i) => {
    $(".flashSale_list").append(`<li class="flashSale_shop">
						<a href="#">
							<div class="dealCon">
								<img src=${item.xianshi.image} />
								<div class="stock">还剩${item.xianshi.activity_stock}件 抢完恢复原价${item.xianshi.list_price}元</div>
							</div>
							<span>￥<b>${item.xianshi.price}</b></span>
							<p title="${item.xianshi.fulltitle}">${item.xianshi.fulltitle}</p>
						</a>
					</li>`)
});

$(".hot_bottom").append(myData.get_html.html.replace(/src="/g, 'src_o="').replace(/src_n/g, 'src'));

let list = myData.index_deal.objects;
list.map((item, i) => {
    let expire_time = new Date(item.expire_timestamp - new Date().getTime()).getDate() - 1;
    let child;
    if (item.deal) {
        child = `<div class="list_shop">
						<a href=${item.deal.out_url}>
							<img src=${item.image_url} />						
						</a>
						<div class="shop_tit clear">
							<a href="#">${item.title}</a>
							<span>剩余${expire_time}天</span>
						</div>
						<div class="coupon_collect clear">
							<span>` + (item.deal.coupon_text ? item.deal.coupon_text : `￥${item.deal.price / 100} <i class="list_price">￥` + item.deal.list_price / 100 + `</i>`) + `</span>
							<a href="#">收藏品牌</a>
						</div>
					</div>`
    } else if (item.brand) {
        child = `<div class="list_shop">
						<a href=${item.brand.out_url}>
							<img src=${item.image_url} />						
						</a>
						<div class="shop_tit clear">
							<a href="#">${item.title}</a>
							<span>剩余${expire_time}天</span>
						</div>
						<div class="coupon_collect clear">
							<span>${item.brand.subtitle}</span>
							<a href="#">收藏品牌</a>
						</div>
					</div>`
    }

    $(".list_main").append(child)
});


;(function($){
    "use strict";
    $.fn.nav = function () {
        this.children(".index_nav").children("li").hover(function () {

            $(this)				//鼠标经过谁就是谁
            .siblings()			//除了鼠标经过的这个，其他的所有兄弟
            .children(".nav_pop")		//兄弟的子元素ul
            .stop().css({
                display:"none"
            })
            .end()				//除了鼠标经过的这个，其他的所有兄弟
            .end()				//鼠标经过谁就是谁
            .children(".nav_pop")		//鼠标经过谁就是谁    的    ul
            .stop().css({
                display:"block"
            });

        }, function () {
            $(this).children(".nav_pop").css({
                display:"none"
            })

        })
    }
})
(jQuery);
$(".wrapper").nav();


class Page{
    constructor(options){
        this.list = options.list;
        this.left = options.left;
        this.right = options.right;
        this.num = options.pageNum;

        this.jsons=jsons;
        this.index = 0;
        this.maxNum = Math.ceil(this.jsons.length/this.num);

        this.init();
    }
    init(){
        var that = this;
        this.left.click(function(){
            that.changeIndex("left")
        })
        this.right.click(function(){
            that.changeIndex("right")
        })
    }
    changeIndex(type){
        if(type == "left"){
            if(this.index == 0){
                this.index = this.maxNum-1;
            }else{
                this.index--;
            }
        }else{
            if(this.index == this.maxNum-1){
                this.index = 0
            }else{
                this.index++;
            }
        }
    }
}

new Page ({
    list:document.querySelector("flashSale_list"),
    pageNum:6,
    left:document.querySelector("flashSale_left"),
    right:document.querySelector("flashSale_right")
})




onscroll = function () {
    var junavFix = document.querySelector(".junav_fix");
    var scrollT = document.documentElement.scrollTop;

    if (scrollT > 500) {
        junavFix.style.display = "block";
    } else {
        junavFix.style.display = "none";
    }
};
