using Microsoft.AspNetCore.Server.Kestrel.Core;
using TicketReservationService.Services;

namespace TicketReservationService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.WebHost.ConfigureKestrel(options =>
            {
                options.ListenAnyIP(7071, listenOptions =>
                {
                    listenOptions.Protocols = HttpProtocols.Http2;
                    listenOptions.UseHttps();
                });

                options.ListenAnyIP(7070, listenOptions =>
                {
                    listenOptions.Protocols = HttpProtocols.Http2;
                });
            });


            // Add services to the container.
            builder.Services.AddGrpc();
            builder.Services.AddGrpcReflection();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            app.MapGrpcService<TicketService>();
            app.MapGrpcReflectionService();
            app.Run();

        }
    }
}