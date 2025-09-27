import React from 'react';
import { Page } from '../App';

interface HeroProps {
  setActivePage: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ setActivePage }) => {
  const scrollToCounter = () => {
    document.getElementById('calorie-counter')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          التقط صورة، اعرف سعراتك 📸
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          استخدم قوة الذكاء الاصطناعي لتحليل وجباتك فوراً. احصل على تقرير دقيق بالسعرات الحرارية والمكونات الغذائية، وابدأ رحلتك نحو صحة أفضل اليوم. 🥗
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={scrollToCounter}
            className="bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-emerald-600 transition-transform hover:scale-105 shadow-xl"
          >
            ابدأ التجربة الآن
          </button>
           <button
            onClick={() => setActivePage('auth')}
            className="bg-gray-700 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-transform hover:scale-105 shadow-xl"
          >
            إنشاء حساب جديد
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;