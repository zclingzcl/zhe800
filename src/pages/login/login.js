/* eslint-disable */

import '../../common/css/com.less';
import './login.scss';
import 'jquery.cookie';

var user = document.querySelector(".username");
var word = document.querySelector(".passnum");
var oMove = document.getElementById("scale_move");
var oTxt = document.getElementById("scale_txt");
var oBg = document.getElementById("scale_bg");
var validate = document.querySelector(".validate");
var loginSubmit = document.querySelector(".login_submit");
var onOff = false;

user.content = "邮箱/手机号/用户名";
user.onfocus = function () {
  if (user.value == user.content) {
    user.value = "";
  } else {
    user.value = user.value;
  }

}
user.onblur = function () {
  if (user.value == "") {
    user.value = user.content;
  }
};


word.onfocus = function () {
  if (word.placeholder) {
    word.placeholder = "";
  } else {
    word.value = word.value;
  }

};

word.onblur = function () {
  if (word.value == "") {
    word.placeholder = "请输入密码";
  }
};

oMove.onmousedown = function (eve) {
  var e = eve || window.event;
  var disX = e.clientX;

  document.onmousemove = function (eve) {
    var e = eve || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
    var l = e.clientX - validate.offsetLeft - disX;

    if (l < 0) l = 0;
    if (l > validate.offsetWidth - oMove.offsetWidth) l = validate.offsetWidth - oMove.offsetWidth;

    if (l == validate.offsetWidth - oMove.offsetWidth) {
      oBg.innerHTML = "验证成功";
      oBg.style.color = "#fff";
      oTxt.innerHTML = "";
      oMove.innerHTML = "√";
      onOff = true;
    } else {
      oBg.innerHTML = "";
      oTxt.innerHTML = "请按住滑块，拖动到最右边";
      oMove.innerHTML = ">>"
      onOff = false;
    }

    oMove.style.left = l + 'px';
    oBg.style.width = l + 'px';
  }
  document.onmouseup = function () {

    document.onmousemove = document.onmouseup = null;
  }
}

loginSubmit.onclick = function () {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let off = true;
  userInfo.map(item => {
    if (item.name === user.value && item.pass === word.value && onOff) {
      alert("登录成功！");
      let date = new Date();
      date.setTime(date.getTime() + (5 * 60 * 1000)); //三天后的这个时候过期
      $.cookie('login', user.value, {path: '/', expires: date});
      location.href = '/';
      off = false;
    }
  });
  if(!onOff){
    alert("请完成滑动验证！")
  }else if (off) {
    alert("用户名或密码不正确！");
    user.focus();
  }
};