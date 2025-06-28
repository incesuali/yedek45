// Fiyat alarmı kontrol scripti (cron job)
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
require('dotenv').config();

const prisma = new PrismaClient();

async function getCurrentFlightPrice(origin, destination, departureDate) {
  // Gerçek API ile entegre edilecek, şimdilik demo fiyat
  // Örneğin: await fetch('https://api.biletdukkani.com/flights/price', ...)
  return 100 + Math.floor(Math.random() * 100); // Demo fiyat
}

async function sendPriceChangeMail(to, alert, newPrice) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    from: 'Gurbet.biz <no-reply@gurbet.biz>',
    to,
    subject: 'Uçak Bileti Fiyatı Değişti!',
    text: `Fiyat alarmı kurduğunuz uçuşun fiyatı değişti!\n\nRota: ${alert.origin} -> ${alert.destination}\nTarih: ${alert.departureDate}\nYeni Fiyat: ${newPrice} EUR`,
    html: `<b>Fiyat alarmı kurduğunuz uçuşun fiyatı değişti!</b><br/>Rota: ${alert.origin} → ${alert.destination}<br/>Tarih: ${alert.departureDate}<br/><b>Yeni Fiyat: ${newPrice} EUR</b>`,
  });
}

async function main() {
  const alerts = await prisma.priceAlert.findMany({
    include: { user: true },
  });
  for (const alert of alerts) {
    const newPrice = await getCurrentFlightPrice(alert.origin, alert.destination, alert.departureDate);
    // Son gönderilen fiyatı PriceAlert tablosunda sakladığını varsayalım (ör: lastNotifiedPrice)
    if (alert.lastNotifiedPrice === undefined || alert.lastNotifiedPrice !== newPrice) {
      await sendPriceChangeMail(alert.user.email, alert, newPrice);
      await prisma.priceAlert.update({
        where: { id: alert.id },
        data: { lastNotifiedPrice: newPrice },
      });
      console.log(`Mail gönderildi: ${alert.user.email} - ${alert.origin} → ${alert.destination} - ${newPrice} EUR`);
    }
  }
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}); 