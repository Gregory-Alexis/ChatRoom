import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';

type LoginInput = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const { login } = useAuthStore();

  const LoginHandler: SubmitHandler<LoginInput> = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error: any) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  };

  return (
    <div className='p-6 min-h-screen flex flex-col justify-center items-center'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-600'>Chat Room</h1>
        <p className='text-lg text-gray-800 mt-2'>Login and chat with friends</p>
      </div>

      <form
        onSubmit={handleSubmit(LoginHandler)}
        className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'
      >
        <div className='mb-6'>
          <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>
            Email
          </label>
          <input
            type='email'
            id='email'
            placeholder='Enter your email'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email format',
              },
            })}
            required
          />
        </div>

        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

        <div className='mb-6'>
          <label htmlFor='password' className='block text-gray-700 font-semibold mb-2'>
            Password
          </label>
          <input
            type='password'
            id='password'
            placeholder='Enter your password'
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500'
            {...register('password', {
              required: 'Password is required',
            })}
          />
        </div>

        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

        <button
          type='submit'
          className='w-full py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-600 transition'
        >
          Login
        </button>

        <p className='mt-6 text-center text-gray-700'>
          No account ?{' '}
          <Link to='/signup' className='text-blue-500 hover:underline'>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
