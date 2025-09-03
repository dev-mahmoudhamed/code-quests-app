using Grpc.Core;
using TicketReservationGrpc;

namespace TicketReservationService.Services
{
    public class TicketService : Ticket.TicketBase
    {
        private readonly ILogger<TicketService> _logger;

        public TicketService(ILogger<TicketService> logger)
        {
            _logger = logger;
        }
        public override Task<TicketReply> GetTicket(TicketRequest request, ServerCallContext context)
        {
            return Task.FromResult(new TicketReply
            {
                Status = true,
                TicketNumber = $"TCK{request.UserId}"
            });
        }

    }
}
