(function(e){"use strict";let a=null;var n={onLoad:function(){a=document.createElement("style"),a.id="hide-decorations-plugin",a.textContent=`
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
        `,document.head.appendChild(a)},onUnload:function(){a?.parentNode&&(a.parentNode.removeChild(a),a=null)}};return e.default=n,Object.defineProperty(e,"__esModule",{value:!0}),e})({});
