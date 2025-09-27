import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    totalCalories: {
      type: Type.NUMBER,
      description: "إجمالي السعرات الحرارية لكل الأطعمة في الصورة."
    },
    items: {
      type: Type.ARRAY,
      description: "قائمة بجميع المواد الغذائية التي تم تحديدها في الصورة.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "اسم المادة الغذائية باللغة العربية."
          },
          weight: {
            type: Type.STRING,
            description: "الوزن التقديري للمادة الغذائية بالجرام (مثال: '150 جرام')."
          },
          calories: {
            type: Type.NUMBER,
            description: "السعرات الحرارية لهذه المادة."
          },
          protein: {
            type: Type.NUMBER,
            description: "كمية البروتين بالجرام."
          },
          carbs: {
            type: Type.NUMBER,
            description: "كمية الكربوهيدرات بالجرام."
          },
          fats: {
            type: Type.NUMBER,
            description: "كمية الدهون بالجرام."
          }
        },
        required: ["name", "weight", "calories", "protein", "carbs", "fats"]
      }
    }
  },
  required: ["totalCalories", "items"]
};

export const analyzeFoodImage = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: `
              حلل صورة الطعام هذه بالتفصيل.
              1. حدد كل عنصر غذائي موجود.
              2. قدر وزن كل عنصر بالجرام.
              3. قدم تحليلاً غذائياً مفصلاً لكل عنصر يشمل: السعرات الحرارية، البروتين، الكربوهيدرات، والدهون.
              4. احسب إجمالي السعرات الحرارية لجميع العناصر.
              5. يجب أن تكون جميع الأسماء والأوصاف باللغة العربية.
              قم بإرجاع النتيجة ككائن JSON صالح.
            `,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });
    
    const jsonText = response.text.trim();
    // Basic check if the response is a valid JSON string
    if (jsonText.startsWith('{') && jsonText.endsWith('}')) {
      const parsedResult: AnalysisResult = JSON.parse(jsonText);
      return parsedResult;
    } else {
       throw new Error("فشل في تحليل استجابة الذكاء الاصطناعي. الرجاء المحاولة مرة أخرى.");
    }

  } catch (error) {
    console.error("Error analyzing image with Gemini API:", error);
    throw new Error("حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. تحقق من اتصالك بالإنترنت وحاول مرة أخرى.");
  }
};

export const processImageForApi = (file: File): Promise<{ base64Data: string; mimeType: string }> => {
  const SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  return new Promise((resolve, reject) => {
    // If mime type is supported, just read and return.
    if (SUPPORTED_MIME_TYPES.includes(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve({ base64Data: result.split(',')[1], mimeType: file.type });
      };
      reader.onerror = (error) => reject(error);
      return;
    }

    // If mime type is not supported (e.g., AVIF), convert to JPEG.
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target?.result as string;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Could not get canvas context for image conversion.'));
        }
        ctx.drawImage(image, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        resolve({ base64Data: dataUrl.split(',')[1], mimeType: 'image/jpeg' });
      };
      image.onerror = (_error) => reject(new Error('Failed to load image for conversion.'));
    };
    reader.onerror = (error) => reject(error);
  });
};
