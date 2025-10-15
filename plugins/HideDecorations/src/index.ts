import { findByProps } from '@vendetta/metro';
import { instead } from '@vendetta/patcher';

let patches: (() => void)[] = [];

export default {
    onLoad: () => {
        try {
            // TEST 1: Patch getAvatarDecorationURL to return null
            const ImageResolver = findByProps('getAvatarDecorationURL');
            if (ImageResolver?.getAvatarDecorationURL) {
                patches.push(
                    instead('getAvatarDecorationURL', ImageResolver, () => {
                        return null;
                    })
                );
                console.log("[HideDecorations] Test 1: getAvatarDecorationURL patched");
            } else {
                console.log("[HideDecorations] Test 1: getAvatarDecorationURL NOT found");
            }
        } catch (error) {
            console.error("[HideDecorations] Error:", error);
        }
    },

    onUnload: () => {
        patches.forEach((unpatch) => unpatch());
        patches = [];
    }
};
