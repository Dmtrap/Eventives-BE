# Dockerfile

# Gunakan image Node.js sebagai base image
FROM node:18-alpine

# Tentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin semua file ke dalam container
COPY . .

# Jalankan prisma generate untuk memastikan tipe-tipe terbaru dihasilkan
RUN npx prisma generate

# Build aplikasi NestJS
RUN npm run build

# Expose port yang digunakan aplikasi
EXPOSE 3001

# Jalankan aplikasi
CMD ["npm", "run", "start:prod"]