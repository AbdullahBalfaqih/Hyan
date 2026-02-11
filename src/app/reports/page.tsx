
"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Send, AlertTriangle, CheckCircle2, Loader2, XCircle, CloudUpload, FileText } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { MOCK_RESOLVED_REPORTS } from '@/lib/mock-data';

const KHOBAR_NEIGHBORHOODS = [
  "الخبر الشمالية", "البندرية", "الحمراء", "الكورنيش", "العقربية", "الثقبة", "الروابي", "الأحياء الوسطى",
  "الخبر الجنوبية", "الصدفة", "الراكة الجنوبية", "العليا", "الخزامى", "اليرموك", "الأحياء الشرقية",
  "الكورنيش الجنوبي", "مدينة العمال", "الأحياء الغربية", "مدينة الملك فهد السكنية", "مدينة سلطان",
  "الهدا", "الجسر", "الأحياء الحديثة", "الحزام الذهبي"
];

export default function ReportsPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [images, setImages] = useState<{ before: string | null; after: string | null }>({ before: null, after: null });
  const { toast } = useToast();

  const handleFileUpload = (type: 'before' | 'after', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => ({ ...prev, [type]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast({
        title: "تم استلام البلاغ",
        description: "شكراً لمساهمتك في تحسين جودة الحي. سيتم المراجعة والمعالجة قريباً.",
      });
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[70vh] text-right" dir="rtl">
        <Card className="max-w-md w-full text-center p-10 space-y-8 rounded-[3.5rem] shadow-2xl border-none bg-white">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-foreground">شكراً لمساهمتك!</h2>
            <p className="text-muted-foreground font-black text-lg">تم تسجيل بلاغك بنجاح برقم #12543. يمكنك متابعة حالة البلاغ من ملفك الشخصي.</p>
          </div>
          <div className="space-y-4 pt-4">
            <Button className="w-full rounded-[1.5rem] h-16 text-xl font-black bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 border-none" onClick={() => setSubmitted(false)}>تقديم بلاغ آخر</Button>
            <Button variant="ghost" className="w-full rounded-2xl h-12 font-black text-muted-foreground">العودة للرئيسية</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-10 pb-32 md:pb-8 text-right" dir="rtl">
      <div className="space-y-2">
        <h1 className="text-3xl font-black font-headline text-foreground">الإبلاغ البيئي</h1>
        <p className="text-muted-foreground font-black">ساهم في رصد التشوهات البصرية لتحسين جودة الحياة في حيك.</p>
      </div>

      <Separator className="bg-primary/10 h-[1.5px]" />

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="rounded-[3.5rem] border-none shadow-2xl shadow-black/5 bg-white overflow-hidden">
            <CardHeader className="p-10 pb-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <FileText className="h-7 w-7" />
                </div>
                <div>
                  <CardTitle className="font-black text-3xl text-foreground">تفاصيل البلاغ</CardTitle>
                  <CardDescription className="font-black text-base text-muted-foreground mt-1">يرجى تزويدنا بمعلومات دقيقة عن المشكلة التي رصدتها.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 pt-4">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <Label className="font-black text-foreground text-lg mr-1">نوع المشكلة</Label>
                    <Select required>
                      <SelectTrigger className="rounded-[1.5rem] h-16 bg-secondary/40 border-primary/5 hover:bg-secondary/60 transition-colors text-right font-black px-6 text-lg">
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-none shadow-2xl font-black">
                        <SelectItem value="waste">تراكم نفايات</SelectItem>
                        <SelectItem value="signs">لوحات تالفة</SelectItem>
                        <SelectItem value="construction">مخلفات بناء</SelectItem>
                        <SelectItem value="noise">ضوضاء مستمرة</SelectItem>
                        <SelectItem value="visual">تشوه بصري آخر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="font-black text-foreground text-lg mr-1">الموقع (حي الخبر)</Label>
                    <Select required>
                      <SelectTrigger className="rounded-[1.5rem] h-16 bg-secondary/40 border-primary/5 hover:bg-secondary/60 transition-colors text-right font-black px-6 text-lg">
                        <SelectValue placeholder="اختر الحي" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-none shadow-2xl font-black max-h-[300px]">
                        {KHOBAR_NEIGHBORHOODS.map((hood) => (
                          <SelectItem key={hood} value={hood}>{hood}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="font-black text-foreground text-lg mr-1">وصف المشكلة</Label>
                    <Textarea 
                      placeholder="تقاطع شارعي 5 و 4، المشكلة تكمن في..." 
                      className="min-h-[180px] rounded-[2rem] bg-secondary/40 border-primary/5 focus:bg-white transition-all resize-none text-right font-black p-6 text-lg" 
                      required 
                    />
                  </div>
                </div>

                <Separator className="bg-primary/10 h-[1.5px]" />

                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                      <CloudUpload className="h-6 w-6" />
                    </div>
                    <Label className="font-black text-foreground text-xl">توثيق الصورة</Label>
                  </div>
                  
                  <div className="grid gap-8 sm:grid-cols-2">
                    {/* Before Photo */}
                    <div className="space-y-4">
                      <p className="text-sm font-black text-center text-muted-foreground bg-secondary/50 py-3 rounded-2xl">صورة البلاغ (مطلوب)</p>
                      {images.before ? (
                        <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden border-4 border-primary/10 shadow-lg group">
                          <img src={images.before} alt="Before" className="object-cover w-full h-full" />
                          <Button 
                            variant="destructive" size="icon" className="absolute top-4 right-4 rounded-full h-12 w-12 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => setImages(prev => ({ ...prev, before: null }))}
                          >
                            <XCircle className="h-6 w-6" />
                          </Button>
                        </div>
                      ) : (
                        <div className="file-upload-form w-full">
                          <label htmlFor="file-before" className="file-upload-label w-full border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all rounded-[2.5rem] p-12 flex flex-col items-center justify-center cursor-pointer">
                            <div className="flex flex-col items-center gap-4">
                               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                                  <svg viewBox="0 0 640 512" className="h-10 w-10 fill-primary/40">
                                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                                  </svg>
                               </div>
                               <div className="text-center">
                                 <p className="font-black text-foreground">اسحب الصورة أو أفلتها</p>
                                 <p className="text-xs font-bold text-muted-foreground mt-1">أو</p>
                                 <span className="browse-button inline-block mt-3 bg-primary/20 text-primary px-6 py-2 rounded-xl font-black">تصفح الصور</span>
                               </div>
                            </div>
                            <input id="file-before" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload('before', e)} />
                          </label>
                        </div>
                      )}
                    </div>

                    {/* After Photo (Optional) */}
                    <div className="space-y-4">
                      <p className="text-sm font-black text-center text-muted-foreground bg-secondary/50 py-3 rounded-2xl">صورة إضافية (اختياري)</p>
                      {images.after ? (
                        <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden border-4 border-primary/10 shadow-lg group">
                          <img src={images.after} alt="After" className="object-cover w-full h-full" />
                          <Button 
                            variant="destructive" size="icon" className="absolute top-4 right-4 rounded-full h-12 w-12 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => setImages(prev => ({ ...prev, after: null }))}
                          >
                            <XCircle className="h-6 w-6" />
                          </Button>
                        </div>
                      ) : (
                        <div className="file-upload-form w-full">
                          <label htmlFor="file-after" className="file-upload-label w-full border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all rounded-[2.5rem] p-12 flex flex-col items-center justify-center cursor-pointer">
                            <div className="flex flex-col items-center gap-4">
                               <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                                  <svg viewBox="0 0 640 512" className="h-10 w-10 fill-primary/40">
                                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                                  </svg>
                               </div>
                               <div className="text-center">
                                 <p className="font-black text-foreground">اسحب الصورة أو أفلتها</p>
                                 <p className="text-xs font-bold text-muted-foreground mt-1">أو</p>
                                 <span className="browse-button inline-block mt-3 bg-primary/20 text-primary px-6 py-2 rounded-xl font-black">تصفح الصور</span>
                               </div>
                            </div>
                            <input id="file-after" type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload('after', e)} />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Separator className="bg-primary/10 h-[1.5px]" />

                <Button type="submit" className="w-full rounded-[2rem] h-20 text-2xl font-black shadow-2xl bg-primary text-white hover:bg-primary/90 border-none transition-all active:scale-[0.98] mt-4" disabled={submitting}>
                  {submitting ? (
                    <><Loader2 className="ml-4 h-8 w-8 animate-spin" /> جاري الإرسال...</>
                  ) : (
                    <><Send className="ml-4 h-8 w-8 rotate-180" /> إرسال البلاغ الآن</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-10">
          <Card className="bg-primary/5 border-primary/20 rounded-[3.5rem] border-none shadow-sm p-2">
            <CardHeader className="p-10 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-[1.25rem] flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <AlertTriangle className="h-7 w-7" />
                </div>
                <CardTitle className="text-2xl font-black text-foreground">لماذا نبلغ؟</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 pt-4 text-base space-y-6 text-muted-foreground leading-relaxed font-black">
              <p>تساعد بلاغاتك الجهات الرسمية في تحديد أولويات المعالجة وتحسين المراقبة البيئية في أحياء الخبر العزيزة.</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  الحفاظ على جمالية حيك السكني
                </li>
                <li className="flex items-center gap-3 text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  منع انتشار الأمراض والروائح
                </li>
                <li className="flex items-center gap-3 text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  كسب نقاط إضافية وترقية مستواك
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-[3.5rem] border-none shadow-2xl shadow-black/5 bg-white">
            <CardHeader className="p-10 pb-4">
              <CardTitle className="text-2xl font-black text-foreground flex items-center gap-3">
                <div className="w-2 h-8 bg-accent rounded-full" />
                بلاغات تم حلها
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 pt-4 space-y-8">
              {MOCK_RESOLVED_REPORTS.map((item, i) => (
                <div key={i} className="flex flex-col gap-3 border-r-4 border-green-500 pr-6 py-2 bg-secondary/20 rounded-l-[1.5rem]">
                  <p className="font-black text-lg text-foreground">{item.title}</p>
                  <p className="text-sm font-bold text-muted-foreground">{item.hood}</p>
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-green-600 px-3 py-1 bg-green-100 rounded-lg">✓ {item.status}</span>
                    <span className="text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
