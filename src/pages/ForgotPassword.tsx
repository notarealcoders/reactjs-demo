import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TimerReset as KeyReset } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-8">
          <KeyReset size={48} className="text-indigo-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <p className="text-gray-600 text-center mb-8">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
        
        {success ? (
          <div className="text-center">
            <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6">
              Check your email for the password reset link.
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
              className="w-full"
            >
              Back to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Instructions'}
            </Button>

            <p className="text-center text-gray-600">
              Remember your password?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Sign in
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;