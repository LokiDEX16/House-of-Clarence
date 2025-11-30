#!/bin/bash

# House of Clarence - Quick Setup Script
# This script helps with initial setup

echo "🎨 House of Clarence - E-Commerce Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

echo "✓ Node.js $(node --version) found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed"
echo ""

# Check environment variables
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating template..."
    cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
EOF
    echo "✓ Created .env.local - please update with your Supabase credentials"
else
    echo "✓ .env.local exists"
fi

echo ""
echo "========================================"
echo "✨ Setup Complete!"
echo ""
echo "📖 Next steps:"
echo "1. Update .env.local with your Supabase credentials"
echo "2. Run 'npm run dev' to start development server"
echo "3. Open http://localhost:3000"
echo ""
echo "📚 See SETUP_GUIDE.md for detailed instructions"
echo ""
