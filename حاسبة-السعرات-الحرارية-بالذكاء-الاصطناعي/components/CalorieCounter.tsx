import React, { useState, useRef, useEffect } from 'react';
import { analyzeFoodImage, processImageForApi } from '../services/geminiService';
import { AnalysisResult, FoodItem } from '../types';
import Spinner from './Spinner';
import { Page } from '../App';

const DAILY_LIMIT = 3;

interface CalorieCounterProps {
  setActivePage: (page: Page) => void;
}

const UploadIcon = () => (
  <svg className="w-12 h-12 mx-auto text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ResultCard: React.FC<{ result: AnalysisResult }> = ({ result }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full animate-fade-in">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">📊 النتائج الغذائية</h3>
        <div className="bg-emerald-100 text-emerald-800 rounded-lg p-4 mb-6 text-center">
            <p className="text-lg">إجمالي السعرات الحرارية</p>
            <p className="text-4xl font-extrabold">{Math.round(result.totalCalories)} سعرة حرارية</p>
        </div>
        <div className="space-y-4">
            {result.items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-xl text-emerald-600 mb-2">{item.name} ({item.weight})</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-gray-600">
                        <p>🔥 <span className="font-medium">{Math.round(item.calories)}</span> سعرة</p>
                        <p>💪 <span className="font-medium">{Math.round(item.protein)}</span> بروتين</p>
                        <p>🍞 <span className="font-medium">{Math.round(item.carbs)}</span> كارب</p>
                        <p>🥑 <span className="font-medium">{Math.round(item.fats)}</span> دهون</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);


const CalorieCounter: React.FC<CalorieCounterProps> = ({ setActivePage }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [usageCount, setUsageCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load and validate usage count from localStorage
    const today = new Date().toISOString().split('T')[0];
    const storedUsage = localStorage.getItem('jona-calorie-usage');
    if (storedUsage) {
      const { date, count } = JSON.parse(storedUsage);
      if (date === today) {
        setUsageCount(count);
      } else {
        // Reset count for a new day
        localStorage.removeItem('jona-calorie-usage');
      }
    }
  }, []);

  useEffect(() => {
    // Clean up object URL to prevent memory leaks
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const limitReached = usageCount >= DAILY_LIMIT;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setError(null);
      setResult(null);
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAnalyzeClick = async () => {
    if (!imageFile || limitReached) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const { base64Data, mimeType } = await processImageForApi(imageFile);
      const analysisResult = await analyzeFoodImage(base64Data, mimeType);
      setResult(analysisResult);
      
      // Update usage count
      const today = new Date().toISOString().split('T')[0];
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      localStorage.setItem('jona-calorie-usage', JSON.stringify({ date: today, count: newCount }));

    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <section id="calorie-counter" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 transition-all">
          <div className="text-center">
             <h2 className="text-3xl font-bold mb-2">ابدأ حساب سعراتك الآن</h2>
             <p className="text-gray-500 mb-2">
                لديك <span className="font-bold text-emerald-600">{DAILY_LIMIT - usageCount}</span> محاولات مجانية متبقية لهذا اليوم.
            </p>
             <p className="text-gray-500 mb-8">ارفع صورة وجبتك ودع الذكاء الاصطناعي يقوم بالباقي</p>
          </div>
          
          {!previewUrl && (
             <div 
               onClick={() => fileInputRef.current?.click()}
               className="mt-1 flex justify-center px-6 pt-10 pb-12 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-emerald-400 transition-colors"
             >
                <div className="space-y-1 text-center">
                    <UploadIcon />
                    <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none">
                            <span>اختر ملفاً</span>
                            <input ref={fileInputRef} id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                        </label>
                        <p className="pr-1">أو اسحب الصورة وأفلتها هنا</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
          )}

          {previewUrl && (
            <div className="mt-8 flex flex-col items-center gap-6">
              <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg">
                <img src={previewUrl} alt="معاينة الطعام" className="w-full h-auto object-cover" />
              </div>
              
              {!isLoading && !result && (
                 <div className="flex flex-col items-center w-full">
                    <div className="flex items-center space-x-4 space-x-reverse">
                        <button
                            onClick={handleAnalyzeClick}
                            className={`px-8 py-3 rounded-full text-lg font-bold transition-transform hover:scale-105 shadow-lg ${limitReached ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
                            disabled={isLoading || limitReached}
                        >
                            {limitReached ? 'تم الوصول للحد اليومي' : 'تحليل الصورة 🥗'}
                        </button>
                         <button onClick={resetState} className="text-gray-500 hover:text-red-500 transition-colors">
                            تغيير الصورة
                        </button>
                    </div>
                    {limitReached && (
                        <div className="mt-4 text-center bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg w-full">
                            <p className="font-bold">لقد استهلكت محاولاتك المجانية لهذا اليوم.</p>
                            <p>
                                <button onClick={() => setActivePage('pricing')} className="font-medium underline hover:text-yellow-900">
                                    اشترك الآن
                                </button> 
                                 للحصول على تحليل غير محدود وميزات إضافية!
                            </p>
                        </div>
                    )}
                 </div>
              )}
            </div>
          )}

          {isLoading && (
            <div className="mt-8 flex flex-col items-center text-center">
              <Spinner />
              <p className="mt-4 text-lg text-gray-600 animate-pulse">
                جاري تحليل الصورة... قد يستغرق الأمر بضع لحظات 🤖
              </p>
            </div>
          )}

          {error && (
            <div className="mt-8 text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">خطأ! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {result && !isLoading && (
             <div className="mt-10 flex flex-col items-center gap-4">
                <ResultCard result={result} />
                <button onClick={resetState} className="mt-4 bg-gray-700 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
                    تحليل صورة جديدة
                </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CalorieCounter;