(function(e,o,l){"use strict";let n=[],t=null;var c={onLoad:function(){t=document.createElement("style"),t.id="hide-decorations-plugin",t.textContent=`
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
        `,document.head.appendChild(t);try{const a=l.findByProps("getCurrentUser");a&&n.push(o.after("getCurrentUser",a,function(s,r){return r?.avatarDecoration&&(r.avatarDecoration=null),r}))}catch(a){console.log("Could not patch avatar decorations:",a)}try{const a=l.findByProps("getClan","getTag");a&&a.getClan&&n.push(o.after("getClan",a,function(){return null})),a&&a.getTag&&n.push(o.after("getTag",a,function(){return null}))}catch(a){console.log("Could not patch clan tags:",a)}},onUnload:function(){t?.parentNode&&(t.parentNode.removeChild(t),t=null);for(const a of n)a();n=[]}};return e.default=c,Object.defineProperty(e,"__esModule",{value:!0}),e})({},vendetta.patcher,vendetta.metro);
