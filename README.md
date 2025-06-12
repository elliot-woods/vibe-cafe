# ☕ Vibe Cafe

An AI-powered venue vibe checker that analyzes photos of restaurants, bars, and cafes to provide insights about atmosphere, crowd levels, and availability.

## Features

- **AI-Powered Analysis**: Uses OpenAI's vision capabilities to analyze venue photos
- **Real-time Processing**: Upload photos and get instant vibe analysis
- **Detailed Insights**: Get information about:
  - Crowd level (0-100 scale)
  - Available seating (tables or bar seats)
  - Business type detection (restaurant/bar/cafe)
  - Overall atmosphere description
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- **TypeScript**: Fully typed for better developer experience

## Tech Stack

- **Frontend**: Next.js 15+ with App Router
- **Styling**: Tailwind CSS
- **AI**: OpenAI API with vision capabilities
- **Language**: TypeScript
- **Deployment**: Vercel

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd vibe-cafe
   make setup
   ```

2. **Configure environment**:
   Edit `.env` and add your OpenAI API key:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Start development server**:
   ```bash
   make dev
   ```

4. **Open your browser**:
   Visit [http://localhost:3000](http://localhost:3000)

## Usage

1. **Upload a Photo**: Drag and drop or click to select a photo of a restaurant, bar, or cafe
2. **Wait for Analysis**: The AI will analyze the image (takes 5-10 seconds)
3. **View Results**: Get detailed insights about the venue's vibe, crowd level, and availability
4. **Analyze Another**: Upload more photos to compare different venues

## Development Commands

```bash
# Initial setup
make setup

# Development
make dev          # Start development server
make build        # Build for production
make start        # Start production server

# Code quality
make lint         # Run ESLint
make type-check   # Run TypeScript checks
make check        # Run all checks

# Deployment
make deploy       # Deploy to Vercel production
make deploy-preview # Deploy preview

# Utilities
make clean        # Clean build artifacts
make help         # Show all commands
```

## API Endpoints

### POST /api/analyze

Analyzes an uploaded image and returns vibe analysis.

**Request**: Multipart form data with `image` field
**Response**:
```json
{
  "success": true,
  "result": {
    "crowded": 65,
    "open_tables": 3,
    "business_type": "restaurant",
    "overall_vibe": "Cozy evening atmosphere with warm lighting and moderate conversation levels."
  }
}
```

## Project Structure

```
vibe-cafe/
├── src/
│   ├── app/
│   │   ├── api/analyze/     # API routes
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main page
│   ├── components/
│   │   ├── LoadingSpinner.tsx
│   │   ├── UploadZone.tsx
│   │   └── VibeResults.tsx
│   ├── lib/
│   │   └── openai.ts        # OpenAI integration
│   └── types/
│       └── index.ts         # TypeScript types
├── public/                  # Static assets
├── Makefile                 # Development commands
└── README.md
```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `NEXT_PUBLIC_APP_URL`: App URL for production (optional)

## Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   make deploy
   ```

3. **Add environment variables** in Vercel dashboard:
   - `OPENAI_API_KEY`

### Manual Deployment

1. Build the application:
   ```bash
   make build
   ```

2. Deploy the `.next` folder to your hosting provider

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `make check`
5. Submit a pull request

## License

MIT License - see LICENSE file for details 