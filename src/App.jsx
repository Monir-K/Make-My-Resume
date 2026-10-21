import { useEffect, useRef, useState } from 'react'
import './App.css'

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'ur', label: 'Urdu' },
  { value: 'ar', label: 'Arabic' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'hi', label: 'Hindi' },
  { value: 'bn', label: 'Bengali' },
  { value: 'zh', label: 'Chinese (Simplified)' },
  { value: 'zh-tw', label: 'Chinese (Traditional)' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'ru', label: 'Russian' },
  { value: 'tr', label: 'Turkish' },
  { value: 'fa', label: 'Persian' },
  { value: 'sv', label: 'Swedish' },
  { value: 'nl', label: 'Dutch' },
  { value: 'da', label: 'Danish' },
  { value: 'fi', label: 'Finnish' },
  { value: 'el', label: 'Greek' },
  { value: 'pl', label: 'Polish' },
  { value: 'ro', label: 'Romanian' },
  { value: 'cs', label: 'Czech' },
  { value: 'sk', label: 'Slovak' },
  { value: 'hu', label: 'Hungarian' },
  { value: 'th', label: 'Thai' },
  { value: 'vi', label: 'Vietnamese' },
  { value: 'id', label: 'Indonesian' },
  { value: 'ms', label: 'Malay' },
  { value: 'uk', label: 'Ukrainian' },
  { value: 'he', label: 'Hebrew' },
  { value: 'lt', label: 'Lithuanian' },
  { value: 'lv', label: 'Latvian' },
  { value: 'et', label: 'Estonian' },
  { value: 'fil', label: 'Filipino' },
  { value: 'sw', label: 'Swahili' },
]

const themePresets = [
  { name: 'Blue', accent: '#1d6fd7', sidebar: '#0e2d65', sidebar2: '#0c4a95' },
  { name: 'Green', accent: '#1e8f63', sidebar: '#123c2f', sidebar2: '#1d6b4f' },
  { name: 'Purple', accent: '#7b5cf4', sidebar: '#2a234f', sidebar2: '#4b3a8c' },
  { name: 'Red', accent: '#d94f4f', sidebar: '#4a1d2e', sidebar2: '#822a3f' },
  { name: 'Orange', accent: '#f08d3e', sidebar: '#5c3317', sidebar2: '#9a4d1e' },
]

const translations = {
  en: {
    builder: 'CV Builder',
    templateStyle: 'CV style',
    theme: 'Theme',
    accent: 'Accent',
    sidebar: 'Sidebar',
    photo: 'Profile Photo',
    recrop: 'Re-crop photo',
    name: 'Name',
    title: 'Title',
    phone: 'Phone',
    address: 'Address',
    email: 'Email',
    website: 'Website',
    aboutField: 'About Me',
    add: 'Add',
    remove: 'Remove',
    downloadPdf: 'Download PDF',
    downloadJpg: 'Download JPG',
    cropTitle: 'Crop profile photo',
    zoom: 'Zoom',
    horizontal: 'Horizontal position',
    vertical: 'Vertical position',
    cancel: 'Cancel',
    usePhoto: 'Use photo',
    writingHelper: 'Writing helper',
    writingHelperNote: 'Creates a local editable draft from your details. It does not send your information anywhere.',
    draftDetails: 'Add notes, strengths, responsibilities, or results',
    tone: 'Tone',
    toneProfessional: 'Professional',
    toneConfident: 'Confident',
    toneWarm: 'Warm',
    generateDraft: 'Generate draft',
    useDraft: 'Use draft',
    contact: 'CONTACT',
    skills: 'SKILLS',
    languages: 'LANGUAGES',
    hobbies: 'HOBBIES',
    about: 'ABOUT ME',
    education: 'EDUCATION',
    experience: 'EXPERIENCE',
    cvLanguage: 'CV Language',
  },
  ur: {
    builder: 'سی وی بنائیں', theme: 'تھیم', accent: 'نمایاں رنگ', sidebar: 'سائیڈبار', photo: 'پروفائل تصویر', recrop: 'تصویر دوبارہ تراشیں',
    name: 'نام', title: 'عہدہ', phone: 'فون', address: 'پتہ', email: 'ای میل', website: 'ویب سائٹ', aboutField: 'میرے بارے میں', add: 'شامل کریں', remove: 'حذف کریں',
    downloadPdf: 'پی ڈی ایف ڈاؤن لوڈ کریں', downloadJpg: 'جے پی جی ڈاؤن لوڈ کریں', cropTitle: 'پروفائل تصویر تراشیں', zoom: 'زوم', horizontal: 'افقی جگہ', vertical: 'عمودی جگہ', cancel: 'منسوخ', usePhoto: 'تصویر استعمال کریں',
    contact: 'رابطہ',
    skills: 'مہارتیں',
    languages: 'زبانیں',
    hobbies: 'شغف',
    about: 'میرے بارے میں',
    education: 'تعلیم',
    experience: 'تجربہ',
    cvLanguage: 'سی وی کی زبان',
  },
  ar: {
    builder: 'منشئ السيرة الذاتية', theme: 'النمط', accent: 'اللون المميز', sidebar: 'الشريط الجانبي', photo: 'الصورة الشخصية', recrop: 'إعادة قص الصورة',
    name: 'الاسم', title: 'المسمى الوظيفي', phone: 'الهاتف', address: 'العنوان', email: 'البريد الإلكتروني', website: 'الموقع الإلكتروني', aboutField: 'نبذة عني', add: 'إضافة', remove: 'إزالة',
    downloadPdf: 'تنزيل PDF', downloadJpg: 'تنزيل JPG', cropTitle: 'قص الصورة الشخصية', zoom: 'تكبير', horizontal: 'الموضع الأفقي', vertical: 'الموضع العمودي', cancel: 'إلغاء', usePhoto: 'استخدام الصورة',
    contact: 'التواصل',
    skills: 'المهارات',
    languages: 'اللغات',
    hobbies: 'الهوايات',
    about: 'نبذة عني',
    education: 'التعليم',
    experience: 'الخبرة',
    cvLanguage: 'لغة السيرة الذاتية',
  },
  fr: {
    builder: 'Créateur de CV', templateStyle: 'Style du CV', theme: 'Thème', accent: 'Couleur principale', sidebar: 'Barre latérale', photo: 'Photo de profil', recrop: 'Recadrer la photo',
    name: 'Nom', title: 'Poste', phone: 'Téléphone', address: 'Adresse', email: 'E-mail', website: 'Site web', aboutField: 'À propos de moi', add: 'Ajouter', remove: 'Supprimer',
    downloadPdf: 'Télécharger le PDF', downloadJpg: 'Télécharger le JPG', cropTitle: 'Recadrer la photo de profil', zoom: 'Zoom', horizontal: 'Position horizontale', vertical: 'Position verticale', cancel: 'Annuler', usePhoto: 'Utiliser la photo',
    contact: 'CONTACT',
    skills: 'COMPÉTENCES',
    languages: 'LANGUES',
    hobbies: 'LOISIRS',
    about: 'À PROPOS',
    education: 'FORMATION',
    experience: 'EXPÉRIENCE',
    cvLanguage: 'Langue du CV',
  },
  es: {
    builder: 'Creador de CV', theme: 'Tema', accent: 'Color de énfasis', sidebar: 'Barra lateral', photo: 'Foto de perfil', recrop: 'Recortar foto de nuevo',
    name: 'Nombre', title: 'Cargo', phone: 'Teléfono', address: 'Dirección', email: 'Correo electrónico', website: 'Sitio web', aboutField: 'Sobre mí', add: 'Añadir', remove: 'Eliminar',
    downloadPdf: 'Descargar PDF', downloadJpg: 'Descargar JPG', cropTitle: 'Recortar foto de perfil', zoom: 'Zoom', horizontal: 'Posición horizontal', vertical: 'Posición vertical', cancel: 'Cancelar', usePhoto: 'Usar foto',
    contact: 'CONTACTO',
    skills: 'HABILIDADES',
    languages: 'IDIOMAS',
    hobbies: 'AFICIONES',
    about: 'SOBRE MÍ',
    education: 'EDUCACIÓN',
    experience: 'EXPERIENCIA',
    cvLanguage: 'Idioma del CV',
  },
  de: {
    builder: 'Lebenslauf-Editor', theme: 'Design', accent: 'Akzentfarbe', sidebar: 'Seitenleiste', photo: 'Profilfoto', recrop: 'Foto erneut zuschneiden',
    name: 'Name', title: 'Berufsbezeichnung', phone: 'Telefon', address: 'Adresse', email: 'E-Mail', website: 'Website', aboutField: 'Über mich', add: 'Hinzufügen', remove: 'Entfernen',
    downloadPdf: 'PDF herunterladen', downloadJpg: 'JPG herunterladen', cropTitle: 'Profilfoto zuschneiden', zoom: 'Zoom', horizontal: 'Horizontale Position', vertical: 'Vertikale Position', cancel: 'Abbrechen', usePhoto: 'Foto verwenden',
    contact: 'KONTAKT',
    skills: 'FÄHIGKEITEN',
    languages: 'SPRACHEN',
    hobbies: 'INTERESSEN',
    about: 'ÜBER MICH',
    education: 'AUSBILDUNG',
    experience: 'ERFAHRUNG',
    cvLanguage: 'CV-Sprache',
  },
  it: {
    builder: 'Crea CV', theme: 'Tema', accent: 'Colore principale', sidebar: 'Barra laterale', photo: 'Foto profilo', recrop: 'Ritaglia di nuovo',
    name: 'Nome', title: 'Ruolo', phone: 'Telefono', address: 'Indirizzo', email: 'E-mail', website: 'Sito web', aboutField: 'Su di me', add: 'Aggiungi', remove: 'Rimuovi',
    downloadPdf: 'Scarica PDF', downloadJpg: 'Scarica JPG', cropTitle: 'Ritaglia la foto profilo', zoom: 'Zoom', horizontal: 'Posizione orizzontale', vertical: 'Posizione verticale', cancel: 'Annulla', usePhoto: 'Usa foto',
    contact: 'CONTATTI',
    skills: 'ABILITÀ',
    languages: 'LINGUE',
    hobbies: 'HOBBY',
    about: 'CHI SONO',
    education: 'ISTRUZIONE',
    experience: 'ESPERIENZA',
    cvLanguage: 'Lingua del CV',
  },
  pt: {
    builder: 'Criador de currículo', theme: 'Tema', accent: 'Cor de destaque', sidebar: 'Barra lateral', photo: 'Foto de perfil', recrop: 'Recortar foto novamente',
    name: 'Nome', title: 'Cargo', phone: 'Telefone', address: 'Endereço', email: 'E-mail', website: 'Site', aboutField: 'Sobre mim', add: 'Adicionar', remove: 'Remover',
    downloadPdf: 'Baixar PDF', downloadJpg: 'Baixar JPG', cropTitle: 'Recortar foto de perfil', zoom: 'Zoom', horizontal: 'Posição horizontal', vertical: 'Posição vertical', cancel: 'Cancelar', usePhoto: 'Usar foto',
    contact: 'CONTATO',
    skills: 'HABILIDADES',
    languages: 'IDIOMAS',
    hobbies: 'HOBBIES',
    about: 'SOBRE MIM',
    education: 'EDUCAÇÃO',
    experience: 'EXPERIÊNCIA',
    cvLanguage: 'Idioma do currículo',
  },
  hi: {
    builder: 'सीवी बनाएँ', theme: 'थीम', accent: 'मुख्य रंग', sidebar: 'साइडबार', photo: 'प्रोफ़ाइल फ़ोटो', recrop: 'फ़ोटो फिर से क्रॉप करें',
    name: 'नाम', title: 'पद', phone: 'फ़ोन', address: 'पता', email: 'ईमेल', website: 'वेबसाइट', aboutField: 'मेरे बारे में', add: 'जोड़ें', remove: 'हटाएँ',
    downloadPdf: 'PDF डाउनलोड करें', downloadJpg: 'JPG डाउनलोड करें', cropTitle: 'प्रोफ़ाइल फ़ोटो क्रॉप करें', zoom: 'ज़ूम', horizontal: 'क्षैतिज स्थिति', vertical: 'ऊर्ध्वाधर स्थिति', cancel: 'रद्द करें', usePhoto: 'फ़ोटो इस्तेमाल करें',
    contact: 'संपर्क',
    skills: 'कौशल',
    languages: 'भाषाएँ',
    hobbies: 'शौक',
    about: 'मेरे बारे में',
    education: 'शिक्षा',
    experience: 'अनुभव',
    cvLanguage: 'सीवी भाषा',
  },
  bn: {
    builder: 'সিভি তৈরি করুন', theme: 'থিম', accent: 'প্রধান রং', sidebar: 'সাইডবার', photo: 'প্রোফাইল ছবি', recrop: 'ছবি আবার ক্রপ করুন',
    name: 'নাম', title: 'পদবি', phone: 'ফোন', address: 'ঠিকানা', email: 'ইমেইল', website: 'ওয়েবসাইট', aboutField: 'আমার সম্পর্কে', add: 'যোগ করুন', remove: 'সরান',
    downloadPdf: 'PDF ডাউনলোড', downloadJpg: 'JPG ডাউনলোড', cropTitle: 'প্রোফাইল ছবি ক্রপ করুন', zoom: 'জুম', horizontal: 'অনুভূমিক অবস্থান', vertical: 'উল্লম্ব অবস্থান', cancel: 'বাতিল', usePhoto: 'ছবি ব্যবহার করুন',
    contact: 'যোগাযোগ',
    skills: 'দক্ষতা',
    languages: 'ভাষা',
    hobbies: 'শখ',
    about: 'আমার সম্পর্কে',
    education: 'শিক্ষা',
    experience: 'অভিজ্ঞতা',
    cvLanguage: 'সিভি ভাষা',
  },
  ja: {
    builder: '履歴書ビルダー', theme: 'テーマ', accent: 'アクセント', sidebar: 'サイドバー', photo: 'プロフィール写真', recrop: '写真を再トリミング',
    name: '名前', title: '職種', phone: '電話番号', address: '住所', email: 'メール', website: 'ウェブサイト', aboutField: '自己紹介', add: '追加', remove: '削除',
    downloadPdf: 'PDFをダウンロード', downloadJpg: 'JPGをダウンロード', cropTitle: 'プロフィール写真をトリミング', zoom: 'ズーム', horizontal: '左右位置', vertical: '上下位置', cancel: 'キャンセル', usePhoto: '写真を使用',
    contact: '連絡先',
    skills: 'スキル',
    languages: '言語',
    hobbies: '趣味',
    about: '自己紹介',
    education: '学歴',
    experience: '経験',
    cvLanguage: 'CVの言語',
  },
  ko: {
    builder: '이력서 만들기', theme: '테마', accent: '강조 색상', sidebar: '사이드바', photo: '프로필 사진', recrop: '사진 다시 자르기',
    name: '이름', title: '직함', phone: '전화번호', address: '주소', email: '이메일', website: '웹사이트', aboutField: '소개', add: '추가', remove: '삭제',
    downloadPdf: 'PDF 다운로드', downloadJpg: 'JPG 다운로드', cropTitle: '프로필 사진 자르기', zoom: '확대', horizontal: '가로 위치', vertical: '세로 위치', cancel: '취소', usePhoto: '사진 사용',
    contact: '연락처',
    skills: '기술',
    languages: '언어',
    hobbies: '취미',
    about: '소개',
    education: '학력',
    experience: '경력',
    cvLanguage: '이력서 언어',
  },
  ru: {
    builder: 'Конструктор резюме', theme: 'Тема', accent: 'Акцентный цвет', sidebar: 'Боковая панель', photo: 'Фото профиля', recrop: 'Обрезать фото заново',
    name: 'Имя', title: 'Должность', phone: 'Телефон', address: 'Адрес', email: 'Электронная почта', website: 'Веб-сайт', aboutField: 'Обо мне', add: 'Добавить', remove: 'Удалить',
    downloadPdf: 'Скачать PDF', downloadJpg: 'Скачать JPG', cropTitle: 'Обрезать фото профиля', zoom: 'Масштаб', horizontal: 'По горизонтали', vertical: 'По вертикали', cancel: 'Отмена', usePhoto: 'Использовать фото',
    contact: 'КОНТАКТЫ',
    skills: 'НАВЫКИ',
    languages: 'ЯЗЫКИ',
    hobbies: 'ХОББИ',
    about: 'ОБО МНЕ',
    education: 'ОБРАЗОВАНИЕ',
    experience: 'ОПЫТ',
    cvLanguage: 'Язык резюме',
  },
  tr: {
    builder: 'Özgeçmiş oluşturucu', theme: 'Tema', accent: 'Vurgu rengi', sidebar: 'Kenar çubuğu', photo: 'Profil fotoğrafı', recrop: 'Fotoğrafı yeniden kırp',
    name: 'Ad', title: 'Unvan', phone: 'Telefon', address: 'Adres', email: 'E-posta', website: 'Web sitesi', aboutField: 'Hakkımda', add: 'Ekle', remove: 'Kaldır',
    downloadPdf: 'PDF indir', downloadJpg: 'JPG indir', cropTitle: 'Profil fotoğrafını kırp', zoom: 'Yakınlaştır', horizontal: 'Yatay konum', vertical: 'Dikey konum', cancel: 'İptal', usePhoto: 'Fotoğrafı kullan',
    contact: 'İLETİŞİM',
    skills: 'YETENEKLER',
    languages: 'DİLLER',
    hobbies: 'HOBİLER',
    about: 'HAKKIMDA',
    education: 'EĞİTİM',
    experience: 'DENEYİM',
    cvLanguage: 'CV dili',
  },
  zh: {
    builder: '简历制作器', theme: '主题', accent: '强调色', sidebar: '侧边栏', photo: '个人照片', recrop: '重新裁剪照片',
    name: '姓名', title: '职位', phone: '电话', address: '地址', email: '电子邮件', website: '网站', aboutField: '关于我', add: '添加', remove: '删除',
    downloadPdf: '下载 PDF', downloadJpg: '下载 JPG', cropTitle: '裁剪个人照片', zoom: '缩放', horizontal: '水平位置', vertical: '垂直位置', cancel: '取消', usePhoto: '使用照片',
    contact: '联系信息',
    skills: '技能',
    languages: '语言能力',
    hobbies: '爱好',
    about: '关于我',
    education: '教育背景',
    experience: '工作经验',
    cvLanguage: '简历语言',
  },
  'zh-tw': {
    builder: '履歷製作工具', theme: '主題', accent: '強調色', sidebar: '側邊欄', photo: '個人照片', recrop: '重新裁切照片',
    name: '姓名', title: '職稱', phone: '電話', address: '地址', email: '電子郵件', website: '網站', aboutField: '關於我', add: '新增', remove: '移除',
    downloadPdf: '下載 PDF', downloadJpg: '下載 JPG', cropTitle: '裁切個人照片', zoom: '縮放', horizontal: '水平位置', vertical: '垂直位置', cancel: '取消', usePhoto: '使用照片',
    contact: '聯絡資訊',
    skills: '技能',
    languages: '語言能力',
    hobbies: '興趣',
    about: '關於我',
    education: '教育背景',
    experience: '工作經驗',
    cvLanguage: '履歷語言',
  },
  vi: {
    builder: 'Tạo CV', theme: 'Giao diện', accent: 'Màu nhấn', sidebar: 'Thanh bên', photo: 'Ảnh hồ sơ', recrop: 'Cắt lại ảnh',
    name: 'Tên', title: 'Chức danh', phone: 'Điện thoại', address: 'Địa chỉ', email: 'Email', website: 'Trang web', aboutField: 'Giới thiệu', add: 'Thêm', remove: 'Xóa',
    downloadPdf: 'Tải PDF', downloadJpg: 'Tải JPG', cropTitle: 'Cắt ảnh hồ sơ', zoom: 'Thu phóng', horizontal: 'Vị trí ngang', vertical: 'Vị trí dọc', cancel: 'Hủy', usePhoto: 'Dùng ảnh',
    contact: 'LIÊN HỆ',
    skills: 'KỸ NĂNG',
    languages: 'NGÔN NGỮ',
    hobbies: 'SỞ THÍCH',
    about: 'GIỚI THIỆU',
    education: 'HỌC VẤN',
    experience: 'KINH NGHIỆM',
    cvLanguage: 'Ngôn ngữ CV',
  },
  id: {
    builder: 'Pembuat CV', theme: 'Tema', accent: 'Warna aksen', sidebar: 'Bilah sisi', photo: 'Foto profil', recrop: 'Potong ulang foto',
    name: 'Nama', title: 'Jabatan', phone: 'Telepon', address: 'Alamat', email: 'Email', website: 'Situs web', aboutField: 'Tentang saya', add: 'Tambah', remove: 'Hapus',
    downloadPdf: 'Unduh PDF', downloadJpg: 'Unduh JPG', cropTitle: 'Potong foto profil', zoom: 'Perbesar', horizontal: 'Posisi horizontal', vertical: 'Posisi vertikal', cancel: 'Batal', usePhoto: 'Gunakan foto',
    contact: 'KONTAK',
    skills: 'KEAHLIAN',
    languages: 'BAHASA',
    hobbies: 'HOBI',
    about: 'TENTANG SAYA',
    education: 'PENDIDIKAN',
    experience: 'PENGALAMAN',
    cvLanguage: 'Bahasa CV',
  },
  ms: {
    builder: 'Pembina CV', theme: 'Tema', accent: 'Warna aksen', sidebar: 'Bar sisi', photo: 'Foto profil', recrop: 'Pangkas semula foto',
    name: 'Nama', title: 'Jawatan', phone: 'Telefon', address: 'Alamat', email: 'E-mel', website: 'Laman web', aboutField: 'Tentang saya', add: 'Tambah', remove: 'Buang',
    downloadPdf: 'Muat turun PDF', downloadJpg: 'Muat turun JPG', cropTitle: 'Pangkas foto profil', zoom: 'Zum', horizontal: 'Kedudukan mendatar', vertical: 'Kedudukan menegak', cancel: 'Batal', usePhoto: 'Gunakan foto',
    contact: 'HUBUNGAN',
    skills: 'KEMAHIRAN',
    languages: 'BAHASA',
    hobbies: 'HOBI',
    about: 'TENTANG SAYA',
    education: 'PENDIDIKAN',
    experience: 'PENGALAMAN',
    cvLanguage: 'Bahasa CV',
  },
  uk: {
    builder: 'Створювач резюме', theme: 'Тема', accent: 'Колір акценту', sidebar: 'Бічна панель', photo: 'Фото профілю', recrop: 'Обрізати фото ще раз',
    name: "Ім’я", title: 'Посада', phone: 'Телефон', address: 'Адреса', email: 'Електронна пошта', website: 'Вебсайт', aboutField: 'Про мене', add: 'Додати', remove: 'Видалити',
    downloadPdf: 'Завантажити PDF', downloadJpg: 'Завантажити JPG', cropTitle: 'Обрізати фото профілю', zoom: 'Масштаб', horizontal: 'Горизонтальне положення', vertical: 'Вертикальне положення', cancel: 'Скасувати', usePhoto: 'Використати фото',
    contact: 'КОНТАКТИ',
    skills: 'НАВИЧКИ',
    languages: 'МОВИ',
    hobbies: 'ХОБІ',
    about: 'ПРО МЕНЕ',
    education: 'ОСВІТА',
    experience: 'ДОСВІД',
    cvLanguage: 'Мова резюме',
  },
  fa: {
    builder: 'سازنده رزومه', theme: 'قالب', accent: 'رنگ تأکیدی', sidebar: 'نوار کناری', photo: 'عکس پروفایل', recrop: 'برش دوباره عکس',
    name: 'نام', title: 'عنوان شغلی', phone: 'تلفن', address: 'نشانی', email: 'ایمیل', website: 'وب‌سایت', aboutField: 'درباره من', add: 'افزودن', remove: 'حذف',
    downloadPdf: 'دریافت PDF', downloadJpg: 'دریافت JPG', cropTitle: 'برش عکس پروفایل', zoom: 'بزرگ‌نمایی', horizontal: 'موقعیت افقی', vertical: 'موقعیت عمودی', cancel: 'لغو', usePhoto: 'استفاده از عکس',
    contact: 'اطلاعات تماس', skills: 'مهارت‌ها', languages: 'زبان‌ها', hobbies: 'علاقه‌مندی‌ها', about: 'درباره من', education: 'تحصیلات', experience: 'سوابق کاری', cvLanguage: 'زبان رزومه',
  },
  sv: {
    builder: 'CV-byggare', theme: 'Tema', accent: 'Accentfärg', sidebar: 'Sidofält', photo: 'Profilfoto', recrop: 'Beskär fotot igen',
    name: 'Namn', title: 'Yrkesroll', phone: 'Telefon', address: 'Adress', email: 'E-post', website: 'Webbplats', aboutField: 'Om mig', add: 'Lägg till', remove: 'Ta bort',
    downloadPdf: 'Ladda ned PDF', downloadJpg: 'Ladda ned JPG', cropTitle: 'Beskär profilfoto', zoom: 'Zoom', horizontal: 'Horisontell position', vertical: 'Vertikal position', cancel: 'Avbryt', usePhoto: 'Använd foto',
    contact: 'KONTAKT', skills: 'KOMPETENSER', languages: 'SPRÅK', hobbies: 'INTRESSEN', about: 'OM MIG', education: 'UTBILDNING', experience: 'ERFARENHET', cvLanguage: 'CV-språk',
  },
  nl: {
    builder: 'CV-maker', theme: 'Thema', accent: 'Accentkleur', sidebar: 'Zijbalk', photo: 'Profielfoto', recrop: 'Foto opnieuw bijsnijden',
    name: 'Naam', title: 'Functie', phone: 'Telefoon', address: 'Adres', email: 'E-mail', website: 'Website', aboutField: 'Over mij', add: 'Toevoegen', remove: 'Verwijderen',
    downloadPdf: 'PDF downloaden', downloadJpg: 'JPG downloaden', cropTitle: 'Profielfoto bijsnijden', zoom: 'Zoomen', horizontal: 'Horizontale positie', vertical: 'Verticale positie', cancel: 'Annuleren', usePhoto: 'Foto gebruiken',
    contact: 'CONTACT', skills: 'VAARDIGHEDEN', languages: 'TALEN', hobbies: 'HOBBY’S', about: 'OVER MIJ', education: 'OPLEIDING', experience: 'ERVARING', cvLanguage: 'CV-taal',
  },
  da: {
    builder: 'CV-bygger', theme: 'Tema', accent: 'Accentfarve', sidebar: 'Sidepanel', photo: 'Profilfoto', recrop: 'Beskær foto igen',
    name: 'Navn', title: 'Stilling', phone: 'Telefon', address: 'Adresse', email: 'E-mail', website: 'Websted', aboutField: 'Om mig', add: 'Tilføj', remove: 'Fjern',
    downloadPdf: 'Download PDF', downloadJpg: 'Download JPG', cropTitle: 'Beskær profilfoto', zoom: 'Zoom', horizontal: 'Vandret position', vertical: 'Lodret position', cancel: 'Annuller', usePhoto: 'Brug foto',
    contact: 'KONTAKT', skills: 'KOMPETENCER', languages: 'SPROG', hobbies: 'INTERESSER', about: 'OM MIG', education: 'UDDANNELSE', experience: 'ERFARING', cvLanguage: 'CV-sprog',
  },
  fi: {
    builder: 'Ansioluettelon luonti', theme: 'Teema', accent: 'Korostusväri', sidebar: 'Sivupalkki', photo: 'Profiilikuva', recrop: 'Rajaa kuva uudelleen',
    name: 'Nimi', title: 'Tehtävänimike', phone: 'Puhelin', address: 'Osoite', email: 'Sähköposti', website: 'Verkkosivusto', aboutField: 'Tietoja minusta', add: 'Lisää', remove: 'Poista',
    downloadPdf: 'Lataa PDF', downloadJpg: 'Lataa JPG', cropTitle: 'Rajaa profiilikuva', zoom: 'Zoomaus', horizontal: 'Vaakasijainti', vertical: 'Pystysijainti', cancel: 'Peruuta', usePhoto: 'Käytä kuvaa',
    contact: 'YHTEYSTIEDOT', skills: 'TAIDOT', languages: 'KIELET', hobbies: 'HARRASTUKSET', about: 'TIETOJA MINUSTA', education: 'KOULUTUS', experience: 'KOKEMUS', cvLanguage: 'Ansioluettelon kieli',
  },
  el: {
    builder: 'Δημιουργία βιογραφικού', theme: 'Θέμα', accent: 'Χρώμα έμφασης', sidebar: 'Πλευρική στήλη', photo: 'Φωτογραφία προφίλ', recrop: 'Περικοπή ξανά',
    name: 'Όνομα', title: 'Τίτλος', phone: 'Τηλέφωνο', address: 'Διεύθυνση', email: 'Email', website: 'Ιστότοπος', aboutField: 'Σχετικά με εμένα', add: 'Προσθήκη', remove: 'Αφαίρεση',
    downloadPdf: 'Λήψη PDF', downloadJpg: 'Λήψη JPG', cropTitle: 'Περικοπή φωτογραφίας προφίλ', zoom: 'Μεγέθυνση', horizontal: 'Οριζόντια θέση', vertical: 'Κάθετη θέση', cancel: 'Ακύρωση', usePhoto: 'Χρήση φωτογραφίας',
    contact: 'ΕΠΙΚΟΙΝΩΝΙΑ', skills: 'ΔΕΞΙΟΤΗΤΕΣ', languages: 'ΓΛΩΣΣΕΣ', hobbies: 'ΕΝΔΙΑΦΕΡΟΝΤΑ', about: 'ΣΧΕΤΙΚΑ ΜΕ ΕΜΕΝΑ', education: 'ΕΚΠΑΙΔΕΥΣΗ', experience: 'ΕΜΠΕΙΡΙΑ', cvLanguage: 'Γλώσσα βιογραφικού',
  },
  pl: {
    builder: 'Kreator CV', theme: 'Motyw', accent: 'Kolor akcentu', sidebar: 'Panel boczny', photo: 'Zdjęcie profilowe', recrop: 'Przytnij zdjęcie ponownie',
    name: 'Imię i nazwisko', title: 'Stanowisko', phone: 'Telefon', address: 'Adres', email: 'E-mail', website: 'Strona internetowa', aboutField: 'O mnie', add: 'Dodaj', remove: 'Usuń',
    downloadPdf: 'Pobierz PDF', downloadJpg: 'Pobierz JPG', cropTitle: 'Przytnij zdjęcie profilowe', zoom: 'Powiększenie', horizontal: 'Pozycja pozioma', vertical: 'Pozycja pionowa', cancel: 'Anuluj', usePhoto: 'Użyj zdjęcia',
    contact: 'KONTAKT', skills: 'UMIEJĘTNOŚCI', languages: 'JĘZYKI', hobbies: 'ZAINTERESOWANIA', about: 'O MNIE', education: 'EDUKACJA', experience: 'DOŚWIADCZENIE', cvLanguage: 'Język CV',
  },
  ro: {
    builder: 'Creator CV', theme: 'Temă', accent: 'Culoare accent', sidebar: 'Bară laterală', photo: 'Fotografie de profil', recrop: 'Decupează din nou',
    name: 'Nume', title: 'Funcție', phone: 'Telefon', address: 'Adresă', email: 'E-mail', website: 'Site web', aboutField: 'Despre mine', add: 'Adaugă', remove: 'Elimină',
    downloadPdf: 'Descarcă PDF', downloadJpg: 'Descarcă JPG', cropTitle: 'Decupează fotografia de profil', zoom: 'Mărire', horizontal: 'Poziție orizontală', vertical: 'Poziție verticală', cancel: 'Anulează', usePhoto: 'Folosește fotografia',
    contact: 'CONTACT', skills: 'ABILITĂȚI', languages: 'LIMBI', hobbies: 'PASIUNI', about: 'DESPRE MINE', education: 'EDUCAȚIE', experience: 'EXPERIENȚĂ', cvLanguage: 'Limba CV-ului',
  },
  cs: {
    builder: 'Tvorba životopisu', theme: 'Motiv', accent: 'Barva zvýraznění', sidebar: 'Postranní panel', photo: 'Profilová fotografie', recrop: 'Znovu oříznout',
    name: 'Jméno', title: 'Pozice', phone: 'Telefon', address: 'Adresa', email: 'E-mail', website: 'Web', aboutField: 'O mně', add: 'Přidat', remove: 'Odebrat',
    downloadPdf: 'Stáhnout PDF', downloadJpg: 'Stáhnout JPG', cropTitle: 'Oříznout profilovou fotografii', zoom: 'Přiblížení', horizontal: 'Vodorovná poloha', vertical: 'Svislá poloha', cancel: 'Zrušit', usePhoto: 'Použít fotografii',
    contact: 'KONTAKT', skills: 'DOVEDNOSTI', languages: 'JAZYKY', hobbies: 'ZÁJMY', about: 'O MNĚ', education: 'VZDĚLÁNÍ', experience: 'ZKUŠENOSTI', cvLanguage: 'Jazyk životopisu',
  },
  sk: {
    builder: 'Tvorba životopisu', theme: 'Motív', accent: 'Zvýrazňujúca farba', sidebar: 'Bočný panel', photo: 'Profilová fotografia', recrop: 'Znova orezať',
    name: 'Meno', title: 'Pozícia', phone: 'Telefón', address: 'Adresa', email: 'E-mail', website: 'Web', aboutField: 'O mne', add: 'Pridať', remove: 'Odstrániť',
    downloadPdf: 'Stiahnuť PDF', downloadJpg: 'Stiahnuť JPG', cropTitle: 'Orezať profilovú fotografiu', zoom: 'Priblíženie', horizontal: 'Vodorovná poloha', vertical: 'Zvislá poloha', cancel: 'Zrušiť', usePhoto: 'Použiť fotografiu',
    contact: 'KONTAKT', skills: 'ZRUČNOSTI', languages: 'JAZYKY', hobbies: 'ZÁĽUBY', about: 'O MNE', education: 'VZDELANIE', experience: 'SKÚSENOSTI', cvLanguage: 'Jazyk životopisu',
  },
  hu: {
    builder: 'Önéletrajz-készítő', theme: 'Téma', accent: 'Kiemelőszín', sidebar: 'Oldalsáv', photo: 'Profilkép', recrop: 'Kép újravágása',
    name: 'Név', title: 'Beosztás', phone: 'Telefon', address: 'Cím', email: 'E-mail', website: 'Weboldal', aboutField: 'Rólam', add: 'Hozzáadás', remove: 'Eltávolítás',
    downloadPdf: 'PDF letöltése', downloadJpg: 'JPG letöltése', cropTitle: 'Profilkép vágása', zoom: 'Nagyítás', horizontal: 'Vízszintes pozíció', vertical: 'Függőleges pozíció', cancel: 'Mégse', usePhoto: 'Kép használata',
    contact: 'KAPCSOLAT', skills: 'KÉSZSÉGEK', languages: 'NYELVEK', hobbies: 'HOBBIK', about: 'RÓLAM', education: 'TANULMÁNYOK', experience: 'TAPASZTALAT', cvLanguage: 'Önéletrajz nyelve',
  },
  th: {
    builder: 'สร้างเรซูเม่', theme: 'ธีม', accent: 'สีเน้น', sidebar: 'แถบด้านข้าง', photo: 'รูปโปรไฟล์', recrop: 'ครอบตัดรูปใหม่',
    name: 'ชื่อ', title: 'ตำแหน่ง', phone: 'โทรศัพท์', address: 'ที่อยู่', email: 'อีเมล', website: 'เว็บไซต์', aboutField: 'เกี่ยวกับฉัน', add: 'เพิ่ม', remove: 'ลบ',
    downloadPdf: 'ดาวน์โหลด PDF', downloadJpg: 'ดาวน์โหลด JPG', cropTitle: 'ครอบตัดรูปโปรไฟล์', zoom: 'ซูม', horizontal: 'ตำแหน่งแนวนอน', vertical: 'ตำแหน่งแนวตั้ง', cancel: 'ยกเลิก', usePhoto: 'ใช้รูปนี้',
    contact: 'ติดต่อ', skills: 'ทักษะ', languages: 'ภาษา', hobbies: 'งานอดิเรก', about: 'เกี่ยวกับฉัน', education: 'การศึกษา', experience: 'ประสบการณ์', cvLanguage: 'ภาษาเรซูเม่',
  },
  he: {
    builder: 'יוצר קורות חיים', theme: 'ערכת נושא', accent: 'צבע הדגשה', sidebar: 'סרגל צד', photo: 'תמונת פרופיל', recrop: 'חיתוך מחדש',
    name: 'שם', title: 'תפקיד', phone: 'טלפון', address: 'כתובת', email: 'דוא״ל', website: 'אתר אינטרנט', aboutField: 'עליי', add: 'הוספה', remove: 'הסרה',
    downloadPdf: 'הורדת PDF', downloadJpg: 'הורדת JPG', cropTitle: 'חיתוך תמונת פרופיל', zoom: 'הגדלה', horizontal: 'מיקום אופקי', vertical: 'מיקום אנכי', cancel: 'ביטול', usePhoto: 'שימוש בתמונה',
    contact: 'פרטי קשר', skills: 'כישורים', languages: 'שפות', hobbies: 'תחביבים', about: 'עליי', education: 'השכלה', experience: 'ניסיון', cvLanguage: 'שפת קורות החיים',
  },
  lt: {
    builder: 'CV kūrimo įrankis', theme: 'Tema', accent: 'Akcento spalva', sidebar: 'Šoninė juosta', photo: 'Profilio nuotrauka', recrop: 'Apkirpti iš naujo',
    name: 'Vardas', title: 'Pareigos', phone: 'Telefonas', address: 'Adresas', email: 'El. paštas', website: 'Svetainė', aboutField: 'Apie mane', add: 'Pridėti', remove: 'Pašalinti',
    downloadPdf: 'Atsisiųsti PDF', downloadJpg: 'Atsisiųsti JPG', cropTitle: 'Apkirpti profilio nuotrauką', zoom: 'Mastelis', horizontal: 'Horizontali padėtis', vertical: 'Vertikali padėtis', cancel: 'Atšaukti', usePhoto: 'Naudoti nuotrauką',
    contact: 'KONTAKTAI', skills: 'ĮGŪDŽIAI', languages: 'KALBOS', hobbies: 'POMĖGIAI', about: 'APIE MANE', education: 'IŠSILAVINIMAS', experience: 'PATIRTIS', cvLanguage: 'CV kalba',
  },
  lv: {
    builder: 'CV veidotājs', theme: 'Tēma', accent: 'Akcenta krāsa', sidebar: 'Sānu josla', photo: 'Profila foto', recrop: 'Apgriezt foto vēlreiz',
    name: 'Vārds', title: 'Amats', phone: 'Tālrunis', address: 'Adrese', email: 'E-pasts', website: 'Tīmekļvietne', aboutField: 'Par mani', add: 'Pievienot', remove: 'Noņemt',
    downloadPdf: 'Lejupielādēt PDF', downloadJpg: 'Lejupielādēt JPG', cropTitle: 'Apgriezt profila foto', zoom: 'Tālummaiņa', horizontal: 'Horizontālais novietojums', vertical: 'Vertikālais novietojums', cancel: 'Atcelt', usePhoto: 'Lietot foto',
    contact: 'KONTAKTI', skills: 'PRASMES', languages: 'VALODAS', hobbies: 'INTERESES', about: 'PAR MANI', education: 'IZGLĪTĪBA', experience: 'PIEREDZE', cvLanguage: 'CV valoda',
  },
  et: {
    builder: 'CV koostaja', theme: 'Teema', accent: 'Rõhuvärv', sidebar: 'Külgpaneel', photo: 'Profiilifoto', recrop: 'Kärbi foto uuesti',
    name: 'Nimi', title: 'Amet', phone: 'Telefon', address: 'Aadress', email: 'E-post', website: 'Veebisait', aboutField: 'Minust', add: 'Lisa', remove: 'Eemalda',
    downloadPdf: 'Laadi alla PDF', downloadJpg: 'Laadi alla JPG', cropTitle: 'Kärbi profiilifotot', zoom: 'Suurendus', horizontal: 'Horisontaalne asukoht', vertical: 'Vertikaalne asukoht', cancel: 'Tühista', usePhoto: 'Kasuta fotot',
    contact: 'KONTAKT', skills: 'OSKUSED', languages: 'KEELED', hobbies: 'HUVIALAD', about: 'MINUST', education: 'HARIDUS', experience: 'KOGEMUS', cvLanguage: 'CV keel',
  },
  fil: {
    builder: 'Gumawa ng CV', theme: 'Tema', accent: 'Kulay ng diin', sidebar: 'Gilid na panel', photo: 'Larawan sa profile', recrop: 'I-crop muli ang larawan',
    name: 'Pangalan', title: 'Posisyon', phone: 'Telepono', address: 'Address', email: 'Email', website: 'Website', aboutField: 'Tungkol sa akin', add: 'Idagdag', remove: 'Alisin',
    downloadPdf: 'I-download ang PDF', downloadJpg: 'I-download ang JPG', cropTitle: 'I-crop ang larawan sa profile', zoom: 'Pag-zoom', horizontal: 'Pahalang na posisyon', vertical: 'Patayong posisyon', cancel: 'Kanselahin', usePhoto: 'Gamitin ang larawan',
    contact: 'CONTACT', skills: 'MGA KASANAYAN', languages: 'MGA WIKA', hobbies: 'MGA HOBBY', about: 'TUNGKOL SA AKIN', education: 'EDUKASYON', experience: 'KARANASAN', cvLanguage: 'Wika ng CV',
  },
  sw: {
    builder: 'Kijenzi cha CV', theme: 'Mandhari', accent: 'Rangi ya msisitizo', sidebar: 'Upau wa pembeni', photo: 'Picha ya wasifu', recrop: 'Punguza picha tena',
    name: 'Jina', title: 'Cheo', phone: 'Simu', address: 'Anwani', email: 'Barua pepe', website: 'Tovuti', aboutField: 'Kuhusu mimi', add: 'Ongeza', remove: 'Ondoa',
    downloadPdf: 'Pakua PDF', downloadJpg: 'Pakua JPG', cropTitle: 'Punguza picha ya wasifu', zoom: 'Kuza', horizontal: 'Nafasi ya mlalo', vertical: 'Nafasi ya wima', cancel: 'Ghairi', usePhoto: 'Tumia picha',
    contact: 'MAWASILIANO', skills: 'UJUZI', languages: 'LUGHA', hobbies: 'VITU NIPENDAVYO', about: 'KUHUSU MIMI', education: 'ELIMU', experience: 'UZOEFU', cvLanguage: 'Lugha ya CV',
  },
}

const personalTranslations = {
  en: { personal: 'PERSONAL INFORMATION', nationality: 'Nationality', postalCode: 'CEP / Postal code', maritalStatus: 'Marital status', children: 'Number of children' },
  ur: { personal: 'ذاتی معلومات', nationality: 'قومیت', postalCode: 'پوسٹل کوڈ / سی ای پی', maritalStatus: 'ازدواجی حیثیت', children: 'بچوں کی تعداد' },
  ar: { personal: 'المعلومات الشخصية', nationality: 'الجنسية', postalCode: 'الرمز البريدي', maritalStatus: 'الحالة الاجتماعية', children: 'عدد الأطفال' },
  fr: { personal: 'INFORMATIONS PERSONNELLES', nationality: 'Nationalité', postalCode: 'Code postal / CEP', maritalStatus: 'Situation familiale', children: 'Nombre d’enfants' },
  es: { personal: 'INFORMACIÓN PERSONAL', nationality: 'Nacionalidad', postalCode: 'Código postal / CEP', maritalStatus: 'Estado civil', children: 'Número de hijos' },
  de: { personal: 'PERSÖNLICHE ANGABEN', nationality: 'Nationalität', postalCode: 'Postleitzahl', maritalStatus: 'Familienstand', children: 'Anzahl der Kinder' },
  it: { personal: 'INFORMAZIONI PERSONALI', nationality: 'Nazionalità', postalCode: 'CAP / codice postale', maritalStatus: 'Stato civile', children: 'Numero di figli' },
  pt: { personal: 'INFORMAÇÕES PESSOAIS', nationality: 'Nacionalidade', postalCode: 'CEP / código postal', maritalStatus: 'Estado civil', children: 'Número de filhos' },
  hi: { personal: 'व्यक्तिगत जानकारी', nationality: 'राष्ट्रीयता', postalCode: 'पिन कोड', maritalStatus: 'वैवाहिक स्थिति', children: 'बच्चों की संख्या' },
  bn: { personal: 'ব্যক্তিগত তথ্য', nationality: 'জাতীয়তা', postalCode: 'পোস্টাল কোড', maritalStatus: 'বৈবাহিক অবস্থা', children: 'সন্তানের সংখ্যা' },
  zh: { personal: '个人信息', nationality: '国籍', postalCode: '邮政编码', maritalStatus: '婚姻状况', children: '子女数量' },
  'zh-tw': { personal: '個人資訊', nationality: '國籍', postalCode: '郵遞區號', maritalStatus: '婚姻狀況', children: '子女數量' },
  ja: { personal: '個人情報', nationality: '国籍', postalCode: '郵便番号', maritalStatus: '婚姻状況', children: '子どもの人数' },
  ko: { personal: '개인 정보', nationality: '국적', postalCode: '우편번호', maritalStatus: '혼인 상태', children: '자녀 수' },
  ru: { personal: 'ЛИЧНАЯ ИНФОРМАЦИЯ', nationality: 'Гражданство', postalCode: 'Почтовый индекс', maritalStatus: 'Семейное положение', children: 'Количество детей' },
  tr: { personal: 'KİŞİSEL BİLGİLER', nationality: 'Uyruk', postalCode: 'Posta kodu', maritalStatus: 'Medeni durum', children: 'Çocuk sayısı' },
  fa: { personal: 'اطلاعات شخصی', nationality: 'ملیت', postalCode: 'کد پستی', maritalStatus: 'وضعیت تأهل', children: 'تعداد فرزندان' },
  sv: { personal: 'PERSONUPPGIFTER', nationality: 'Nationalitet', postalCode: 'Postnummer', maritalStatus: 'Civilstånd', children: 'Antal barn' },
  nl: { personal: 'PERSOONLIJKE GEGEVENS', nationality: 'Nationaliteit', postalCode: 'Postcode', maritalStatus: 'Burgerlijke staat', children: 'Aantal kinderen' },
  da: { personal: 'PERSONLIGE OPLYSNINGER', nationality: 'Nationalitet', postalCode: 'Postnummer', maritalStatus: 'Civilstand', children: 'Antal børn' },
  fi: { personal: 'HENKILÖTIEDOT', nationality: 'Kansalaisuus', postalCode: 'Postinumero', maritalStatus: 'Siviilisääty', children: 'Lasten määrä' },
  el: { personal: 'ΠΡΟΣΩΠΙΚΕΣ ΠΛΗΡΟΦΟΡΙΕΣ', nationality: 'Υπηκοότητα', postalCode: 'Ταχυδρομικός κώδικας', maritalStatus: 'Οικογενειακή κατάσταση', children: 'Αριθμός παιδιών' },
  pl: { personal: 'INFORMACJE OSOBISTE', nationality: 'Narodowość', postalCode: 'Kod pocztowy', maritalStatus: 'Stan cywilny', children: 'Liczba dzieci' },
  ro: { personal: 'INFORMAȚII PERSONALE', nationality: 'Naționalitate', postalCode: 'Cod poștal', maritalStatus: 'Stare civilă', children: 'Număr de copii' },
  cs: { personal: 'OSOBNÍ ÚDAJE', nationality: 'Národnost', postalCode: 'PSČ', maritalStatus: 'Rodinný stav', children: 'Počet dětí' },
  sk: { personal: 'OSOBNÉ ÚDAJE', nationality: 'Národnosť', postalCode: 'PSČ', maritalStatus: 'Rodinný stav', children: 'Počet detí' },
  hu: { personal: 'SZEMÉLYES ADATOK', nationality: 'Állampolgárság', postalCode: 'Irányítószám', maritalStatus: 'Családi állapot', children: 'Gyermekek száma' },
  th: { personal: 'ข้อมูลส่วนบุคคล', nationality: 'สัญชาติ', postalCode: 'รหัสไปรษณีย์', maritalStatus: 'สถานภาพสมรส', children: 'จำนวนบุตร' },
  vi: { personal: 'THÔNG TIN CÁ NHÂN', nationality: 'Quốc tịch', postalCode: 'Mã bưu chính', maritalStatus: 'Tình trạng hôn nhân', children: 'Số con' },
  id: { personal: 'INFORMASI PRIBADI', nationality: 'Kewarganegaraan', postalCode: 'Kode pos', maritalStatus: 'Status perkawinan', children: 'Jumlah anak' },
  ms: { personal: 'MAKLUMAT PERIBADI', nationality: 'Kewarganegaraan', postalCode: 'Poskod', maritalStatus: 'Taraf perkahwinan', children: 'Bilangan anak' },
  uk: { personal: 'ОСОБИСТА ІНФОРМАЦІЯ', nationality: 'Громадянство', postalCode: 'Поштовий індекс', maritalStatus: 'Сімейний стан', children: 'Кількість дітей' },
  he: { personal: 'מידע אישי', nationality: 'אזרחות', postalCode: 'מיקוד', maritalStatus: 'מצב משפחתי', children: 'מספר ילדים' },
  lt: { personal: 'ASMENINĖ INFORMACIJA', nationality: 'Pilietybė', postalCode: 'Pašto kodas', maritalStatus: 'Šeiminė padėtis', children: 'Vaikų skaičius' },
  lv: { personal: 'PERSONĪGĀ INFORMĀCIJA', nationality: 'Pilsonība', postalCode: 'Pasta indekss', maritalStatus: 'Ģimenes stāvoklis', children: 'Bērnu skaits' },
  et: { personal: 'ISIKUANDMED', nationality: 'Kodakondsus', postalCode: 'Postiindeks', maritalStatus: 'Perekonnaseis', children: 'Laste arv' },
  fil: { personal: 'PERSONAL NA IMPORMASYON', nationality: 'Nasyonalidad', postalCode: 'Postal code / CEP', maritalStatus: 'Katayuang sibil', children: 'Bilang ng mga anak' },
  sw: { personal: 'TAARIFA BINAFSI', nationality: 'Uraia', postalCode: 'Msimbo wa posta', maritalStatus: 'Hali ya ndoa', children: 'Idadi ya watoto' },
}

const maritalChoices = {
  en: ['Single', 'Married', 'Divorced', 'Widowed'], ur: ['غیر شادی شدہ', 'شادی شدہ', 'طلاق یافتہ', 'بیوہ/رنڈوا'],
  ar: ['أعزب', 'متزوج', 'مطلق', 'أرمل'], fr: ['Célibataire', 'Marié(e)', 'Divorcé(e)', 'Veuf / veuve'],
  es: ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a'], de: ['Ledig', 'Verheiratet', 'Geschieden', 'Verwitwet'],
  it: ['Celibe/nubile', 'Coniugato/a', 'Divorziato/a', 'Vedovo/a'], pt: ['Solteiro/a', 'Casado/a', 'Divorciado/a', 'Viúvo/a'],
  hi: ['अविवाहित', 'विवाहित', 'तलाकशुदा', 'विधवा/विधुर'], bn: ['অবিবাহিত', 'বিবাহিত', 'তালাকপ্রাপ্ত', 'বিধবা/বিপত্নীক'],
  zh: ['未婚', '已婚', '离异', '丧偶'], 'zh-tw': ['未婚', '已婚', '離婚', '喪偶'], ja: ['未婚', '既婚', '離婚', '死別'],
  ko: ['미혼', '기혼', '이혼', '사별'], ru: ['Не женат/не замужем', 'Женат/замужем', 'В разводе', 'Вдовец/вдова'],
  tr: ['Bekar', 'Evli', 'Boşanmış', 'Dul'], fa: ['مجرد', 'متأهل', 'مطلق', 'بیوه'], sv: ['Ogift', 'Gift', 'Skild', 'Änka/änkling'],
  nl: ['Alleenstaand', 'Getrouwd', 'Gescheiden', 'Verweduwd'], da: ['Ugift', 'Gift', 'Skilt', 'Enke/enkemand'],
  fi: ['Naimaton', 'Naimisissa', 'Eronnut', 'Leski'], el: ['Άγαμος/η', 'Έγγαμος/η', 'Διαζευγμένος/η', 'Χήρος/α'],
  pl: ['Stanu wolnego', 'W związku małżeńskim', 'Po rozwodzie', 'Wdowiec/wdowa'], ro: ['Necăsătorit/ă', 'Căsătorit/ă', 'Divorțat/ă', 'Văduv/ă'],
  cs: ['Svobodný/á', 'Ženatý/vdaná', 'Rozvedený/á', 'Ovdovělý/á'], sk: ['Slobodný/á', 'Ženatý/vydatá', 'Rozvedený/á', 'Ovdovený/á'],
  hu: ['Nőtlen/hajadon', 'Házas', 'Elvált', 'Özvegy'], th: ['โสด', 'สมรส', 'หย่าร้าง', 'หม้าย'],
  vi: ['Độc thân', 'Đã kết hôn', 'Đã ly hôn', 'Góa'], id: ['Lajang', 'Menikah', 'Bercerai', 'Janda/duda'],
  ms: ['Bujang', 'Berkahwin', 'Bercerai', 'Balu'], uk: ['Неодружений/незаміжня', 'Одружений/заміжня', 'Розлучений/а', 'Вдівець/вдова'],
  he: ['רווק/ה', 'נשוי/אה', 'גרוש/ה', 'אלמן/ה'], lt: ['Nevedęs/netekėjusi', 'Vedęs/ištekėjusi', 'Išsiskyręs/usi', 'Našlys/ė'],
  lv: ['Neprecējies/usies', 'Precējies/usies', 'Šķīries/usies', 'Atraitnis/e'], et: ['Vallaline', 'Abielus', 'Lahutatud', 'Lesk'],
  fil: ['Walang asawa', 'May asawa', 'Diborsiyado/a', 'Balo/ba'], sw: ['Hajaoa', 'Nimeoa/umeolewa', 'Talaka', 'Mjane'],
}

const maritalChoiceValues = ['single', 'married', 'divorced', 'widowed']

const initialProfile = {
  name: 'Monir Kamjo',
  title: 'Web Developer & UI/UX Designer',
  phone: '+93 700 000 000',
  address: 'Kabul, Afghanistan',
  email: 'Monir.kamjo@sample.com',
  website: 'monirkamjo.com',
  nationality: 'Afghan',
  postalCode: '1001',
  maritalStatus: 'single',
  children: '',
  about: 'Results-driven web developer and digital designer with a strong focus on building clean, accessible, and user-centered experiences. I enjoy translating ideas into practical, visually polished products that solve real problems and create value for users and businesses alike.',
  photo: '',
}

const initialSkills = [
  { label: 'React', value: 92 },
  { label: 'JavaScript', value: 90 },
  { label: 'UI/UX Design', value: 88 },
  { label: 'Responsive Design', value: 94 },
  { label: 'Problem Solving', value: 90 },
  { label: 'Team Collaboration', value: 86 },
]

const initialLanguages = [
  { label: 'Dari', value: 96 },
  { label: 'Pashto', value: 94 },
  { label: 'English', value: 82 },
  { label: 'Urdu', value: 70 },
]

const initialEducation = [
  {
    year: '2016-2019',
    title: 'Bachelor of Computer Science',
    description: 'Focused on software systems, database management, and practical application design with a strong analytical and problem-solving foundation.',
  },
  {
    year: '2019-2020',
    title: 'Web Development Training',
    description: 'Built hands-on experience in front-end development, UI design principles, and implementing user-friendly digital interfaces.',
  },
  {
    year: '2021-2022',
    title: 'UX & Product Design Workshop',
    description: 'Explored user-centered design workflows, wireframing, prototyping, and translating business needs into intuitive experiences.',
  },
]

const initialExperience = [
  {
    year: '2020-2021',
    title: 'Junior Front-End Developer',
    description: 'Developed responsive interfaces, collaborated with stakeholders, and improved the user experience of business-facing web applications.',
  },
  {
    year: '2021-2023',
    title: 'Freelance Web Designer',
    description: 'Designed and built custom landing pages and portfolio projects for clients, focusing on clarity, conversions, and modern visual quality.',
  },
  {
    year: '2023-Present',
    title: 'Independent Product & UX Specialist',
    description: 'Worked on design systems, interactive mockups, and scalable front-end solutions with an emphasis on clean code and user value.',
  },
]

const createSkill = () => ({ label: 'New Skill', value: 50 })
const createLanguage = () => ({ label: 'New Language', value: 50 })
const createEducation = () => ({
  year: '2024-2025',
  title: 'NEW ENTRY',
  description: 'Add your education details here.',
})
const createExperience = () => ({
  year: '2024-2025',
  title: 'NEW ROLE',
  description: 'Add your work experience details here.',
})

const hobbyOptions = [
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'photography', label: 'Photography', icon: '📷' },
  { id: 'gaming', label: 'Playing games', icon: '🎮' },
  { id: 'travel', label: 'Travel', icon: '✈️' },
  { id: 'reading', label: 'Reading books', icon: '📚' },
  { id: 'fitness', label: 'Gym / exercise', icon: '🏋️' },
  { id: 'cooking', label: 'Cooking', icon: '🍳' },
  { id: 'hiking', label: 'Hiking', icon: '🥾' },
  { id: 'cycling', label: 'Cycling', icon: '🚴' },
  { id: 'painting', label: 'Painting', icon: '🎨' },
  { id: 'gardening', label: 'Gardening', icon: '🪴' },
  { id: 'movies', label: 'Movies', icon: '🎬' },
  { id: 'coffee', label: 'Coffee', icon: '☕' },
  { id: 'writing', label: 'Writing', icon: '✍️' },
  { id: 'chess', label: 'Chess', icon: '♟️' },
  { id: 'dancing', label: 'Dancing', icon: '💃' },
  { id: 'football', label: 'Football', icon: '⚽' },
  { id: 'meditation', label: 'Meditation', icon: '🧘' },
  { id: 'volunteering', label: 'Volunteering', icon: '🤝' },
  { id: 'pets', label: 'Pets', icon: '🐾' },
  { id: 'coding', label: 'Coding', icon: '💻' },
  { id: 'swimming', label: 'Swimming', icon: '🏊' },
]

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const fullscreenAttemptedRef = useRef(false)

  const enterFullscreen = async () => {
    const elem = document.documentElement
    const requestFullscreen =
      elem.requestFullscreen ||
      elem.webkitRequestFullscreen ||
      elem.mozRequestFullScreen ||
      elem.msRequestFullscreen

    if (typeof requestFullscreen !== 'function') return

    try {
      await requestFullscreen.call(elem)
    } catch {
      // Browsers may deny fullscreen based on permissions or the current browsing context.
    }
  }

  const toggleFullscreen = async () => {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      const exitFullscreen =
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.mozCancelFullScreen ||
        document.msExitFullscreen

      if (typeof exitFullscreen === 'function') {
        try {
          await exitFullscreen.call(document)
        } catch {
          // Keep the site usable if the browser refuses to exit fullscreen.
        }
      }
      return
    }

    await enterFullscreen()
  }

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement || document.webkitFullscreenElement))
    }

    const onFirstClick = (event) => {
      if (fullscreenAttemptedRef.current) return
      fullscreenAttemptedRef.current = true
      document.removeEventListener('click', onFirstClick, true)

      const clickedToggle = event.target instanceof Element && event.target.closest('[data-fullscreen-toggle]')
      if (!clickedToggle) enterFullscreen()
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)
    document.addEventListener('webkitfullscreenchange', onFullscreenChange)
    document.addEventListener('click', onFirstClick, true)

    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange)
      document.removeEventListener('click', onFirstClick, true)
    }
  }, [])

  const [cvLanguage, setCvLanguage] = useState('en')
  const [templateStyle, setTemplateStyle] = useState('blueHeader')
  const [theme, setTheme] = useState(themePresets[0])
  const [profile, setProfile] = useState(initialProfile)
  const [skills, setSkills] = useState(initialSkills)
  const [languages, setLanguages] = useState(initialLanguages)
  const [education, setEducation] = useState(initialEducation)
  const [experience, setExperience] = useState(initialExperience)
  const [selectedHobbies, setSelectedHobbies] = useState(['music', 'photography', 'gaming', 'travel'])
  const [cropSource, setCropSource] = useState('')
  const [cropZoom, setCropZoom] = useState(1)
  const [cropX, setCropX] = useState(0)
  const [cropY, setCropY] = useState(0)
  const [cropAspect, setCropAspect] = useState(1)
  const [writingTarget, setWritingTarget] = useState(null)
  const [writingDetails, setWritingDetails] = useState('')
  const [writingTone, setWritingTone] = useState('professional')
  const [writingDraft, setWritingDraft] = useState('')
  const [jobHelpOpen, setJobHelpOpen] = useState(false)
  const [jobHelpCountry, setJobHelpCountry] = useState('')
  const [jobHelpConsent, setJobHelpConsent] = useState(false)
  const [teaSupportOpen, setTeaSupportOpen] = useState(false)
  const [teaThanks, setTeaThanks] = useState(false)
  const [printPreview, setPrintPreview] = useState(null)
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false)
  const downloadMenuRef = useRef(null)
  const downloadTriggerRef = useRef(null)
  const printPreviewTriggerRef = useRef(null)
  const printPreviewDialogRef = useRef(null)
  const printPreviewCloseRef = useRef(null)
  const teaTriggerRef = useRef(null)
  const teaCloseRef = useRef(null)
  const labels = { ...translations.en, ...(translations[cvLanguage] || {}), ...personalTranslations.en, ...(personalTranslations[cvLanguage] || {}) }
  const isRtl = ['ar', 'fa', 'he', 'ur'].includes(cvLanguage)

  useEffect(() => {
    if (!teaSupportOpen) return undefined

    const teaTrigger = teaTriggerRef.current
    teaCloseRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setTeaSupportOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      teaTrigger?.focus()
    }
  }, [teaSupportOpen])

  useEffect(() => {
    if (!printPreview) return undefined

    const trigger = printPreviewTriggerRef.current
    const dialog = printPreviewDialogRef.current
    const focusableElements = () => [...dialog.querySelectorAll('button:not([disabled])')]
    printPreviewCloseRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setPrintPreview(null)
        return
      }

      if (event.key === 'Tab') {
        const elements = focusableElements()
        const first = elements[0]
        const last = elements[elements.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      trigger?.focus()
    }
  }, [printPreview])

  useEffect(() => {
    if (!downloadMenuOpen) return undefined

    const onPointerDown = (event) => {
      if (!downloadMenuRef.current?.contains(event.target)) setDownloadMenuOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDownloadMenuOpen(false)
        downloadTriggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [downloadMenuOpen])

  const countryJobSites = {
    Brazil: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', reason: 'Key hiring platform for professional roles in Brazil.' },
      { name: 'Vagas.com.br', url: 'https://www.vagas.com.br/', reason: 'Brazil’s most widely used local job board.' },
      { name: 'Catho', url: 'https://www.catho.com.br/', reason: 'Very common for mid-size and large-company job listings.' },
      { name: 'Gupy', url: 'https://www.gupy.io/', reason: 'Popular among startups and growing Brazilian employers.' },
      { name: 'InfoJobs Brasil', url: 'https://www.infojobs.com.br/', reason: 'One of the strongest local portals for office and specialist jobs.' },
      { name: 'Indeed Brasil', url: 'https://br.indeed.com/', reason: 'Strong local search engine with many vacancies.' },
      { name: 'Jobie', url: 'https://jobie.com.br/', reason: 'Useful for local roles across different sectors.' },
      { name: 'Jooble Brazil', url: 'https://ar.jooble.org/', reason: 'Helpful for collecting multiple platform results quickly.' },
      { name: 'Workana', url: 'https://www.workana.com/', reason: 'Strong option for freelance, remote, and project work.' },
      { name: 'Upwork', url: 'https://www.upwork.com/', reason: 'Useful for flexible or remote freelance work.' },
      { name: 'BNE', url: 'https://www.bne.com.br/', reason: 'A well-known Brazilian jobs portal for local opportunities.' },
      { name: 'Freelancer', url: 'https://www.freelancer.com/', reason: 'Useful for project-based work and contract jobs.' },
    ],
    Germany: [
      { name: 'StepStone', url: 'https://www.stepstone.de/', reason: 'One of the top job portals in Germany.' },
      { name: 'Bundesagentur für Arbeit', url: 'https://www.arbeitsagentur.de/', reason: 'Official German public employment service.' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', reason: 'Very relevant for Germany-based employers and networking.' },
      { name: 'Indeed Germany', url: 'https://de.indeed.com/', reason: 'Strong general platform for local roles.' },
      { name: 'Xing', url: 'https://www.xing.com/jobs', reason: 'Important professional network in Germany.' },
      { name: 'Monster Germany', url: 'https://www.monster.de/', reason: 'Useful for corporate and mid-senior positions.' },
      { name: 'Jobware', url: 'https://www.jobware.de/', reason: 'Popular with recruiters and local employers.' },
      { name: 'Glassdoor Germany', url: 'https://www.glassdoor.de/', reason: 'Useful for employer research and salary insight.' },
      { name: 'Jooble Germany', url: 'https://de.jooble.org/', reason: 'Good broader search engine for Germany.' },
      { name: 'Make it in Germany', url: 'https://www.make-it-in-germany.com/', reason: 'Helpful for international candidates seeking work in Germany.' },
      { name: 'Jobsuche', url: 'https://www.jobsuche.de/', reason: 'Useful for aggregated local listings.' },
      { name: 'Remote OK', url: 'https://remoteok.com/', reason: 'Helpful for remote-friendly work with German companies.' },
    ],
    'United States': [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', reason: 'Strongest general job platform in the United States.' },
      { name: 'Indeed', url: 'https://www.indeed.com/', reason: 'One of the most popular U.S. job search sites.' },
      { name: 'ZipRecruiter', url: 'https://www.ziprecruiter.com/', reason: 'High-volume local hiring platform for many industries.' },
      { name: 'Glassdoor', url: 'https://www.glassdoor.com/', reason: 'Useful for employer research and salary comparisons.' },
      { name: 'USAJOBS', url: 'https://www.usajobs.gov/', reason: 'Best for federal government jobs.' },
      { name: 'Wellfound', url: 'https://wellfound.com/jobs', reason: 'Strong option for startup and tech roles.' },
      { name: 'AngelList', url: 'https://angel.co/', reason: 'Popular for startup hiring and product roles.' },
      { name: 'Dice', url: 'https://www.dice.com/', reason: 'Very relevant for tech and IT careers.' },
      { name: 'FlexJobs', url: 'https://www.flexjobs.com/', reason: 'Useful for remote, flexible, and hybrid jobs.' },
      { name: 'Remote OK', url: 'https://remoteok.com/', reason: 'Useful for remote-friendly opportunities.' },
      { name: 'Hired', url: 'https://hired.com/', reason: 'Useful for tech and product roles.' },
      { name: 'Workable', url: 'https://www.workable.com/', reason: 'Strong for employer and startup hiring pages.' },
    ],
    'United Kingdom': [
      { name: 'Indeed UK', url: 'https://uk.indeed.com/', reason: 'One of the most used job searches in the UK.' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', reason: 'Strong for professional roles and recruiter outreach.' },
      { name: 'Reed', url: 'https://www.reed.co.uk/', reason: 'Very common UK recruitment platform.' },
      { name: 'Totaljobs', url: 'https://www.totaljobs.com/', reason: 'Popular with employers across the UK.' },
      { name: 'CV-Library', url: 'https://www.cv-library.co.uk/', reason: 'Strong site for local hiring across sectors.' },
      { name: 'Glassdoor UK', url: 'https://www.glassdoor.co.uk/', reason: 'Useful for employer reviews and salary insight.' },
      { name: 'Monster UK', url: 'https://www.monster.co.uk/', reason: 'Relevant for many corporate and professional roles.' },
      { name: 'Jobsite', url: 'https://www.jobsite.co.uk/', reason: 'Helpful for broad UK job searches.' },
      { name: 'Gov UK Jobs', url: 'https://www.gov.uk/find-a-job', reason: 'Official public job portal for UK roles.' },
      { name: 'Adzuna', url: 'https://www.adzuna.co.uk/', reason: 'Popular aggregation site across multiple UK employers.' },
      { name: 'Hays', url: 'https://www.hays.co.uk/', reason: 'Well-known recruitment agency and employer network.' },
      { name: 'Remote OK', url: 'https://remoteok.com/', reason: 'Useful for remote-friendly roles in UK-based companies.' },
    ],
    Canada: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', reason: 'One of the strongest hiring platforms in Canada.' },
      { name: 'Indeed Canada', url: 'https://ca.indeed.com/', reason: 'Very popular for local and national job searches.' },
      { name: 'Job Bank', url: 'https://www.jobbank.gc.ca/', reason: 'Official Canadian job search and labour market portal.' },
      { name: 'Workopolis', url: 'https://www.workopolis.com/', reason: 'Well-known Canadian job search site.' },
      { name: 'Eluta', url: 'https://www.eluta.ca/', reason: 'Strong Canadian job database for business and professional roles.' },
      { name: 'Glassdoor Canada', url: 'https://www.glassdoor.ca/', reason: 'Useful for company and salary research.' },
      { name: 'Monster Canada', url: 'https://www.monster.ca/', reason: 'Useful for many corporate and public sector positions.' },
      { name: 'TalentEgg', url: 'https://www.talentegg.com/', reason: 'Strong for early careers and student placements.' },
      { name: 'Mosaic', url: 'https://mosaicprojects.com/', reason: 'Useful for project roles in selected sectors.' },
      { name: 'Jooble Canada', url: 'https://ca.jooble.org/', reason: 'Helpful for aggregated results across Canada.' },
      { name: 'Remote OK', url: 'https://remoteok.com/', reason: 'Useful for remote-friendly Canadian opportunities.' },
      { name: 'Wework', url: 'https://weworkremotely.com/', reason: 'Good for remote-first and distributed roles.' },
    ],
    France: [
      { name: 'Pôle Emploi / France Travail', url: 'https://www.francetravail.fr/', reason: 'Official public employment portal in France.' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', reason: 'Very relevant for French employers and recruiters.' },
      { name: 'Indeed France', url: 'https://fr.indeed.com/', reason: 'Popular general job search for French vacancies.' },
      { name: 'Welcome to the Jungle', url: 'https://www.welcometothejungle.com/fr', reason: 'Strong startup and employer brand portal in France.' },
      { name: 'APEC', url: 'https://www.apec.fr/', reason: 'Strong for graduates and young professionals in France.' },
      { name: 'Keljob', url: 'https://www.keljob.com/', reason: 'Useful for local role discovery and sector-specific listings.' },
      { name: 'JobiJoba', url: 'https://www.jobijoba.com/fr', reason: 'Aggregates French opportunities across employers.' },
      { name: 'Monster France', url: 'https://www.monster.fr/', reason: 'Useful for local roles and recruitment agencies.' },
      { name: 'Hellowork', url: 'https://fr.hellowork.com/', reason: 'Strong French jobs portal for many sectors.' },
      { name: 'Glassdoor France', url: 'https://www.glassdoor.fr/', reason: 'Helpful for salary and employer reviews.' },
      { name: 'Jooble France', url: 'https://fr.jooble.org/', reason: 'Useful for broad cross-platform job searches.' },
      { name: 'Remote OK', url: 'https://remoteok.com/', reason: 'Helpful for remote-friendly French openings.' },
    ],
    Spain: [
      { name: 'InfoJobs', url: 'https://www.infojobs.net/', reason: 'One of the leading Spanish job portals.' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', reason: 'Strong for Spanish employers and professional networking.' },
      { name: 'Indeed Spain', url: 'https://es.indeed.com/', reason: 'Popular job search site in Spain.' },
      { name: 'MediJobs', url: 'https://www.medijobs.es/', reason: 'Useful for professional and specialist roles.' },
      { name: 'Jobtoday Spain', url: 'https://www.jobtoday.com/es', reason: 'Useful for quick local role discovery.' },
      { name: 'Randstad Spain', url: 'https://www.randstad.es/', reason: 'Strong recruitment platform across sectors.' },
      { name: 'Adecco Spain', url: 'https://www.adecco.es/', reason: 'Good for employment and temporary roles.' },
      { name: 'Glassdoor Spain', url: 'https://www.glassdoor.es/', reason: 'Helpful for reviews and salary information.' },
      { name: 'Monster Spain', url: 'https://www.monster.es/', reason: 'Useful for professional and office roles.' },
      { name: 'Jooble Spain', url: 'https://es.jooble.org/', reason: 'Good aggregate search across multiple Spanish sites.' },
      { name: 'Mil Anuncios', url: 'https://www.milanuncios.com/', reason: 'Useful for local work and role discovery.' },
      { name: 'Remote OK', url: 'https://remoteok.com/', reason: 'Helpful for remote-friendly opportunities.' },
    ],
    India: [
      { name: 'Naukri', url: 'https://www.naukri.com/', reason: 'One of the strongest Indian job portals.' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', reason: 'Very relevant across Indian employers and hiring teams.' },
      { name: 'Indeed India', url: 'https://in.indeed.com/', reason: 'Very commonly used for local and national roles.' },
      { name: 'Shine', url: 'https://www.shine.com/', reason: 'Popular for professional and corporate roles in India.' },
      { name: 'TimesJobs', url: 'https://www.timesjobs.com/', reason: 'Strong local job board with wide recruiter coverage.' },
      { name: 'Monster India', url: 'https://www.monsterindia.com/', reason: 'Relevant for many sectors and entry-level roles.' },
      { name: 'Freshersworld', url: 'https://www.freshersworld.com/', reason: 'Strong for early career and campus hiring.' },
      { name: 'Hirect', url: 'https://www.hirect.in/', reason: 'Useful for direct hiring and career networking.' },
      { name: 'Glassdoor India', url: 'https://www.glassdoor.co.in/', reason: 'Helpful for salary and company reviews.' },
      { name: 'Jooble India', url: 'https://in.jooble.org/', reason: 'Useful for aggregated searches across India.' },
      { name: 'WorkIndia', url: 'https://www.workindia.in/', reason: 'Popular for local opportunities and fresher hiring.' },
      { name: 'Remote OK', url: 'https://remoteok.com/', reason: 'Helpful for remote work and cross-border opportunities.' },
    ],
    Portugal: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', reason: 'Strong across Portuguese employers and talent networks.' },
      { name: 'Indeed Portugal', url: 'https://pt.indeed.com/', reason: 'Very common for Portuguese job lists.' },
      { name: 'NetEmpregos', url: 'https://www.netempregos.com.br/', reason: 'Useful for local Portuguese vacancies.' },
      { name: 'Jobrapido', url: 'https://www.jobrapido.com/', reason: 'Strong for quick local job discovery.' },
      { name: 'Catho Portugal', url: 'https://www.catho.pt/', reason: 'Popular job portal in Portugal.' },
      { name: 'AubergeJobs', url: 'https://www.aubergejobs.com/', reason: 'Relevant for hospitality and tourism roles.' },
      { name: 'Glassdoor Portugal', url: 'https://www.glassdoor.pt/', reason: 'Helpful for company and salary reviews.' },
      { name: 'Jooble Portugal', url: 'https://pt.jooble.org/', reason: 'Useful aggregated search across multiple portals.' },
      { name: 'Expresso Empregos', url: 'https://expressoemprego.pt/', reason: 'Helpful for local job searching in Portugal.' },
      { name: 'Remote OK', url: 'https://remoteok.com/', reason: 'Useful for remote-first roles.' },
      { name: 'Workana', url: 'https://www.workana.com/', reason: 'Useful for freelance and project work.' },
      { name: 'Upwork', url: 'https://www.upwork.com/', reason: 'Useful for flexible contract and remote work.' },
    ],
    Netherlands: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', reason: 'Very relevant in the Netherlands for professional hiring.' },
      { name: 'Indeed Netherlands', url: 'https://nl.indeed.com/', reason: 'Popular in the Dutch job market.' },
      { name: 'Werk.nl', url: 'https://www.werk.nl/', reason: 'One of the main Dutch job platforms.' },
      { name: 'Nationale Vacaturebank', url: 'https://www.nationalevacaturebank.nl/', reason: 'Useful for national and regional job ads.' },
      { name: 'Randstad Netherlands', url: 'https://www.randstad.nl/', reason: 'Very common recruitment site in the Netherlands.' },
      { name: 'Monster Netherlands', url: 'https://www.monsterboard.nl/', reason: 'Relevant for professional and office roles.' },
      { name: 'Glassdoor Netherlands', url: 'https://www.glassdoor.nl/', reason: 'Helpful for employer reviews and salary insight.' },
      { name: 'Jobat', url: 'https://www.jobat.be/', reason: 'Useful cross-border listings around the Netherlands region.' },
      { name: 'Intermediair', url: 'https://www.intermediair.nl/', reason: 'Important in the Dutch professional job market.' },
      { name: 'Jooble Netherlands', url: 'https://nl.jooble.org/', reason: 'Helpful for aggregated Dutch roles.' },
      { name: 'Remote OK', url: 'https://remoteok.com/', reason: 'Useful for remote-friendly Dutch and EU roles.' },
      { name: 'Vacatures', url: 'https://www.vacatures.com/', reason: 'Broad job board for Dutch employer listings.' },
    ],
    Italy: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', reason: 'Strong across Italian employers and networks.' },
      { name: 'Indeed Italy', url: 'https://it.indeed.com/', reason: 'Popular in Italy for local role searches.' },
      { name: 'InfoJobs Italy', url: 'https://www.infojobs.it/', reason: 'One of the leading Italian recruitment portals.' },
      { name: 'Monster Italy', url: 'https://www.monster.it/', reason: 'Relevant across multiple sectors.' },
      { name: 'Randstad Italy', url: 'https://www.randstad.it/', reason: 'Very strong in Italy for staffing and jobs.' },
      { name: 'Adecco Italy', url: 'https://www.adecco.it/', reason: 'Useful for local hiring and temporary roles.' },
      { name: 'Glassdoor Italy', url: 'https://www.glassdoor.it/', reason: 'Helpful for salary and employer research.' },
      { name: 'Jobrapido Italy', url: 'https://www.jobrapido.it/', reason: 'Good local aggregator and job search tool.' },
      { name: 'Jooble Italy', url: 'https://it.jooble.org/', reason: 'Useful for broad job searches.' },
      { name: 'Remote OK', url: 'https://remoteok.com/', reason: 'Helpful for remote-friendly Italian companies.' },
      { name: 'HelloWork', url: 'https://www.hellowork.com/', reason: 'Strong for structured hiring and local vacancies.' },
      { name: 'ClicLavoro', url: 'https://www.cliclavoro.it/', reason: 'Useful for local and regional open positions.' },
    ],
    Australia: [
      { name: 'Seek', url: 'https://www.seek.com.au/', reason: 'Australia’s most widely used job platform.' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', reason: 'Very relevant in the Australian market.' },
      { name: 'Indeed Australia', url: 'https://au.indeed.com/', reason: 'Popular for local and national job searches.' },
      { name: 'CareerOne', url: 'https://www.careerone.com.au/', reason: 'Strong national Australian job board.' },
      { name: 'Jora Australia', url: 'https://au.jora.com/', reason: 'Useful for aggregated Australian listings.' },
      { name: 'Adzuna Australia', url: 'https://www.adzuna.com.au/', reason: 'Popular for salary and role discovery.' },
      { name: 'Glassdoor Australia', url: 'https://www.glassdoor.com.au/', reason: 'Useful for employer and salary insights.' },
      { name: 'Hays Australia', url: 'https://www.hays.com.au/', reason: 'Strong recruitment platform in Australia.' },
      { name: 'JobSearch', url: 'https://jobsearch.gov.au/', reason: 'Useful government and public-sector roles.' },
      { name: 'Remote OK', url: 'https://remoteok.com/', reason: 'Helpful for remote-friendly Australia-based opportunities.' },
      { name: 'Jobstreet Australia', url: 'https://www.jobstreet.com.au/', reason: 'Useful for many local and enterprise roles.' },
      { name: 'Workable', url: 'https://www.workable.com/', reason: 'Strong employer hiring pages and job listings.' },
    ],
    Sweden: [
      { name: 'Arbetsförmedlingen', url: 'https://arbetsformedlingen.se/', reason: 'Official Swedish public employment service.' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', reason: 'Strong in Sweden for professional hiring.' },
      { name: 'Indeed Sweden', url: 'https://se.indeed.com/', reason: 'Popular local board for open roles.' },
      { name: 'Jobbland', url: 'https://jobbland.com/', reason: 'Useful Swedish job search aggregator.' },
      { name: 'Monster Sweden', url: 'https://www.monster.se/', reason: 'Relevant for career and office roles.' },
      { name: 'Glassdoor Sweden', url: 'https://www.glassdoor.se/', reason: 'Helpful for salary and employer insight.' },
      { name: 'Randstad Sweden', url: 'https://www.randstad.se/', reason: 'Strong recruitment platform in Sweden.' },
      { name: 'Academic Positions', url: 'https://www.academicpositions.se/', reason: 'Useful for research and academic jobs.' },
      { name: 'Jooble Sweden', url: 'https://se.jooble.org/', reason: 'Helpful for broader searches.' },
      { name: 'Remote OK', url: 'https://remoteok.com/', reason: 'Useful for remote-friendly roles in Sweden.' },
      { name: 'Careerjet Sweden', url: 'https://www.careerjet.se/', reason: 'Strong cross-site job search aggregator.' },
      { name: 'Hays Sweden', url: 'https://www.hays.se/', reason: 'Relevant for professional and specialist recruitment.' },
    ],
    default: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', reason: 'Strongest global network for job discovery and recruiting.' },
      { name: 'Indeed', url: 'https://www.indeed.com/', reason: 'One of the most widely used job search sites globally.' },
      { name: 'Glassdoor', url: 'https://www.glassdoor.com/', reason: 'Helpful for employer research and salary insight.' },
      { name: 'Jooble', url: 'https://jooble.org/', reason: 'Useful search aggregator across many countries and platforms.' },
      { name: 'Remote OK', url: 'https://remoteok.com/', reason: 'Good for remote-first roles.' },
      { name: 'Upwork', url: 'https://www.upwork.com/', reason: 'Useful for freelance and project-based positions.' },
      { name: 'Workable', url: 'https://www.workable.com/', reason: 'Popular employer hiring pages and role boards.' },
      { name: 'ZipRecruiter', url: 'https://www.ziprecruiter.com/', reason: 'Used widely for fast role discovery.' },
      { name: 'Wellfound', url: 'https://wellfound.com/jobs', reason: 'Helpful for startup and product hiring.' },
      { name: 'FlexJobs', url: 'https://www.flexjobs.com/', reason: 'Good for flexible and remote-friendly roles.' },
      { name: 'Adzuna', url: 'https://www.adzuna.com/', reason: 'Strong aggregator in many countries.' },
      { name: 'The Muse', url: 'https://www.themuse.com/', reason: 'Useful for employer brand and career discovery.' },
    ],
  }

  const detectCountry = () => {
    const combined = `${profile.address || ''} ${profile.nationality || ''}`.toLowerCase()

    if (/(brazil|brasil|sao paulo|rio de janeiro|brazilian)/.test(combined)) return 'Brazil'
    if (/(germany|deutschland|berlin|munich|hamburg|german)/.test(combined)) return 'Germany'
    if (/(united states|usa|us|america|washington|new york|california|texas)/.test(combined)) return 'United States'
    if (/(canada|ontario|toronto|vancouver|montreal|canadian)/.test(combined)) return 'Canada'
    if (/(united kingdom|uk|england|london|manchester|britain|scotland|wales)/.test(combined)) return 'United Kingdom'
    if (/(france|paris|francais|french)/.test(combined)) return 'France'
    if (/(spain|madrid|barcelona|españa|spanish)/.test(combined)) return 'Spain'
    if (/(india|mumbai|delhi|bengaluru|hyderabad|indian)/.test(combined)) return 'India'
    if (/(portugal|lisbon|porto|portuguese)/.test(combined)) return 'Portugal'
    if (/(netherlands|holland|amsterdam|rotterdam|dutch)/.test(combined)) return 'Netherlands'
    if (/(italy|italia|milan|rome|naples|italian)/.test(combined)) return 'Italy'
    if (/(australia|sydney|melbourne|brisbane|australian)/.test(combined)) return 'Australia'
    if (/(sweden|stockholm|gothenburg|swedish)/.test(combined)) return 'Sweden'
    if (/(mexico|mexican|mexico city|guadalajara|monterrey)/.test(combined)) return 'Mexico'
    if (/(japan|tokyo|osaka|japanese|日本)/.test(combined)) return 'Japan'
    if (/(south africa|johannesburg|cape town|south african)/.test(combined)) return 'South Africa'
    if (/(uae|united arab emirates|dubai|abu dhabi|emirati)/.test(combined)) return 'United Arab Emirates'
    return ''
  }

  const hasCvData = () => {
    const hasName = !!profile.name?.trim()
    const hasTitle = !!profile.title?.trim()
    const hasEmail = !!profile.email?.trim()
    const hasExperience = experience.some((item) => item.title?.trim() || item.description?.trim())
    const hasEducation = education.some((item) => item.title?.trim() || item.description?.trim())
    const hasSkills = skills.some((item) => item.label?.trim())
    return hasName || hasTitle || hasEmail || hasExperience || hasEducation || hasSkills
  }

  const openJobHelp = () => {
    if (!hasCvData()) {
      setJobHelpCountry('')
      setJobHelpConsent(false)
      setJobHelpOpen(true)
      return
    }

    const detectedCountry = detectCountry()
    setJobHelpCountry(detectedCountry || 'Germany')
    setJobHelpConsent(false)
    setJobHelpOpen(true)
  }

  const recommendedJobSites = countryJobSites[jobHelpCountry] || countryJobSites.default

  const updateProfile = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  const toggleHobby = (hobbyId) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobbyId)
        ? prev.filter((id) => id !== hobbyId)
        : prev.length < 6
          ? [...prev, hobbyId]
          : prev,
    )
  }

  const updateSkill = (index, field, value) => {
    setSkills((prev) =>
      prev.map((skill, idx) =>
        idx === index
          ? { ...skill, [field]: field === 'value' ? Number(value) || 0 : value }
          : skill,
      ),
    )
  }

  const updateLanguage = (index, field, value) => {
    setLanguages((prev) =>
      prev.map((language, idx) =>
        idx === index
          ? { ...language, [field]: field === 'value' ? Number(value) || 0 : value }
          : language,
      ),
    )
  }

  const updateTimeline = (setState, index, field, value) => {
    setState((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)),
    )
  }

  const openWritingHelper = (target, currentText = '') => {
    setWritingTarget(target)
    setWritingDetails(currentText)
    setWritingDraft('')
    setWritingTone('professional')
  }

  const generateLocalDraft = () => {
    const details = writingDetails.trim().replace(/\s+/g, ' ')
    const role = profile.title.trim() || 'professional'
    const toneLead = {
      professional: 'I bring a practical, thoughtful approach to my work.',
      confident: 'I take ownership, adapt quickly, and focus on delivering strong results.',
      warm: 'I enjoy working with people and bringing care and curiosity to each challenge.',
    }[writingTone]

    if (writingTarget.kind === 'about') {
      const detailSentence = details ? ` My strengths and experience include ${details.replace(/[.!?]+$/, '')}.` : ''
      setWritingDraft(`I am a ${role} who enjoys solving meaningful problems and contributing to a supportive team. ${toneLead}${detailSentence}`)
      return
    }

    const item = writingTarget.kind === 'education' ? education[writingTarget.index] : experience[writingTarget.index]
    const title = item?.title.trim() || (writingTarget.kind === 'education' ? 'this program' : 'this role')
    const typeSentence = writingTarget.kind === 'education'
      ? `Completed ${title}${item?.year ? ` (${item.year})` : ''}.`
      : `Worked as ${title}${item?.year ? ` (${item.year})` : ''}.`
    setWritingDraft(details ? `${typeSentence} ${details}` : `${typeSentence} ${toneLead}`)
  }

  const applyWritingDraft = () => {
    if (!writingTarget || !writingDraft.trim()) return

    if (writingTarget.kind === 'about') {
      updateProfile('about', writingDraft.trim())
    } else {
      const setter = writingTarget.kind === 'education' ? setEducation : setExperience
      updateTimeline(setter, writingTarget.index, 'description', writingDraft.trim())
    }
    setWritingTarget(null)
  }

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setCropSource(reader.result)
      setCropZoom(1)
      setCropX(0)
      setCropY(0)
      setCropAspect(1)
    }
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const applyPhotoCrop = async () => {
    if (!cropSource) return

    const image = new Image()
    image.src = cropSource
    try {
      await image.decode()
    } catch {
      window.alert('This photo could not be opened. Please choose another image.')
      return
    }

    const size = 720
    const scale = Math.max(size / image.naturalWidth, size / image.naturalHeight) * cropZoom
    const renderedWidth = image.naturalWidth * scale
    const renderedHeight = image.naturalHeight * scale
    const left = (size - renderedWidth) / 2 + (cropX * (renderedWidth - size)) / 2
    const top = (size - renderedHeight) / 2 + (cropY * (renderedHeight - size)) / 2
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext('2d')
    if (!context) return

    context.drawImage(image, left, top, renderedWidth, renderedHeight)
    updateProfile('photo', canvas.toDataURL('image/jpeg', 0.94))
    setCropSource('')
  }

  const captureStyledPreview = async () => {
    const source = document.getElementById('resume-preview')
    if (!source) throw new Error('CV preview is not available')

    const bounds = source.getBoundingClientRect()
    const width = Math.ceil(bounds.width)
    const height = Math.ceil(source.scrollHeight)
    const clone = source.cloneNode(true)
    clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')

    const copyStyles = (original, copied) => {
      if (original instanceof Element && copied instanceof Element) {
        const computed = getComputedStyle(original)
        for (const property of computed) {
          copied.style.setProperty(property, computed.getPropertyValue(property), computed.getPropertyPriority(property))
        }
      }

      const originalChildren = original.children || []
      const copiedChildren = copied.children || []
      for (let index = 0; index < originalChildren.length; index += 1) {
        if (copiedChildren[index]) copyStyles(originalChildren[index], copiedChildren[index])
      }
    }

    copyStyles(source, clone)
    clone.style.width = `${width}px`
    clone.style.height = `${height}px`
    clone.style.minHeight = '0'
    clone.style.maxWidth = 'none'
    clone.style.borderRadius = '0'
    clone.style.boxShadow = 'none'
    clone.style.overflow = 'visible'

    const markup = new XMLSerializer().serializeToString(clone)
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><foreignObject width="100%" height="100%">${markup}</foreignObject></svg>`
    const image = new Image()
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
    await image.decode()

    const canvas = document.createElement('canvas')
    const scale = 2
    canvas.width = width * scale
    canvas.height = height * scale
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Could not create CV image')
    context.scale(scale, scale)
    context.drawImage(image, 0, 0, width, height)
    return canvas
  }

  const createA4Canvas = (sourceCanvas) => {
    const sourceIsLandscape = sourceCanvas.width / sourceCanvas.height >= 1
    const pageWidth = sourceIsLandscape ? 3508 : 2480
    const pageHeight = sourceIsLandscape ? 2480 : 3508
    const margin = 110
    const scale = Math.min(
      (pageWidth - margin * 2) / sourceCanvas.width,
      (pageHeight - margin * 2) / sourceCanvas.height,
    )
    const drawWidth = sourceCanvas.width * scale
    const drawHeight = sourceCanvas.height * scale
    const canvas = document.createElement('canvas')
    canvas.width = pageWidth
    canvas.height = pageHeight
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Could not create A4 document')

    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, pageWidth, pageHeight)
    context.drawImage(sourceCanvas, (pageWidth - drawWidth) / 2, (pageHeight - drawHeight) / 2, drawWidth, drawHeight)
    return canvas
  }

  const exportAsPng = async () => {
    try {
      const canvas = createA4Canvas(await captureStyledPreview())
      const image = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Could not encode the CV as a PNG image'))
        }, 'image/png')
      })
      const imageUrl = URL.createObjectURL(image)
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = `${(profile.name || 'cv').replace(/\s+/g, '_')}.png`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.setTimeout(() => URL.revokeObjectURL(imageUrl), 1000)
    } catch {
      window.alert('The CV could not be prepared as a PNG image. Please try again.')
    }
  }

  const chooseDownload = (downloadAction) => {
    setDownloadMenuOpen(false)
    downloadAction()
  }

  const openCvPrintView = async (printAfterOpen = false) => {
    const printWindow = window.open('', '_blank', 'width=1200,height=900')

    if (!printWindow) {
      window.alert('Allow pop-ups for this site to open your CV print preview.')
      return
    }

    let canvas
    try {
      canvas = createA4Canvas(await captureStyledPreview())
    } catch {
      printWindow.close()
      window.alert('The CV preview could not be prepared for PDF printing. Please try again.')
      return
    }

    const imgData = canvas.toDataURL('image/jpeg', 0.94)
    const orientation = canvas.width > canvas.height ? 'landscape' : 'portrait'
    printWindow.document.write(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>CV Print Preview</title>
          <style>
            @page { size: A4 ${orientation}; margin: 0; }
            * { box-sizing: border-box; }
            html, body { min-height: 100%; margin: 0; }
            body { background: #e9ece5; color: #26332e; font: 15px Arial, sans-serif; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            .preview-toolbar { position: sticky; top: 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 14px 20px; background: #fff; border-bottom: 1px solid #d7dfd4; box-shadow: 0 2px 8px rgba(38,51,46,.08); }
            .preview-toolbar strong { font-size: 16px; }
            .preview-toolbar button { min-height: 42px; padding: 9px 16px; border: 0; border-radius: 4px; background: #315c4b; color: #fff; font: inherit; font-weight: 700; cursor: pointer; }
            .preview-toolbar button:hover { background: #254b3b; }
            .preview-toolbar button:focus-visible { outline: 3px solid #a95e42; outline-offset: 3px; }
            .preview-paper { width: min(760px, calc(100vw - 32px)); aspect-ratio: ${canvas.width} / ${canvas.height}; margin: 24px auto; background: #fff; box-shadow: 0 12px 38px rgba(38,51,46,.2); }
            .preview-paper img { display: block; width: 100%; height: 100%; object-fit: contain; }
            @media print {
              html, body { width: 100%; height: 100%; background: #fff; }
              .preview-toolbar { display: none !important; }
              .preview-paper { width: 100vw; height: 100vh; max-width: none; aspect-ratio: auto; margin: 0; box-shadow: none; }
            }
            @media (max-width: 480px) {
              .preview-toolbar { align-items: flex-start; flex-direction: column; gap: 10px; }
              .preview-paper { margin-top: 16px; }
            }
          </style>
        </head>
        <body>
          <header class="preview-toolbar">
            <strong>CV print preview · A4 ${orientation}</strong>
            <button id="print-cv" type="button">Print / Save PDF</button>
          </header>
          <main class="preview-paper">
            <img src="${imgData}" alt="Preview of your CV on A4 paper" />
          </main>
        </body>
      </html>
    `)
    printWindow.document.close()
    const image = printWindow.document.querySelector('img')
    try {
      await image.decode()
      printWindow.focus()
      printWindow.document.querySelector('#print-cv').addEventListener('click', () => printWindow.print())
      if (printAfterOpen) printWindow.print()
    } catch {
      printWindow.close()
      window.alert('The CV preview could not be prepared for PDF printing. Please try again.')
    }
  }

  const exportAsPdf = () => openCvPrintView(true)
  const openPrintPreview = async () => {
    try {
      const canvas = createA4Canvas(await captureStyledPreview())
      setPrintPreview({
        image: canvas.toDataURL('image/jpeg', 0.94),
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      })
    } catch {
      window.alert('The CV preview could not be prepared. Please try again.')
    }
  }

  return (
    <div className="builder-layout" dir={isRtl ? 'rtl' : 'ltr'}>
      <button
        type="button"
        className="fullscreen-toggle"
        data-fullscreen-toggle
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        aria-pressed={isFullscreen}
        onClick={toggleFullscreen}
      >
        <span className="fullscreen-toggle-icon" aria-hidden="true">{isFullscreen ? '⛶' : '⛶'}</span>
        <span>{isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}</span>
      </button>

      <aside className="editor-panel">
        <h2>{labels.builder}</h2>

        <div className="field-group">
          <label>{labels.templateStyle}</label>
          <select value={templateStyle} onChange={(event) => setTemplateStyle(event.target.value)}>
            <option value="classic">Original blue</option>
            <option value="minimal">Minimal red</option>
            <option value="blueHeader">Blue header</option>
            <option value="monochrome">Black &amp; white</option>
          </select>
        </div>

        <div className="field-group">
          <label>{labels.cvLanguage}</label>
          <select value={cvLanguage} onChange={(e) => setCvLanguage(e.target.value)}>
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label>{labels.theme}</label>
          <div className="theme-preset-list">
            {themePresets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                className={`theme-swatch ${
                  theme.accent === preset.accent ? 'active' : ''
                }`}
                style={{ background: `linear-gradient(135deg, ${preset.accent}, ${preset.sidebar})` }}
                onClick={() => setTheme(preset)}
                aria-label={preset.name}
              />
            ))}
          </div>
        </div>

        <div className="field-group color-row">
          <label>{labels.accent}</label>
          <input
            type="color"
            value={theme.accent}
            onChange={(e) => setTheme((prev) => ({ ...prev, accent: e.target.value }))}
          />
        </div>

        <div className="field-group color-row">
          <label>{labels.sidebar}</label>
          <input
            type="color"
            value={theme.sidebar}
            onChange={(e) => setTheme((prev) => ({ ...prev, sidebar: e.target.value }))}
          />
        </div>

        <div className="field-group">
          <label>{labels.photo}</label>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          {profile.photo && (
            <button type="button" className="inline-button" onClick={() => {
              setCropSource(profile.photo)
              setCropZoom(1)
              setCropX(0)
              setCropY(0)
              setCropAspect(1)
            }}>
              {labels.recrop}
            </button>
          )}
        </div>

        <div className="field-group">
          <label>{labels.name}</label>
          <input value={profile.name} onChange={(e) => updateProfile('name', e.target.value)} />
        </div>

        <div className="field-group">
          <label>{labels.title}</label>
          <input value={profile.title} onChange={(e) => updateProfile('title', e.target.value)} />
        </div>

        <div className="field-group">
          <label>{labels.phone}</label>
          <input value={profile.phone} onChange={(e) => updateProfile('phone', e.target.value)} />
        </div>

        <div className="field-group">
          <label>{labels.address}</label>
          <input value={profile.address} onChange={(e) => updateProfile('address', e.target.value)} />
        </div>

        <div className="field-group">
          <label>{labels.email}</label>
          <input value={profile.email} onChange={(e) => updateProfile('email', e.target.value)} />
        </div>

        <div className="field-group">
          <label>{labels.website}</label>
          <input value={profile.website} onChange={(e) => updateProfile('website', e.target.value)} />
        </div>

        <div className="field-section personal-editor-fields">
          <h3>{labels.personal}</h3>
          <div className="field-group">
            <label>{labels.nationality}</label>
            <input value={profile.nationality} onChange={(e) => updateProfile('nationality', e.target.value)} />
          </div>
          <div className="field-group">
            <label>{labels.postalCode}</label>
            <input value={profile.postalCode} onChange={(e) => updateProfile('postalCode', e.target.value)} />
          </div>
          <div className="field-group">
            <label>{labels.maritalStatus}</label>
            <select value={profile.maritalStatus} onChange={(e) => updateProfile('maritalStatus', e.target.value)}>
              <option value="">{labels.maritalStatus}</option>
              {(maritalChoices[cvLanguage] || maritalChoices.en).map((choice, index) => (
                <option key={maritalChoiceValues[index]} value={maritalChoiceValues[index]}>
                  {choice}
                </option>
              ))}
            </select>
          </div>
          {profile.maritalStatus === 'married' && (
            <div className="field-group">
              <label>{labels.children}</label>
              <input type="number" min="0" step="1" value={profile.children} onChange={(e) => updateProfile('children', e.target.value)} />
            </div>
          )}
        </div>

        <div className="field-group">
          <div className="writing-field-heading">
            <label>{labels.aboutField}</label>
            <button type="button" className="inline-button" onClick={() => openWritingHelper({ kind: 'about' }, profile.about)}>
              {labels.writingHelper}
            </button>
          </div>
          <textarea className="long-text-editor" rows="7" value={profile.about} onChange={(e) => updateProfile('about', e.target.value)} />
        </div>

        <div className="field-section">
          <div className="section-tools">
            <h3>{labels.skills}</h3>
            <button type="button" className="inline-button" onClick={() => setSkills((prev) => [...prev, createSkill()])}>
              + {labels.add}
            </button>
          </div>
          {skills.map((skill, index) => (
            <div key={index} className="mini-grid">
              <input
                value={skill.label}
                onChange={(e) => updateSkill(index, 'label', e.target.value)}
              />
              <input
                type="number"
                min="0"
                max="100"
                value={skill.value}
                onChange={(e) => updateSkill(index, 'value', e.target.value)}
              />
              <button
                type="button"
                className="remove-button"
                onClick={() => setSkills((prev) => prev.filter((_, idx) => idx !== index))}
              >
                {labels.remove}
              </button>
            </div>
          ))}
        </div>

        <div className="field-section">
          <div className="section-tools">
            <h3>{labels.languages}</h3>
            <button type="button" className="inline-button" onClick={() => setLanguages((prev) => [...prev, createLanguage()])}>
              + {labels.add}
            </button>
          </div>
          {languages.map((language, index) => (
            <div key={index} className="mini-grid">
              <input
                value={language.label}
                onChange={(e) => updateLanguage(index, 'label', e.target.value)}
              />
              <input
                type="number"
                min="0"
                max="100"
                value={language.value}
                onChange={(e) => updateLanguage(index, 'value', e.target.value)}
              />
              <button
                type="button"
                className="remove-button"
                onClick={() => setLanguages((prev) => prev.filter((_, idx) => idx !== index))}
              >
                {labels.remove}
              </button>
            </div>
          ))}
        </div>

        <div className="field-section">
          <div className="section-tools">
            <h3>{labels.education}</h3>
            <button type="button" className="inline-button" onClick={() => setEducation((prev) => [...prev, createEducation()])}>
              + {labels.add}
            </button>
          </div>
          {education.map((item, index) => (
            <div key={index} className="timeline-editor">
              <input
                value={item.year}
                onChange={(e) => updateTimeline(setEducation, index, 'year', e.target.value)}
              />
              <input
                value={item.title}
                onChange={(e) => updateTimeline(setEducation, index, 'title', e.target.value)}
              />
              <div className="writing-field-heading">
                <label>{labels.writingHelper}</label>
                <button type="button" className="inline-button" onClick={() => openWritingHelper({ kind: 'education', index }, item.description)}>
                  {labels.generateDraft}
                </button>
              </div>
              <textarea
                className="long-text-editor"
                rows="4"
                value={item.description}
                onChange={(e) => updateTimeline(setEducation, index, 'description', e.target.value)}
              />
              <button
                type="button"
                className="remove-button"
                onClick={() => setEducation((prev) => prev.filter((_, idx) => idx !== index))}
              >
                {labels.remove}
              </button>
            </div>
          ))}
        </div>

        <div className="field-section">
          <div className="section-tools">
            <h3>{labels.experience}</h3>
            <button type="button" className="inline-button" onClick={() => setExperience((prev) => [...prev, createExperience()])}>
              + {labels.add}
            </button>
          </div>
          {experience.map((item, index) => (
            <div key={index} className="timeline-editor">
              <input
                value={item.year}
                onChange={(e) => updateTimeline(setExperience, index, 'year', e.target.value)}
              />
              <input
                value={item.title}
                onChange={(e) => updateTimeline(setExperience, index, 'title', e.target.value)}
              />
              <div className="writing-field-heading">
                <label>{labels.writingHelper}</label>
                <button type="button" className="inline-button" onClick={() => openWritingHelper({ kind: 'experience', index }, item.description)}>
                  {labels.generateDraft}
                </button>
              </div>
              <textarea
                className="long-text-editor"
                rows="4"
                value={item.description}
                onChange={(e) => updateTimeline(setExperience, index, 'description', e.target.value)}
              />
              <button
                type="button"
                className="remove-button"
                onClick={() => setExperience((prev) => prev.filter((_, idx) => idx !== index))}
              >
                {labels.remove}
              </button>
            </div>
          ))}
        </div>

        <div className="field-section hobby-editor-section">
          <div className="section-tools">
            <h3>{labels.hobbies}</h3>
            <span className="hobby-selection-count" aria-live="polite">{selectedHobbies.length} / 6 selected</span>
          </div>
          <div className="hobby-picker" role="group" aria-label="Choose hobbies">
            {hobbyOptions.map((hobby) => {
              const selected = selectedHobbies.includes(hobby.id)
              return (
                <button
                  key={hobby.id}
                  type="button"
                  className={`hobby-option${selected ? ' selected' : ''}`}
                  aria-pressed={selected}
                  disabled={!selected && selectedHobbies.length >= 6}
                  onClick={() => toggleHobby(hobby.id)}
                >
                  <span className="hobby-option-icon" aria-hidden="true">{hobby.icon}</span>
                  <span>{hobby.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="export-actions">
          <div className="download-menu" ref={downloadMenuRef}>
            <button
              ref={(element) => {
                downloadTriggerRef.current = element
                printPreviewTriggerRef.current = element
              }}
              type="button"
              className="export-button download-trigger"
              aria-haspopup="menu"
              aria-expanded={downloadMenuOpen}
              onClick={() => setDownloadMenuOpen((open) => !open)}
            >
              Download <span className="download-chevron" aria-hidden="true">▾</span>
            </button>
            {downloadMenuOpen && (
              <div className="download-menu-list" role="menu" aria-label="Choose a download format">
                <button type="button" role="menuitem" onClick={() => chooseDownload(exportAsPdf)}>
                  <span className="download-format-icon pdf-icon" aria-hidden="true">PDF</span>
                  <span><strong>PDF</strong><small>Print-ready document</small></span>
                </button>
                <button type="button" role="menuitem" onClick={() => chooseDownload(exportAsPng)}>
                  <span className="download-format-icon png-icon" aria-hidden="true">PNG</span>
                  <span><strong>PNG</strong><small>High-quality image</small></span>
                </button>
                <button type="button" role="menuitem" onClick={() => chooseDownload(openPrintPreview)}>
                  <span className="download-format-icon preview-icon" aria-hidden="true">PRE</span>
                  <span><strong>Print Preview</strong><small>See your CV on paper</small></span>
                </button>
              </div>
            )}
          </div>
          <button type="button" className="export-button tertiary" onClick={openJobHelp}>
            Help Me Find a Job
          </button>
        </div>
      </aside>

      {printPreview && (
        <div className="print-preview-overlay" onClick={() => setPrintPreview(null)}>
          <section
            className="print-preview-dialog"
            ref={printPreviewDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="print-preview-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="print-preview-toolbar">
              <div>
                <h2 id="print-preview-title">Print Preview</h2>
                <p>A4 paper · {printPreview.orientation}</p>
              </div>
              <div className="print-preview-actions">
                <button type="button" className="export-button" onClick={() => openCvPrintView(true)}>
                  Print / Save PDF
                </button>
                <button ref={printPreviewCloseRef} type="button" className="print-preview-close" onClick={() => setPrintPreview(null)}>
                  Close
                </button>
              </div>
            </header>
            <div className="print-preview-paper" style={{ aspectRatio: printPreview.orientation === 'landscape' ? '3508 / 2480' : '2480 / 3508' }}>
              <img src={printPreview.image} alt="Preview of your CV on A4 paper" />
            </div>
          </section>
        </div>
      )}

      {jobHelpOpen && (
        <div className="photo-crop-overlay" onClick={() => setJobHelpOpen(false)}>
          <div className="photo-crop-dialog job-help-modal" onClick={(event) => event.stopPropagation()}>
            <div className="photo-crop-heading">
              <h3>Help Me Find a Job</h3>
              <button type="button" className="remove-button" onClick={() => setJobHelpOpen(false)}>Close</button>
            </div>

            {!hasCvData() ? (
              <div className="job-help-message-block">
                <p>Your CV is not ready yet. Please create your CV first before using this feature.</p>
              </div>
            ) : (
              <>
                <p className="job-help-info">We found an existing CV. Choose your target country and review relevant job platforms.</p>

                <div className="field-group">
                  <label>Country</label>
                  <select value={jobHelpCountry} onChange={(event) => setJobHelpCountry(event.target.value)}>
                    <option value="">Select a country</option>
                    {Object.keys(countryJobSites).filter((country) => country !== 'default').map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div className="job-help-sites">
                  <h4>Recommended job platforms</h4>
                  <ol>
                    {(countryJobSites[jobHelpCountry] || countryJobSites.default).map((site, index) => (
                      <li key={`${site.name}-${index}`}>
                        <div className="job-site-row">
                          <span className="job-site-rank">#{index + 1}</span>
                          <a href={site.url} target="_blank" rel="noreferrer">{site.name}</a>
                        </div>
                        <small>{site.reason}</small>
                      </li>
                    ))}
                  </ol>
                </div>
              </>
            )}

            <label className="job-help-consent">
              <input
                type="checkbox"
                checked={jobHelpConsent}
                onChange={(event) => setJobHelpConsent(event.target.checked)}
              />
              <span>I understand that this tool provides local job recommendations in the app, and I agree to share my CV with the job platforms I choose to use to help me find jobs.</span>
            </label>

            <div className="export-actions job-help-actions">
              <button type="button" className="export-button" onClick={() => setJobHelpOpen(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <main
        id="resume-preview"
        className={`resume-page template-${templateStyle}`}
        style={{
          '--cv-accent': theme.accent,
          '--cv-sidebar': theme.sidebar,
          '--cv-sidebar-2': theme.sidebar2,
        }}
      >
        <div className="template-banner" aria-hidden="true" />
        <aside className="sidebar">
          <div className="profile-header">
            <div className="profile-ring">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="profile-image" />
              ) : (
                <div className="profile-placeholder" aria-label="Profile initials">
                  {profile.name
                    .split(' ')
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </div>
              )}
            </div>
            <h1>{profile.name}</h1>
            <p>{profile.title}</p>
          </div>

          <section className="panel personal-info-panel">
            <h2>{labels.personal}</h2>
            <ul className="personal-info-list">
              <li><span className="personal-info-icon" aria-hidden="true">🌍</span><span>{labels.nationality}</span><strong>{profile.nationality || '—'}</strong></li>
              <li><span className="personal-info-icon" aria-hidden="true">📮</span><span>{labels.postalCode}</span><strong>{profile.postalCode || '—'}</strong></li>
              <li><span className="personal-info-icon" aria-hidden="true">💍</span><span>{labels.maritalStatus}</span><strong>{maritalChoices[cvLanguage]?.[maritalChoiceValues.indexOf(profile.maritalStatus)] || profile.maritalStatus || '—'}</strong></li>
              {profile.maritalStatus === 'married' && (
                <li><span className="personal-info-icon" aria-hidden="true">👨‍👩‍👧</span><span>{labels.children}</span><strong>{profile.children || '—'}</strong></li>
              )}
            </ul>
          </section>

          <section className="panel">
            <h2>{labels.contact}</h2>
            <ul className="contact-list">
              <li className="contact-item">
                <span className="contact-icon">📞</span>
                <span>{profile.phone}</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">📍</span>
                <span>{profile.address}</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>{profile.email}</span>
              </li>
              <li className="contact-item">
                <span className="contact-icon">🌐</span>
                <span>{profile.website}</span>
              </li>
            </ul>
          </section>

          <section className="panel sidebar-about">
            <h2>{labels.about}</h2>
            <p className="lead-text">{profile.about}</p>
          </section>

          <section className="panel">
            <h2>{labels.skills}</h2>
            <div className="skill-list">
              {skills.map((skill, index) => (
                <div key={index} className="skill-row">
                  <div className="skill-label-row">
                    <span>{skill.label}</span>
                  </div>
                  <div className="meter">
                    <span style={{ width: `${skill.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel">
            <h2>{labels.languages}</h2>
            <div className="skill-list">
              {languages.map((language, index) => (
                <div key={index} className="skill-row">
                  <div className="skill-label-row">
                    <span>{language.label}</span>
                  </div>
                  <div className="meter">
                    <span style={{ width: `${language.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="panel hobbies-panel">
            <h2>{labels.hobbies}</h2>
            <div className="hobby-list">
              {hobbyOptions.filter((hobby) => selectedHobbies.includes(hobby.id)).map((hobby) => (
                <span key={hobby.id} className="hobby-badge" aria-label={hobby.label} title={hobby.label}>
                  {hobby.icon}
                </span>
              ))}
            </div>
          </section>
        </aside>

        <main className="content">
          <section className="section">
            <div className="section-header">
              <span className="section-icon" aria-hidden="true"></span>
              <h2>{labels.about}</h2>
            </div>
            <p className="lead-text">{profile.about}</p>
          </section>

          <section className="section">
            <div className="section-header">
              <span className="section-icon" aria-hidden="true"></span>
              <h2>{labels.education}</h2>
            </div>

            <ul className="timeline-list">
              {education.map((item, index) => (
                <li key={index} className="timeline-item">
                  <span className="timeline-year">{item.year}</span>
                  <div className="timeline-copy">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="section">
            <div className="section-header">
              <span className="section-icon" aria-hidden="true"></span>
              <h2>{labels.experience}</h2>
            </div>

            <ul className="timeline-list">
              {experience.map((item, index) => (
                <li key={index} className="timeline-item">
                  <span className="timeline-year">{item.year}</span>
                  <div className="timeline-copy">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </main>

      {writingTarget && (
        <div className="writing-helper-overlay">
          <section className="writing-helper-dialog" role="dialog" aria-modal="true" aria-labelledby="writing-helper-title">
            <div className="writing-helper-heading">
              <div>
                <h2 id="writing-helper-title">{labels.writingHelper}</h2>
                <p>{labels.writingHelperNote}</p>
              </div>
              <button type="button" className="crop-close" aria-label={labels.cancel} onClick={() => setWritingTarget(null)}>×</button>
            </div>
            <label className="writing-helper-label" htmlFor="writing-details">{labels.draftDetails}</label>
            <textarea
              id="writing-details"
              className="long-text-editor"
              rows="5"
              value={writingDetails}
              onChange={(event) => setWritingDetails(event.target.value)}
            />
            <label className="writing-helper-label" htmlFor="writing-tone">{labels.tone}</label>
            <select id="writing-tone" value={writingTone} onChange={(event) => setWritingTone(event.target.value)}>
              <option value="professional">{labels.toneProfessional}</option>
              <option value="confident">{labels.toneConfident}</option>
              <option value="warm">{labels.toneWarm}</option>
            </select>
            <div className="writing-helper-actions">
              <button type="button" className="inline-button" onClick={() => setWritingTarget(null)}>{labels.cancel}</button>
              <button type="button" className="export-button" onClick={generateLocalDraft}>{labels.generateDraft}</button>
            </div>
            {writingDraft && (
              <div className="writing-draft-result">
                <label className="writing-helper-label" htmlFor="writing-draft">{labels.useDraft}</label>
                <textarea id="writing-draft" className="long-text-editor" rows="7" value={writingDraft} onChange={(event) => setWritingDraft(event.target.value)} />
                <button type="button" className="export-button" onClick={applyWritingDraft}>{labels.useDraft}</button>
              </div>
            )}
          </section>
        </div>
      )}

      {cropSource && (
        <div className="photo-crop-overlay">
          <section className="photo-crop-dialog" role="dialog" aria-modal="true" aria-labelledby="crop-title">
            <div className="photo-crop-heading">
              <h2 id="crop-title">{labels.cropTitle}</h2>
              <button type="button" className="crop-close" aria-label="Cancel crop" onClick={() => setCropSource('')}>
                ×
              </button>
            </div>
            <div className="photo-crop-window">
              <img
                src={cropSource}
                alt="Photo crop preview"
                onLoad={(event) => setCropAspect(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight)}
                style={{
                  transform: `translate(${cropX * Math.max(0, (Math.max(1, cropAspect) * cropZoom - 1) * 50)}%, ${cropY * Math.max(0, (Math.max(1, 1 / cropAspect) * cropZoom - 1) * 50)}%) scale(${cropZoom})`,
                }}
              />
            </div>
            <div className="crop-controls">
              <label>
                {labels.zoom} <span>{cropZoom.toFixed(1)}×</span>
                <input type="range" min="1" max="3" step="0.01" value={cropZoom} onChange={(event) => setCropZoom(Number(event.target.value))} />
              </label>
              <label>
                {labels.horizontal}
                <input type="range" min="-1" max="1" step="0.01" value={cropX} onChange={(event) => setCropX(Number(event.target.value))} />
              </label>
              <label>
                {labels.vertical}
                <input type="range" min="-1" max="1" step="0.01" value={cropY} onChange={(event) => setCropY(Number(event.target.value))} />
              </label>
            </div>
            <div className="crop-actions">
              <button type="button" className="inline-button" onClick={() => setCropSource('')}>{labels.cancel}</button>
              <button type="button" className="export-button" onClick={applyPhotoCrop}>{labels.usePhoto}</button>
            </div>
          </section>
        </div>
      )}

      <div className="tea-support-widget">
        {teaSupportOpen && (
          <section id="tea-support-panel" className="tea-support-panel" role="dialog" aria-modal="false" aria-labelledby="tea-support-title">
            <div className="tea-support-panel-heading">
              <div>
                <span className="tea-support-eyebrow">A little warmth goes a long way</span>
                <h2 id="tea-support-title">Enjoying this Resume Builder?</h2>
              </div>
              <button
                ref={teaCloseRef}
                type="button"
                className="tea-support-close"
                aria-label="Close support panel"
                onClick={() => setTeaSupportOpen(false)}
              >
                ×
              </button>
            </div>
            <img className="tea-support-image" src="/tea_PNG16927.png" alt="A glass cup of tea" />
            <p>If this tool helped you create your resume, you can support my work by buying me a tea. Your support helps me maintain and improve this free service.</p>
            <button className="tea-support-action" type="button" onClick={() => setTeaThanks(true)}>
              Buy me a tea ☕
            </button>
            {teaThanks && <p className="tea-support-thanks" role="status">Thank you! Payment support is coming soon.</p>}
          </section>
        )}

        <button
          ref={teaTriggerRef}
          type="button"
          className="tea-support-trigger"
          aria-label="Buy me a tea"
          aria-expanded={teaSupportOpen}
          aria-controls="tea-support-panel"
          onClick={() => {
            setTeaThanks(false)
            setTeaSupportOpen((open) => !open)
          }}
        >
          <img src="/tea_PNG16927.png" alt="" aria-hidden="true" />
          <span>Buy me a tea</span>
        </button>
      </div>
    </div>
  )
}

export default App
