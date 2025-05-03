using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QuestApi.Models;
using System.Reflection.Emit;

namespace QuestApi.Data
{
    public class QuestDbContext : IdentityDbContext<AppUser, IdentityRole<int>, int>
    {
        public QuestDbContext(DbContextOptions<QuestDbContext> options)
        : base(options) { }


        public DbSet<Match> Matches { get; set; }
        public DbSet<Playlist> Playlists { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Playlist>()
                .HasKey(p => new { p.UserId, p.MatchId });

            modelBuilder.Entity<Playlist>()
                .HasOne(p => p.User)
                .WithMany(u => u.Playlists)
                .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<Playlist>()
                .HasOne(p => p.Match)
                .WithMany(m => m.Playlists)
                .HasForeignKey(p => p.MatchId);

            modelBuilder.Entity<AppUser>(entity =>
            {
                entity.ToTable(name: "Users");
            });

            modelBuilder.Ignore<IdentityRole<int>>();
            modelBuilder.Ignore<IdentityRoleClaim<int>>();
            modelBuilder.Ignore<IdentityUserClaim<int>>();
            modelBuilder.Ignore<IdentityUserLogin<int>>();
            modelBuilder.Ignore<IdentityUserRole<int>>();
            modelBuilder.Ignore<IdentityUserToken<int>>();

        }
    }
}
