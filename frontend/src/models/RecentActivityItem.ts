export class RecentActivityItem {
    public recentItems: RecentItem[] = [];
    public viewedRecentNotifications = true;
}

export class RecentItem {
    public username = "";
    public postId = 0;
    public created = new Date()
    public recentActivityItemType: RecentActivityItemType = 0;

}

export enum RecentActivityItemType {
    Follow, PostLike, CommentLike
}
