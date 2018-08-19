/* eslint-disable */

import '../../common/css/com.less';
import './shopcar.scss';

onscroll = function () {
    var list = document.querySelector(".list");
    var scrollT = document.documentElement.scrollTop;


    if(scrollT>0){
        list.style.marginBottom="0";
    }else{
        list.style.marginBottom="-64px";
    }

};

var cartList=JSON.parse(localStorage.cartList||'[]');

var oCarList=document.querySelector(".car_list");
var str="";
for(var i=0;i<cartList.length;i++){
    str += `<tr class="cartGoods" index=${cartList[i].id}>
                <td class="td1"><input type="checkbox" class="choose" /></td>
                <td class="td2"><img src="${cartList[i].src}"/></td>
                <td class="td3">${cartList[i].name}</td>
                <td class="td4">${cartList[i].price}</td>
                <td class="td5"><input type="number" value=${cartList[i].num} class="nums" /></td>
                <td class="td6">${cartList[i].price * cartList[i].num}</td>
                <td class="td7"><a href="#">删除</a></td>
            </tr>`
}
oCarList.innerHTML=str;

var oNums=0;
$(".nums").each(function(index,element){
    oNums += Number($(this).val());
    $(".shop_Num").html(oNums);

    let oldNum=$(this).val();

    $(this).change(function(){

        if($(this).val() < 1){
            $(this).val(1);
            return false;
        }

        let total=($(this).parents(".cartGoods").find(".td4").html() * $(this).val()).toFixed(2);

        $(this).parents(".cartGoods").find(".td6").html(total);




        if($(this).parents(".cartGoods").find(".choose").is(':checked')){
            $("#amount_price").html((Number($("#amount_price").html())+$(this).parents(".cartGoods").find(".td4").html() * ($(this).val() - oldNum)).toFixed(2));
            $(".shopcar_num").html(Number($(".shopcar_num").html())+Number($(this).val() - oldNum));
        }

        oldNum=$(this).val();
    })
})
$(".choose").each(function(index,element){
    $(this).click(function(){
        let calc=0;
        let oNums=0;
        let isChoose = [];
        $(".choose").each(function () {
            isChoose.push($(this).prop("checked"));
        });
        if(isChoose.indexOf(false)===-1){
            $(".chooseAll").prop('checked',true);
        }
        if($(this).is(':checked')){
            calc=Number($("#amount_price").html())+Number($(this).parents(".cartGoods").find(".td6").html());
            oNums=Number($(".shopcar_num").html())+Number($(this).parents(".cartGoods").find(".nums").val());


        }else {
            calc = Number($("#amount_price").html()) - Number($(this).parents(".cartGoods").find(".td6").html());
            oNums=Number($(".shopcar_num").html())-Number($(this).parents(".cartGoods").find(".nums").val())
            $(".chooseAll").prop('checked',false);

        }
        $("#amount_price").html(calc.toFixed(2));
        $(".shopcar_num").html(oNums);

        if($(".shopcar_num").html()>0){
            $(".total_price a").css({
                background:"red",
                color:"#fff"
            })
        }else{
            $(".total_price a").css({
                background:"#ddd",
                color:"#999"
            })
        }
    })
});

$(".chooseAll").each(function(index,element){
    $(this).click(function () {
        $(".choose").prop('checked',$(this).is(':checked'));
        $(".chooseAll").prop('checked',$(this).is(':checked'));

        var num=0;
        var Price=0;

        if($(this).is(':checked')){
            $(".choose").each(function(){
                num += Number($(this).parents(".cartGoods").find(".nums").val());
                Price += Number($(this).parents(".cartGoods").find(".td6").html());
            })
            $(".total_price a").css({
                background:"red",
                color:"#fff"
            })
        }else {
            $(".total_price a").css({
                background:"#ddd",
                color:"#999"
            })
        }

        $(".shopcar_num").html(num);
        $("#amount_price").html(Price.toFixed(2));
    });
});

$(".car_list").on("click","a",function(){
    let goods = $(this).parents(".cartGoods").attr("index");
    $(this).parent().parent().remove();

    let cartList=JSON.parse(localStorage.getItem("cartList"));

    localStorage.setItem("cartList",JSON.stringify(cartList.filter(item=>{return item.id!=goods})));

    location.reload();
})

$("#del").click(function(){
    let isChoose = [];
    $(".choose").each(function () {
        if($(this).is(':checked')){
            let goods = $(this).parents(".cartGoods").attr("index");

            isChoose.push(Number(goods));

            $(this).parents(".cartGoods").remove();
        }



    });

    localStorage.setItem("cartList",JSON.stringify(cartList.filter(item=>{return isChoose.indexOf(item.id)===-1})));


})



$(".list4 a").click(function(){
    $("body,html").animate({scrollTop:0},500);
    return false;
});