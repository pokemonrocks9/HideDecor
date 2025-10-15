(function(a,d,c){"use strict";let r=[],n=null;var s={onLoad:function(){try{console.log("[HideDecorations] Loading plugin...");const o=document.getElementById("hide-decorations-plugin");if(o&&o.remove(),n=document.createElement("style"),n.id="hide-decorations-plugin",n.textContent=`
                /* Hide EVERYTHING with decoration in the class name */
                [class*="decoration"],
                [class*="Decoration"],
                [class*="DECORATION"] {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    width: 0 !important;
                    height: 0 !important;
                    position: absolute !important;
                    pointer-events: none !important;
                }

                /* Hide by CDN URL patterns */
                img[src*="avatar-decoration"],
                img[src*="avatar_decoration"],
                img[src*="/avatar-decoration-presets/"],
                img[src*="cdn.discordapp.com"][src*="decoration"] {
                    display: none !important;
                    visibility: hidden !important;
                }

                /* Hide SVG decorations */
                svg[class*="decoration"],
                svg[aria-label*="decoration"],
                div[class*="avatar"] svg[class*="decoration"] {
                    display: none !important;
                    visibility: hidden !important;
                }
            `,document.head){document.head.appendChild(n),console.log("[HideDecorations] CSS injected");const e=document.getElementById("hide-decorations-plugin");console.log("[HideDecorations] CSS in DOM:",!!e)}try{const e=d.findByStoreName("UserStore");e?.getUser&&(r.push(c.after("getUser",e,function(i,t){return t&&(t.avatarDecoration=null,t.avatarDecorationData=null),t})),console.log("[HideDecorations] UserStore.getUser patched")),e?.getCurrentUser&&(r.push(c.after("getCurrentUser",e,function(i,t){return t&&(t.avatarDecoration=null,t.avatarDecorationData=null),t})),console.log("[HideDecorations] UserStore.getCurrentUser patched"))}catch(e){console.log("[HideDecorations] Could not patch UserStore:",e)}console.log("[HideDecorations] Plugin loaded!")}catch(o){console.error("[HideDecorations] Load error:",o)}},onUnload:function(){try{console.log("[HideDecorations] Unloading..."),n?.parentNode&&(n.parentNode.removeChild(n),n=null);const o=document.getElementById("hide-decorations-plugin");o&&o.remove(),r.forEach(function(e){try{e()}catch(i){console.error("[HideDecorations] Unpatch error:",i)}}),r=[],console.log("[HideDecorations] Unloaded!")}catch(o){console.error("[HideDecorations] Unload error:",o)}}};return a.default=s,Object.defineProperty(a,"__esModule",{value:!0}),a})({},vendetta.metro,vendetta.patcher);
