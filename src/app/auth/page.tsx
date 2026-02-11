
"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  Mail, 
  Lock, 
  Loader2, 
  Phone, 
  MapPin, 
  Calendar as CalendarIcon, 
  GraduationCap,
  ChevronDown
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const LOGO_URL = "https://res.cloudinary.com/ddznxtb6f/image/upload/v1770654493/image-removebg-preview_31_vmwvas.png";
const BACKGROUND_IMAGE_URL = "https://res.cloudinary.com/ddznxtb6f/image/upload/v1770659066/Gemini_Generated_Image_x98aebx98aebx98a_j2dypb.png";

const CITIES = ["الدمام", "الاحساء", "الخبر", "القطيف"];
const NEIGHBORHOODS = [
  "الخبر الشمالية", "الخبر الجنوبية", "العقربية", "اليرموك", "الحزام الأخضر", "الثقبة", 
  "العليا", "المدينة الرياضية", "الروابي", "الراكة الشمالية", "الراكة الجنوبية", 
  "الخزامى", "الجسر", "الجامعيين", "التعاون", "الأندلس", "الكورنيش", "الكورنيش الشمالي", 
  "الكورنيش الجنوبي", "الحمراء", "الشراع", "اللؤلؤ", "المرجان", "العزيزية", 
  "إسكان الخبر", "مدينة العمال"
];
const QUALIFICATIONS = ["ثانوي", "دبلوم", "بكالوريوس", "ماجستير", "دكتوراه", "أخرى"];

const SeedIcon = () => (
  <svg className="seed-svg" viewBox="0 0 512.004 512.004" xmlns="http://www.w3.org/2000/svg" fill="#000000">
    <g>
      <path style={{ fill: '#e5c11f' }} d="M370.114,157.811C351.523,65.174,307.456,0,256,0c-51.447,0-95.514,65.174-114.114,157.811 c41.057,46.036,72.854,122.827,92.328,199.477C251.065,406.528,256,461.356,256,512c0-50.644,4.935-105.472,21.786-154.712 C297.269,280.638,329.057,203.847,370.114,157.811"></path>
      <path style={{ fill: '#AF6D2D' }} d="M256.002,512.004c0-138.664-77.241-397.241-194.207-397.241 C-19.966,351.668,96.373,512.004,256.002,512.004"></path>
      <path style={{ fill: '#864D18' }} d="M185.347,471.952c-1.121,0-2.26-0.221-3.363-0.671c-31.603-13.065-58.033-34.278-78.539-63.047 c-41.393-58.068-52.515-141.047-31.329-233.657c1.086-4.758,5.826-7.733,10.575-6.63c4.749,1.086,7.724,5.817,6.638,10.567 c-20.047,87.623-9.931,165.57,28.495,219.471c18.556,26.033,42.408,45.197,70.894,56.973c4.511,1.863,6.656,7.027,4.793,11.529 C192.1,469.895,188.816,471.952,185.347,471.952"></path>
      <path style={{ fill: '#AF6D2D' }} d="M256.002,512.004c0-138.664,77.241-397.241,194.207-397.241 C531.97,351.668,415.631,512.004,256.002,512.004"></path>
      <path style={{ fill: '#B49377' }} d="M184.403,141.249c-0.83,0-1.66-0.124-2.498-0.362c-4.67-1.377-7.353-6.285-5.976-10.964 c11.714-39.812,28.637-71.318,47.634-88.691c3.593-3.302,9.181-3.046,12.473,0.556c3.293,3.593,3.037,9.181-0.556,12.473 c-16.419,15.007-31.947,44.403-42.611,80.649C191.739,138.751,188.216,141.249,184.403,141.249"></path>
    </g>
  </svg>
);

const PlantIcon = () => (
  <svg className="plant-svg" viewBox="0 0 512.002 512.002" xmlns="http://www.w3.org/2000/svg" fill="#000000">
    <g>
      <path style={{ fill: '#8B4513' }} d="M252.899,512.002c-4.504,0-8.313-3.471-8.643-8.036c-7.706-104.222,3.662-160.516,11.186-197.762 c8.669-42.947,12.635-62.551-18.276-109.698c-2.629-4.009-1.51-9.39,2.499-12.019c4.009-2.629,9.39-1.519,12.019,2.499 c34.816,53.118,29.826,77.815,20.766,122.654c-7.775,38.487-18.415,91.205-10.891,193.041c0.356,4.782-3.237,8.947-8.01,9.294 C253.333,511.994,253.116,512.002,252.899,512.002"></path>
      <g>
        <path style={{ fill: '#91CF96' }} d="M252.908,512.002c0-81.651-45.481-234.305-114.35-234.305 C90.422,417.187,158.917,512.002,252.908,512.002"></path>
        <path style={{ fill: '#91CF96' }} d="M252.908,512.002c0-81.651-45.481-234.305,114.35-234.305 C415.394,417.187,346.899,512.002,252.908,512.002"></path>
        <path style={{ fill: '#91CF96' }} d="M270.264,277.697c-1.927,0-3.81-0.642-5.346-1.84c-2.013-1.579-3.237-3.966-3.332-6.517 c-2.994-81.868,59.184-115.538,118.376-119.747c2.3-0.148,4.565,0.599,6.3,2.1c1.736,1.51,2.803,3.645,2.968,5.944 c0.876,12.314-16.419,98.807-117.187,119.877C271.453,277.636,270.854,277.697,270.264,277.697"></path>
        <path style={{ fill: '#91CF96' }} d="M244.332,200.401c-0.963,0-1.927-0.165-2.846-0.495c-65.38-23.535-89.183-69.068-97.644-103.12 c-10.865-43.728-0.946-85.001,7.194-93.948c2.291-2.517,5.84-3.463,9.068-2.421c18.701,6.014,115.252,67.098,92.898,192.738 c-0.061,0.347-0.148,0.694-0.252,1.033c-0.694,2.265-2.308,4.209-4.434,5.268C247.074,200.071,245.703,200.401,244.332,200.401"></path>
      </g>
      <g>
        <path style={{ fill: '#5ABA63' }} d="M270.264,277.697c-2.187,0-4.382-0.824-6.075-2.482c-3.419-3.35-3.48-8.843-0.121-12.271 l53.404-54.524c3.358-3.428,8.852-3.48,12.271-0.13c3.428,3.35,3.489,8.843,0.13,12.271l-53.413,54.532 C274.768,276.829,272.512,277.697,270.264,277.697"></path>
        <path style={{ fill: '#5ABA63' }} d="M244.467,200.311c-3.15,0-6.187-1.718-7.732-4.712l-39.224-76.436 c-2.196-4.261-0.503-9.494,3.758-11.681c4.261-2.204,9.494-0.503,11.681,3.758l39.233,76.427c2.187,4.27,0.503,9.502-3.758,11.689 C247.157,200.008,245.795,200.311,244.467,200.311"></path>
      </g>
    </g>
  </svg>
);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    city: "الدمام",
    neighborhood: "",
    age: "",
    birthDate: "",
    qualification: "",
    agreeTerms: false
  });
  const router = useRouter();
  const { toast } = useToast();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 9);
    setFormData({ ...formData, phone: value });
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!isLogin) {
        if (!formData.agreeTerms) {
          toast({
            variant: "destructive",
            title: "تنبيه",
            description: "يرجى الموافقة على الشروط والأحكام.",
          });
          setIsLoading(false);
          return;
        }
        if (formData.phone.length !== 9) {
          toast({
            variant: "destructive",
            title: "خطأ",
            description: "رقم الهاتف يجب أن يكون 9 أرقام.",
          });
          setIsLoading(false);
          return;
        }
      }

      // Simulate API delay
      setTimeout(() => {
        router.push("/home");
      }, 1500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء معالجة طلبك.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 relative overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <Image 
          src={BACKGROUND_IMAGE_URL} 
          alt="Background" 
          fill 
          className="object-cover opacity-20"
          priority
        />
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm z-10 py-6"
      >
        <div className="flex flex-col items-center mb-6">
          <motion.div className="w-24 h-24 mb-2">
            <Image src={LOGO_URL} alt="Logo" width={96} height={96} className="object-contain" />
          </motion.div>
          <h1 className="text-2xl font-black font-headline text-foreground tracking-tight">حيّان</h1>
          <p className="text-muted-foreground font-bold text-xs mt-1">بطل البيئة يبدأ من هنا 🌿</p>
        </div>

        <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white/95 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <div className="flex bg-[#F0F7EF] p-1 rounded-2xl mb-6">
              <button 
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${isLogin ? "bg-white shadow-sm text-primary" : "text-muted-foreground"}`}
              >
                دخول
              </button>
              <button 
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${!isLogin ? "bg-white shadow-sm text-primary" : "text-muted-foreground"}`}
              >
                حساب جديد
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-5" dir="rtl">
              <AnimatePresence mode="wait">
                {!isLogin ? (
                  <motion.div 
                    key="signup-fields"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1.5">
                      <Label className="font-black mr-1 text-sm text-right block w-full">الاسم الكامل</Label>
                      <div className="relative">
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          className="rounded-2xl h-12 pr-11 border-primary/10 bg-[#F8F9FA] text-sm font-bold text-right" 
                          placeholder="كيف نناديك؟" 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="font-black mr-1 text-sm text-right block w-full">رقم الهاتف</Label>
                      <div className="relative flex items-center">
                        <div className="absolute right-3 flex items-center gap-2 pointer-events-none border-l pl-2 border-primary/10 h-6">
                          <span className="text-sm">🇸🇦</span>
                          <span className="text-xs font-black text-muted-foreground">966+</span>
                        </div>
                        <Input 
                          type="tel"
                          className="rounded-2xl h-12 pr-24 border-primary/10 bg-[#F8F9FA] text-sm font-bold text-right" 
                          placeholder="5XXXXXXXX"
                          required 
                          value={formData.phone}
                          onChange={handlePhoneChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="font-black mr-1 text-sm text-right block w-full">العمر</Label>
                        <Input 
                          type="number"
                          className="rounded-2xl h-12 border-primary/10 bg-[#F8F9FA] text-sm font-bold text-right" 
                          placeholder="00"
                          required 
                          value={formData.age}
                          onChange={(e) => setFormData({...formData, age: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="font-black mr-1 text-sm text-right block w-full">تاريخ الميلاد</Label>
                        <div className="relative">
                          <Input 
                            type="date"
                            className="rounded-2xl h-12 border-primary/10 bg-[#F8F9FA] text-sm font-bold text-right pr-3" 
                            required 
                            value={formData.birthDate}
                            onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="font-black mr-1 text-sm text-right block w-full">المدينة</Label>
                      <Select value={formData.city} onValueChange={(v) => setFormData({...formData, city: v})}>
                        <SelectTrigger className="rounded-2xl h-12 border-primary/10 bg-[#F8F9FA] text-sm font-bold text-right">
                          <SelectValue placeholder="الدمام" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          {CITIES.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="font-black mr-1 text-sm text-right block w-full">الحي</Label>
                      <Select value={formData.neighborhood} onValueChange={(v) => setFormData({...formData, neighborhood: v})}>
                        <SelectTrigger className="rounded-2xl h-12 border-primary/10 bg-[#F8F9FA] text-sm font-bold text-right">
                          <SelectValue placeholder="اختر الحي" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl max-h-[300px]">
                          {NEIGHBORHOODS.map(hood => <SelectItem key={hood} value={hood}>{hood}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="font-black mr-1 text-sm text-right block w-full">المؤهل التعليمي</Label>
                      <Select value={formData.qualification} onValueChange={(v) => setFormData({...formData, qualification: v})}>
                        <SelectTrigger className="rounded-2xl h-12 border-primary/10 bg-[#F8F9FA] text-sm font-bold text-right">
                          <SelectValue placeholder="المؤهل" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          {QUALIFICATIONS.map(q => <SelectItem key={q} value={q}>{q}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="space-y-1.5">
                <Label className="font-black mr-1 text-sm text-right block w-full">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    className="rounded-2xl h-12 pr-11 border-primary/10 bg-[#F8F9FA] text-sm font-bold text-right" 
                    placeholder="name@example.com" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="font-black mr-1 text-sm text-right block w-full">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    className="rounded-2xl h-12 pr-11 border-primary/10 bg-[#F8F9FA] text-sm font-bold text-right" 
                    placeholder="••••••••" 
                    required 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between px-2 py-2">
                  <span className="text-sm font-black text-foreground">تذكرني دائماً</span>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider-plant">
                      <SeedIcon />
                      <PlantIcon />
                    </span>
                  </label>
                </div>
              )}

              {!isLogin && (
                <div className="flex items-center gap-2 px-1">
                  <Checkbox 
                    id="terms" 
                    checked={formData.agreeTerms}
                    onCheckedChange={(v) => setFormData({...formData, agreeTerms: v as boolean})}
                    className="rounded-md border-primary/30 data-[state=checked]:bg-primary"
                  />
                  <label htmlFor="terms" className="text-[10px] font-black text-muted-foreground cursor-pointer">
                    أوافق على <span className="text-primary underline">الشروط والأحكام</span> وسياسة الخصوصية
                  </label>
                </div>
              )}

              <motion.div whileTap={{ scale: 0.95 }}>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="button_01 w-full mt-2"
                >
                  <span className="flex items-center gap-3">
                    {isLoading ? "جاري ..." : (isLogin ? "تسجيل الدخول" : "إنشاء الحساب")}
                  </span>
                  <TreeSVG />
                  <WaveSVG />
                </button>
              </motion.div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm font-black">
          {isLogin ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"} 
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary mr-1 underline underline-offset-4"
          >
            اضغط هنا
          </button>
        </p>
      </motion.div>
    </div>
  );
}
