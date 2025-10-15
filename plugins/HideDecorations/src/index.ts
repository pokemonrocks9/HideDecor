import { findByStoreName, findByProps } from '@vendetta/metro';
import { after, instead } from '@vendetta/patcher';

let patches: (() => void)[] = [];

export default {
    onLoad: () => {
        try {
            console.log("[HideDecorations] === DEBUG MODE ===");

            // Find and log UserStore methods
            const UserStore = findByStoreName('UserStore');
            if (UserStore) {
                console.log("[HideDecorations] UserStore found!");
                console.log("[HideDecorations] UserStore methods:", Object.keys(UserStore).filter(k => typeof UserStore[k] === 'function'));
            } else {
                console.log("[HideDecorations] UserStore NOT found!");
            }

            // Find and log anything related to avatar decorations
            try {
                const AvatarDecorationUtils = findByProps('getAvatarDecorationURL');
                if (AvatarDecorationUtils) {
                    console.log("[HideDecorations] AvatarDecorationUtils found!");
                    console.log("[HideDecorations] Methods:", Object.keys(AvatarDecorationUtils));
                } else {
                    console.log("[HideDecorations] AvatarDecorationUtils NOT found!");
                }
            } catch (e) {
                console.log("[HideDecorations] Error finding AvatarDecorationUtils:", e);
            }

            // Try alternative searches
            try {
                const DecorationStore = findByStoreName('AvatarDecorationStore');
                if (DecorationStore) {
                    console.log("[HideDecorations] AvatarDecorationStore found!");
                    console.log("[HideDecorations] Methods:", Object.keys(DecorationStore));
                } else {
                    console.log("[HideDecorations] AvatarDecorationStore NOT found");
                }
            } catch (e) {
                console.log("[HideDecorations] Error finding AvatarDecorationStore:", e);
            }

            // Try patching based on what we know works from the Decor plugin
            try {
                if (UserStore?.getUser) {
                    patches.push(
                        instead('getUser', UserStore, (args, orig) => {
                            const user = orig(...args);
                            if (user) {
                                user.avatarDecoration = null;
                                user.avatarDecorationData = null;
                            }
                            return user;
                        })
                    );
                    console.log("[HideDecorations] ✓ Patched UserStore.getUser with 'instead'");
                }
            } catch (e) {
                console.log("[HideDecorations] ✗ Failed to patch UserStore.getUser:", e);
            }

            // Try the decoration URL method
            try {
                const ImageResolver = findByProps('getAvatarDecorationURL');
                if (ImageResolver?.getAvatarDecorationURL) {
                    patches.push(
                        instead('getAvatarDecorationURL', ImageResolver, () => {
                            return null;
                        })
                    );
                    console.log("[HideDecorations] ✓ Patched getAvatarDecorationURL");
                }
            } catch (e) {
                console.log("[HideDecorations] ✗ Failed to patch getAvatarDecorationURL:", e);
            }

            console.log("[HideDecorations] Loaded with", patches.length, "patches active");
        } catch (error) {
            console.error("[HideDecorations] Load error:", error);
        }
    },

    onUnload: () => {
        try {
            patches.forEach((unpatch) => unpatch());
            patches = [];
            console.log("[HideDecorations] Unloaded");
        } catch (error) {
            console.error("[HideDecorations] Unload error:", error);
        }
    }
};
