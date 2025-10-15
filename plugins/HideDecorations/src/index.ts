import { findByStoreName } from '@vendetta/metro';
import { after } from '@vendetta/patcher';

const UserStore = findByStoreName('UserStore');
const GuildMemberStore = findByStoreName('GuildMemberStore');

let patches: (() => void)[] = [];

export default {
    onLoad: () => {
        // Patch UserStore.getUser to remove avatar decorations
        if (UserStore) {
            patches.push(
                after('getUser', UserStore, (_, user) => {
                    if (user) {
                        // Remove avatar decoration
                        user.avatarDecoration = null;
                        user.avatarDecorationData = null;
                    }
                })
            );
        }

        // Patch GuildMemberStore to remove clan tags
        if (GuildMemberStore) {
            patches.push(
                after('getMember', GuildMemberStore, (_, member) => {
                    if (member) {
                        // Remove clan tag
                        member.clan = null;
                    }
                })
            );
            
            patches.push(
                after('getMembers', GuildMemberStore, (_, members) => {
                    if (Array.isArray(members)) {
                        members.forEach(member => {
                            if (member) {
                                member.clan = null;
                            }
                        });
                    }
                })
            );
        }
    },

    onUnload: () => {
        patches.forEach((unpatch) => unpatch());
        patches = [];
    }
};
