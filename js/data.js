// ===== TECH TOP SOFTWARE DATA =====
const softwareCategories = [
  { id: 'cybersecurity', name: 'أدوات الأمن السيبراني', icon: '🛡️', color: '#00ffff' },
  { id: 'development', name: 'أدوات التطوير', icon: '💻', color: '#00ffff' },
  { id: 'media', name: 'الوسائط المتعددة', icon: '▶️', color: '#00ffff' },
  { id: 'productivity', name: 'الإنتاجية', icon: '📄', color: '#00ffff' },
  { id: 'compression', name: 'الضغط', icon: '🗜️', color: '#00ffff' }
];

const softwareList = [
  {
    id: 1, name: 'Kali Linux', nameAr: 'كالي لينكس', category: 'cybersecurity',
    description: 'أقوى توزيعة لاختبار الاختراق', icon: '🛡️', version: '2024.4',
    rating: 4.9, downloads: '45k', official: true, free: true,
    url: 'https://www.kali.org/get-kali/'
  },
  {
    id: 2, name: 'Wireshark', nameAr: 'وايرشارك', category: 'cybersecurity',
    description: 'محلل بروتوكولات الشبكة', icon: '🔍', version: '4.4',
    rating: 4.8, downloads: '38k', official: true, free: true,
    url: 'https://www.wireshark.org/download.html'
  },
  {
    id: 3, name: 'Visual Studio Code', nameAr: 'فيجوال ستوديو كود', category: 'development',
    description: 'محرر أكواد خفيف وقوي', icon: '💻', version: '1.96',
    rating: 4.9, downloads: '21.5k', official: true, free: true,
    url: 'https://code.visualstudio.com/download'
  },
  {
    id: 4, name: 'Python', nameAr: 'بايثون', category: 'development',
    description: 'لغة برمجة متعددة الاستخدامات', icon: '🐍', version: '3.13',
    rating: 4.8, downloads: '14.8k', official: true, free: true,
    url: 'https://www.python.org/downloads/'
  },
  {
    id: 5, name: 'VLC Media Player', nameAr: 'في إل سي', category: 'media',
    description: 'مشغل وسائط يدعم جميع التنسيقات', icon: '▶️', version: '3.0.21',
    rating: 4.8, downloads: '18.9k', official: true, free: true,
    url: 'https://www.videolan.org/vlc/'
  },
  {
    id: 6, name: 'LibreOffice', nameAr: 'ليبر أوفيس', category: 'productivity',
    description: 'حزمة مكتبية مجانية وقوية', icon: '📄', version: '24.8',
    rating: 4.3, downloads: '11.2k', official: true, free: true,
    url: 'https://www.libreoffice.org/download/'
  },
  {
    id: 7, name: '7-Zip', nameAr: 'سفن زيب', category: 'compression',
    description: 'أداة ضغط ملفات مجانية', icon: '🗜️', version: '24.09',
    rating: 4.8, downloads: '15.6k', official: true, free: true,
    url: 'https://www.7-zip.org/download.html'
  },
  {
    id: 8, name: 'Git', nameAr: 'جت', category: 'development',
    description: 'نظام تحكم بالإصدارات', icon: '📦', version: '2.47',
    rating: 4.8, downloads: '16.7k', official: true, free: true,
    url: 'https://git-scm.com/downloads'
  },
  {
    id: 9, name: 'Nmap', nameAr: 'إن ماب', category: 'cybersecurity',
    description: 'أداة اكتشاف الشبكات', icon: '🌐', version: '7.95',
    rating: 4.9, downloads: '35k', official: true, free: true,
    url: 'https://nmap.org/download.html'
  }
];

// ===== LINUX TOOLS DATA =====
const linuxToolsData = [
  {
    category: 'التنقل والاستكشاف',
    icon: 'compass',
    color: 'text-emerald-400',
    badge: 'Essential',
    commands: `$ ls -la                # عرض كل الملفات
$ cd ~/Documents       # الانتقال لمجلد
$ pwd                  # عرض المسار الحالي
$ find . -name "*.txt" # بحث عن ملفات txt
$ locate passwd        # بحث سريع`
  },
  {
    category: 'معالجة الملفات',
    icon: 'folder',
    color: 'text-blue-400',
    badge: 'Core',
    borderColor: '#3b82f6',
    commands: `$ cp -r source dest      # نسخ مجلد
$ mv old new           # نقل/إعادة تسمية
$ rm -rf directory     # حذف مجلد بقوة
$ mkdir -p dir1/dir2   # إنشاء مجلدات متداخلة`
  },
  {
    category: 'عرض المحتوى',
    icon: 'eye',
    color: 'text-fuchsia-300',
    badge: 'View',
    borderColor: '#e879f9',
    commands: `$ cat file.txt | head -20 # أول 20 سطر
$ tail -f logfile        # متابعة الملف حيًا
$ less largefile.txt     # عرض صفحة بصفحة`
  },
  {
    category: 'معالجة النصوص',
    icon: 'file-text',
    color: 'text-orange-400',
    badge: 'Text',
    borderColor: '#f97316',
    commands: `$ grep "error" logfile   # بحث عن كلمة
$ awk '{print $1}' file # استخراج العمود الأول
$ sed 's/old/new/g' file # استبدال نص
$ cut -d: -f1 /etc/passwd # استخراج أسماء المستخدمين
$ sort file | uniq       # ترتيب وإزالة التكرار
$ wc -l file             # عدد الأسطر`
  },
  {
    category: 'الأذونات والمستخدمين',
    icon: 'shield',
    color: 'text-purple-400',
    badge: 'Security',
    borderColor: '#8b5cf6',
    commands: `$ chmod 755 script.sh    # rwxr-xr-x
$ chmod u+x file        # إضافة تنفيذ للمالك
$ chown user:group file # تغيير المالك والمجموعة
$ sudo command          # تنفيذ كجذر
$ su - username         # تغيير المستخدم`
  },
  {
    category: 'العمليات',
    icon: 'activity',
    color: 'text-cyan-400',
    badge: 'Process',
    borderColor: '#06b6d4',
    commands: `$ ps aux | grep process  # البحث عن عملية
$ top                     # عرض العمليات تفاعليًا
$ kill -9 PID             # إنهاء عملية
$ jobs                    # عرض عمليات الخلفية
$ bg %1                   # إرسال للخلفية
$ fg %1                   # إحضار للمقدمة`
  },
  {
    category: 'الشبكات',
    icon: 'network',
    color: 'text-emerald-400',
    badge: 'Network',
    borderColor: '#10b981',
    commands: `$ ping google.com        # اختبار الاتصال
$ ssh user@host         # اتصال آمن
$ scp file user@host:/path # نسخ آمن
$ wget URL              # تنزيل ملف
$ netstat -tulpn        # المنافذ المفتوحة`
  },
  {
    category: 'الأرشيف والضغط',
    icon: 'archive',
    color: 'text-amber-400',
    badge: 'Archive',
    borderColor: '#f59e0b',
    commands: `$ tar -czf archive.tar.gz dir # أرشيف مضغوط
$ tar -xzf archive.tar.gz   # استخراج أرشيف
$ gzip file              # ضغط ملف
$ zip -r archive.zip dir # أرشيف zip
$ rsync -av source dest  # مزامنة ملفات`
  },
  {
    category: 'النظام',
    icon: 'server',
    color: 'text-red-400',
    badge: 'System',
    borderColor: '#ef4444',
    commands: `$ df -h                  # مساحة الأقراص
$ free -m                # استخدام الذاكرة
$ uname -a               # معلومات النظام
$ dmesg | tail -20       # آخر رسائل النواة
$ iostat                 # إحصاءات I/O`
  }
];

// ===== BUG BOUNTY MARKDOWN =====
const bugBountyMarkdown = `
# 🛡️ Bug Bounty Toolkit

## 🔍 Reconnaissance {.recon}
- **Subdomain Enumeration**
  - [Amass](https://github.com/OWASP/Amass) - In-depth attack surface mapping
  - [Subfinder](https://github.com/projectdiscovery/subfinder) - Fast subdomain discovery
  - [Assetfinder](https://github.com/tomnomnom/assetfinder) - Find related domains/assets
  - [Findomain](https://github.com/Findomain/Findomain) - Fastest cross-platform subdomain enumerator
  - [Sublist3r](https://github.com/aboul3la/Sublist3r) - Fast subdomains enumeration tool
  - [Chaos](https://chaos.projectdiscovery.io) - Regularly updated DNS data

- **DNS Enumeration**
  - [MassDNS](https://github.com/blechschmidt/massdns) - High-performance DNS stub resolver
  - [DNSDumpster](https://dnsdumpster.com) - Online DNS recon tool
  - [Puredns](https://github.com/d3mondev/puredns) - Fast domain resolver and bruteforcer
  - [AIODNS](https://github.com/stealth/aiodns) - Asynchronous DNS queries

- **Content Discovery**
  - [FFuF](https://github.com/ffuf/ffuf) - Fast web fuzzer written in Go
  - [Dirsearch](https://github.com/maurosoria/dirsearch) - Web path scanner
  - [Gobuster](https://github.com/OJ/gobuster) - Directory/file & DNS busting tool
  - [Feroxbuster](https://github.com/epi052/feroxbuster) - Fast, simple, recursive content discovery

- **Visual Recon**
  - [Aquatone](https://github.com/michenriksen/aquatone) - Visual inspection tool
  - [Eyewitness](https://github.com/FortyNorthSecurity/EyeWitness) - Website screenshot tool
  - [Gowitness](https://github.com/sensepost/gowitness) - Golang web screenshot utility

- **GitHub Recon**
  - [TruffleHog](https://github.com/trufflesecurity/trufflehog) - Find secrets in Git
  - [GitRob](https://github.com/michenriksen/gitrob) - Reconnaissance tool for GitHub
  - [GitHound](https://github.com/tillson/git-hound) - Find leaked secrets on GitHub

## ⚔️ Attacks & Vulnerabilities {.attack}
- **SQL Injection**
  - [SQLMap](https://sqlmap.org/) - Automatic SQL injection tool
  - [Ghauri](https://github.com/r0oth3x49/ghauri) - Advanced SQL injection scanner
  - [NoSQLMap](https://github.com/codingo/NoSQLMap) - Automated NoSQL injection tool

- **Cross-Site Scripting (XSS)**
  - [Dalfox](https://github.com/hahwul/dalfox) - Powerful XSS scanning tool
  - [XSStrike](https://github.com/s0md3v/XSStrike) - Advanced XSS detection suite
  - [XSSHunter](https://xsshunter.com) - XSS discovery and exploitation platform
  - [KXSS](https://github.com/Emoe/kxss) - Reflected XSS scanner

- **Server-Side Request Forgery (SSRF)**
  - [SSRFmap](https://github.com/swisskyrepo/SSRFmap) - Automatic SSRF testing
  - [Gopherus](https://github.com/tarunkant/Gopherus) - SSRF tool for Redis, MySQL, etc.
  - [Interactsh](https://github.com/projectdiscovery/interactsh) - OOB interaction server

- **XML External Entity (XXE)**
  - [XXEinjector](https://github.com/enjoiz/XXEinjector) - Automatic XXE injection tool
  - [Docem](https://github.com/whitel1st/docem) - XXE payload generator

- **Remote Code Execution (RCE)**
  - [Commix](https://github.com/commixproject/commix) - Automated command injection

- **Insecure Direct Object Reference (IDOR)**
  - [Autorize](https://github.com/PortSwigger/autorize) - Automatic authorization detection
  - [AutoRepeater](https://github.com/PortSwigger/auto-repeater) - Automated request modification

- **Server-Side Template Injection (SSTI)**
  - [Tplmap](https://github.com/epinna/tplmap) - Automatic SSTI detection and exploitation

## 📱 Mobile Security {.mobile}
- **Android Testing**
  - [MobSF](https://github.com/MobSF/Mobile-Security-Framework-MobSF) - Mobile security framework
  - [Jadx-GUI](https://github.com/skylot/jadx) - Dex to Java decompiler
  - [Frida](https://frida.re) - Dynamic instrumentation toolkit
  - [Objection](https://github.com/sensepost/objection) - Runtime mobile exploration
  - [ADB](https://developer.android.com/studio/command-line/adb) - Android Debug Bridge

- **iOS Testing**
  - [MobSF](https://github.com/MobSF/Mobile-Security-Framework-MobSF) - iOS security testing
  - [Frida](https://frida.re) - iOS dynamic instrumentation
  - [Objection](https://github.com/sensepost/objection) - iOS runtime toolkit
  - [Grapefruit](https://github.com/ChiChou/grapefruit) - iOS security assessment

## ☁️ Cloud Security {.cloud}
- **Amazon Web Services (AWS)**
  - [Pacu](https://github.com/RhinoSecurityLabs/pacu) - AWS exploitation framework
  - [ScoutSuite](https://github.com/nccgroup/ScoutSuite) - Multi-cloud security auditing
  - [CloudMapper](https://github.com/duo-labs/cloudmapper) - AWS environment visualization

- **Microsoft Azure**
  - [MicroBurst](https://github.com/NetSPI/MicroBurst) - Azure security assessment

- **Google Cloud Platform (GCP)**
  - [GCPBucketBrute](https://github.com/RhinoSecurityLabs/GCPBucketBrute) - GCP bucket enumeration

## 🛠️ Scanners & Proxies {.scanner}
- **Burp Suite Ecosystem**
  - Burp Suite Professional - Industry standard web proxy
  - [Turbo Intruder](https://portswigger.net/bappstore/9abaa233088242e8be252cd4ff534988) - High-speed attack tool
  - Burp Collaborator - Network service interaction tool

- **Other Scanners**
  - [OWASP ZAP](https://www.zaproxy.org) - Free security tool
  - [Nuclei](https://github.com/projectdiscovery/nuclei) - Fast vulnerability scanner
  - Nessus - Comprehensive vulnerability scanner
  - Acunetix - Automated web vulnerability scanner

## 📝 Reporting & Documentation
- **Note Taking**
  - [Obsidian](https://obsidian.md) - Knowledge base app
  - [Notion](https://www.notion.so) - All-in-one workspace
  - [CherryTree](https://www.giuspen.com/cherrytree) - Hierarchical note taking

- **Report Management**
  - [Dradis](https://dradisframework.com) - Reporting and collaboration
  - [DefectDojo](https://www.defectdojo.org) - Vulnerability management

## 🖥️ Operating Systems
- [Kali Linux](https://www.kali.org) - Penetration testing distribution
- [Parrot OS](https://parrotsec.org) - Security focused distribution
- [BlackArch](https://blackarch.org) - Arch Linux for penetration testers
`;

// ===== LAPTOP DATA =====
const laptopData = {
  programming: { title: "برمجة", sub: "VS Code", min: [["CPU","1.6GHz"],["RAM","4GB"]], rec: [["RAM","16GB"],["SSD","Yes"]], tips: ["SSD ضروري."] },
  photoshop: { title: "Photoshop", sub: "Adobe", min: [["GPU","1.5GB"],["RAM","8GB"]], rec: [["RAM","16GB"],["Display","IPS"]], tips: ["شاشة دقيقة الألوان."] },
  premiere: { title: "Premiere", sub: "Montage", min: [["CPU","Gen6"],["RAM","8GB"]], rec: [["RAM","32GB"],["GPU","4GB"]], tips: ["التبريد مهم."] },
  cad: { title: "AutoCAD", sub: "Engineering", min: [["CPU","2.5GHz"],["GPU","1GB"]], rec: [["RAM","16GB"],["GPU","4GB"]], tips: ["كرت الشاشة أساسي."] },
  unity: { title: "Unity", sub: "Game Dev", min: [["GPU","DX10"],["RAM","8GB"]], rec: [["RAM","16GB"],["GPU","DX12"]], tips: ["مساحة تخزين سريعة."] },
  general: { title: "استخدام عام", sub: "Office", min: [["CPU","i3"],["RAM","4GB"]], rec: [["RAM","8GB"],["SSD","256GB"]], tips: ["بطارية قوية."] }
};
