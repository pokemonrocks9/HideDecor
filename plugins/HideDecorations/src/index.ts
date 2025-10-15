import { findByStoreName, findByProps } from '@vendetta/metro';
import { after } from '@vendetta/patcher';

let patches: (() => void)[] = [];
let observer: MutationObserver | null = null;

// Function to hide decorations in the DOM
function hideDecorations() {
    // Hide by class name
    const decorationElements = document.querySelectorAll('[class*="decoration"], [class*="Decoration"]');
    decorationElements.forEach((el: any) => {
        if (el.style) {
            el.style.display = 'none';
            el.style.visibility = 'hidden';
            el.style.opacity = '0';
        }
    });
    
    // Hide by src attribute (images/videos)
    const mediaElements = document.querySelectorAll('img[src*="decoration"], img[src*="avatar-decoration"], video[src*="decoration"]');
    mediaElements.forEach((el: any) => {
        if (el.style) {
            el.style.display = 'none';
        }
    });
}

export default {
    onLoad: () => {
        try {
            console.log("[HideDecorations] Loading...");

            // Method 1: Continuously watch for and hide decorations
            hideDecorations();
            
            // Set up MutationObserver to catch dynamically added decorations
            observer = new MutationObserver(() => {
                hideDecorations();
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            console.log("[HideDecorations] MutationObserver active");

            // Method 2: Patch user data at the source
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

            // Method 3: Try to patch the avatar decoration rendering function
            try {
                const AvatarUtils = findByProps('getAvatarDecorationURL');
                if (AvatarUtils?.getAvatarDecorationURL) {
                    patches.push(
                        after('getAvatarDecorationURL', AvatarUtils, () => {
                            return null; // Return null so no decoration URL is used
                        })
                    );
                    console.log("[HideDecorations] getAvatarDecorationURL patched");
                }
            } catch (e) {
                console.log("[HideDecorations] Could not patch AvatarUtils:", e);
            }

            console.log("[HideDecorations] Loaded!");
        } catch (error) {
            console.error("[HideDecorations] Load error:", error);
        }
    },

    onUnload: () => {
        try {
            console.log("[HideDecorations] Unloading...");
            
            // Stop observing
            if (observer) {
                observer.disconnect();
                observer = null;
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
