# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["QuestApi/QuestApi.csproj", "QuestApi/"]
RUN dotnet restore "QuestApi/QuestApi.csproj"

# Copy the rest of the files and build
COPY . .
WORKDIR "/src/QuestApi"
RUN dotnet build "QuestApi.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "QuestApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Configure the container
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# Set the entry point
ENTRYPOINT ["dotnet", "QuestApi.dll"]