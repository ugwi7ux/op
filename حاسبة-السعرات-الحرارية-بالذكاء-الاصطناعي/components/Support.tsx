
import React from 'react';
import { SUPPORT_EMAIL } from '../constants';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <div className="py-6 border-b border-gray-200">
        <dt className="text-lg">
            <button className="text-right w-full flex justify-between items-start text-gray-500 focus:outline-none">
                <span className="font-medium text-gray-900">{question}</span>
                <span className="mr-6 h-7 flex items-center">
                    {/* Placeholder for expand/collapse icon */}
                </span>
            </button>
        </dt>
        <dd className="mt-2 pr-0">
            <p className="text-base text-gray-600">{answer}</p>
        </dd>
    </div>
);

const Support: React.FC = () => {
    const mailtoLink = `mailto:${SUPPORT_EMAIL}?subject=استفسار / إبلاغ عن مشكلة - Calorie AI`;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-gray-800">مركز المساعدة والدعم الفني 🤝</h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        نحن هنا لمساعدتك. تصفح الأسئلة الشائعة أو تواصل معنا مباشرة.
                    </p>
                </div>

                <div className="mt-12 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">الأسئلة الشائعة</h3>
                    <dl className="space-y-4">
                        <FAQItem 
                            question="ما مدى دقة حساب السعرات الحرارية؟" 
                            answer="نستخدم نماذج ذكاء اصطناعي متطورة لتحليل الصور، وهي توفر تقديرات دقيقة للغاية. ومع ذلك، قد تختلف النتائج قليلاً بناءً على جودة الصورة وحجم الحصص."
                        />
                        <FAQItem 
                            question="هل يمكنني استخدام التطبيق مجاناً؟" 
                            answer="نعم، يمكنك تجربة الميزة الأساسية لحساب السعرات لعدد محدود من المرات. للحصول على تحليل غير محدود وميزات إضافية، نوصي بالترقية إلى الخطة الاحترافية."
                        />
                        <FAQItem 
                            question="كيف يتم التعامل مع بياناتي وصوري؟" 
                            answer="نحن نحترم خصوصيتك. يتم استخدام الصور فقط لغرض التحليل ولا يتم تخزينها أو مشاركتها مع أطراف ثالثة. يتم التعامل مع جميع البيانات بسرية تامة."
                        />
                    </dl>
                </div>

                <div className="mt-16 text-center bg-gray-50 p-10 rounded-2xl max-w-3xl mx-auto border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-800">هل لم تجد إجابتك؟</h3>
                    <p className="mt-3 text-gray-600">
                        فريق الدعم لدينا جاهز للرد على استفساراتك أو استقبال بلاغاتك. كل الرسائل تصلنا مباشرة ونقوم بالرد في أقرب وقت ممكن.
                    </p>
                    <a
                        href={mailtoLink}
                        className="mt-6 inline-block bg-emerald-500 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-emerald-600 transition-transform hover:scale-105 shadow-lg"
                    >
                        📧 تواصل معنا عبر البريد الإلكتروني
                    </a>
                    <p className="mt-4 text-sm text-gray-500">
                        سيتم فتح تطبيق البريد الإلكتروني الافتراضي لديك.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Support;
