# Clubber TV Code Quests App

## Business Understanding
The Playlist feature lets Clubber TV users curate and organize their favorite football matches in one place. This makes it easy to quickly access, rewatch, or keep track of matches they care about, increasing engagement and satisfaction with the platform.

### Feature Suggestion
A valuable improvement would be to notify users when a match in their playlist goes live, ensuring they never miss the action for matches they are interested in.

---

## Setup Instructions

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

### Backend Setup (QuestApi)
1. Navigate to `QuestApi/` directory.
2. Run database migrations:
   ```bash
   dotnet ef database update
   ```
3. Start the API server:
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:7007/api`.

### Frontend Setup (QuestUi)
1. Navigate to `QuestUi/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   ng serve
   ```
   The app will be available at `http://localhost:4200/`.

---

## API Documentation

### Authentication
- `POST /api/auth/login` — User login
- `POST /api/auth/register` — User registration

### Matches
- `GET /api/matches?status=0&filter=...` — List, search, and filter matches

### Playlist
- `GET /api/playlist` — Get user's playlist
- `POST /api/playlist/{matchId}` — Add match to playlist
- `DELETE /api/playlist/{matchId}` — Remove match from playlist
- `GET /api/playlist/myListIds` — Get IDs of matches in user's playlist

> All endpoints except login/register require JWT authentication.

---

## Project Structure

```
code-quests-app/
│
├── QuestApi/         # ASP.NET Core backend (Web API)
│   ├── Controllers/  # API endpoints (Auth, Matches, Playlist)
│   ├── Data/         # DbContext, seed data
│   ├── Dtos/         # Data transfer objects
│   ├── Models/       # Entity models (User, Match, Playlist)
│   ├── Migrations/   # EF Core migrations
│   └── Program.cs    # App entry point
│
├── QuestUi/          # Angular frontend
│   ├── src/app/      # Angular app code
│   │   ├── matches/  # Match browsing UI
│   │   ├── playlist/ # Playlist UI
│   │   ├── nav-bar/  # Navigation bar
│   │   ├── Shared/   # Services, guards, interceptors
│   │   └── Models/   # TypeScript interfaces/enums
│   ├── environments/ # API URLs
│   └── ...           # Angular config files
│
└── README.md         # Project documentation
```

---

## Usage
- Register a new account or log in.
- Browse matches, search by competition, and filter by status (All, Live, Replay).
- Add matches to your playlist. View and manage your playlist from the Playlist page.
- Click "Watch Match" to open a match video (demo link).

---

## Testing
- **Backend:** Use Postman or Swagger UI (`/swagger`) for API testing.
- **Frontend:**
  - Unit tests: `ng test`
  - E2E tests: `ng e2e`

---

## Contributing
Pull requests are welcome! Please open an issue first to discuss changes.

---

## License
This project is licensed under the MIT License.
