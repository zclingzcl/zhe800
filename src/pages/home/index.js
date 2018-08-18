/* eslint-disable */
import '../../common/css/com.less';
import './index.scss';



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
                case 'index_new':
                    let session = data.session;
                    for (let i = 0; i < session.length; i++) {
                        $(".flashSale_top_r").append('<li><a href="#" class="' + (session[i].current ? "active" : "") + '">' + session[i].hhmm + '</a></li>')
                    }
                    let jsons = data.jsons;
                    jsons.map((item, i) => {
                        if(item.xianshi.activity_stock) {
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
                        }else{
                            $(".flashSale_list").append(`<li class="flashSale_shop">
                                <a href="#">
                                    <div class="dealCon">
                                        <img src=${item.xianshi.image} />
                                    </div>
                                    <span>￥<b>${item.xianshi.price}</b></span>
                                    <p title="${item.xianshi.fulltitle}">${item.xianshi.fulltitle}</p>
                                </a>
                            </li>`)
                        }
                    });
                    $(".flashSale_bottom").banner({
                        list:$(".flashSale_bottom .flashSale_list"),
                        items:$(".flashSale_bottom .flashSale_shop"),
                        left:$(".flashSale_bottom .flashSale_left"),
                        right:$(".flashSale_bottom .flashSale_right"),
                        pageNum:6
                    });
                    break;
                case 'get_html':
                    $(".hot_bottom").append(data.html.replace(/src="/g, 'src_o="').replace(/src_n/g, 'src'));
            }
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
        // async: false,
        dataType: 'json',
        hearders: {
            "content-type": "application/json;"
        },
        success: function (data, status) {
            switch (name) {
                case 'index_deal':
                    let list = data.objects;
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
                    break;
            }
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



;(function($){
    "use strict";

    $.fn.banner=function(options){
        this.LOCAL={
            maxNum:Math.ceil(options.items.length/options.pageNum),
            iNow:0,
            iPrev:Math.ceil(options.items.length/options.pageNum)-1
        };
        options.list.css({
            width:1200 * this.LOCAL.maxNum +"px"
        });

        var that=this;

        options.left.on("click",function(){
            that.LOCAL.iNow--;
            if(that.LOCAL.iNow < 0) {
                options.list.find('li').each(function (index,element) {
                    if(index>options.list.find('li').length-6){
                        $(this).css({position: 'relative',left: -1200 * that.LOCAL.maxNum +"px"})
                    }
                })
            }
            options.list.stop().animate({
                left:-1200 *(that.LOCAL.iNow ) +"px"
            },function () {
                if(that.LOCAL.iNow < 0) {
                    that.LOCAL.iNow = that.LOCAL.maxNum-1;
                    options.list.find('li').each(function (index,element) {
                        if(index>options.list.find('li').length-6){
                            $(this).css({position: '',left: ''})
                        }
                    })
                    $(this).css({left: -1200 * (that.LOCAL.maxNum-1) +"px"})
                }
            })
        });
        options.right.on("click",function(){
            that.LOCAL.iNow++;
            if(that.LOCAL.iNow > that.LOCAL.maxNum-1) {
                options.list.find('li').each(function (index,element) {
                    if(index<6){
                        $(this).css({position: 'relative',left: 1200 * that.LOCAL.maxNum +"px"})
                    }
                })
            }
            options.list.stop().animate({
                left:-1200 * that.LOCAL.iNow +"px"
            },function () {
                if(that.LOCAL.iNow > that.LOCAL.maxNum-1) {
                    that.LOCAL.iNow = 0;
                    options.list.find('li').each(function (index,element) {
                        if(index<6){
                            $(this).css({position: '',left: ''})
                        }
                    })
                    $(this).css({left: 0})
                }
            })
        });

    }
})(jQuery);




onscroll = function () {
    var junavFix = document.querySelector(".junav_fix");
    var scrollT = document.documentElement.scrollTop;

    if (scrollT > 500) {
        junavFix.style.display = "block";
    } else {
        junavFix.style.display = "none";
    }
};
