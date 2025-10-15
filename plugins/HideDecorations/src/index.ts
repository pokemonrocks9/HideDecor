import { findByStoreName } from '@vendetta/metro';
import { after } from '@vendetta/patcher';

let patches: (() => void)[] = [];
let styleElement: HTMLStyleElement | null = null;

export default {
    onLoad: () => {
        try {
            console.log("[HideDecorations] Loading plugin...");

            // Remove any existing style element first
            const existing = document.getElementById('hide-decorations-plugin');
            if (existing) {
                existing.remove();
            }

            // SUPER AGGRESSIVE CSS - hide anything decoration-related
            styleElement = document.createElement('style');
            styleElement.id = 'hide-decorations-plugin';
            styleElement.textContent = `
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
            `;
            
            if (document.head) {
                document.head.appendChild(styleElement);
                console.log("[HideDecorations] CSS injected");
                
                // Verify it's in the DOM
                const inserted = document.getElementById('hide-decorations-plugin');
                console.log("[HideDecorations] CSS in DOM:", !!inserted);
            }

            // Patch UserStore to remove decoration data
            try {
                const UserStore = findByStoreName('UserStore');
                if (UserStore?.getUser) {
                    patches.push(
                        after('getUser', UserStore, (_, user) => {
                            if (user) {
                                user.avatarDecoration = null;
                                user.avatarDecorationData = null;
                            }
                            return user;
                        })
                    );
                    console.log("[HideDecorations] UserStore.getUser patched");
                }
                
                // Also try getCurrentUser
                if (UserStore?.getCurrentUser) {
                    patches.push(
                        after('getCurrentUser', UserStore, (_, user) => {
                            if (user) {
                                user.avatarDecoration = null;
                                user.avatarDecorationData = null;
                            }
                            return user;
                        })
                    );
                    console.log("[HideDecorations] UserStore.getCurrentUser patched");
                }
            } catch (e) {
                console.log("[HideDecorations] Could not patch UserStore:", e);
            }

            console.log("[HideDecorations] Plugin loaded!");
        } catch (error) {
            console.error("[HideDecorations] Load error:", error);
        }
    },

    onUnload: () => {
        try {
            console.log("[HideDecorations] Unloading...");
            
            // Remove CSS
            if (styleElement?.parentNode) {
                styleElement.parentNode.removeChild(styleElement);
                styleElement = null;
            }
            
            const existing = document.getElementById('hide-decorations-plugin');
            if (existing) {
                existing.remove();
            }

            // Remove patches
            patches.forEach((unpatch) => {
                try {
                    unpatch();
                } catch (e) {
                    console.error("[HideDecorations] Unpatch error:", e);
                }
            });
            patches = [];
            
            console.log("[HideDecorations] Unloaded!");
        } catch (error) {
            console.error("[HideDecorations] Unload error:", error);
        }
    }
};
