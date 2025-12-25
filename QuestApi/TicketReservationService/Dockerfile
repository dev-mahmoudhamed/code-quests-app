# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 7070
EXPOSE 7071


# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src



# Copy solution and project files
COPY ["QuestApi.sln", "."]
COPY ["TicketReservationService/TicketReservationService.csproj", "TicketReservationService/"]
COPY ["QuestApi/QuestApi.csproj", "QuestApi/"]

# Restore using solution (ensures all references resolve)
RUN dotnet restore "QuestApi/QuestApi.csproj"



COPY . .
WORKDIR "/src/TicketReservationService"
RUN dotnet build "./TicketReservationService.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./TicketReservationService.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TicketReservationService.dll"]