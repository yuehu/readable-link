var BLOCK_PATHS = [
  '/search',
  '/login',
  '/logout',
  '/register',
  '/signin',
  '/signup',
  '/signout',
  '/account'
];

var READ_LATERS = [
  'instapaper.com',
  'readability.com',
  'getpocket.com',
  'quote.fm',
  'reader.mx'
];

var SOCIAL_DOMAINS = [
  'weibo.com',
  'www.weibo.com',
  'twitter.com',
  'stackoverflow.com',
  'www.stackoverflow.com',
  'quora.com',
  'www.quora.com',
  'www.youtube.com',
  'www.youku.com',
  'www.tudou.com',
  'v.qq.com',
  'tv.sohu.com'
];

var SEARCH_DOMAINS = [
  'www.google.com',
  'www.baidu.com',
  'cn.bing.com',
  'www.bing.com',
  'www.yahoo.com',
  'cn.yahoo.com',
  'www.soso.com',
  'www.sogou.com'
];

var BLOCK_DOMAINS = [
  'www.amazon.com',
  'www.amazon.cn',
  'www.360.com',
  'www.taobao.com',
  'www.infoq.com',
  'www.iteye.com',
  'www.cnbeta.com'
];

function isHomepage(path) {
  if (path === '/' || path === '' || path === '/index.html') {
    return true;
  }
}

/**
 * Validate the given `url`.
 */
function valid(url, cb) {
  var ret;

  if (!/^https?\:\/\//.test(url)) {
    ret = {valid: false, hint: 'Invalid URL'};
    cb && cb(ret);
    return ret;
  }

  var a = document.createElement('a');
  a.href = url;

  if (isHomepage(a.pathname)) {
    ret = {valid: false, hint: "We don't parse homepage"};
    cb && cb(ret);
    return ret;
  }

  var i;

  for (i = 0; i < BLOCK_PATHS.length; i++) {
    if (~a.pathname.indexOf(BLOCK_PATHS[i])) {
      ret = {valid: false, hint: "We don't parse this link"};
      cb && cb(ret);
      return ret;
    }
  }

  var domains = BLOCK_DOMAINS.concat(
    READ_LATERS, SOCIAL_DOMAINS, SEARCH_DOMAINS
  );
  for (i = 0; i < domains.length; i++) {
    if (a.hostname === domains[i]) {
      ret = {valid: false, hint: "We don't parse this domain"};
      cb && cb(ret);
      return ret;
    }
  }

  ret = {valid: true, hint: null};
  cb && cb(ret);
  return ret;
}

module.exports = valid;
