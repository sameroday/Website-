import { useState } from "react";
import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";
import { StarRating } from "../components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertRatingSchema, type InsertRating } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type PageType = "home" | "features" | "rules" | "rating";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertRating>({
    resolver: zodResolver(insertRatingSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 0,
      message: "",
    },
  });

  const submitRating = useMutation({
    mutationFn: async (data: InsertRating) => {
      const response = await apiRequest("POST", "/api/ratings", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ratings"] });
      setShowSuccess(true);
      form.reset();
      toast({
        title: "تم إرسال التقييم بنجاح!",
        description: "شكراً لك على وقتك وملاحظاتك القيمة",
      });
      
      setTimeout(() => {
        setShowSuccess(false);
        setCurrentPage("home");
      }, 3000);
    },
    onError: () => {
      toast({
        title: "حدث خطأ",
        description: "يرجى المحاولة مرة أخرى لاحقاً",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertRating) => {
    submitRating.mutate(data);
  };

  const showPage = (page: PageType) => {
    setCurrentPage(page);
    setShowSuccess(false);
  };

  const renderPageContent = () => {
    if (showSuccess) {
      return (
        <div className="glass-card p-8 lg:p-12 text-center animate-slideIn" data-testid="success-message">
          <div className="text-6xl text-green-400 mb-6">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2 className="text-3xl font-bold text-green-400 mb-4">تم إرسال التقييم بنجاح!</h2>
          <p className="text-xl text-gray-300">شكراً لك على وقتك وملاحظاتك القيمة</p>
        </div>
      );
    }

    switch (currentPage) {
      case "home":
        return (
          <div className="glass-card p-8 lg:p-12 fade-in-animation" data-testid="page-home">
            <h2 className="text-4xl font-bold text-primary mb-8 glow-animation text-center">
              أهلاً وسهلاً بكم
            </h2>
            
            <div className="space-y-8 text-right max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-primary mb-4">أهلاً بك في فينيس – حيث تبدأ رحلتك نحو التميز!</h3>
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                مرحبًا بك في أكبر مجتمع عربي يضم عشاق التحديات والمكافآت! نحن هنا لنمنحك تجربة مختلفة عن أي منصة أخرى، مجتمعنا ليس مجرد سيرفر، بل عالم متكامل من التواصل، المتعة، والفرص الحقيقية.
              </p>
              
              <div className="bg-black/30 rounded-xl p-6 border border-primary/20">
                <h4 className="text-xl font-bold text-primary mb-4">لماذا فينيس هو اختيارك الأفضل؟</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-lg">✔</span>
                    <span>مجتمع قوي ومترابط – التفاعل معنا يجعلك جزءًا من عائلة كبيرة تشاركك نفس الاهتمامات.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-lg">✔</span>
                    <span>مكافآت حقيقية وجوائز قيمة – كلما زاد نشاطك، زادت فرصك في الفوز.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-lg">✔</span>
                    <span>مسابقات وأحداث أسبوعية – حماس دائم ومنافسة ممتعة لا تتوقف.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-lg">✔</span>
                    <span>واجهة سهلة وتجربة سلسة – انضمامك معنا لن يستغرق أكثر من دقيقة واحدة.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-black/30 rounded-xl p-6 border border-primary/20">
                <h4 className="text-xl font-bold text-primary mb-4">ما الذي نقدمه لك؟</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• نظام مكافآت متطور يعتمد على النشاط والتفاعل.</li>
                  <li>• محتوى مميز وحصري لا تجده في أي مكان آخر.</li>
                  <li>• دعم مستمر من فريقنا لضمان أفضل تجربة لك.</li>
                </ul>
              </div>
              
              <div className="text-center bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl p-6 border border-primary/30">
                <h4 className="text-2xl font-bold text-primary mb-3">انضم الآن وابدأ رحلتك!</h4>
                <p className="text-lg text-gray-300 mb-4">لا تفوت الفرصة لتكون جزءًا من مجتمعنا النشط.</p>
                <button 
                  className="bg-primary hover:bg-primary/80 text-black font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                  data-testid="join-button"
                >
                  اضغط هنا للانضمام الآن
                </button>
              </div>
            </div>
          </div>
        );

      case "features":
        return (
          <div className="glass-card p-8 lg:p-12 fade-in-animation" data-testid="page-features">
            <h2 className="text-4xl font-bold text-primary mb-8 glow-animation text-center">
              مميزات Venice Community
            </h2>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: "fas fa-palette",
                  title: "تصاميم احترافية",
                  description: "نقدم تصاميم مبتكرة وعصرية تناسب جميع احتياجاتكم بأعلى معايير الجودة والإبداع"
                },
                {
                  icon: "fab fa-discord",
                  title: "خدمات ديسكورد",
                  description: "إعداد وتطوير سيرفرات ديسكورد احترافية مع بوتات مخصصة وأنظمة إدارة متقدمة"
                },
                {
                  icon: "fas fa-headset",
                  title: "دعم فني 24/7",
                  description: "فريق دعم فني متاح على مدار الساعة لحل جميع استفساراتكم ومساعدتكم"
                },
                {
                  icon: "fas fa-code",
                  title: "تطوير مخصص",
                  description: "برمجة حلول مخصصة وتطبيقات ويب متقدمة تلبي احتياجاتكم الخاصة"
                },
                {
                  icon: "fas fa-users",
                  title: "إدارة المجتمعات",
                  description: "خدمات إدارة وتنظيم المجتمعات الرقمية لضمان بيئة آمنة وتفاعلية"
                },
                {
                  icon: "fas fa-shield-alt",
                  title: "الأمان والحماية",
                  description: "أنظمة حماية متقدمة وآليات أمان قوية لحماية سيرفراتكم ومجتمعاتكم"
                }
              ].map((feature, index) => (
                <div key={index} className="feature-card p-8 text-center" data-testid={`feature-card-${index}`}>
                  <div className="text-5xl mb-6 text-primary">
                    <i className={feature.icon}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "rules":
        return (
          <div className="glass-card p-8 lg:p-12 fade-in-animation text-right" data-testid="page-rules">
            <h2 className="text-4xl font-bold text-primary mb-8 glow-animation text-center">
              قوانين وشروط الاستخدام
            </h2>
            
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-2xl border border-primary/30">
                <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                  <i className="fas fa-user-check ml-3"></i>
                  قواعد السلوك العام
                </h3>
                <ul className="space-y-3 text-gray-300 pr-6">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-400 mt-1 ml-3"></i>
                    احترام جميع الأعضاء والتعامل بأدب ولياقة
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-400 mt-1 ml-3"></i>
                    عدم إرسال محتوى مخل بالآداب أو مسيء
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-400 mt-1 ml-3"></i>
                    تجنب الإزعاج المفرط والرسائل العشوائية
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-secondary/10 to-transparent p-6 rounded-2xl border border-secondary/30">
                <h3 className="text-2xl font-bold text-secondary mb-4 flex items-center">
                  <i className="fas fa-shield-alt ml-3"></i>
                  سياسة الخصوصية والأمان
                </h3>
                <ul className="space-y-3 text-gray-300 pr-6">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-400 mt-1 ml-3"></i>
                    حماية البيانات الشخصية وعدم مشاركتها
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-400 mt-1 ml-3"></i>
                    استخدام أنظمة حماية متقدمة
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-400 mt-1 ml-3"></i>
                    الإبلاغ عن أي نشاط مشبوه فوراً
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/10 to-transparent p-6 rounded-2xl border border-yellow-500/30">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center">
                  <i className="fas fa-exclamation-triangle ml-3"></i>
                  التحذيرات والعقوبات
                </h3>
                <ul className="space-y-3 text-gray-300 pr-6">
                  <li className="flex items-start">
                    <i className="fas fa-info text-yellow-400 mt-1 ml-3"></i>
                    التحذير الأول: تنبيه شفهي
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-info text-yellow-400 mt-1 ml-3"></i>
                    التحذير الثاني: إيقاف مؤقت لمدة يوم
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-info text-yellow-400 mt-1 ml-3"></i>
                    التحذير الثالث: إيقاف نهائي من الخدمة
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "rating":
        return (
          <div className="glass-card p-8 lg:p-12 fade-in-animation" data-testid="page-rating">
            <h2 className="text-4xl font-bold text-primary mb-8 glow-animation text-center">
              تقييم خدماتنا
            </h2>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-8 text-right" data-testid="rating-form">
              <div className="form-group">
                <Label htmlFor="name" className="block text-lg font-semibold text-primary mb-3">
                  <i className="fas fa-user ml-2"></i>
                  الاسم الكامل
                </Label>
                <Input
                  {...form.register("name")}
                  id="name"
                  type="text"
                  required
                  className="w-full p-4 bg-gray-800/80 border border-gray-600 text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/50"
                  placeholder="أدخل اسمكم الكامل"
                  data-testid="input-name"
                />
              </div>

              <div className="form-group">
                <Label htmlFor="email" className="block text-lg font-semibold text-primary mb-3">
                  <i className="fas fa-envelope ml-2"></i>
                  البريد الإلكتروني
                </Label>
                <Input
                  {...form.register("email")}
                  id="email"
                  type="email"
                  required
                  className="w-full p-4 bg-gray-800/80 border border-gray-600 text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/50"
                  placeholder="example@email.com"
                  data-testid="input-email"
                />
              </div>

              <div className="form-group">
                <Label className="block text-lg font-semibold text-primary mb-3">
                  <i className="fas fa-star ml-2"></i>
                  تقييم الخدمة
                </Label>
                <div className="flex justify-center mb-4">
                  <StarRating
                    value={form.watch("rating")}
                    onChange={(value: number) => form.setValue("rating", value)}
                    data-testid="star-rating"
                  />
                </div>
              </div>

              <div className="form-group">
                <Label htmlFor="message" className="block text-lg font-semibold text-primary mb-3">
                  <i className="fas fa-comment ml-2"></i>
                  رسالتكم
                </Label>
                <Textarea
                  {...form.register("message")}
                  id="message"
                  required
                  rows={6}
                  className="w-full p-4 bg-gray-800/80 border border-gray-600 text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="شاركونا رأيكم وملاحظاتكم حول خدماتنا..."
                  data-testid="textarea-message"
                />
              </div>

              <Button
                type="submit"
                disabled={submitRating.isPending}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary py-4 px-8 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40"
                data-testid="button-submit-rating"
              >
                <i className="fas fa-paper-plane ml-2"></i>
                {submitRating.isPending ? "جاري الإرسال..." : "إرسال التقييم"}
              </Button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 min-h-screen">
      <Header currentPage={currentPage} onPageChange={showPage} />
      
      <main className="text-center">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-5xl lg:text-7xl font-bold text-primary glow-animation float-animation mb-6" data-testid="main-title">
            مرحباً بك في Venice Community
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed" data-testid="main-subtitle">
            استوديو احترافي متخصص في خدمات الديسكورد والتصميم الرقمي
          </p>
          
          {currentPage === "home" && (
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <Button
                onClick={() => showPage("features")}
                className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary px-8 py-4 font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/40"
                data-testid="button-explore-features"
              >
                <i className="fas fa-rocket ml-2"></i>
                استكشف المميزات
              </Button>
              <Button
                onClick={() => showPage("rating")}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 font-bold text-lg transition-all duration-300 hover:scale-105"
                data-testid="button-rate-services"
              >
                <i className="fas fa-star ml-2"></i>
                قيم خدماتنا
              </Button>
            </div>
          )}
        </div>

        {/* Page Content */}
        <div className="page-content">
          {renderPageContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
}
