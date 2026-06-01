// =============================================
// CYBERSECURITY EDUCATIONAL PLATFORM - DATA
// Comprehensive Learning Resources
// =============================================

// ===== LEARNING PATHS =====
const learningPaths = [
  {
    id: 'beginner',
    title: 'المسار المبتدئ',
    description: 'ابدأ رحلتك في الأمن السيبراني من الصفر. هذا المسار يبني أساسًا قويًا في المفاهيم الأساسية.',
    icon: '🎯',
    color: '#22c55e',
    level: 'مبتدئ',
    duration: '3-6 أشهر',
    skills: [
      { name: 'أساسيات الحاسوب', progress: 0 },
      { name: 'أساسيات الشبكات', progress: 0 },
      { name: 'نظام Linux', progress: 0 },
      { name: 'برمجة Python', progress: 0 }
    ],
    topics: [
      {
        title: 'أساسيات الحاسوب',
        icon: '💻',
        items: ['نظام التشغيل', 'الملفات والمجلدات', 'سطر الأوامر', 'الشبكات الأساسية']
      },
      {
        title: 'أساسيات الشبكات',
        icon: '🌐',
        items: ['TCP/IP', 'DNS', 'DHCP', 'Subnetting', 'VLANs']
      },
      {
        title: 'Linux Fundamentals',
        icon: '🐧',
        items: ['الأوامر الأساسية', 'الصلاحيات', 'Bash Scripting', 'Systemd']
      },
      {
        title: 'البرمجة',
        icon: '🐍',
        items: ['Python Basics', 'JavaScript', 'HTML/CSS', 'SQL']
      }
    ]
  },
  {
    id: 'intermediate',
    title: 'المسار المتوسط',
    description: 'تعمّق في اختبار الاختراق وأساسيات Bug Bounty مع التركيز على التطبيق العملي.',
    icon: '⚔️',
    color: '#3b82f6',
    level: 'متوسط',
    duration: '6-12 شهر',
    skills: [
      { name: 'اختبار الاختراق', progress: 0 },
      { name: 'أمن الويب', progress: 0 },
      { name: 'Bug Bounty', progress: 0 },
      { name: 'CTF Basics', progress: 0 }
    ],
    topics: [
      {
        title: 'اختبار الاختراق',
        icon: '🔍',
        items: ['الماسحات', 'الاستطلاع', 'الاستغلال', 'ما بعد الاستغلال']
      },
      {
        title: 'أمن تطبيقات الويب',
        icon: '🌍',
        items: ['OWASP Top 10', 'SQL Injection', 'XSS', 'CSRF', 'SSRF']
      },
      {
        title: 'Bug Bounty',
        icon: '💰',
        items: ['Recon', 'Subdomain Enum', 'Content Discovery', 'Reporting']
      },
      {
        title: 'CTF Fundamentals',
        icon: '🏴',
        items: ['Web Exploitation', 'Cryptography', 'Forensics', 'Reverse Engineering']
      }
    ]
  },
  {
    id: 'advanced',
    title: 'المسار المتقدم',
    description: 'وصل للمستوى الاحترافي مع تخصص في Red Team وتحليلات متقدمة.',
    icon: '🎓',
    color: '#a855f7',
    level: 'متقدم',
    duration: '12+ شهر',
    skills: [
      { name: 'Red Team Operations', progress: 0 },
      { name: 'Malware Analysis', progress: 0 },
      { name: 'Network Defense', progress: 0 },
      { name: 'Cloud Security', progress: 0 }
    ],
    topics: [
      {
        title: 'Red Team Operations',
        icon: '☠️',
        items: ['C2 Frameworks', 'Lateral Movement', 'Privilege Escalation', 'Persistence']
      },
      {
        title: 'تحليل Malware',
        icon: '🔬',
        items: ['Static Analysis', 'Dynamic Analysis', 'Reverse Engineering', 'YARA']
      },
      {
        title: 'أمن الشبكات',
        icon: '🛡️',
        items: ['SIEM', 'IDS/IPS', 'Firewall', 'Network Monitoring']
      },
      {
        title: 'Cloud Security',
        icon: '☁️',
        items: ['AWS Security', 'Azure Security', 'Kubernetes', 'Container Security']
      }
    ]
  }
];

// ===== TOOLS LIBRARY =====
const toolCategories = [
  { id: 'all', name: 'الكل', icon: '📦' },
  { id: 'recon', name: 'الاستطلاع', icon: '🔍', color: '#22c55e' },
  { id: 'scanning', name: 'الماسحات', icon: '📡', color: '#3b82f6' },
  { id: 'exploitation', name: 'الاستغلال', icon: '💥', color: '#ef4444' },
  { id: 'web', name: 'أمن الويب', icon: '🌐', color: '#f59e0b' },
  { id: 'forensics', name: 'الطب الشرعي', icon: '🔎', color: '#8b5cf6' },
  { id: 'osint', name: 'OSINT', icon: '🕵️', color: '#06b6d4' }
];

const tools = [
  // Reconnaissance
  {
    id: 1,
    name: 'Nmap',
    nameAr: 'إن ماب',
    category: 'recon',
    description: 'أداة اكتشاف الشبكات والمسح الأولي - الأساس في أي عملية اختبار اختراق',
    icon: '🌐',
    version: '7.95',
    official: true,
    free: true,
    color: '#22c55e',
    url: 'https://nmap.org/download.html',
    commands: 'nmap -sV -sC target.com\nnmap -p- -A target.com\nnmap --script vuln target.com'
  },
  {
    id: 2,
    name: 'Amass',
    nameAr: 'أموس',
    category: 'recon',
    description: 'اكتشاف شامل للنطاقات الفرعية وسطح الهجوم',
    icon: '🔍',
    version: '3.23',
    official: true,
    free: true,
    color: '#22c55e',
    url: 'https://github.com/OWASP/Amass',
    commands: 'amass enum -d target.com\namass intel -whois -d target.com'
  },
  {
    id: 3,
    name: 'Subfinder',
    nameAr: 'سوبفايندر',
    category: 'recon',
    description: 'Discover سريع للنطاقات الفرعية من مصادر متعددة',
    icon: '🔎',
    version: '2.6',
    official: true,
    free: true,
    color: '#22c55e',
    url: 'https://github.com/projectdiscovery/subfinder',
    commands: 'subfinder -d target.com\nsubfinder -d target.com -o subs.txt'
  },
  {
    id: 4,
    name: 'FFuF',
    nameAr: 'إففاف',
    category: 'scanning',
    description: 'أداة fuzzing سريعة للويب لاكتشاف المجلدات والمعلمات المخفية',
    icon: '💨',
    version: '2.1',
    official: true,
    free: true,
    color: '#3b82f6',
    url: 'https://github.com/ffuf/ffuf',
    commands: 'ffuf -w wordlist.txt -u URL/FUZZ\nffuf -w params.txt -u URL -X POST -d "FUZZ=value"'
  },
  {
    id: 5,
    name: 'Gobuster',
    nameAr: 'غوبستر',
    category: 'scanning',
    description: 'فحص المجلدات والنطاقات الفرعية بسرعة',
    icon: '📂',
    version: '3.6',
    official: true,
    free: true,
    color: '#3b82f6',
    url: 'https://github.com/OJ/gobuster',
    commands: 'gobuster dir -u URL -w wordlist.txt\ngobuster vhost -u target.com -w wordlist.txt'
  },
  // Exploitation
  {
    id: 6,
    name: 'SQLMap',
    nameAr: 'سكيول ماب',
    category: 'exploitation',
    description: 'أداة آلية لحقن SQL واختراق قواعد البيانات',
    icon: '💉',
    version: '1.8',
    official: true,
    free: true,
    color: '#ef4444',
    url: 'https://sqlmap.org/',
    commands: 'sqlmap -u "URL?id=1" --dbs\nsqlmap -u "URL?id=1" -D db --tables'
  },
  {
    id: 7,
    name: 'Metasploit',
    nameAr: 'ميتاسبلويت',
    category: 'exploitation',
    description: 'أشهر إطار عمل للاستغلال مع مئات الـ Exploits',
    icon: '💥',
    version: '6.4',
    official: true,
    free: true,
    color: '#ef4444',
    url: 'https://www.metasploit.com/',
    commands: 'msfconsole\nuse exploit/windows/smb\nset RHOSTS target.com'
  },
  {
    id: 8,
    name: 'Burp Suite',
    nameAr: 'برب سويت',
    category: 'web',
    description: 'المعيار الصناعي لفحص تطبيقات الويب كـ Proxy',
    icon: '🌍',
    version: '2024',
    official: true,
    free: true,
    color: '#f59e0b',
    url: 'https://portswigger.net/burp',
    commands: 'المستخدم: Proxy -> Intercept\nالمسح: Target -> Scope -> Spider'
  },
  {
    id: 9,
    name: 'OWASP ZAP',
    nameAr: 'زد إيه بي',
    category: 'web',
    description: 'ماسح ثغرات ويب مجاني ومفتوح المصدر',
    icon: '🕷️',
    version: '2.14',
    official: true,
    free: true,
    color: '#f59e0b',
    url: 'https://www.zaproxy.org/download/',
    commands: 'zap-cli quick-scan URL\nzap-cli spider URL'
  },
  {
    id: 10,
    name: 'Wireshark',
    nameAr: 'وايرشارك',
    category: 'recon',
    description: 'محلل بروتوكولات الشبكة لتحليل الـ Packets',
    icon: '📊',
    version: '4.4',
    official: true,
    free: true,
    color: '#3b82f6',
    url: 'https://www.wireshark.org/download.html',
    commands: 'wireshark -i eth0\ntcpdump -i eth0 port 80'
  },
  // Forensics
  {
    id: 11,
    name: 'Volatility',
    nameAr: 'فولatlity',
    category: 'forensics',
    description: 'تحليل ذاكرة الـ RAM لاستخراج معلومات من الـ Dumps',
    icon: '🧠',
    version: '3.2',
    official: true,
    free: true,
    color: '#8b5cf6',
    url: 'https://www.volatilityfoundation.org/',
    commands: 'volatility -f mem.dmp windows.pslist\nvolatility -f mem.dmp windows.netscan'
  },
  {
    id: 12,
    name: 'Autopsy',
    nameAr: 'أوتوبسي',
    category: 'forensics',
    description: 'أداة تحليل forensic للقرص الصلب والملفات',
    icon: '🔎',
    version: '4.21',
    official: true,
    free: true,
    color: '#8b5cf6',
    url: 'https://www.autopsy.com/download/',
    commands: 'autopsy\n(واجهة رسومية)'
  },
  // OSINT
  {
    id: 13,
    name: 'theHarvester',
    nameAr: 'ذا هارفيستر',
    category: 'osint',
    description: 'جمع معلومات من مصادر عامة (Emails, Subdomains, IPs)',
    icon: '🕵️',
    version: '9.0',
    official: true,
    free: true,
    color: '#06b6d4',
    url: 'https://github.com/laramies/theHarvester',
    commands: 'theHarvester -d target.com -b google\ntheHarvester -d target.com -b linkedin'
  },
  {
    id: 14,
    name: 'Shodan',
    nameAr: 'شودان',
    category: 'osint',
    description: 'محرك بحث للأجهزة المتصلة بالإنترنت',
    icon: '🔍',
    version: 'Web',
    official: true,
    free: true,
    color: '#06b6d4',
    url: 'https://www.shodan.io/',
    commands: 'shodan search apache\nshodan host 8.8.8.8'
  },
  {
    id: 15,
    name: 'Maltego',
    nameAr: 'مالتيغو',
    category: 'osint',
    description: 'تحليل الروابط والعلاقات بين الكيانات',
    icon: '🕸️',
    version: '4.6',
    official: true,
    free: true,
    color: '#06b6d4',
    url: 'https://www.maltego.com/',
    commands: '(واجهة رسومية)\nTransform: Domain to DNS'
  }
];

// ===== CTF CHALLENGES =====
const ctfPlatforms = [
  {
    id: 1,
    name: 'TryHackMe',
    nameAr: 'ترای هاک می',
    description: 'منصة تعليمية تفاعلية مع مسارات منظمة适合 المبتدئين',
    icon: '🏠',
    difficulty: 'easy',
    color: '#22c55e',
    url: 'https://tryhackme.com/',
    challenges: '150+ غرفة',
    type: 'تعلم تفاعلي'
  },
  {
    id: 2,
    name: 'HackTheBox',
    nameAr: 'هاك ذا بوكس',
    description: 'منصة متقدمة للاختبار العملي مع آلات حقيقية',
    icon: '📦',
    difficulty: 'medium',
    color: '#3b82f6',
    url: 'https://app.hackthebox.com/',
    challenges: '300+ آلة',
    type: 'آلات واقعية'
  },
  {
    id: 3,
    name: 'PortSwigger Lab',
    nameAr: 'بورت سويجر',
    description: 'تمارين عملية من مبتكري Burp Suite',
    icon: '🌍',
    difficulty: 'medium',
    color: '#f59e0b',
    url: 'https://portswigger.net/websecurity/d moulabs',
    challenges: '70+ تمرين',
    type: 'أمن الويب'
  },
  {
    id: 4,
    name: 'DVWA',
    nameAr: 'دي في دبليو أي',
    description: 'تطبيق ويب vulnerable للتمرين على الثغرات',
    icon: '💣',
    difficulty: 'easy',
    color: '#22c55e',
    url: 'https://dvwa.co.uk/',
    challenges: '10 ثغرات',
    type: 'تطبيق محلي'
  },
  {
    id: 5,
    name: 'PicoCTF',
    nameAr: 'بيكو سي تي اف',
    description: 'مسابقات CTF سنوية مناسبة للمبتدئين',
    icon: '🏴',
    difficulty: 'easy',
    color: '#22c55e',
    url: 'https://picoctf.org/',
    challenges: 'موسم سنوي',
    type: 'مسابقات'
  },
  {
    id: 6,
    name: 'VulnHub',
    nameAr: 'فولن هب',
    description: 'آلات VM قابلة للتحميل للتمرين محليًا',
    icon: '🖥️',
    difficulty: 'medium',
    color: '#3b82f6',
    url: 'https://www.vulnhub.com/',
    challenges: '300+ آلة',
    type: 'آلات VM'
  }
];

// ===== YOUTUBE RESOURCES =====
const youtubeChannels = [
  { name: 'NetworkChuck', arabic: 'شانل ممتاز للشبكات', topic: 'شبكات +Security', url: 'https://www.youtube.com/@NetworkChuck' },
  { name: 'John Hammond', arabic: 'شرح تقني ممتاز', topic: 'CTF + Malware', url: 'https://www.youtube.com/@JohnHammond010' },
  { name: 'LiveOverflow', arabic: 'تحليل ثغرات حقيقي', topic: 'Pwn + CTF', url: 'https://www.youtube.com/@LiveOverflow' },
  { name: 'Arabic - أحمد الحربي', arabic: 'شرح عربي مميز', topic: 'اختبار الاختراق', url: 'https://www.youtube.com/@ahmedalharbi' },
  { name: 'Arabic - محمد عساف', arabic: 'مدخل للأمن السيبراني', topic: 'أساسيات', url: 'https://www.youtube.com/@MohammedAssaf' },
  { name: 'Arabic - عبادة.cm', arabic: 'CTF وكثير منهجية', topic: 'CTF + Bug Bounty', url: 'https://www.youtube.com/@obada_cm' }
];

// ===== COURSES =====
const courses = [
  { title: 'CompTIA Security+', provider: 'CompTIA', free: false, level: 'متوسط', url: 'https://www.comptia.org/certifications/security', arabic: 'شهادة معترف بها عالمياً' },
  { title: 'CEH', provider: 'EC-Council', free: false, level: 'متوسط', url: 'https://www.eccouncil.org/programs/certified-ethical-hacker/', arabic: 'خيار شائع في السوق' },
  { title: 'eJPT', provider: 'eLearnSecurity', free: false, level: 'مبتدئ', url: 'https://elearnsecurity.com/product/ejpt-certification/', arabic: 'عملي ومتركز' },
  { title: 'TryHackMe Paths', provider: 'TryHackMe', free: true, level: 'مبتدئ-متوسط', url: 'https://tryhackme.com/path', arabic: 'أفضل خيار للمبتدئين' },
  { title: 'PortSwigger Academy', provider: 'PortSwigger', free: true, level: 'متوسط-متقدم', url: 'https://portswigger.net/web-security', arabic: 'الأفضل لأمن الويب' }
];

// ===== BOOKS =====
const books = [
  { title: 'The Web Application Hacker\'s Handbook', author: 'Dafydd Stuttard', level: 'متوسط', url: 'https://www.amazon.com/dp/1118026470', arabic: 'الكتاب الأساسي لأمن الويب' },
  { title: 'Hacking: The Art of Exploitation', author: 'Jon Erickson', level: 'متوسط', url: 'https://www.amazon.com/dp/1593271441', arabic: 'مقدمة ممتازة للثغرات' },
  { title: 'The Hacker Playbook 3', author: 'Peter Kim', level: 'متوسط', url: 'https://www.amazon.com/dp/1980901759', arabic: 'دليل عملي لاختبار الاختراق' },
  { title: 'Mastering Modern Web Penetration Testing', author: 'Gilberto Najera-Gutierrez', level: 'متقدم', url: 'https://www.amazon.com/dp/1785284583', arabic: 'تقنيات متقدمة للاختبار' },
  { title: 'Blue Team Handbook', author: 'Don Murdoch', level: 'مبتدئ', url: 'https://www.amazon.com/dp/1501079796', arabic: 'أساسيات الدفاع والـ SOC' }
];

// ===== LINUX COMMANDS =====
const linuxCommands = [
  {
    id: 1,
    category: 'التنقل والملفات',
    icon: '📁',
    color: '#22c55e',
    badge: 'أساسي',
    commands: '$ ls -la              # عرض كل الملفات\n$ cd ~/Documents       # الانتقال لمجلد\n$ pwd                  # عرض المسار الحالي\n$ find . -name "*.txt" # بحث عن ملف\n$ locate filename      # بحث سريع'
  },
  {
    id: 2,
    category: 'معالجة الملفات',
    icon: '✂️',
    color: '#3b82f6',
    badge: 'أساسي',
    commands: '$ cp -r src/ dest/    # نسخ مجلد\n$ mv old.txt new.txt  # نقل/إعادة تسمية\n$ rm -rf folder/       # حذف مجلد\n$ mkdir -p a/b/c       # إنشاء مسار متداخل'
  },
  {
    id: 3,
    category: 'عرض المحتوى',
    icon: '👁️',
    color: '#a855f7',
    badge: 'عرض',
    commands: '$ cat file.txt        # عرض الملف\n$ head -20 file.txt   # أول 20 سطر\n$ tail -f log.txt      # متابعة حيّة\n$ less largefile.txt    # عرض صفحة بصفحة'
  },
  {
    id: 4,
    category: 'البحث والاستخراج',
    icon: '🔍',
    color: '#f59e0b',
    badge: 'مهم',
    commands: '$ grep "error" file   # بحث عن نص\n$ awk -F: \'{print $1}\' file # استخراج العمود\n$ sed \'s/old/new/g\' file   # استبدال\n$ cut -d: -f1 file       # استخراج حقل'
  },
  {
    id: 5,
    category: 'الأذونات',
    icon: '🔐',
    color: '#ef4444',
    badge: 'أمان',
    commands: '$ chmod 755 script.sh  # rwxr-xr-x\n$ chmod u+x file       # إضافة تنفيذ\n$ chown user:group file # تغيير المالك\n$ sudo command          # تنفيذ كجذر'
  },
  {
    id: 6,
    category: 'الشبكات',
    icon: '🌐',
    color: '#06b6d4',
    badge: 'شبكات',
    commands: '$ ping google.com      # اختبار الاتصال\n$ ssh user@host        # اتصال آمن\n$ netstat -tulpn       # المنافذ\n$ ss -tuln             # بديل أسرع'
  },
  {
    id: 7,
    category: 'العمليات',
    icon: '⚙️',
    color: '#ec4899',
    badge: 'نظام',
    commands: '$ ps aux | grep proc  # البحث عن عملية\n$ top                   # عرض تفاعلي\n$ kill -9 PID          # إنهاء عملية\n$ systemctl status srv # حالة خدمة'
  },
  {
    id: 8,
    category: 'الضغط والأرشيف',
    icon: '📦',
    color: '#8b5cf6',
    badge: 'أرشيف',
    commands: '$ tar -czf out.tar.gz dir/  # ضغط\n$ tar -xzf out.tar.gz       # فك ضغط\n$ zip -r out.zip dir/       # أرشيف zip\n$ unzip out.zip             # فك zip'
  },
  {
    id: 9,
    category: 'النظام',
    icon: '💻',
    color: '#14b8a6',
    badge: 'نظام',
    commands: '$ df -h               # مساحة القرص\n$ free -m               # الذاكرة\n$ uname -a              # معلومات النظام\n$ whoami                # المستخدم الحالي'
  }
];

// ===== QUICK TIPS =====
const tips = [
  { icon: '💡', text: 'تدرب على منصة TryHackMe قبل الانتقال لـ HackTheBox' },
  { icon: '⚠️', text: 'لا تجرب أدواتك على أهداف حقيقية بدون إذن كتابي' },
  { icon: '📚', text: 'اقرأ تقارير Bug Bounty المنشورة لفهم الأنماط الشائعة' },
  { icon: '🔄', text: 'مارس يوميًا حتى لو 30 دقيقة على TryHackMe' },
  { icon: '🤝', text: 'انضم لمجتمع CTF العربي للتعلم من الآخرين' },
  { icon: '📝', text: 'وثق كل ما تتعلمه - الكتابة تثبت الفهم' }
];

// ===== PLATFORMS STATS =====
const platformStats = {
  tools: tools.length,
  paths: learningPaths.length,
  challenges: ctfPlatforms.reduce((sum, p) => sum + parseInt(p.challenges.match(/\d+/)?.[0] || 0), 0)
};
