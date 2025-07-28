# متجر العمولة - PMP

موقع البيع بالعمولة - نروج منتجات التجار مقابل عمولة من كل عملية بيع

## 🚀 النشر على Vercel

### المتطلبات الأساسية

1. **قاعدة البيانات**: تحتاج إلى قاعدة بيانات PostgreSQL
   - يمكنك استخدام [Neon](https://neon.tech) أو [Supabase](https://supabase.com) أو [PlanetScale](https://planetscale.com)

2. **Cloudinary** (اختياري): لرفع الصور
   - سجل في [Cloudinary](https://cloudinary.com) واحصل على بيانات الاعتماد

### إعداد Environment Variables في Vercel

أضف المتغيرات التالية في إعدادات Vercel:

```env
# قاعدة البيانات (مطلوب)
DATABASE_URL="postgresql://username:password@host:port/database"

# JWT Secret (مطلوب)
JWT_SECRET="your-super-secret-jwt-key-here"

# Cloudinary (اختياري)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### خطوات النشر

1. اربط مشروعك بـ GitHub
2. اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
3. اختر "New Project"
4. اختر repository الخاص بك
5. أضف Environment Variables المذكورة أعلاه
6. اضغط "Deploy"

### حل المشاكل الشائعة

#### خطأ "Application error: a server-side exception has occurred"

**الحل:**
1. تأكد من إضافة `DATABASE_URL` في Environment Variables
2. تأكد من أن قاعدة البيانات متاحة ومتصل بها
3. تحقق من سجلات Vercel للحصول على تفاصيل الخطأ

#### خطأ في Prisma

**الحل:**
1. تأكد من تشغيل `prisma generate` أثناء البناء
2. تحقق من صحة `DATABASE_URL`
3. تأكد من أن قاعدة البيانات تحتوي على الجداول المطلوبة

#### خطأ في JWT

**الحل:**
1. تأكد من إضافة `JWT_SECRET` في Environment Variables
2. استخدم مفتاح سري قوي (يمكنك إنشاؤه باستخدام `openssl rand -base64 32`)

## 🛠 التطوير المحلي

### التثبيت

```bash
npm install
```

### إعداد قاعدة البيانات

```bash
# إنشاء ملف .env
cp .env.example .env

# تحديث DATABASE_URL في ملف .env

# تشغيل Prisma
npx prisma generate
npx prisma db push

# إضافة بيانات تجريبية
npm run seed
```

### تشغيل المشروع

```bash
npm run dev
```

## 📁 هيكل المشروع

```
src/
├── app/                 # Next.js App Router
│   ├── (public)/       # الصفحات العامة
│   ├── admin/          # لوحة الإدارة
│   └── api/            # API Routes
├── components/          # React Components
├── lib/                # المكتبات والخدمات
└── utils/              # الأدوات المساعدة
```

## 🔧 الميزات

- ✅ نظام مصادقة آمن (JWT)
- ✅ لوحة إدارة متكاملة
- ✅ إدارة المنتجات والفئات
- ✅ نظام تتبع النقرات
- ✅ رفع الصور (Cloudinary)
- ✅ تصميم متجاوب
- ✅ دعم اللغة العربية

## 📝 الترخيص

هذا المشروع مرخص تحت رخصة MIT.
