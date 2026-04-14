import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-orange-500">Figure.in</h1>
          <p className="text-gray-600 mt-2">
            Explore your Hobby with Figurein!
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
