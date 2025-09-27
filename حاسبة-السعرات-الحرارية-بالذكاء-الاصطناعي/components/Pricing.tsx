import React from 'react';

const CheckIcon = () => (
    <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

const Pricing: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-extrabold text-gray-800">اشترك الآن واستمتع بميزات غير محدودة</h2>
                <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                    الخطة المجانية تمنحك 3 محاولات يومياً. اشترك للحصول على تحليل لا محدود، سجل لوجباتك، والمزيد!
                </p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Monthly Plan */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-transparent hover:border-emerald-500 transition-all transform hover:scale-105">
                        <h3 className="text-2xl font-bold">الاشتراك الشهري</h3>
                        <p className="mt-4 text-5xl font-extrabold text-gray-800 flex justify-center items-baseline gap-2">
                           <span>$3.99</span>
                           <span className="text-2xl font-medium text-gray-400 line-through">$9.99</span>
                        </p>
                         <p className="text-lg font-medium text-gray-500">/شهرياً</p>
                        <ul className="mt-8 space-y-4 text-right">
                            <li className="flex items-center"><CheckIcon /><span className="mr-3">تحليل غير محدود للصور</span></li>
                            <li className="flex items-center"><CheckIcon /><span className="mr-3">سجل الوجبات محفوظ</span></li>
                            <li className="flex items-center"><CheckIcon /><span className="mr-3">تقارير غذائية أسبوعية</span></li>
                            <li className="flex items-center"><CheckIcon /><span className="mr-3">دعم فني متميز</span></li>
                        </ul>
                        <button className="mt-8 w-full bg-emerald-500 text-white py-3 rounded-full text-lg font-bold hover:bg-emerald-600 transition-transform hover:scale-105 shadow-md">
                            اختر الخطة الشهرية
                        </button>
                    </div>

                    {/* Annual Plan */}
                    <div className="relative bg-white rounded-2xl shadow-xl p-8 border-2 border-emerald-500">
                        <span className="absolute top-0 right-1/2 transform -translate-y-1/2 translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full">خصم 40%</span>
                        <h3 className="text-2xl font-bold">الاشتراك السنوي</h3>
                         <p className="mt-4 text-5xl font-extrabold text-gray-800">
                            $29.99
                        </p>
                        <p className="text-lg font-medium text-gray-500">/سنوياً</p>
                        <ul className="mt-8 space-y-4 text-right">
                             <li className="flex items-center"><CheckIcon /><span className="mr-3">تحليل غير محدود للصور</span></li>
                            <li className="flex items-center"><CheckIcon /><span className="mr-3">سجل الوجبات محفوظ</span></li>
                            <li className="flex items-center"><CheckIcon /><span className="mr-3">تقارير غذائية أسبوعية</span></li>
                            <li className="flex items-center"><CheckIcon /><span className="mr-3">دعم فني متميز</span></li>
                        </ul>
                        <button className="mt-8 w-full bg-emerald-500 text-white py-3 rounded-full text-lg font-bold hover:bg-emerald-600 transition-transform hover:scale-105 shadow-md">
                            اختر الخطة السنوية
                        </button>
                    </div>
                </div>

                <div className="mt-16 max-w-3xl mx-auto bg-gray-100 p-8 rounded-xl border border-gray-200">
                     <h3 className="text-2xl font-bold text-gray-800 mb-4">طرق الدفع المتاحة 💳</h3>
                     <p className="text-gray-600 mb-6">نحن نوفر طرق دفع آمنة وموثوقة. بعد اختيار الخطة، اتبع التعليمات أدناه لإتمام عملية الدفع.</p>
                     <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                         {/* PayPal Placeholder */}
                         <div className="text-center p-6 bg-white rounded-lg shadow-md w-full">
                            <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.png" alt="PayPal" className="h-12 mx-auto mb-4" />
                            <p className="font-bold">الدفع عبر PayPal</p>
                            {/* 
                                ======================================================================
                                === تعليمات هامة لاستلام أرباح PayPal ===
                                ======================================================================
                                1. اذهب إلى حسابك في PayPal.
                                2. قم بإنشاء رابط دفع شخصي (PayPal.Me link). سيكون شيئًا مثل: paypal.me/your-username
                                3. انسخ الرابط الذي أنشأته.
                                4. استبدل علامة الهاش "#" في خاصية `href` أدناه بالرابط الذي نسخته.
                                ======================================================================
                            */}
                            <a 
                                href="#" // <-- الصق رابط PayPal.Me هنا
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                            >
                                اضغط هنا للدفع
                            </a>
                         </div>

                         {/* Bank Transfer Placeholder */}
                         <div className="text-center p-6 bg-white rounded-lg shadow-md w-full">
                            <p className="text-5xl mb-4">🏦</p>
                            <p className="font-bold">تحويل بنكي مباشر</p>
                             {/* 
                                ======================================================================
                                === تعليمات هامة لاستلام أرباح التحويل البنكي ===
                                ======================================================================
                                1. قم بإلغاء التعليق عن الكود أدناه (أزل ` {/* ` و ` */} `).
                                2. املأ الفراغات بين القوسين `[]` بمعلومات حسابك البنكي الصحيحة.
                                ======================================================================
                            */}
                             <div className="mt-4 text-gray-500 text-sm">
                                <p>لإتمام الاشتراك، يرجى تحويل المبلغ إلى الحساب التالي:</p>
                                {/*
                                <div className="mt-4 p-4 bg-gray-200 rounded-md text-sm text-right text-gray-800">
                                    <p><strong>اسم البنك:</strong> [اكتب اسم البنك هنا]</p>
                                    <p><strong>اسم المستفيد:</strong> [اكتب اسمك الكامل هنا]</p>
                                    <p><strong>رقم الحساب (IBAN):</strong> [اكتب رقم الآيبان هنا]</p>
                                    <p className="mt-2 font-bold">بعد التحويل، يرجى إرسال إيصال الدفع مع بريدك الإلكتروني المسجل إلى: {SUPPORT_EMAIL}</p>
                                </div>
                                */}
                                <p className="mt-2 font-bold text-red-500">ملاحظة: قم بتفعيل هذا القسم من الكود واملأ بياناتك.</p>
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;