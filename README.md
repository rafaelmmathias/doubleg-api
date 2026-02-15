# DoubleG API

## Overview
DoubleG API

## Getting Started

### Prerequisites
- Docker
- Docker Compose

### Installation
```bash
git clone https://github.com/yourusername/doubleg-api.git
cd doubleg-api
docker build -t doubleg-api .
```

### Running the Server
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up
```

The API will be available at `http://localhost:3000`

## API Documentation
[Add endpoint documentation here]

### Example Request
```bash
curl http://localhost:3000/api/endpoint
```

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License
[Specify your license]

