import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!showOTP) {
                await register(name, email, password);
                setShowOTP(true);
                setError('');
            } else {
                await verifyOTP(email, otp);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">

            {/* Glow Background */}
            <div className="absolute w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-3xl top-20 left-20"></div>
            <div className="absolute w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-3xl bottom-20 right-20"></div>

            {/* Card */}
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                        Create Account 🚀
                    </h2>
                    <p className="text-gray-300 text-sm">
                        Join Eventora and start exploring events
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-6 text-center border border-red-400/20 backdrop-blur-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {!showOTP ? (
                        <>
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition backdrop-blur-sm"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition backdrop-blur-sm"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition backdrop-blur-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            {/* OTP Notice */}
                            <div className="text-sm text-green-300 bg-green-500/10 p-3 mb-4 rounded border border-green-400/20 text-center backdrop-blur-sm">
                                OTP sent to your email. Please verify your account.
                            </div>

                            {/* OTP */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-2">
                                    Verification Code (OTP)
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="••••••"
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white text-center text-xl tracking-widest font-bold focus:ring-2 focus:ring-purple-500 transition backdrop-blur-sm"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength="6"
                                />
                            </div>
                        </>
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 rounded-lg hover:scale-[1.02] hover:shadow-lg transition duration-300 disabled:opacity-70 mt-2"
                    >
                        {loading ? 'Processing...' : (showOTP ? 'Verify & Complete' : 'Sign Up')}
                    </button>
                </form>

                {/* Footer */}
                {!showOTP && (
                    <p className="text-center mt-6 text-gray-300 text-sm">
                        Already have an account?{" "}
                        <Link 
                            to="/login" 
                            className="text-white font-semibold hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Register;