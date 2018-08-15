/* eslint-disable */

import '../../common/css/com.less';
import './login.scss';

var user=document.querySelector(".username");
var word=document.querySelector("password");

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
}
