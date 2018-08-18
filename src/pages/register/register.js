/* eslint-disable */

import '../../common/css/com.less';
import './register.scss';
import 'jquery.cookie';

// $.cookie("account",JSON.stringify({'user': 'name','password':'123'}));
// let test = JSON.parse($.cookie("account")||'{}');
// console.log(test);

class Register {
    constructor() {
        this.init()
    }

    init(options) {
        this.oPhone = document.getElementById("phone");
        this.txtMsg = document.getElementById("txt_msg");
        this.oPass1 = document.getElementById("pass1");
        this.pass1Msg = document.getElementById("pass1_msg");
        this.oPass2 = document.getElementById("pass2");
        this.pass2Msg = document.getElementById("pass2_msg");
        this.proving = document.getElementsByClassName("proving")[0];
        this.txt = document.getElementById("proving_txt");
        this.proMove = document.getElementById("proving_move");
        this.proBg = document.getElementById("proving_bg");
        this.changeCode=document.getElementById("change_code");
        this.validCode=document.getElementById("validCode");
        this.vCode=document.getElementById("v_code");
        this.item=document.getElementById("item");
        this.a=false;
        this.b=false;
        this.c=false;
        this.d=false;
        this.e=false;

        this.yanzheng()
    }

    yanzheng() {


        this.oPhone.content = "手机号码";
        this.oPhone.onfocus = () => {
            if (this.oPhone.value == this.oPhone.content) {
                this.oPhone.value = "";
            } else {
                this.oPhone.value = this.oPhone.value;
            }
            this.txtMsg.innerHTML="为了您的账户安全，请填写常用手机号";
            this.oPhone.style.borderColor ="#d2d2d2";
        };
        this.oPhone.onblur = () => {
            var regPhone=/^[1][3-5|7-8][0-9]{9}$/
            if (this.oPhone.value == "") {
                this.oPhone.value = this.oPhone.content;
                this.oPhone.style.borderColor = "#f00";
                this.txtMsg.innerHTML="请输入手机号码";
                this.txtMsg.style.color="#f00";
                this.a=false;
            }else{
                if(regPhone.test(this.oPhone.value)){

                    this.txtMsg.innerHTML="";
                    this.oPhone.style.borderColor ="#d2d2d2";
                    this.a=true;
                    this.getCookie();
                }else{
                    this.txtMsg.innerHTML="手机格式号码错误";
                    this.oPhone.style.borderColor="#f00";
                    this.a=false;
                }
            }
        };

        this.oPass1.onfocus = () => {

            this.pass1Msg.innerHTML="6-24位字母、数字或_符号";
            this.pass1Msg.style.color="#999";
            this.oPass1.style.borderColor ="#d2d2d2";
        };
        this.oPass1.onblur = () => {
            var regPass1=/^[\w]{6,24}$/;
            if (this.oPass1.value == "") {
                this.oPass1.style.borderColor = "#f00";
                this.pass1Msg.innerHTML="请输入密码";
                this.pass1Msg.style.color="#f00";
                this.b=false;
            }else{
                if(regPass1.test(this.oPass1.value)){
                    this.pass1Msg.innerHTML="";
                    this.oPass1.style.borderColor ="#d2d2d2";
                    this.b=true;
                }else{
                    this.pass1Msg.innerHTML="6-24位字母、数字或_符号";
                    this.pass1Msg.style.color="#f00";
                    this.oPass1.style.borderColor="#f00";
                    this.b=false;
                }
            }
        };
        this.oPass2.onfocus = () => {

            this.pass2Msg.innerHTML="请再次输入您的密码";
            this.pass2Msg.style.color="#999";
            this.oPass2.style.borderColor ="#d2d2d2";
        };
        this.oPass2.onblur = () => {
            if (this.oPass2.value == "") {
                this.oPass2.style.borderColor = "#f00";
                this.pass2Msg.innerHTML="确认密码不能为空";
                this.c=false;
            }else{
                if(this.oPass2.value==this.oPass1.value){
                    this.pass2Msg.innerHTML="";
                    this.oPass2.style.borderColor ="#d2d2d2";
                    this.c=true;
                }else{
                    this.pass2Msg.innerHTML="两次密码不一致";
                    this.pass2Msg.style.color="#f00";
                    this.oPass2.style.borderColor="#f00";
                    this.c=false;
                }
            }
        };

        var that=this;
        this.proMove.onmousedown = function (eve) {
            var e = eve || window.event;
            var disX = e.offsetX;

            document.onmousemove = function (eve) {
                var e = eve || window.event;
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
                var l = e.clientX - that.proving.offsetLeft - disX;

                if (l < 0) l = 0;
                if (l > that.proving.offsetWidth - that.proMove.offsetWidth) l = that.proving.offsetWidth - that.proMove.offsetWidth;

                if (l == that.proving.offsetWidth - that.proMove.offsetWidth) {
                    that.proBg.innerHTML = "验证成功";
                    that.proBg.style.color = "#fff";
                    that.txt.innerHTML = "";
                    that.proMove.innerHTML = "√";


                } else {
                    that.proBg.innerHTML = "";
                    that.txt.innerHTML = "请按住滑块，拖动到最右边";
                    that.proMove.innerHTML = ">>";

                }

                that.proMove.style.left = l + 'px';
                that.proBg.style.width = l + 'px';
            }
            document.onmouseup = function () {
                that.d=true;

                document.onmousemove = document.onmouseup = null;
            }
        }

        this.changeCode.onclick=function(){
            yanzhengma();
        }
        this.validCode.onblur=()=>{
            if(this.validCode.value==this.vCode.innerHTML){
                this.e=true;
            }
        }


        this.logon()

    }

    getCookie(){
        this.account=$.cookie("account") ? JSON.parse($.cookie("account")) :  [];
        if(this.account.length>0){
            for(var i=0;i<this.account.length;i++){
                if(this.oPhone.value==this.account[i].name){
                    this.txtMsg.innerHTML="用户名已存在";
                    this.txtMsg.style.color="#f00";
                    this.oPhone.borderColor="#f00";
                }
            }
        }
        console.log($.cookie("account"))
    }


    logon(){
        var that=this;
        // this.account=JSON.parse($.cookie("account")) || [];
        this.item.onclick=function(){
            if(that.a && that.b && that.c && that.d && that.e){
                alert("注册成功");
                // this.href="login.html";
                var obj={
                    name:that.oPhone.value,
                    pass:that.oPass1.value
                }
                that.account.push(obj);
                $.cookie("account",JSON.stringify(that.account),{path:"/"})
                // console.log($.cookie("account"))
            }else{
                alert("注册失败");
            }
        }
    }



}

new Register();



function yanzhengma(){
    var vCode=document.getElementById("v_code");
    var str = "";
    for(var i=0;i<8;i++){
        var x = String.fromCharCode(random(48,57))
        var y = String.fromCharCode(random(65,90))
        var z = String.fromCharCode(random(97,122))
        str += x+y+z
    }
    var yzm = ""
    for(var i=0;i<4;i++){
        var index = random(0,str.length-1);
        yzm += str[index]
    }
    vCode.innerHTML=yzm;
}
yanzhengma();

function random(a,b){
    return Math.round(Math.random()*(a-b)+b)
}


