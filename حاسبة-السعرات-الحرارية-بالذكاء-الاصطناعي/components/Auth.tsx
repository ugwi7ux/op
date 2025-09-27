import React from 'react';

interface AuthProps {
    onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {

    const handleSocialLogin = () => {
        // In a real app, this would trigger the OAuth flow.
        // For this frontend-only demo, we'll just simulate a successful login.
        alert('محاكاة تسجيل الدخول بنجاح! في تطبيق حقيقي، سيتم توجيهك للمزود.');
        onLogin();
    }

    const handleEmailLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login
        alert('محاكاة تسجيل الدخول بالبريد الإلكتروني بنجاح!');
        onLogin();
    }

    return (
        <section className="py-20 bg-gray-50 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-2 text-gray-800">مرحباً بك في Jona Calorie</h2>
                    <p className="text-gray-500 mb-8">سجّل دخولك أو أنشئ حساباً جديداً للبدء.</p>
                </div>

                <div className="space-y-4">
                    {/* Social Logins */}
                    <button onClick={handleSocialLogin} className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-100 transition-colors">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
                        <span>المتابعة باستخدام جوجل</span>
                    </button>
                    <button onClick={handleSocialLogin} className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-100 transition-colors">
                        <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" className="w-6 h-6" />
                        <span>المتابعة باستخدام فيسبوك</span>
                    </button>
                    <button onClick={handleSocialLogin} className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-100 transition-colors">
                        <img src="https://www.svgrepo.com/show/448204/apple.svg" alt="Apple" className="w-6 h-6" />
                        <span>المتابعة باستخدام آبل</span>
                    </button>
                </div>
                
                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 text-sm">أو</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <form onSubmit={handleEmailLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="sr-only">البريد الإلكتروني</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="البريد الإلكتروني" 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="password"className="sr-only">كلمة المرور</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="كلمة المرور" 
                            required 
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-emerald-500 text-white py-3 rounded-full text-lg font-bold hover:bg-emerald-600 transition-transform hover:scale-105 shadow-md"
                    >
                        تسجيل الدخول
                    </button>
                </form>

                 <p className="mt-6 text-center text-sm text-gray-600">
                    ليس لديك حساب؟{' '}
                    <button className="font-medium text-emerald-600 hover:underline">
                        أنشئ حساباً
                    </button>
                </p>
            </div>
        </section>
    );
};

export default Auth;
