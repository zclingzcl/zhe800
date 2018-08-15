/* eslint-disable */

import '../../common/css/com.less';
import './login.scss';

var user=document.querySelector(".username");
var word=document.querySelector(".passnum");
var oMove=document.getElementsByClassName("scale_move");
var oTxt=document.querySelector(".scale_txt");
var oBg=document.querySelector(".scale_bg");
var validate=document.querySelector(".validate");

user.content="邮箱/手机号/用户名";
user.onfocus=function(){
    if(user.value==user.content){
        user.value="";
    }else{
        user.value=user.value;
    }

}
user.onblur=function(){
    if(user.value==""){
        user.value=user.content;
    }
};


word.onfocus=function(){
    if(word.placeholder){
        word.placeholder="";
    }else{
        word.value=word.value;
    }

};

word.onblur=function(){
    if(word.value==""){
        word.placeholder="请输入密码";
    }
};

oMove.onmousedown=function(eve){
    var e=eve || window.event;
    var disX=e.offsetX;

    document.onmousemove=function(eve){
        var e=eve || window.event;
        if(e.preventDefault){
            e.preventDefault();
        }else{
            e.returnValue=false;
        }
        var l=e.clientX-validate.offsetLeft-disX;

        if(l<0) l=0;
        if(l>validate.offsetWidth-oMove.offsetWidth) l=validate.offsetWidth-oMove.offsetWidth;

        if(l==validate.offsetWidth-oMove.offsetWidth){
            oBg.innerHTML="验证成功";
            oBg.style.color="#fff";
            oTxt.innerHTML="";
            oMove.innerHTML="√";

        }else{
            oBg.innerHTML="";
            oTxt.innerHTML="请按住滑块，拖动到最右边";
            oMove.innerHTML=">>"
        }

        oMove.style.left=l +'px';
        oBg.style.width=l+'px';
    }
    document.onmouseup=function(){

        document.onmousemove=document.onmouseup=null;
    }
}