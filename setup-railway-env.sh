#!/bin/bash

echo "Pasiflow Railway Environment Setup Script"
echo "=========================================="
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "Node.js bulunamadı! Lütfen önce Node.js kurun."
    exit 1
fi

echo "1. Bcrypt kuruluyor..."
npm install bcryptjs

echo ""
echo "2. Şifre hash'leri oluşturuluyor..."
echo ""

# Generate password hashes
USER_HASH=$(node -e "console.log(require('bcryptjs').hashSync('Pasiflow2026!', 10))")
CLIENT_HASH=$(node -e "console.log(require('bcryptjs').hashSync('Demo123!', 10))")
AGENT_HASH=$(node -e "console.log(require('bcryptjs').hashSync('Agent123!', 10))")

echo "Demo User Password Hash: $USER_HASH"
echo "Demo Client Password Hash: $CLIENT_HASH"
echo "Demo Agent Password Hash: $AGENT_HASH"

echo ""
echo "3. Railway için .env dosyası oluşturuluyor..."
echo ""

# Generate JWT Secret
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

cat > .env.railway << EOF
# Railway Environment Variables
# Bu değerleri Railway Dashboard → Variables sekmesine kopyala

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB_NAME
JWT_SECRET=$JWT_SECRET

DEMO_USER_EMAIL=erman@pasiflow.com
DEMO_USER_PASSWORD_HASH=$USER_HASH

DEMO_CLIENT_EMAIL=demo@pasiflow.com
DEMO_CLIENT_PASSWORD_HASH=$CLIENT_HASH

DEMO_AGENT_EMAIL=agent@pasiflow.com
DEMO_AGENT_PASSWORD_HASH=$AGENT_HASH

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
ADMIN_EMAIL=info@pasiflow.com

OPENAI_API_KEY=sk-your-openai-key
EOF

echo ".env.railway dosyası oluşturuldu!"
echo ""
echo "═══════════════════════════════════════════════════"
echo "YAPMAN GEREKENLER:"
echo "═══════════════════════════════════════════════════"
echo ""
echo "1. Railway Dashboard'a git: https://railway.app"
echo "2. Pasiflow projeni aç"
echo "3. Sol menüden 'Variables' tıkla"
echo "4. Sağ üstten 'Raw Editor' aç"
echo "5. .env.railway dosyasının içeriğini kopyala"
echo "6. Railway'deki Raw Editor'a yapıştır"
echo "7. DATABASE_URL değerini kendi PostgreSQL bilgilerinle güncelle"
echo "8. SMTP ve OpenAI bilgilerini kendi bilgilerinle güncelle"
echo "9. 'Deploy' butonuna tıkla"
echo ""
echo "═══════════════════════════════════════════════════"

# Display the generated file
echo ""
echo "Oluşturulan .env.railway dosyası:"
echo "-----------------------------------"
cat .env.railway