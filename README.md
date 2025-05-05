# Clubber TV App

## Business Understanding
- The Playlist feature lets Clubber TV users curate and organize their favorite football matches in one place.
- This makes it easy to quickly access live matches or rewatch old ones with just **ONE** click.
- Users are also able to delete unwanted matches from the list.

### Feature Suggestion
* **Live Match Result Notifications:** While watching a live match, display small, non-intrusive notifications on the screen showing real-time results from other live matches currently in progress.

---

## Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js & npm](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [Angular 19](https://angular.dev/installation)

### Clone the Repository
Clone the project using:
```bash
git clone https://github.com/dev-mahmoudhamed/code-quests-app
```

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
- Remove matches from your playlist with a single click.
- Click "Watch Match" to open a match video (demo link).

---

## License
This project is licensed under the MIT License.
