using System;
using System.Collections.Generic;

namespace tradeus.ViewModel
{
    public class RecentActivityItem
    {
        public List<RecentItem> RecentItems { get; set; }
        public bool ViewedRecentNotifications { get; set; }
    }

    public class RecentItem
    {
        public string Username { get; set; }
        public int PostId { get; set; }
        public RecentActivityItemType RecentActivityItemType { get; set; }
        public DateTime Created { get; set; }
    }

    public enum RecentActivityItemType
    {
        Follow, PostLike, CommentLike
    }
}