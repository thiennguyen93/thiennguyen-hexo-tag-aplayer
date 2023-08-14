"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require("./base");

var _constant = require("../../common/constant");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var APlayerListTag = function (_BaseTag) {
  _inherits(APlayerListTag, _BaseTag);

  function APlayerListTag(hexo, args, pid) {
    _classCallCheck(this, APlayerListTag);

    var _this = _possibleConstructorReturn(this, (APlayerListTag.__proto__ || Object.getPrototypeOf(APlayerListTag)).call(this, hexo, args, pid));

    _this.settings = _this.parse(args);
    return _this;
  }

  _createClass(APlayerListTag, [{
    key: "parse",
    value: function parse(options) {
      var _this2 = this;

      var settings = Object.assign({
        narrow: false,
        autoplay: false,
        showlrc: 0
      }, JSON.parse(options));
      settings.music.forEach(function (info) {
        info.url = _this2.processUrl(info.url);
        info.pic = info.pic ? _this2.processUrl(info.pic) : '';
      });
      return settings;
    }
  }, {
    key: "generate",
    value: function generate() {
      var settings = JSON.stringify(this.settings);
      return `
<div id="${this.id}" class="aplayer ${_constant.APLAYER_TAG_MARKER}" style="margin-bottom: 20px;"></div>
<script>
  var options = ${settings}; 
  options.autoplay = (document.getElementsByClassName("no-autoplay")?.length)?false:(options.autoplay); 
  options.element = document.getElementById("${this.id}");
  var ap = new APlayer(options);
  window.aplayers || (window.aplayers = []);
  window.thiennguyenPlayers || (window.thiennguyenPlayers = {});
  if (!(window.aplayers.findIndex(item => item?.container?.getAttribute("id") === \`${this.id}\`) > -1)) {
    // ap.volume(0)
    // ap.audio.muted = true
    // ap.audio.defaultMuted = true
    window.aplayers.push(ap);
    window.thiennguyenPlayers["${this.id}"] = ap
    window.thiennguyenPlayers["${this.id}"].offsetTop = document.getElementById("${this.id}").offsetTop
    window.thiennguyenPlayers["${this.id}"].offsetHeight = document.getElementById("${this.id}").offsetHeight
  }
  window.addEventListener("scroll", function() {
    // if (window.thiennguyenPlayers?.["${this.id}"]?.options?.autoplay && window.thiennguyenPlayers?.["${this.id}"]?.paused) {
    //   window.thiennguyenPlayers["${this.id}"].play();
    //   window.thiennguyenPlayers["${this.id}"].options.autoplay = false;
    // }
    var elementTarget = document.getElementById("${this.id}")
    var lrcEl = document.querySelector("#${this.id} .aplayer-lrc");
    if ( !window.thiennguyenPlayers?.["${this.id}"].paused && window.scrollY > (window.thiennguyenPlayers?.["${this.id}"].offsetTop + window.thiennguyenPlayers?.["${this.id}"].offsetHeight*2)) {
        elementTarget.classList.add("aplayer-fixed");
        if (!document.querySelector("#${this.id}>.aplayer-lrc")) {
          window.thiennguyenPlayers?.["${this.id}"].setMode("mini")
          elementTarget.appendChild(lrcEl)
        }
    } else {
        elementTarget.classList.remove("aplayer-fixed");
        if (!document.querySelector("#${this.id}>.aplayer-body>.aplayer-info>.aplayer-lrc")) {
          document.querySelector("#${this.id}>.aplayer-body>.aplayer-info>.aplayer-music").after(lrcEl)
          window.thiennguyenPlayers?.["${this.id}"].setMode("normal")
        }
    }
  });
    
</script>
`
      // return "\n        <div id=\"" + this.id + "\" class=\"aplayer " + _constant.APLAYER_TAG_MARKER + "\" style=\"margin-bottom: 20px;\"></div>\n\t\t\t  <script>\n\t\t\t\t  var options = " + settings + "; \n\t\t\t\t  options.autoplay = (document.getElementsByClassName(\"no-autoplay\")?.length)?false:(options.autoplay); \n\t\t\t\t  options.element = document.getElementById(\"" + this.id + "\");\n\t\t\t\t  var ap = new APlayer(options);\n\t\t\t    window.aplayers || (window.aplayers = []);\n\t\t\t\t  window.aplayers.push(ap);\n\t\t\t  </script>";
    }
  }]);

  return APlayerListTag;
}(_base.BaseTag);

exports.default = APlayerListTag;