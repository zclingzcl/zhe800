/* eslint-disable */

import '../../common/css/com.less';
import './shoplist.scss';
import 'jquery.cookie';
import '../home/index.scss';
// import './goods.json';


onscroll = function () {
    var junavFix = document.querySelector(".junav_fix");
    var scrollT = document.documentElement.scrollTop;

    if (scrollT > 100) {
        junavFix.style.display = "block";
    } else {
        junavFix.style.display = "none";
    }
};


// var shopList=document.querySelector(".goodlist");
//
// function ajaxGet(url,callback,data){
//     url = url + "?t="+new Date().getTime();
//     if(data){
//         var str = ""
//         for(var i in data){
//             str = str + i+"="+data[i] + "&";
//         }
//         str = str.slice(0,str.length-1);
//
//         url = url + "&" + str;
//     }
//     var ajax = new XMLHttpRequest();
//     ajax.open("GET",url,true)
//     ajax.onreadystatechange = function(){
//         if(ajax.readyState == 4 && ajax.status == 200){
//             callback(ajax.responseText)
//         }
//     }
//     ajax.send(null);
// }
//
// ajaxGet("127.0.0.1:8088/src/pages/shopliat/goods.json",function(res){
//     var str=""
//     for(var i=0;i<res,length;i++) {
//         str += `<div class="list_shop">
//                     <a href=${res[i].href}>
//                         <img src=${res[i].src}/>
//                     </a>
//                     <div class="shop_tit clear">
//                         <a href="#" title=${res[i].title}>${res[i].name}</a>
//                         <span></span>
//                     </div>
//                     <div class="coupon_collect clear">
//                         <span>￥${res[i].price}<i class="list_price">${res[i].list_price}</i></span>
//                         <a href="#" class="car_img">加入购物车</a>
//                     </div>
//                 </div>`
//     }
//     shopList.innerHTML=str;
// })

// function getgoods(){
//     $.ajax({
//         url:"127.0.0.1:8088/goods.json",
//         data:{},
//         success:function(res){
//             console.log(res);
//             for(var i=0;i<res,length;i++){
//                 $(".goodlist").append(`<div class="list_shop">
//                     <a href=${res[i].href}>
//                         <img src=${res[i].src}/>
//                     </a>
//                     <div class="shop_tit clear">
//                         <a href="#" title=${res[i].title}>${res[i].name}</a>
//                         <span></span>
//                     </div>
//                     <div class="coupon_collect clear">
//                         <span>￥${res[i].price}<i class="list_price">${res[i].list_price}</i></span>
//                         <a href="#" class="car_img">加入购物车</a>
//                     </div>
//                 </div>`)
//             }
//
//         },
//         error:function(){
//             console.log("error");
//         }
//     })
// }
//
// getgoods();
// //

//请求shop_list数据
$.getJSON('mock/shop_list.json',function (data) {
    let json = data.list;

    function Page(options) {
        this.shopList = options.shopList;
        this.pageNum = options.pageNum;
        this.left = options.left;
        this.right = options.right;
        this.page = options.page;

        this.index=0;

        this.load()
    }

    Page.prototype.load = function () {
        this.display()
        this.createPage()
    }

    Page.prototype.display=function(){
        var str = "";
        for (var i = this.index * this.pageNum;i<this.index * this.pageNum + this.pageNum; i++) {
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
                        <a href="#" class="car_img">加入购物车</a>
                    </div>
                </div>`
        }
        this.shopList.innerHTML = str;
    }


    Page.prototype.createPage=function(){
        this.maxNum=Math.ceil(json.length/this.pageNum);

        this.page.innerHTML="";

        for(var i=0;i<this.maxNum;i++){
            var li=document.createElement("li");
            li.innerHTML=i+1;
            this.page.appendChild(li);
        }
        this.page.children[0].className="page_active";

        this.init()
    }
    Page.prototype.init=function(){
        var that=this;
        this.left.onclick=function(){
            that.changeIndex("left");
        }
        this.right.onclick=function(){
            that.changeIndex("right");
        }
    }
    Page.prototype.changeIndex=function(type){
        if(type=="left"){
            if(this.index==0){
                this.index=this.maxNum-1;
            }else{
                this.index--;
            }
        }
        if(type=="right"){
            if(this.index==this.maxNum-1){
                this.index=0
            }else{
                this.index++
            }
        }
        this.display()
        this.pageStyle()
    }
    Page.prototype.pageStyle=function(){
        var aLi=this.page.children;
        var that=this;
        for(var i=0;i<aLi.length;i++){
            aLi[i].className="";
            aLi[i].onclick=function(){

                that.display()
            }
        }
        aLi[this.index].className="page_active";
    }




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
        }
    });
}


getData('cn/list/hotSale/get_html?isNewCus=0', 'get_html');