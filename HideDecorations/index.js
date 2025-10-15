(function(e,o){"use strict";let a=null;var n={onLoad:function(){o.logger.log("Hide Decorations plugin loading..."),a=document.createElement("style"),a.id="hide-decorations-plugin",a.textContent=`
            /* Hide avatar decorations */
            [class*="avatarDecoration"],
            [class*="avatar-decoration"],
            [class*="AvatarDecoration"],
            img[class*="decoration"],
            div[class*="avatarDecoration"] > svg,
            div[class*="avatarDecoration"] > img {
                display: none !important;
            }

            /* Hide clan tags */
            [class*="clanTag"],
            [class*="clan-tag"],
            [class*="ClanTag"],
            [class*="profileClanTag"],
            [class*="userTag"] > [class*="clan"] {
                display: none !important;
            }
        `,document.head.appendChild(a),o.logger.log("Hide Decorations plugin loaded! Decorations hidden.")},onUnload:function(){o.logger.log("Hide Decorations plugin unloading..."),a?.parentNode&&(a.parentNode.removeChild(a),a=null),o.logger.log("Hide Decorations plugin unloaded.")}};return e.default=n,Object.defineProperty(e,"__esModule",{value:!0}),e})({},vendetta);
