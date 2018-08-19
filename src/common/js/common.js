'use strict';

import 'jquery.cookie';

const authService = {
  isLogin: () => {
    let $loginInfo = $.cookie('login');
    if($loginInfo&&$loginInfo!='null') {
      $('.login-info').removeClass('login-user');
      $('.login-before').addClass('login-user');
      $('#user-name').html($.cookie('login'));
    }else {
      $('.login-info').addClass('login-user');
      $('.login-before').removeClass('login-user');
      $('#user-name').html('');
    }
  },
  loginOut: () => {
    $.cookie('login', null);
    $('.login-info').addClass('login-user');
    $('.login-before').removeClass('login-user');
    $('#user-name').html('');
    location.reload();
  },
  watchLogin: () => {
    let $loginInfo = $.cookie('login');
    if($loginInfo&&$loginInfo!='null') {
      let date = new Date();
      date.setTime(date.getTime() + (5 * 60 * 1000)); //三天后的这个时候过期
      $.cookie('login', $loginInfo, { path: '/', expires: date });
      setTimeout(function() {
        alert('登录超时，请重新登录！');
        $('.login-info').addClass('login-user');
        $('.login-before').removeClass('login-user');
      }, 300000)
    }
  }
};

export default authService;